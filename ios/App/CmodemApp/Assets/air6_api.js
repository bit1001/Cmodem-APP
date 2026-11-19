/* Air6 OpenWrt/LuCI cmodem adapter. See docs/AIR6_ADAPTATION.md for evidence. */
(function(root){
  'use strict';
  const NetworkMode=typeof module!=='undefined'?require('./network_mode.js'):root.NetworkMode;
  const API='/cgi-bin/luci/admin/modem/cmodem/api?method=';
  const PAGE='/cgi-bin/luci/admin/modem/cmodem';
  const STATIC='/luci-static/resources/view/modem/cmodem-home.js';
  const error=(message,code)=>Object.assign(Error(message),code?{code}:{});
  const first=value=>Array.isArray(value)?value[0]||{}:value||{};
  const list=value=>Array.isArray(value)?value:[];
  function leaseDevices(data){
    const devices=new Map(),byDuid=new Map();
    const mac=value=>{const s=String(value||'').replace(/[:-]/g,'').toLowerCase();return /^[0-9a-f]{12}$/.test(s)?s.match(/../g).join(':'):'';};
    const duidOf=lease=>String(lease.duid||'').replace(/[:-]/g,'').toLowerCase();
    const hardwareOf=lease=>mac(lease.macaddr||lease.mac)||(/^(?:00010001[0-9a-f]{8}|00030001)[0-9a-f]{12}$/.test(duidOf(lease))?mac(duidOf(lease).slice(-12)):'');
    const namedV4=new Map(),namedV6=new Map();
    for(const [map,leases]of [[namedV4,list(data.dhcp_leases)],[namedV6,list(data.dhcp6_leases)]])for(const lease of leases){
      const name=String(lease.hostname||'').trim().toLowerCase();if(!name)continue;
      if(!map.has(name))map.set(name,new Set());map.get(name).add(hardwareOf(lease)||duidOf(lease)||String(lease.ipaddr||lease.ip6addr||JSON.stringify(lease.ip6addrs)));
    }
    for(const [family,leases] of [['IPv4',list(data.dhcp_leases)],['IPv6',list(data.dhcp6_leases)]])for(const lease of leases){
      const duid=duidOf(lease);
      const hardware=hardwareOf(lease);
      const addresses=[...new Set((family==='IPv4'?[lease.ipaddr]:[lease.ip6addr,...list(lease.ip6addrs)]).filter(v=>typeof v==='string'&&v.trim()).map(v=>v.trim().replace(/\/128$/,'')))];
      const key=hardware?'mac:'+hardware:duid?'duid:'+duid:addresses.length?family+':'+addresses.slice().sort().join(','):'unknown:'+devices.size;
      let row=devices.get(key)||(duid?byDuid.get(duid):null);
      const name=String(lease.hostname||'').trim().toLowerCase();
      if(!row&&family==='IPv6'&&!hardware&&duid&&namedV4.get(name)?.size===1&&namedV6.get(name)?.size===1){row=[...devices.values()].find(v=>v.name.toLowerCase()===name&&v.ipv4.length&&!v.ipv6.length);if(row)row.identityMatch='hostname';}
      if(!row){row={name:String(lease.hostname||'未命名'),mac:hardware,ipv4:[],ipv6:[]};devices.set(key,row);}else if(row.name==='未命名'&&lease.hostname)row.name=String(lease.hostname);
      if(duid)byDuid.set(duid,row);
      const target=family==='IPv4'?row.ipv4:row.ipv6;for(const address of addresses)if(!target.includes(address))target.push(address);
    }
    return [...devices.values()];
  }
  const val=(...values)=>String(values.find(v=>v!==undefined&&v!==null&&v!==''&&v!=='-')??'--');
  const number=value=>value===null||value===undefined||String(value).trim()===''?NaN:Number(value);
  function smsTime(value){
    const raw=String(value??'').trim();if(!raw)return '';
    if(/^\d{10,13}$/.test(raw)){
      const millis=raw.length===10?Number(raw)*1000:Number(raw),date=new Date(millis);
      if(Number.isFinite(millis)&&!Number.isNaN(date.getTime()))return smsTime(date.getFullYear()+'/'+String(date.getMonth()+1).padStart(2,'0')+'/'+String(date.getDate()).padStart(2,'0')+' '+String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+':'+String(date.getSeconds()).padStart(2,'0'));
    }
    const match=raw.match(/^(\d{2}|\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})[ T,](\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(?:Z|[+-]\d{2}(?::?\d{2})?))?$/i);
    if(!match)return raw;
    let year=Number(match[1]);if(year<100)year+=year>=70?1900:2000;
    const parts=[year,...match.slice(2,7).map(v=>Number(v||0))],date=new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
    if(date.getFullYear()!==parts[0]||date.getMonth()!==parts[1]-1||date.getDate()!==parts[2]||date.getHours()!==parts[3]||date.getMinutes()!==parts[4]||date.getSeconds()!==parts[5])return raw;
    const pad=v=>String(v).padStart(2,'0');return parts[0]+'/'+pad(parts[1])+'/'+pad(parts[2])+' '+pad(parts[3])+':'+pad(parts[4])+':'+pad(parts[5]);
  }
  function nativeSmsPdu(value){
    if(!value||typeof root.AndroidCore?.decodeSmsPdu!=='function')return null;
    try{const decoded=JSON.parse(root.AndroidCore.decodeSmsPdu(String(value))||'null');return decoded?.ok?decoded:null;}catch(_){return null;}
  }
  function signal(type,...values){
    for(const value of values){const n=number(value);if(Number.isFinite(n)&&(type==='sinr'?n>=-50&&n<=50:n<0&&n>=(type==='rsrp'?-180:type==='rssi'?-140:-50)))return String(n);}
    return '--';
  }
  function cpuCounters(raw){
    const match=/^cpu[ \t]+(.+)$/m.exec(String(raw||''));if(!match)return null;
    const values=match[1].trim().split(/\s+/).slice(0,8);if(values.length<4||values.some(v=>!/^\d+$/.test(v)||!Number.isSafeInteger(Number(v))))return null;
    while(values.length<8)values.push('0');return values.map(Number);
  }
  function cpuPercent(previous,current){
    if(!previous||!current||current.some((v,i)=>v<previous[i]))return null;
    const delta=current.map((v,i)=>v-previous[i]),total=delta.reduce((a,b)=>a+b,0),idle=delta[3]+delta[4];
    return Number.isSafeInteger(total)&&total>0?Math.min(100,Math.max(0,100*(total-idle)/total)):null;
  }
  function bandwidth(rat,value){
    const maps=rat==='nr'?[5,10,15,20,25,30,40,50,60,80,90,100,200,400,70]:[1.4,3,5,10,15,20];
    if(value===null||value===undefined||value==='')return '--';
    const n=Number(value);return Number.isInteger(n)&&maps[n]!==undefined?maps[n]+'MHz':Number.isFinite(n)&&n>0?n+'MHz':/^\d+(?:\.\d+)?\s*M(?:Hz)?$/i.test(String(value))?String(value).replace(/M(?:Hz)?$/i,'MHz'):'--';
  }
  function carrierKey(value,radio){
    const m=String(value||'').trim().match(/^(?:(NR5G|NR|LTE)[\s_-]*)?(PCC|SCC)[\s_-]*(\d+)?$/i);
    if(!m||m[2].toUpperCase()==='SCC'&&!m[3])return '';
    return (m[1]||radio).toUpperCase().replace('NR5G','NR')+':'+m[2].toUpperCase()+(m[2].toUpperCase()==='SCC'?Number(m[3]):'');
  }
  function carrierInfo(items,radio,label,index){
    const rows=list(items),tag=c=>c.nr5g_cc_type||c.lte_cc_type||c.cc_type;
    return rows.some(c=>tag(c))?rows.find(c=>carrierKey(tag(c),radio)===carrierKey(label,radio))||{}:rows[index]||{};
  }
  function carrierRx(info,type,prefixes){
    return signal(type,...prefixes.flatMap(prefix=>[0,1,2,3].map(i=>info[prefix+i])));
  }
  function rates(data,rat,lcd={},mac={}){
    const order=/NR/.test(rat||'')?['nr_throughput_info','lte_throughput_info']:['lte_throughput_info','nr_throughput_info'];
    const tp=order.map(key=>first(data[key])).find(v=>Object.keys(v).length)||{};
    const rate=v=>Number.isFinite(number(v))&&number(v)>=0?String(number(v)/8000):null;
    const preferred=(...values)=>{const valid=values.map(number).filter(n=>Number.isFinite(n)&&n>=0);return valid.find(n=>n>0)??valid[0];};
    const pick=field=>{
      const direct=mac.source==='edmfapp'?rate(mac.mac_throughput_info?.[field]):null;
      return direct!==null?direct:rate(preferred(lcd[field],tp[field]));
    };
    // The board's speed contract is decimal KB/s; cmodem reports bits/s.
    return {down:pick('mac_throughput_dl'),up:pick('mac_throughput_ul')};
  }
  // Downlink ARFCN ranges (3GPP TS 38.104 / 36.101) for the Air6
  // firmware's supported FR1 bands. Overlapping ranges stay ambiguous.
  const nrRanges=[[1,422000,434000],[3,361000,376000],[5,173800,178800],[7,524000,538000],[8,185000,192000],[20,158200,164200],[28,151600,160600],[38,514000,524000],[40,460000,480000],[41,499200,537999],[77,620000,680000],[78,620000,653333],[79,693334,733333]];
  const lteRanges=[[1,0,599],[3,1200,1949],[5,2400,2649],[7,2750,3449],[8,3450,3799],[20,6150,6449],[28,9210,9659],[38,37750,38249],[40,38650,39649],[41,39650,41589],[42,41590,43589]];
  function cellBand(cell,radio,carriers,bandinfo={}){
    const prefix=radio==='nr'?'N':'B';
    const explicit=val(cell[radio+'_band'],cell.band).replace(/^[NB]/i,'');
    if(/^\d+$/.test(explicit)&&Number(explicit)>0)return {band:prefix+Number(explicit),bandSource:'reported'};
    const arfcn=number(cell.nr_arfcn??cell.earfcn??cell.arfcn);
    if(!Number.isInteger(arfcn)||arfcn<0)return {band:'--',bandSource:'unknown'};
    const same=[...new Set(carriers.filter(c=>c.band.startsWith(prefix)&&number(c.arfcn)===arfcn).map(c=>c.band))];
    const current=number(bandinfo[radio==='nr'?'nr_dl_arfcn':'lte_dl_earfcn']);
    const currentBand=number(bandinfo[radio+'_band']);
    if(!same.length&&current===arfcn&&currentBand>0)same.push(prefix+currentBand);
    if(same.length===1)return {band:same[0],bandSource:'same-frequency'};
    const candidates=(radio==='nr'?nrRanges:lteRanges).filter(([,lo,hi])=>arfcn>=lo&&arfcn<=hi).map(([b])=>prefix+b);
    return {band:candidates.join('/')||'--',bandSource:candidates.length>1?'candidates':candidates.length?'arfcn':'unknown'};
  }
  function normalize(data){
    const dev=data.get_device_info?.device_info||{},lcd=data.get_lcd_info?.lcd_info||{};
    const ci=data.get_cellinfo||{},ca=data.get_cainfo||{},bi=data.get_bandinfo_fast||{};
    const rat=val(lcd.network_type,ci.serving_rat),nr=rat.includes('NR');
    const radioGroups=[['sa_info','nr'],['nsa_nr_info','nr'],['nsa_lte_info','lte'],['lte_info','lte'],['umts_info','umts'],['gsm_info','gsm']];
    const preferred=rat.includes('NSA')?['nsa_nr_info','nsa_lte_info']:nr?['sa_info']:/UMTS|WCDMA/.test(rat)?['umts_info']:/GSM/.test(rat)?['gsm_info']:['lte_info'];
    const groups=[...radioGroups.filter(([key])=>preferred.includes(key)),...radioGroups.filter(([key])=>!preferred.includes(key))];
    const cell=groups.map(([key])=>list(ci[key])[0]).find(Boolean)||{};
    const signalKeys=/UMTS|WCDMA/.test(rat)?['umts_info']:/GSM/.test(rat)?['gsm_info']:[nr?'nr_info':'lte_info',nr?'lte_info':'nr_info'];
    const sig=signalKeys.map(k=>first((data.get_signalstrength||{})[k])).find(v=>Object.keys(v).length)||{};
    const measurement=data.get_measinfo?.meas_info||data.get_measinfo||{},measMain=[nr?'nr_pcc_info':'lte_pcc_info',nr?'lte_pcc_info':'nr_pcc_info'].map(k=>first(measurement[k])).find(v=>Object.keys(v).length)||{};
    const metrics={rsrp:signal('rsrp',cell.rsrp,cell.serv_rsrp,cell.ssb_rsrp_avg,sig.rsrp,sig.serv_rsrp,sig.ssb_rsrp_avg,measMain.serv_rsrp,measMain.rsrp,measMain.ssb_rsrp_avg,lcd.rsrp),rsrq:signal('rsrq',cell.rsrq,cell.serv_rsrq,sig.rsrq,sig.serv_rsrq,measMain.serv_rsrq,measMain.rsrq,lcd.rsrq),sinr:signal('sinr',cell.sinr,cell.snr,cell.serv_snr,cell.ssb_snr_avg,sig.snr,sig.serv_snr,sig.ssb_snr_avg,sig.sinr,measMain.serv_snr,measMain.ssb_snr_avg,measMain.sinr,measMain.snr,lcd.sinr),rssi:signal('rssi',cell.rssi,cell.serv_rssi,sig.rssi,sig.serv_rssi,measMain.serv_rssi,measMain.rssi,lcd.rssi)};
    const carriers=[];
    for(const radio of nr?['nr','lte']:['lte','nr'])for(const role of ['pcc','scc']){
      const prefix=radio+'_'+role;
      for(const [index,c] of list(ca[prefix+'_info']).entries()){
        const get=key=>c[prefix+'_'+key]??c[key];
        const label=get('type')||radio+' '+role+(role==='scc'?' '+(index+1):'');
        const main=first(data.get_signalstrength?.[radio+'_info']);
        const cc=carrierInfo(main[radio+'_cc_info']||data.get_signalstrength?.[radio+'_cc_info'],radio,label,role==='pcc'?index:list(ca[radio+'_pcc_info']).length+index);
        const meas=carrierInfo((data.get_measinfo?.meas_info||data.get_measinfo)?.[prefix+'_info'],radio,label,index);
        const primary=role==='pcc'?main:{};
        const match=groups.filter(([,r])=>r===radio).flatMap(([key])=>list(ci[key])).find(v=>String(v.pci)===String(get('pci'))&&String(v.nr_arfcn??v.earfcn)===String(get('arfcn')))||{};
        const dlBandwidth=bandwidth(radio,get('dl_bandwidth')),ulConfigured=String(get('ul_configured'))!=='0'&&get('ul_configured')!==false,ulBandwidth=ulConfigured?bandwidth(radio,get('ul_bandwidth')):'未配置';
        carriers.push({rat:radio,dlBandwidth,ulBandwidth,ulConfigured,type:role.toUpperCase(),band:(radio==='nr'?'N':'B')+val(get('band')),pci:val(get('pci')),arfcn:val(get('arfcn')),bandwidth:'DL '+dlBandwidth+' / UL '+ulBandwidth,
          pucch:ulConfigured?signal('sinr',get('pucch_tx_pwr')):'--',pusch:ulConfigured?signal('sinr',get('pusch_tx_pwr')):'--',
          rsrp:signal('rsrp',get('rsrp'),meas.serv_rsrp,meas.rsrp,meas.trs_rsrp_avg,meas.ssb_rsrp_avg,cc.rsrp,carrierRx(cc,'rsrp',radio==='nr'?['trs_rsrp_rx','ssb_rsrp_rx','rsrp_rx']:['rsrp_rx']),match.rsrp,match.serv_rsrp,match.ssb_rsrp_avg,primary.rsrp,carriers.length?null:metrics.rsrp),
          rsrq:signal('rsrq',get('rsrq'),meas.serv_rsrq,meas.rsrq,cc.rsrq,match.rsrq,match.serv_rsrq,primary.rsrq,carriers.length?null:metrics.rsrq),
          sinr:signal('sinr',get('sinr'),get('snr'),meas.serv_snr,meas.sinr,meas.snr,meas.trs_snr_avg,meas.ssb_snr_avg,cc.sinr,cc.snr,carrierRx(cc,'sinr',radio==='nr'?['trs_snr_rx','ssb_snr_rx','snr_rx']:['snr_rx']),match.sinr,match.snr,match.serv_snr,match.ssb_snr_avg,primary.sinr,primary.snr,carriers.length?null:metrics.sinr),
          rssi:signal('rssi',get('rssi'),meas.serv_rssi,meas.rssi,cc.rssi,carrierRx(cc,'rssi',['rssi_rx']),match.rssi,primary.rssi,carriers.length?null:metrics.rssi)});
      }
    }
    const sumBandwidth=direction=>{const values=carriers.map(c=>direction==='ul'&&!c.ulConfigured?0:parseFloat(c[direction+'Bandwidth']));return values.length&&values.every(Number.isFinite)?values.reduce((a,b)=>a+b,0)+'MHz':'--';};
    const caSummary=carriers.length?'DL '+sumBandwidth('dl')+' / UL '+sumBandwidth('ul')+' · '+carriers.length+'CC':'--';
    const allCells=[];
    for(const [key,radio] of groups)for(const c of list(ci[key])){
      const arfcn=val(c.nr_arfcn,c.earfcn,c.uarfcn,c.arfcn),pci=val(c.pci),index=carriers.findIndex(v=>v.rat===radio&&v.pci===pci&&v.arfcn===arfcn);
      const band=index>=0?{band:carriers[index].band,bandSource:'reported'}:['nr','lte'].includes(radio)?cellBand(c,radio,carriers,bi):{band:val(c.band),bandSource:'reported'};
      allCells.push(Object.assign({pci,earfcn:arfcn,rsrp:signal('rsrp',c.rsrp,c.serv_rsrp,c.ssb_rsrp_avg),rsrq:signal('rsrq',c.rsrq,c.serv_rsrq),sinr:signal('sinr',c.sinr,c.snr,c.serv_snr,c.ssb_snr_avg),isServing:c===cell,isCarrier:index>=0||!carriers.length&&c===cell,carrierIndex:index,rat:radio},band));
    }
    const speed=rates(data.get_throughput||{},rat,lcd,data.get_mac_throughput||{}),clients=data.get_client_count||{};
    const board=data.system_board||{},system=data.system_info||{},memory=system.memory||{};
    const total=number(memory.total),free=number(memory.free),available=number(memory.available);
    // ServerBox's usedPercent excludes memory the kernel can reclaim.
    const usable=Number.isFinite(available)&&available>0?available:free;
    const ram=total>0&&Number.isFinite(usable)&&usable>=0&&usable<=total?((total-usable)/total*100).toFixed(1):'--';
    const ramWithCache=total>0&&Number.isFinite(free)&&free>=0&&free<=total?String(Math.floor((total-free)/total*100)):'--';
    const cpu=number(data.system_cpu),cpuUsage=Number.isFinite(cpu)&&cpu>=0&&cpu<=100?cpu.toFixed(1):'--';
    const cpuTemp=number(data.system_cpu_temp),uptime=number(system.uptime);
    const systemVersion=board.release?[board.release.distribution||'OpenWrt',board.release.version||''].filter(Boolean).join(' '):'--';
    const uptimeText=Number.isFinite(uptime)&&uptime>=0?[Math.floor(uptime/86400)?Math.floor(uptime/86400)+'d':'',Math.floor(uptime%86400/3600)?Math.floor(uptime%86400/3600)+'h':'',Math.floor(uptime%3600/60)+'m'].filter(Boolean).join(' '):'--';
    return Object.assign({deviceOnline:true,operator:val(dev.operator_name,dev.network_operator,dev.sim_operator_name,dev.sim_plmn),mode:rat==='OTHERS'?'未注册':NetworkMode.label(rat,carriers.map(c=>({rat:c.rat,dlMHz:c.dlBandwidth}))),deviceName:'SoftBank',deviceModel:'Air6',swVersion:systemVersion,air6FirmwareFull:val(board.release?.description,systemVersion),hwVersion:val(board.model,dev.modem_model,dev.model),air6Kernel:val(board.kernel),air6Baseband:val(dev.firmware,dev.revision),air6Module:val(dev.modem_model,dev.model),imei:val(dev.imei),imsi:val(dev.imsi),deviceSN:'--',deviceMac:'--',phoneNumber:'--',wanIp:val(lcd.wan_ip),ssid1:'--',ssid2:'--',cpuUsage,ramUsage:ram,air6Resources:{cpu:cpuUsage,cpuWindow:data.system_cpu_window,ram,ramWithCache,total:memory.total,free:memory.free,available:memory.available,temperature:cpuTemp},modemTemp:Number.isFinite(cpuTemp)&&cpuTemp>-40&&cpuTemp<150?cpuTemp.toFixed(1)+'°':'',uptimeText,onlineNum:val(clients.online_devices,clients.client_count,clients.count),clientDevices:[],carriers,allCells,bandTag:carriers.map(c=>c.band).join('+')||'--',caSummary,bandwidth:carriers[0]?.bandwidth||'--',pci:val(carriers[0]?.pci,cell.pci),pccArfcn:val(carriers[0]?.arfcn,cell.nr_arfcn,cell.earfcn),downSpeed:speed.down,upSpeed:speed.up,dlAmbrMbps:Number.isFinite(parseFloat(bi.net_ambr_dl))?String(parseFloat(bi.net_ambr_dl)/1000):'--',ulAmbrMbps:Number.isFinite(parseFloat(bi.net_ambr_ul))?String(parseFloat(bi.net_ambr_ul)/1000):'--',qci:val(data.get_sim_qci?.qci),superMode:'0',updateTime:new Date().toLocaleString('zh-CN'),air6Traffic:data.traffic_status||data.traffic_total||{},air6Daily:data.traffic_daily||[],air6Ota:data.ota_status||{}},metrics);
  }
  async function detect(options){
    try{
      const r=await options.fetch(options.host+STATIC,{method:'GET',timeoutMs:2500});
      if(!r.ok)return false;
      const text=await r.text();return text.includes('get_device_info')&&text.includes('admin/modem/cmodem/api')&&text.includes('get_bandinfo');
    }catch(_){return false;}
  }
  function create(options){
    // Values that change on a scale of minutes: refresh at most every 30 s.
    const SLOW_METHODS=['get_sim_qci','get_client_count','traffic_daily'],SLOW_MS=30000,slowCache=new Map();
    async function slow(method){
      const hit=slowCache.get(method);if(hit&&Date.now()-hit.at<SLOW_MS)return hit.value;
      const value=await optional(method);if(Object.keys(value).length||Array.isArray(value))slowCache.set(method,{value,at:Date.now()});return value;
    }
    let authenticated=false,rat='',staticData=null,staticAt=0,writeUntil=0,systemSession='',systemBoard=null,systemRetryAt=0,cpuSnapshot=null,cpuSnapshotAt=0,thermalPathsPromise=null,macAvailable=false,otaData=null,otaAt=0;
    const base=options.host;
    const inflightReads=new Map();let smsSnapshot=null,smsSnapshotAt=0,sessionFlight=null,csrfToken='';
    let responseRequestId;
    const emit=(name,data)=>options.evalJS?options.evalJS('window.'+name+' && window.'+name+'('+JSON.stringify(responseRequestId&&data&&typeof data==='object'?Object.assign({},data,{requestId:responseRequestId}):data).replace(/</g,'\\u003c')+');'):Promise.resolve();
    async function http(path,body){
      if(options.isActive&&!options.isActive())throw error('旧设备会话已取消','STALE');
      return options.fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Accept:'application/json, text/plain, */*',Referer:base+PAGE,'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},body,timeoutMs:body===undefined?22000:45000});
    }
    function call(method,payload,form,query){
      if(payload!==undefined)return callRaw(method,payload,form,query);
      const key=method+'|'+JSON.stringify(query||{});if(inflightReads.has(key))return inflightReads.get(key);
      const task=callRaw(method,payload,form,query).finally(()=>inflightReads.delete(key));inflightReads.set(key,task);return task;
    }
    async function callRaw(method,payload,form,query){
      if(!authenticated)throw error('Air6 会话未登录','SESSION_EXPIRED');
      const body=payload===undefined?undefined:form?Object.entries(payload).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&'):'payload='+encodeURIComponent(JSON.stringify(payload));
      const suffix=query?'&'+Object.entries(query).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&'):'';
      const r=await http(API+encodeURIComponent(method)+suffix,body);
      if([401,403,302,303].includes(r.status)){authenticated=false;throw error('Air6 登录已失效，请重新登录','SESSION_EXPIRED');}
      if(!r.ok)throw error('Air6 请求失败（HTTP '+r.status+'）',r.status===0?'NETWORK':undefined);
      const text=await r.text();let data;
      try{data=JSON.parse(text);}catch(_){if(/luci_password/.test(text)){authenticated=false;throw error('Air6 登录已失效','SESSION_EXPIRED');}throw error('Air6 返回了非 JSON 数据','PROTOCOL');}
      if(!data||typeof data!=='object')throw error('Air6 响应不完整','PROTOCOL');
      if([401,403].includes(Number(data.code))){authenticated=false;throw error('Air6 登录已失效，请重新登录','SESSION_EXPIRED');}
      if(data.code!==undefined&&Number(data.code)!==200)throw error('Air6 接口未完成：'+method+'（'+String(data.code)+'）');
      if(data.result==='error'||data.result==='failed'||data.success===false)throw error('Air6 操作失败：'+method);
      return data;
    }
    async function systemBatch(calls){
      if(options.isActive&&!options.isActive())throw error('旧设备会话已取消','STALE');
      const response=await options.fetch(base+'/ubus/',{method:'POST',headers:{'Content-Type':'application/json',Referer:base+PAGE},body:JSON.stringify(calls.map(c=>({jsonrpc:'2.0',id:c.id,method:'call',params:[systemSession,c.object,c.method,c.args||{}]}))),timeoutMs:6000});
      if(!response.ok)throw Error('System status unavailable');const data=JSON.parse(await response.text());if(!Array.isArray(data))throw Error('Invalid system status');return data;
    }
    async function ensureSystemSession(){
      if(systemSession)return;
      if(!sessionFlight)sessionFlight=(async()=>{
        const page=await http(PAGE);if(!page.ok)throw error('无法读取设备会话','NETWORK');const html=await page.text();
        systemSession=/"sessionid"\s*:\s*"([a-f0-9]{32})"/i.exec(html)?.[1]||'';
        csrfToken=/"token"\s*:\s*"([a-f0-9]{32})"/i.exec(html)?.[1]||'';
        if(!systemSession)throw error('设备会话已过期，请重新登录','SESSION_EXPIRED');
      })().finally(()=>{sessionFlight=null;});
      return sessionFlight;
    }
    async function cpuThermalPaths(){
      if(!thermalPathsPromise)thermalPathsPromise=(async()=>{
        const entries=(await rpc('file','list',{path:'/sys/class/thermal'})).entries||[],zones=entries.filter(e=>/^thermal_zone\d+$/.test(e.name)).slice(0,64);
        const types=await systemBatch(zones.map((z,i)=>({id:i+1,object:'file',method:'read',args:{path:'/sys/class/thermal/'+z.name+'/type'}})));
        const typed=zones.map((z,i)=>({path:'/sys/class/thermal/'+z.name+'/temp',type:String(types.find(r=>r.id===i+1)?.result?.[1]?.data||'').trim()})),cpu=typed.filter(v=>/cpu/i.test(v.type)),soc=typed.filter(v=>/^soc(?:$|[_-])/i.test(v.type));
        const paths=(cpu.length?cpu:soc).map(v=>v.path);return paths.length?paths:['/sys/class/thermal/thermal_zone0/temp'];
      })().catch(e=>{if(e.code==='STALE')throw e;return ['/sys/class/thermal/thermal_zone0/temp'];});
      return thermalPathsPromise;
    }
    async function systemData(fresh=false){
      if(Date.now()<systemRetryAt)return {system_board:systemBoard||{}};
      try{
        await ensureSystemSession();
        const calls=systemBoard&&!fresh?[{id:2,object:'system',method:'info'}]:[{id:1,object:'system',method:'board'},{id:2,object:'system',method:'info'}];
        calls.push({id:3,object:'file',method:'read',args:{path:'/proc/stat'}});
        (await cpuThermalPaths()).forEach((path,i)=>calls.push({id:10+i,object:'file',method:'read',args:{path}}));
        const parsed=await systemBatch(calls),result={},temps=[],hadCpuSnapshot=!!cpuSnapshot;
        for(const c of calls){const r=parsed.find(r=>r.id===c.id);if(c.id>=10){const t=r?.result?.[0]===0?number(r.result[1]?.data):NaN;if(Number.isFinite(t)&&t>-40000&&t<150000)temps.push(t/1000);continue;}if(c.id===3){const counters=r?.result?.[0]===0?cpuCounters(r.result[1]?.data):null;result.cpu=cpuPercent(cpuSnapshot,counters);result.window=cpuSnapshotAt?(Date.now()-cpuSnapshotAt)/1000:null;cpuSnapshot=counters;cpuSnapshotAt=Date.now();continue;}if(!r||r.result?.[0]!==0||!r.result[1])throw Error('System RPC rejected');result[c.method]=r.result[1];}
        if(result.board)systemBoard=result.board;
        if(!hadCpuSnapshot&&cpuSnapshot){
          await new Promise(resolve=>setTimeout(resolve,200));
          try{const counters=cpuCounters((await rpc('file','read',{path:'/proc/stat'})).data);result.cpu=cpuPercent(cpuSnapshot,counters);result.window=(Date.now()-cpuSnapshotAt)/1000;cpuSnapshot=counters;cpuSnapshotAt=Date.now();}catch(e){if(e.code==='STALE')throw e;cpuSnapshot=null;result.cpu=null;}
        }
        return {system_board:systemBoard||{},system_info:result.info||{},system_cpu:result.cpu,system_cpu_window:result.window,system_cpu_temp:temps.length?Math.max(...temps):null};
      }catch(e){if(e.code==='STALE')throw e;cpuSnapshot=null;systemSession='';systemRetryAt=Date.now()+30000;return {system_board:systemBoard||{}};}
    }
    async function rpc(object,method,args={}){
      if(!authenticated)throw error('Air6 会话未登录','SESSION_EXPIRED');
      if(options.isActive&&!options.isActive())throw error('旧设备会话已取消','STALE');
      await ensureSystemSession();
      const r=await options.fetch(base+'/ubus/',{method:'POST',headers:{'Content-Type':'application/json',Referer:base+PAGE},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'call',params:[systemSession,object,method,args]}),timeoutMs:15000});
      if([401,403].includes(r.status)){systemSession='';authenticated=false;throw error('Air6 登录已失效','SESSION_EXPIRED');}
      if(!r.ok)throw error('OpenWrt 请求失败（HTTP '+r.status+'）',r.status===0?'NETWORK':undefined);
      let data;try{data=JSON.parse(await r.text());}catch(_){throw error('OpenWrt 返回格式不正确');}
      if(data.id!==1||data.error||!Array.isArray(data.result)||data.result[0]!==0)throw error('OpenWrt '+object+'.'+method+' 未完成，请检查账号权限');
      return data.result[1]||{};
    }
    async function otaStatus(fresh=false){
      if(!fresh&&otaData&&Date.now()-otaAt<60000)return otaData;
      try{const data=await rpc('luci.air6-ota','status');if(data?.ok===false)throw error(data.message||data.error||'在线升级状态读取失败');if(data&&typeof data==='object'){otaData=data;otaAt=Date.now();return data;}}catch(e){if(fresh||e.code==='STALE'||e.code==='SESSION_EXPIRED')throw e;}
      return otaData||{};
    }
    async function otaAction(message){
      const kind=String(message.kind||'status');
      try{
        let data;
        if(kind==='status')data=await otaStatus(message.fresh!==false);
        else if(kind==='check')data=await rpc('luci.air6-ota','check');
        else if(kind==='download')data=await rpc('luci.air6-ota','download');
        else if(kind==='select'){
          const sha256=String(message.sha256||'');if(!/^[a-f0-9]{64}$/i.test(sha256))throw error('固件校验值无效');data=await rpc('luci.air6-ota','select',{sha256});
        }else if(kind==='upgrade'){
          const sha256=String(message.sha256||'');if(!/^[a-f0-9]{64}$/i.test(sha256))throw error('固件校验值无效');
          // Firmware writes must never be retried: the first request may have
          // started flashing even when its response is lost.
          data=await rpc('luci.air6-ota','upgrade',{keep:message.keep!==false,sha256,rollback:message.rollback===true});
        }else throw error('未知升级操作');
        if(data?.ok===false)throw error(data.error||data.message||'升级操作失败');
        otaData=kind==='status'?data:null;otaAt=kind==='status'?Date.now():0;
        if(kind!=='upgrade'&&kind!=='status')data=await otaStatus(true);
        await emit('air6OtaData',{ok:true,kind,data});
      }catch(e){await emit('air6OtaData',{ok:false,kind,message:e.message});if(e.code)throw e;}
    }
    async function wireless(){const result=await rpc('uci','get',{config:'wireless'});if(!result.values||typeof result.values!=='object')throw error('无线配置结构不完整');return result.values;}
    function wifiView(values){
      return Object.entries(values).filter(([,v])=>v['.type']==='wifi-iface'&&v.mode==='ap').map(([section,v])=>{
        const radio=values[v.device]||{},band=String(radio.band||radio.hwmode||v.device);
        return {section,band,ssid:String(v.ssid||''),enabled:String(v.disabled||'0')!=='1',hidden:String(v.hidden||'0')==='1',radioDisabled:String(radio.disabled||'0')==='1',encryption:String(v.encryption||'none'),canSetPassword:/^(psk|sae)/.test(String(v.encryption||''))};
      });
    }
    async function wifiAction(message){
      if(message.action==='air6WifiLoad'){
        try{return await emit('air6WifiData',{ok:true,networks:wifiView(await wireless())});}catch(e){await emit('air6WifiData',{ok:false,message:e.message});if(e.code)throw e;return;}
      }
      let submitted=false,applyStarted=false;
      try{
        const values=await wireless(),section=String(message.section||''),before=values[section],patch=message.patch||{};
        if(!before||before['.type']!=='wifi-iface'||before.mode!=='ap')throw error('无线网络不存在，请刷新后重试');
        if(Object.keys(patch).some(k=>!['ssid','enabled','hidden','password'].includes(k)))throw error('不支持的无线设置');
        const change={};
        if(patch.ssid!==undefined){const ssid=String(patch.ssid);let length;try{length=unescape(encodeURIComponent(ssid)).length;}catch(_){throw error('Wi-Fi 名称包含无效字符');}if(length<1||length>32||/[\x00-\x1f\x7f]/.test(ssid))throw error('Wi-Fi 名称须为 1–32 字节且不能含控制字符');change.ssid=ssid;}
        for(const [key,uciKey] of [['enabled','disabled'],['hidden','hidden']])if(patch[key]!==undefined){if(typeof patch[key]!=='boolean')throw error('无线开关参数无效');change[uciKey]=(key==='enabled'?!patch[key]:patch[key])?'1':'0';}
        if(patch.password){const key=String(patch.password),encryption=String(before.encryption||'');if(!/^(psk|sae)/.test(encryption))throw error('此加密方式不支持修改密码');if(!(/^[\x20-\x7e]{8,63}$/.test(key)||/^psk/.test(encryption)&&/^[a-f0-9]{64}$/i.test(key)))throw error('Wi-Fi 密码须为 8–63 位 ASCII 字符');change.key=key;}
        for(const key of Object.keys(change))if(String(before[key]??(key==='disabled'||key==='hidden'?'0':''))===change[key])delete change[key];
        if(!Object.keys(change).length)return emit('air6WifiResult',{ok:true,section,networks:wifiView(values),message:'设置未改变'});
        const pending=await rpc('uci','changes');if(Object.values(pending.changes||{}).some(v=>Array.isArray(v)?v.length:Object.keys(v||{}).length))throw error('设备管理页有未应用的配置，请先处理后再保存 Wi-Fi');
        submitted=true;await rpc('uci','set',{config:'wireless',section,values:change});
        // LuCI uci.apply commits and reloads staged changes. Do not replay on timeout.
        applyStarted=true;await rpc('uci','apply',{rollback:false,timeout:30});
        const afterValues=await wireless(),after=afterValues[section]||{},verified=Object.entries(change).every(([k,v])=>String(after[k]??'')===v);
        await emit('air6WifiResult',{ok:verified,section,networks:verified?wifiView(afterValues):undefined,pending:!verified,message:verified?'Wi-Fi 设置已应用并回读确认':'已提交，请重新连接 Wi-Fi 后刷新确认'});
      }catch(e){await emit('air6WifiResult',{ok:false,pending:submitted,message:submitted?(applyStarted?'Wi-Fi 应用结果未确认；请重连后刷新，勿连续保存':'Wi-Fi 暂存结果未确认；请在管理页检查未应用配置，勿连续保存'):e.message});if(e.code)throw e;}
    }
    const forwardFields=['forward_enable','forward_number','delete_rule','cleanup_threshold','cleanup_keep','serverchan_enable','serverchan_sendkey','email_enable','email_smtp_server','email_smtp_port','email_smtp_security','email_smtp_user','email_smtp_password','email_from','email_to','email_subject'];
    const enabled=value=>value===true||value===1||value==='1'||value==='true';
    function forwardConfig(raw){
      const config=Object.assign({},raw);
      if(!config.delete_rule)config.delete_rule=enabled(config.auto_delete_forwarded)?'forward_success_oldest':enabled(config.archive_cleanup_enable)?'archive_local_oldest':enabled(config.cleanup_enable)?'low_space_forwarded_oldest':'none';
      return config;
    }
    const usbNeedsReboot=data=>enabled(data?.reboot_required)||!!(data?.current_mode&&data?.mode&&data.current_mode!==data.mode);
    const storageMode=value=>{const v=value&&typeof value==='object'?value.name??value.storage:value;return ({0:'SIM',1:'ME',4:'MT'})[v]||String(v||'').toUpperCase();};
    function cronRule(value){
      const rule=String(value||'').trim().replace(/\s+/g,' '),parts=rule.split(' '),limits=[[0,59],[0,23],[1,31],[1,12],[0,7]];
      if(rule.length>120||parts.length!==5)throw error('Cron 需要填写分、时、日、月、星期五项');
      for(let i=0;i<parts.length;i++)for(const term of parts[i].split(',')){
        const m=term.match(/^(\*|\d+(?:-\d+)?)(?:\/(\d+))?$/),[min,max]=limits[i];
        if(!m||m[2]&&Number(m[2])<1)throw error('Cron 表达式无效');
        if(m[1]!=='*'){const range=m[1].split('-').map(Number);if(range.some(n=>n<min||n>max)||range.length===2&&range[0]>range[1])throw error('Cron 数值超出范围');}
      }
      return rule;
    }
    const taskId=value=>{const id=String(value||'');if(!/^[a-z0-9_.:-]{1,128}$/i.test(id))throw error('任务标识无效，请刷新');return id;};
    async function automationToken(){
      await ensureSystemSession();if(!csrfToken)throw error('设备会话已过期，请重新登录');return csrfToken;
    }
    async function scheduledTask(input){
      const task={name:String(input?.name||'').trim(),enabled:input?.enabled,cron:cronRule(input?.cron),action:String(input?.action||''),params:{}};
      if(!task.name||task.name.length>40)throw error('任务名称请填写 1–40 个字');
      if(typeof task.enabled!=='boolean')throw error('请选择是否启用任务');
      if(input.id)task.id=taskId(input.id);
      const p=input.params||{};
      if(task.action==='rat'){
        if(!['1','3','15','19','21'].includes(String(p.rat)))throw error('请选择网络制式');task.params.rat=String(p.rat);
      }else if(task.action==='unlock'){
        if(!['all','band','pci'].includes(p.target))throw error('请选择解除范围');task.params.target=p.target;
      }else if(task.action==='pci'){
        const nr=p.rat==='nr',arfcn=Number(p.arfcn),pci=Number(p.pci);
        if(!['nr','lte'].includes(p.rat)||!String(p.arfcn??'').trim()||!String(p.pci??'').trim()||!Number.isInteger(arfcn)||arfcn<1||arfcn>(nr?3279165:262143)||!Number.isInteger(pci)||pci<0||pci>(nr?1007:503))throw error('请填写有效的频点和 PCI');
        task.params={mode:'lock',rat:p.rat,arfcn,pci};
      }else if(task.action==='band'){
        const bands=await call('get_bandmode_str');
        for(const radio of ['lte','nr']){
          const value=String(p[radio]||'').trim();task.params[radio]=value?bandList(value):'';
          if(value){const supported=bandList(bands['support_'+radio+'_band']).split('/');if(task.params[radio].split('/').some(b=>!supported.includes(b)))throw error('包含设备不支持的 '+radio.toUpperCase()+' 频段');}
        }
        if(!task.params.lte&&!task.params.nr)throw error('请至少选择一个 4G 或 5G 频段');
        task.params.umts=String(bands.current_umts_band||'');
      }else throw error('请选择任务操作');
      return task;
    }
    async function automationAction(message){
      const kind=message.kind,op=String(message.op||''),preview=message.action==='air6TaskPreview';let submitted=false;
      try{
        if(preview){const data=await call('scheduler_preview',undefined,false,{cron:cronRule(message.cron)});return emit('air6TaskPreviewData',{ok:true,data});}
        let method,payload;
        if(kind==='failover'){
          const target=String(message.target),timeout=Number(message.timeout);
          if(!['band','pci'].includes(target)||typeof message.enabled!=='boolean'||![30,60,90,120,180,300,600].includes(timeout))throw error('自动回退参数无效');
          method='failover_save';payload={kind:target,enabled:message.enabled,timeout};
        }else if(kind==='scheduler'){
          if(op==='save'){payload=await scheduledTask(message.task);await call('scheduler_preview',undefined,false,{cron:payload.cron});method='scheduler_save';}
          else if(op==='toggle'){if(typeof message.enabled!=='boolean')throw error('任务状态无效');payload={id:taskId(message.id),enabled:message.enabled};method='scheduler_toggle';}
          else if(op==='delete'){payload={id:taskId(message.id)};method='scheduler_delete';}
          else throw error('任务操作无效');
        }else throw error('未知设置');
        const token=await automationToken();submitted=true;
        // Do not retry: the device may have persisted the plan before disconnecting.
        const reply=await call(method,{token,payload:JSON.stringify(payload)},true);
        const after=await call(kind==='scheduler'?'scheduler_list':'failover_status');let ok=false;
        if(kind==='failover'){const state=after.kinds?.[payload.kind];ok=!!state&&enabled(state.enabled)===payload.enabled&&Number(state.timeout)===payload.timeout;}
        else if(Array.isArray(after.tasks)){
          if(op==='delete')ok=!after.tasks.some(t=>String(t.id)===payload.id);
          else if(op==='toggle')ok=after.tasks.some(t=>String(t.id)===payload.id&&enabled(t.enabled)===payload.enabled);
          else{const id=payload.id||reply.task?.id||reply.id;ok=after.tasks.some(t=>(!id||String(t.id)===String(id))&&t.name===payload.name&&String(t.cron).trim().replace(/\s+/g,' ')===payload.cron&&t.action===payload.action&&enabled(t.enabled)===payload.enabled&&Object.entries(payload.params).every(([k,v])=>String(t.params?.[k]??'')===String(v)));}
        }
        return emit('air6ExtraData',{ok,kind,operation:op||'save',target:message.target,pending:!ok,[kind]:after,message:ok?(op==='delete'?'任务已删除':op==='toggle'?(payload.enabled?'任务已启用':'任务已暂停'):'已保存'):'已提交，请刷新确认后再操作'});
      }catch(e){await emit(preview?'air6TaskPreviewData':'air6ExtraData',{ok:false,kind,operation:op||'save',target:message.target,pending:submitted,message:submitted?'保存结果未确认，请刷新检查，勿重复提交':e.message});if(['STALE','SESSION_EXPIRED','AUTH_REJECTED'].includes(e.code))throw e;}
    }
    async function extraSettings(message){
      const kind=message.kind;let submitted=false;
      try{
        if(message.action==='air6ExtraRead'){
          if(['scheduler','failover'].includes(kind)){
            const data=await call(kind==='scheduler'?'scheduler_list':'failover_status');
            if(kind==='scheduler'?!Array.isArray(data.tasks):!data.kinds||!data.kinds.band||!data.kinds.pci)throw error('设备返回的'+(kind==='scheduler'?'任务':'回退')+'数据不完整');
            const bands=kind==='scheduler'&&message.withOptions?await optional('get_bandmode_str'):undefined;
            return emit('air6ExtraData',{ok:true,kind,[kind]:data,bands,message:kind==='scheduler'?'已读取定时任务':'已读取自动回退状态'});
          }
          if(kind==='smsconfig'){const config=forwardConfig(await call('get_sms_forward')),sms=await call('get_sms_messages');return emit('air6ExtraData',{ok:true,kind,config:Object.fromEntries(forwardFields.map(k=>[k,config[k]])),storage:sms.sms_storage||{},storageMode:storageMode(sms.sms_storage_mode)});}
          if(kind==='rf')return emit('air6ExtraData',{ok:true,kind,message:'设备网页不提供射频设置回读；下方为待提交参数'});
          throw error('未知设置');
        }
        if(kind==='rf'){
          const rat=String(message.rat),enable=String(message.enable),power=Number(message.power);
          if(!['nr','lte'].includes(rat)||!['0','1'].includes(enable)||!String(message.power??'').trim()||!Number.isFinite(power)||power<0||power>29)throw error('射频参数无效（功率范围 0–29 dBm）');
          const bands=rat==='nr'?'1,3,5,8,28,41,77,78,79':'1,3,5,8,28,41';submitted=true;await call('set_rf_power',{rat,bands,power:String(power),enable},true);
          return emit('air6ExtraData',{ok:true,kind,message:'射频功率命令已提交；此固件无设置回读接口'});
        }
        if(kind==='storage'){
          const mode=storageMode(message.mode);if(!['SIM','ME','MT'].includes(mode))throw error('短信存储模式无效');submitted=true;await call('set_sms_storage_mode',{mode});
          const after=await call('get_sms_messages'),ok=storageMode(after.sms_storage_mode)===mode;return emit('air6ExtraData',{ok,kind:'smsconfig',storage:after.sms_storage||{},storageMode:storageMode(after.sms_storage_mode),message:ok?'短信存储位置已回读确认':'设置已提交，请刷新确认存储位置'});
        }
        if(kind==='smsconfig'){
          const before=forwardConfig(await call('get_sms_forward')),patch=message.patch||{};
          if(Object.keys(patch).some(k=>!forwardFields.includes(k)))throw error('不支持的短信设置字段');
          const defaults={delete_rule:'none',cleanup_threshold:90,cleanup_keep:20,email_smtp_port:587,email_smtp_security:'starttls',email_subject:'CModem SMS'};
          const payload=Object.fromEntries(forwardFields.map(k=>[k,before[k]??defaults[k]??'']));Object.assign(payload,patch);
          if(!Object.keys(patch).length)return emit('air6ExtraData',{ok:true,kind,config:payload,message:'设置未改变'});
          for(const key of ['forward_enable','serverchan_enable','email_enable'])payload[key]=enabled(payload[key]);
          if(!['none','forward_success_oldest','low_space_forwarded_oldest','archive_local_oldest'].includes(payload.delete_rule))throw error('自动清理规则无效');
          for(const [key,min,max] of [['cleanup_threshold',50,100],['cleanup_keep',0,500],['email_smtp_port',1,65535]]){const n=Number(payload[key]);if(!Number.isInteger(n)||n<min||n>max)throw error('短信设置数值超出范围');payload[key]=n;}
          if(payload.forward_enable&&!/^\+?\d{3,20}$/.test(String(payload.forward_number||'')))throw error('请填写转发号码');
          if(payload.serverchan_enable&&!payload.serverchan_sendkey)throw error('请填写 Server 酱 SendKey');
          if(payload.email_enable&&(!payload.email_smtp_server||!payload.email_smtp_user||!payload.email_smtp_password||!payload.email_to))throw error('请填写完整 SMTP 设置');
          if(!['none','ssl','starttls'].includes(payload.email_smtp_security))throw error('SMTP 安全模式无效');
          payload.auto_delete_forwarded=payload.delete_rule==='forward_success_oldest';payload.cleanup_enable=['low_space_forwarded_oldest','archive_local_oldest'].includes(payload.delete_rule);payload.archive_cleanup_enable=payload.delete_rule==='archive_local_oldest';
          submitted=true;await call('set_sms_forward',payload);const after=forwardConfig(await call('get_sms_forward'));
          const ok=Object.keys(patch).every(k=>k.endsWith('_enable')?enabled(after[k])===payload[k]:String(after[k])===String(payload[k]));return emit('air6ExtraData',{ok,kind,config:Object.fromEntries(forwardFields.map(k=>[k,after[k]])),message:ok?'短信设置已回读确认':'设置已提交，回读未完全一致，请刷新核对'});
        }
        throw error('未知设置');
      }catch(e){await emit('air6ExtraData',{ok:false,kind:kind==='storage'?'smsconfig':kind,pending:submitted,message:submitted?'设置已提交但结果未确认，请刷新核对，勿连续重试':e.message});if(e.code)throw e;}
    }
    async function advanced(message){
      const kind=String(message.kind||''),methods={cfun:'get_cfun',usb:'get_usb_mode',imei:'get_imei'};
      let submitted=false;
      try{
        if(!methods[kind])throw error('未知功能');
        if(message.action==='air6AdvancedRead'){
          const data=await call(methods[kind]);return emit('air6AdvancedData',{ok:true,kind,data,rebootRequired:kind==='usb'&&usbNeedsReboot(data)});
        }
        const value=String(message.value??'').trim();
        if(kind==='cfun'&&!['0','1','4'].includes(value))throw error('请选择全功能、飞行模式或关闭射频');
        if(kind==='usb'&&!['rc','ep'].includes(value))throw error('请选择 RC 或 EP');
        if(kind==='imei'&&!/^\d{15}$/.test(value))throw error('IMEI 必须为 15 位数字');
        const before=await call(methods[kind]);
        if(kind==='usb'&&before.supported!==true)throw error('设备不支持 USB 功能模式切换');
        const field=kind==='imei'?'imei':'mode';
        if(String(before[field]??'')===value){const reboot=kind==='usb'&&usbNeedsReboot(before);return emit('air6AdvancedData',{ok:true,kind,data:before,rebootRequired:reboot,message:reboot?'已保存此模式，仍需重启设备后生效':'设置未改变'});}
        const payload={[field]:value};
        if(kind==='usb'){
          const page=await http(PAGE);if(!page.ok)throw error('无法取得 USB 设置令牌');
          payload.token=/"token"\s*:\s*"([a-f0-9]{32})"/i.exec(await page.text())?.[1]||'';
          if(!payload.token)throw error('设备没有返回 USB 设置令牌，请重新登录');
        }
        submitted=true;const reply=await call('set_'+(kind==='usb'?'usb_mode':kind),payload,true);
        let after;try{after=await call(methods[kind]);}catch(_){ }
        const verified=after&&String(after[field]??'')===value;
        if(kind==='imei')staticData=null;
        const reboot=kind==='usb'&&(usbNeedsReboot(reply)||usbNeedsReboot(after));
        return emit('air6AdvancedData',{ok:!!verified,pending:!verified,kind,data:after||before,rebootRequired:!!reboot,message:verified?(reboot?'已保存并回读，重启设备后生效':'已回读确认设置生效'):'命令已提交，未完成回读；请稍后刷新确认'});
      }catch(e){await emit('air6AdvancedData',{ok:false,kind,pending:submitted,message:submitted?'命令已提交但结果未确认，请刷新核对，不要连续提交':e.message});if(e.code)throw e;}
    }
    async function optional(method){try{return await call(method);}catch(e){if(e.code)throw e;return {};}}
    async function probe(){const data=await call('get_device_info');if(!data.device_info||typeof data.device_info!=='object')throw error('Air6 设备信息结构不匹配','PROTOCOL');return data;}
    function controlValue(key,value){
      const has=(name)=>value[name]!==undefined&&value[name]!==null;
      if(key==='bands'&&(!['lte','nr'].some(r=>has('current_'+r+'_band'))||!['lte','nr'].some(r=>has('support_'+r+'_band'))))throw error('设备未返回频段配置');
      if(key==='rat'&&!String(value.rat??'').trim())throw error('设备未返回网络模式');
      if(key==='single'&&(!value.cell_lock_info||!Number.isFinite(number(value.cell_lock_info.lock_mode))))throw error('设备未返回单小区锁定状态');
      if(key==='multiple'&&!['lte','nr'].every(r=>Number.isFinite(number(value[r+'_cell_count']))&&Array.isArray(value[r+'_cell_list'])))throw error('设备未返回多小区锁定状态');
      return key==='rat'?String(value.rat):key==='single'?value.cell_lock_info:value;
    }
    async function controls(section){
      if(section==='rat'){const rat=controlValue('rat',await call('get_rat'));return emit('air6ControlData',{section,rat});}
      if(section==='band'){const bands=controlValue('bands',await call('get_bandmode_str')),rat=controlValue('rat',await call('get_rat'));return emit('air6ControlData',{section,bands,rat});}
      // Same independent reads as the device lock page; writes remain serial.
      const [bands,mode,single,multiple,cellinfo,cainfo]=await Promise.all([call('get_bandmode_str'),call('get_rat'),call('get_celllock'),call('get_celllock_list'),optional('get_cellinfo'),optional('get_cainfo')]);
      for(const [key,value]of [['bands',bands],['rat',mode],['single',single],['multiple',multiple]])controlValue(key,value);
      const cells=normalize({get_cellinfo:cellinfo,get_cainfo:cainfo}).allCells;
      const data={bands,rat:String(mode.rat||''),single:single.cell_lock_info||{},multiple,cells};await emit('air6ControlData',data);return data;
    }
    async function controlSummary(silent=false){
      const data={errors:{}};if(!silent)await emit('air6ControlSummary',{loading:true});
      const results=await Promise.allSettled([['bands','get_bandmode_str'],['rat','get_rat'],['single','get_celllock'],['multiple','get_celllock_list'],['cfun','get_cfun'],['usb','get_usb_mode'],['imei','get_imei']].map(async([key,method])=>{
        try{data[key]=controlValue(key,await call(method));}
        catch(e){data.errors[key]=e.message;if(!silent)await emit('air6ControlSummary',data);throw e;}
        if(!silent)await emit('air6ControlSummary',data);
      }));
      await emit('air6ControlSummary',data);
      const failure=results.find(result=>result.status==='rejected'&&result.reason.code);if(failure)throw failure.reason;
    }
    async function globalViews(){
      const views={};
      const jobs={
        scheduler:async()=>({ok:true,kind:'scheduler',scheduler:await call('scheduler_list')}),
        failover:async()=>({ok:true,kind:'failover',failover:await call('failover_status')}),
        wifi:async()=>({ok:true,networks:wifiView(await wireless())}),
        clients:async()=>({ok:true,rows:leaseDevices(await rpc('luci-rpc','getDHCPLeases'))}),
        wan:async()=>({ok:true,items:list((await rpc('network.interface','dump')).interface).filter(v=>v.interface==='wan'||v.interface==='wan6')}),
        smsconfig:async()=>{const results=await Promise.allSettled([call('get_sms_forward'),call('get_sms_messages')]);const failure=results.find(r=>r.status==='rejected');if(failure)throw failure.reason;const config=forwardConfig(results[0].value),smsData=results[1].value;return {ok:true,kind:'smsconfig',config:Object.fromEntries(forwardFields.map(k=>[k,config[k]])),storage:smsData.sms_storage||{},storageMode:storageMode(smsData.sms_storage_mode)};}
      };
      const results=await Promise.allSettled(Object.entries(jobs).map(async([kind,read])=>{try{views[kind]=await read();}catch(e){views[kind]={ok:false,kind,message:e.message};throw e;}}));
      await emit('air6GlobalSnapshot',views);
      const failure=results.find(r=>r.status==='rejected'&&['STALE','SESSION_EXPIRED','AUTH_REJECTED'].includes(r.reason.code));if(failure)throw failure.reason;
    }
    const bandList=text=>{
      const values=String(text||'').trim().replace(/[BN]/gi,'').split(/[\s,\/]+/).filter(Boolean);
      if(!values.length||values.some(v=>!/^\d+$/.test(v)||Number(v)<1||Number(v)>1024))throw error('请填写有效频段，例如 1/3/41');
      return [...new Set(values.map(Number))].sort((a,b)=>a-b).join('/');
    };
    async function write(message){
      if(Date.now()<writeUntil)throw error('模组正在恢复，请约 '+Math.ceil((writeUntil-Date.now())/1000)+' 秒后读取配置确认');
      let check;
      if(message.action==='air6SetBands'){
        const before=await call('get_bandmode_str'),payload={};
        for(const radio of ['lte','nr']){
          const requested=message.reset?before['support_'+radio+'_band']:message[radio];
          if(!String(requested||'').trim()&&!message.reset)continue;
          const value=bandList(requested);
          const supported=bandList(before['support_'+radio+'_band']).split('/');
          if(value.split('/').some(v=>!supported.includes(v)))throw error('包含设备不支持的 '+radio.toUpperCase()+' 频段');
          payload['set_'+radio+'_band']=value;
        }
        if(!payload.set_lte_band&&!payload.set_nr_band)throw error('请至少选择一个 4G 或 5G 频段');
        if(['lte','nr'].every(r=>!payload['set_'+r+'_band']||bandList(before['current_'+r+'_band'])===payload['set_'+r+'_band']))return emit('air6WriteResult',{ok:true,message:'频段未改变，无需重新搜网'});
        if(before.current_umts_band)payload.set_umts_band=before.current_umts_band;
        writeUntil=Date.now()+60000;await call('set_bandmode_str',payload);
        check=async()=>{const after=await call('get_bandmode_str');return ['lte','nr'].every(r=>!payload['set_'+r+'_band']||bandList(after['current_'+r+'_band'])===payload['set_'+r+'_band']);};
      }else if(message.action==='air6SetRat'){
        if(!['1','3','15','19','21'].includes(String(message.rat)))throw error('不支持的网络模式');
        if(String((await call('get_rat')).rat)===String(message.rat))return emit('air6WriteResult',{ok:true,message:'网络模式未改变，无需重新搜网'});
        writeUntil=Date.now()+10000;await call('set_rat',{rat:String(message.rat)},true);
        check=async()=>String((await call('get_rat')).rat)===String(message.rat);
      }else if(message.action==='air6SetCell'){
        const arfcn=Number(message.arfcn),pci=Number(message.pci),nr=message.rat==='nr';
        if(!['nr','lte'].includes(message.rat)||!String(message.arfcn||'').trim()||!String(message.pci??'').trim()||!Number.isInteger(arfcn)||arfcn<1||arfcn>(nr?3279165:262143)||!Number.isInteger(pci)||pci<0||pci>(nr?1007:503))throw error('请填写有效的频点和 PCI');
        writeUntil=Date.now()+10000;await call('set_celllock',{act:nr?11:7,arfcn,pci,lock_mode:3});
        check=async()=>{const v=(await call('get_celllock')).cell_lock_info||{};return Number(v.act)===(nr?11:7)&&Number(v.arfcn)===arfcn&&Number(v.pci)===pci&&Number(v.lock_mode)===3;};
      }else if(message.action==='air6SetCells'){
        const rows=String(message.cells||'').trim().split(/\n+/).filter(Boolean);if(!rows.length||rows.length>20)throw error('请填写 1–20 个小区，每行 LTE/NR,频点,PCI');
        const payload={lte_cell_list:[],nr_cell_list:[]};
        for(const row of rows){const parts=row.trim().split(/[\s,]+/);if(parts.length!==3||!['LTE','NR'].includes(parts[0].toUpperCase()))throw error('每行格式为 LTE/NR,频点,PCI');const nr=parts[0].toUpperCase()==='NR',arfcn=Number(parts[1]),pci=Number(parts[2]);if(!Number.isInteger(arfcn)||arfcn<1||arfcn>(nr?3279165:262143)||!Number.isInteger(pci)||pci<0||pci>(nr?1007:503))throw error('小区频点或 PCI 无效');payload[nr?'nr_cell_list':'lte_cell_list'].push(nr?{nr_arfcn:arfcn,pci}:{earfcn:arfcn,pci});}
        for(const radio of ['lte','nr'])payload[radio+'_cell_list']=payload[radio+'_cell_list'].filter((c,i,a)=>a.findIndex(v=>v.pci===c.pci&&(v.nr_arfcn??v.earfcn)===(c.nr_arfcn??c.earfcn))===i);
        payload.lte_cell_count=payload.lte_cell_list.length;payload.nr_cell_count=payload.nr_cell_list.length;writeUntil=Date.now()+10000;await call('set_celllock_list',payload);
        const keys=list=>list.map(c=>String(c.nr_arfcn??c.earfcn)+':'+String(c.pci)).sort().join(',');
        check=async()=>{const after=await call('get_celllock_list');return ['lte','nr'].every(r=>Array.isArray(after[r+'_cell_list'])&&keys(after[r+'_cell_list'])===keys(payload[r+'_cell_list']));};
      }else if(message.action==='air6UnlockCell'){
        writeUntil=Date.now()+10000;await call('set_celllock_list',{lte_cell_count:0,nr_cell_count:0,lte_cell_list:[],nr_cell_list:[]});
        await call('set_celllock',{act:2,arfcn:0,pci:0,lock_mode:0});
        check=async()=>{const v=(await call('get_celllock')).cell_lock_info||{},m=await call('get_celllock_list');return Number(v.lock_mode)===0&&Number(m.lte_cell_count)===0&&Number(m.nr_cell_count)===0;};
      }else throw error('Air6 尚未适配此操作');
      // Never retry a write: the modem may have applied it before disconnecting.
      let confirmed=false;try{confirmed=await check();}catch(_){ }
      await emit('air6WriteResult',{ok:confirmed,pending:!confirmed,message:confirmed?'已回读确认设置生效':'已提交，模组可能正在重新搜网；请稍后点击读取配置确认'});
    }
    async function sms(message){
      const type={smsSend:'send',smsDelete:'delete',smsRead:'read'}[message.action];
      const readStates={};
      try{
        if(message.action==='smsSend'){
          const number=String(message.receiver||'').trim(),text=String(message.msg||'');
          if(!/^\+?[0-9]{3,20}$/.test(number)||!text||text.length>1000)throw error('短信号码或内容无效');
          smsSnapshot=null;const result=await call('send_sms_text',{number,text},true);await emit('air6SmsResult',{type:'send',ok:true,message:'短信已发送'});return;
        }
        const useSnapshot=['smsList','smsGet'].includes(message.action)&&smsSnapshot&&Date.now()-smsSnapshotAt<2000;
        const data=useSnapshot?smsSnapshot:await call('get_sms_messages');
        if(!useSnapshot){smsSnapshot=data;smsSnapshotAt=Date.now();}
        if(!data.messages||typeof data.messages!=='object')throw error('Air6 短信响应不完整');
        const items=Array.isArray(data.messages)?data.messages:Object.values(data.messages),recv=[],send=[],refs=new Map();
        if(Number(data.pdu_count)>0&&!items.length)throw error('Air6 短信尚未解码，请稍后刷新');
        for(const m of items){
          if(!m||typeof m!=='object')continue;
          const native=nativeSmsPdu(m.pdu),direction=m.type||(m.sender?'in':native?(native.outgoing?'out':'in'):'out'),outgoing=['sent','out','submitted','sending'].includes(String(direction).toLowerCase());
          const ids=[m.message_indexes,m.indexes,m.index,m.message_index].flatMap(v=>Array.isArray(v)?v:String(v??'').split(',')).filter(v=>/^\d+$/.test(String(v)));
          const number=m.number||m.sender||m.receiver||native?.number||'',time=m.time||native?.time||'',content=m.content||m.text||native?.text||'';
          const key=ids.length?[...new Set(ids)].sort((a,b)=>Number(a)-Number(b)).join('_'):encodeURIComponent([number,time,content].join('|'));
          const common={Index:(outgoing?'s':'r')+key,Msg:String(content)};refs.set(common.Index,{indexes:[...new Set(ids.map(String))],readKey:String(m.read_key||'')});
          if(outgoing)send.push(Object.assign(common,{Receiver:String(number),Sendtime:smsTime(time)}));
          else recv.push(Object.assign(common,{Sender:String(number),Recvtime:smsTime(time),Isopened:/^(1|true|read|yes)$/i.test(String(m.is_read??m.isRead??m.read_status))?'1':'0'}));
        }
        for(const row of recv)readStates[row.Index]=row.Isopened;
        if(type){
          const selected=[...(message.recv||[]),...(type==='delete'?message.send||[]:[])].map(v=>String(v?.Index??v));
          if(!selected.length||selected.some(k=>!refs.has(k)))throw error('短信已变化，请刷新后重试');
          if(type==='delete'){
            if(selected.some(k=>!refs.get(k).indexes.length))throw error('选中短信没有可删除的设备索引');
            const indexes=[...new Set(selected.flatMap(k=>refs.get(k).indexes))];
            smsSnapshot=null;await call('delete_sms',{message_indexes:indexes.join(',')},true);
            await emit('air6SmsResult',{type,ok:true,message:'短信已删除'});return;
          }
          const keys=[...new Set(selected.map(k=>refs.get(k).readKey).filter(Boolean))];
          if(!keys.length)return emit('air6SmsResult',{type,ok:false,recv:message.recv||[],readStates,message:'设备未提供可保存的已读标识'});
          smsSnapshot=null;for(const key of keys)await call('mark_sms_read',{key},true);
          await emit('air6SmsResult',{type,ok:true,recv:message.recv||[],readStates,message:'已标记为已读'});return;
        }
        if(message.action==='smsBadgeProbe')return emit('smsUpdate',{type:'badge',count:recv.filter(m=>m.Isopened==='0').length});
        if(message.action==='smsList')return emit('smsUpdate',{type:'list',recv_index_list:recv.map(({Index,Isopened})=>({Index,Isopened})),send_index_list:send.map(({Index})=>({Index}))});
        const selected=(items,keys)=>items.filter(m=>(keys||[]).some(k=>String(k?.Index??k)===m.Index));
        return emit('smsUpdate',{type:'get',recv_msg_list:selected(recv,message.recv),send_msg_list:selected(send,message.send)});
      }catch(e){if(type)await emit('air6SmsResult',{type,ok:false,recv:message.recv||[],readStates,message:e.message+'；操作未确认，请刷新核对'});else await emit('smsUpdate',{type:message.action==='smsGet'?'get':'list',error:e.message});if(e.code)throw e;}
    }
    return {
      async connect(user,password){
        authenticated=false;smsSnapshot=null;smsSnapshotAt=0;sessionFlight=null;csrfToken='';systemSession='';systemBoard=null;systemRetryAt=0;cpuSnapshot=null;cpuSnapshotAt=0;thermalPathsPromise=null;macAvailable=false;otaData=null;otaAt=0;slowCache.clear();if(!password)throw error('请输入 Air6 管理密码','VALIDATION');
        const r=await http('/cgi-bin/luci/','luci_username='+encodeURIComponent(user)+'&luci_password='+encodeURIComponent(password));
        if([401,403].includes(r.status))throw error('Air6 用户名或密码错误（通常使用 root 账号）','AUTH_REJECTED');
        if(![200,302,303].includes(r.status))throw error('Air6 登录失败（HTTP '+r.status+'）','NETWORK');
        if(r.status===200&&/name=["']luci_password["']/.test(await r.text()))throw error('Air6 用户名或密码错误','AUTH_REJECTED');
        authenticated=true;
        try{const data=await probe();staticData=data;staticAt=Date.now();if(options.onDeviceName)options.onDeviceName('SoftBank Air6');return {result:0,data:{modelName:'SoftBank Air6'},line:{mode:'air6',label:'SoftBank Air6 · OpenWrt / LuCI'}};}catch(e){authenticated=false;throw e;}
      },
      async probe(){await probe();return true;},
      async sample({fresh=false,global=false,smsBadge=false,onOverview}={}){
        // Keep the serial queue occupied until every request has completed,
        // including after one fails. Later actions own their own callback IDs.
        const settledValues=async tasks=>{const results=await Promise.allSettled(tasks),failure=results.find(r=>r.status==='rejected');if(failure)throw failure.reason;return results.map(r=>r.value);};
        const methods=['get_lcd_info','get_bandinfo_fast','get_cainfo','get_cellinfo','get_measinfo','get_signalstrength','get_throughput','get_mac_throughput','get_client_count','get_sim_qci','traffic_status','traffic_daily'];
        const refreshStatic=fresh||!staticData||Date.now()-staticAt>60000;
        // The device home page loads these reads concurrently; serial reads were roughly 3x slower on Air6.
        const secondary=Promise.allSettled([global?controlSummary(true):null,global?globalViews():null,global?sms({action:'smsBadgeProbe'}):null]);
        try{
        const [device,values,system,ota]=await settledValues([refreshStatic?probe():staticData,settledValues(methods.map(async method=>{if(method==='traffic_status'){const value=await optional(method);return value.total_rx!==undefined&&value.total_tx!==undefined?value:optional('traffic_total');}return !fresh&&SLOW_METHODS.includes(method)?slow(method):optional(method);})),systemData(fresh),otaStatus(fresh)]);
        if(refreshStatic){staticData=device;staticAt=Date.now();}
        const data=Object.assign({get_device_info:staticData,ota_status:ota},Object.fromEntries(methods.map((method,index)=>[method,values[index]])),system);
        rat=data.get_lcd_info?.lcd_info?.network_type||data.get_cellinfo?.serving_rat||'';
        macAvailable=data.get_mac_throughput?.source==='edmfapp';const normalized=normalize(data);
        if(typeof onOverview==='function')await onOverview(normalized);
        const results=await secondary,failure=results.find(r=>r.status==='rejected'&&['STALE','SESSION_EXPIRED','AUTH_REJECTED'].includes(r.reason.code));if(failure)throw failure.reason;
        return normalized;
        }finally{await secondary;}
      },
      async speed(){if(macAvailable){const mac=await optional('get_mac_throughput');if(mac.source==='edmfapp'){const value=rates({},rat,{},mac);if(value.down!==null&&value.up!==null)return value;}}const [lcdData,throughput]=await Promise.all([call('get_lcd_info'),call('get_throughput')]),lcd=lcdData.lcd_info||{};rat=lcd.network_type||rat;return rates(throughput,rat,lcd);},
      async action(message){
        responseRequestId=typeof message.requestId==='string'?message.requestId:undefined;
        if(message.action==='air6TaskPreview'||message.action==='air6ExtraSave'&&['scheduler','failover'].includes(message.kind))return automationAction(message);
        if(['air6ExtraRead','air6ExtraSave'].includes(message.action))return extraSettings(message);
        if(message.action==='air6Ota')return otaAction(message);
        if(['air6AdvancedRead','air6AdvancedSave'].includes(message.action))return advanced(message);
        if(['air6WifiLoad','air6WifiSave'].includes(message.action))return wifiAction(message);
        if(message.action==='air6Clients'){
          try{const data=await rpc('luci-rpc','getDHCPLeases');await emit('air6ClientsData',{ok:true,rows:leaseDevices(data)});}catch(e){await emit('air6ClientsData',{ok:false,message:e.message});if(e.code)throw e;}return;
        }
        if(message.action==='wanInfo'){
          try{const result=await rpc('network.interface','dump');const items=list(result.interface).filter(v=>v.interface==='wan'||v.interface==='wan6');await emit('air6WanData',{ok:true,items});}catch(e){await emit('air6WanData',{ok:false,message:e.message});if(e.code)throw e;}return;
        }
        if(message.action==='switchPage'){
          if(message.page==='control')return controlSummary();
          if(message.page==='neighbor')return emit('updateData',await this.sample());
          if(message.page==='settings')return otaAction({kind:'status'});
          return;
        }
        if(message.action==='air6ReadControlSummary')return controlSummary();
        if(message.action==='air6ReadControls'){try{return await controls(message.section);}catch(e){await emit('air6WriteResult',{ok:false,message:e.message});if(e.code)throw e;return;}}
        if(['air6SetBands','air6SetRat','air6SetCell','air6SetCells','air6UnlockCell'].includes(message.action)){
          try{await write(message);}catch(e){await emit('air6WriteResult',{ok:false,message:e.message+'；若提交后断线，请先读取配置确认，勿连续重试'});}return;
        }
        if(['smsList','smsGet','smsBadgeProbe','smsRead','smsSend','smsDelete'].includes(message.action))return sms(message);
        if(message.action==='firmwareCheck')return;
        if(message.action==='rebootDevice'){
          try{await rpc('system','reboot');await emit('air6RebootResult',{ok:true,message:'重启命令已提交，等待设备恢复'});}catch(e){await emit('air6RebootResult',{ok:false,message:'重启结果未确认，请检查设备状态，勿连续提交'});}return;
        }
        if(message.action==='sendAtCommand'){
          const command=String(message.cmd||'').trim();if(!/^AT/i.test(command))return emit('atResult',{ok:false,output:'AT 指令必须以 AT 开头'});
          try{const result=await call('exec_at',{command},true);await emit('atResult',{ok:true,output:String(result.output||result.result||'')});}catch(e){await emit('atResult',{ok:false,output:e.message});}return;
        }
        if(['getUiPrefs','setUiPrefs','getHomeCards','setHomeCards','speedUnit','smsTab'].includes(message.action))return options.platform.action(message);
        throw error('Air6 尚未适配此功能，请使用设备管理页');
      },
      request(){throw error('Air6 不支持烽火 XML 接口');},
      initialize:()=>options.platform.initialize(),setReconnect(){},
      controls
    };
  }
  root.Air6Local={create,detect,normalize,rates,signal,bandwidth,cellBand,leaseDevices,smsTime,cpuCounters,cpuPercent};
  if(typeof module!=='undefined')module.exports=root.Air6Local;
})(globalThis);
