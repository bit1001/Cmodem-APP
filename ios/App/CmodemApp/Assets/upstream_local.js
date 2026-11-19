/* Generated from vaeann/FHCpeBoard fba4e87a78261080cbdaca5eb2e51d3ebd2415f9; local-only dependency closure. */
/* Platform boundary around the mechanically extracted upstream local module. */
(function (root) {
  'use strict';
  root.UpstreamLocal = {
    create(options) {
      let account=Object.assign({},options.account), reconnectAllowed=true, connecting=false;
      let diagnostic={stage:'idle',status:0,heartbeat:'',line:'',path:''};
      const base=options.address(account.host);
      const __CPE={keyPrefix:()=> 'UPSTREAM_LOCAL_',evalJS:options.evalJS||(()=>Promise.resolve(null)),timer:options.timer||((ms,callback)=>setTimeout(callback,ms)),clearTimer:clearTimeout};
      const _0x48240a=new Proxy({}, {get:(_,key)=>'UPSTREAM_LOCAL_'+String(key)+'_'});
      const _0x16e738={
        get:key=>options.storage.get(key)||'',
        set:(key,value)=>{
          options.storage.set(key,String(value));
          if(key==='UPSTREAM_LOCAL_LOCAL_ACCOUNTS_'&&options.onAccounts)options.onAccounts(JSON.parse(value));
        },
        has:key=>!!options.storage.get(key),
        remove:key=>options.storage.remove(key)
      };
      const _0x4f44fb=()=>account;
      const _0x3ed42d=()=>options.accounts?options.accounts():[account];
      const _0x4f1a06=()=>options.activeIndex?options.activeIndex():0;
      const _0x32dbea=()=>Promise.resolve(false);
      const _0x505379=()=>options.wallpaper?options.wallpaper():Promise.resolve(false);
      const _0xde2853=()=>'';
      // The upstream UI names its Wi-Fi calls after iOS toolkit commands.
      // Fulfil those reads from the same upstream encrypted LAN XML interface
      // used by the rest of the app; never dispatch a toolkit/cloud command.
      async function _0x2c7b30(command,_params,timeout){
        let indices;
        if(command==='GET_WIFI_LIST_INFO')indices=['1','5'];
        else if(command==='GET_GUEST_WIFI_LIST_INFO')indices=['3','7'];
        else throw Error('Unsupported command: '+String(command));
        const paths={};
        for(const index of indices){
          paths['ssid'+index]='WiFi.SSID.'+index+'.SSID';
          paths['pwd'+index]='WiFi.AccessPoint.'+index+'.Security.PreSharedKey';
          paths['enable'+index]='WiFi.SSID.'+index+'.Enable';
          if(index==='1'||index==='5')paths['advert'+index]='WiFi.AccessPoint.'+index+'.SSIDAdvertisementEnabled';
        }
        if(command==='GET_WIFI_LIST_INFO'){
          paths.sta='WiFi.WifiBandSteering.Enable';
          paths.mlo='WiFi.X_FH_MultiLinkGroup.1.Enable';
        }
        const data=await _0x3d8483(base,'get_value_by_xmlnode',paths,false,timeout||10000);
        if(!data||data._error)return null;
        const WIFIList=indices.map(index=>({
          SSIDIndex:index,SSID:String(data['ssid'+index]||''),PWD:String(data['pwd'+index]||''),
          Enable:String(data['enable'+index]??'1'),AdvertisementEnable:String(data['advert'+index]??'1'),
          Channel:'0',Bandwidth:'20MHz',Type:'0',PowerLevel:'100',Mode:'1',ENCRYPT:'4'
        }));
        return {resultCode:0,WIFIList,StaCtrl:String(data.sta??'0'),MloCtrl:String(data.mlo??'0')};
      }
      const _0x578483=()=>{}; // Do not forward upstream packet/account diagnostics to Android logs.
      async function _0x403514(host,requestPath,opt) {
        opt=opt||{};
        if(options.address(host)!==base)throw Error('本地请求地址已变化');
        const headers={'User-Agent':'Mozilla/5.0','Referer':opt.referer||base+'/main.html','X-Requested-With':'XMLHttpRequest','Accept':'application/json, text/javascript, */*; q=0.01'};
        // Keep upstream headers unchanged. Adding Origin in the Android port
        // caused GET session refresh to return 204 on the connected firmware.
        diagnostic.path=requestPath.split('?')[0]+(/ajaxmethod=([^&]+)/.exec(requestPath)?.[0]?'?'+/ajaxmethod=([^&]+)/.exec(requestPath)[0]:'');
        if(opt.body!=null)headers['Content-Type']='application/json; charset=UTF-8';
        try {
          if(options.isActive&&!options.isActive())throw Object.assign(Error('旧会话已取消'),{code:'STALE'});
          const authRequest=String(opt.method||'GET').toUpperCase()==='POST'&&(/\/sign\/DO_WEB_LOGIN(?:\?|$)/.test(requestPath)||opt.body&&typeof opt.body==='object'&&opt.body.ajaxmethod==='app_do_login');
          if(authRequest&&!connecting&&!reconnectAllowed)return null;
          const response=await options.fetch(base+requestPath,{method:opt.method||'GET',headers,body:opt.body==null?undefined:typeof opt.body==='string'?opt.body:JSON.stringify(opt.body),timeoutMs:opt.timeoutMs||4000});
          diagnostic.status=Number(response.status)||0;
          if(!response.ok)return null;
          const text=await response.text();
          if(/\/heartbeat(?:\?|$)/.test(requestPath))diagnostic.heartbeat=/^\d+$/.test(String(text).trim())?String(text).trim().slice(0,6):'非数字响应';
          return opt.raw?text:JSON.parse(text);
        }catch(e){return null;}
      }

      const _0x228303 = typeof __CPE !== 'undefined' && __CPE["keyPrefix"] ? __CPE["keyPrefix"]() : "CPE_";
function _0x1bc2d5(_0x3f1366) {
  return new Promise(_0x5ed4f6 => __CPE["timer"](_0x3f1366, _0x5ed4f6));
}
function _0x47f275(_0x4fff55) {
  if (!_0x4fff55 || _0x4fff55 === 0x0) return "0 MB";
  const _0x469fd6 = _0x4fff55 / (0x400 * 0x400);
  if (_0x469fd6 > 0x400) return (_0x469fd6 / 0x400)['toFixed'](0x2) + " GB";
  return _0x469fd6["toFixed"](0x1) + " MB";
}
function _0x4867bf(_0x22da55) {
  return _0x22da55 ? _0x22da55 / (0x400 * 0x400) : 0x0;
}
function _0x161928(_0x40afc7) {
  if (!_0x40afc7 || _0x40afc7 === '--') return "#6a7a8a";
  const _0x18335f = parseInt(_0x40afc7);
  if (_0x18335f > -0x59) return "#4caf50";
  if (_0x18335f > -0x63) return "#ffeb3b";
  return "#f44336";
}
function _0x2d0292(_0x141c46) {
  if (!_0x141c46 || _0x141c46 === '--') return '#6a7a8a';
  const _0x399ed2 = parseInt(_0x141c46);
  if (_0x399ed2 >= 0x14) return "#4caf50";
  if (_0x399ed2 >= 0xa) return "#ffeb3b";
  return "#f44336";
}
function _0x1eccf4(_0x548313) {
  if (!_0x548313 || _0x548313 === '--') return "#6a7a8a";
  const _0x8287ad = parseInt(_0x548313);
  if (_0x8287ad >= -0xa) return "#4caf50";
  if (_0x8287ad >= -0xf) return "#ffeb3b";
  return "#f44336";
}
function _0x599085(_0x4fd282) {
  if (!_0x4fd282 || _0x4fd282 === '--') return '--';
  const _0x7f9b22 = String(_0x4fd282)['toUpperCase']();
  if (_0x7f9b22["includes"]('SA') || _0x7f9b22 === '5') return '5G\x20SA';
  if (_0x7f9b22["includes"]("NSA")) return "5G NSA";
  if (_0x7f9b22["includes"]("LTE") || _0x7f9b22['includes']('4G')) return "4G LTE";
  return _0x7f9b22;
}
function _0x64e5ff(_0x5dd4db, _0x3282c5) {
  const _0x3e3654 = _0x599085(_0x5dd4db);
  if (_0x3282c5 >= 0x2 && _0x3e3654["indexOf"]('5G') >= 0x0) return _0x3282c5 === 0x2 ? "5G+" : "5GA";
  return _0x3e3654;
}
function _0x4499ba(_0x4b290e) {
  if (!_0x4b290e || _0x4b290e === '--') return _0x4b290e;
  return _0x4b290e["replace"](/^n/i, 'N');
}
function _0xcb1190(_0x3809ac) {
  if (!_0x3809ac || isNaN(_0x3809ac)) return '--';
  return Math["round"](parseFloat(_0x3809ac) / 0x400);
}
function _0x1be9b3(_0x282308) {
  const _0x593f61 = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '日'
  }, _0x51ec00 = String(_0x282308 || '')["split"](',')['map'](_0x18ad0f => _0x18ad0f["trim"]())["filter"](Boolean);
  if (_0x51ec00['length'] === 0x0) return '';
  const _0x5486d2 = [...new Set(_0x51ec00)]["sort"]((_0x397ca0, _0x1c5d52) => Number(_0x397ca0) - Number(_0x1c5d52)), _0x1b173f = _0x5486d2["map"](Number);
  if (_0x5486d2['length'] === 0x7) return '每天';
  if (_0x5486d2["length"] === 0x5 && _0x1b173f['every'](_0x378d92 => _0x378d92 >= 0x1 && _0x378d92 <= 0x5)) return '工作日';
  if (_0x5486d2["length"] === 0x2 && _0x1b173f[0x0] === 0x6 && _0x1b173f[0x1] === 0x7) return "周六周日";
  if (_0x5486d2["length"] === 0x1) return '周' + _0x593f61[_0x5486d2[0x0]];
  return '周(' + _0x5486d2["map"](_0x4af29d => _0x593f61[_0x4af29d] || '')["join"]('') + ')';
}
function _0x998c8e(_0x3b15f9) {
  const _0x189436 = parseInt(_0x3b15f9 || 0x0);
  if (isNaN(_0x189436) || _0x189436 <= 0x0) return '--';
  const _0x303fca = Math["floor"](_0x189436 / 0x15180), _0x543c1b = Math["floor"](_0x189436 % 0x15180 / 0xe10), _0xf9acd8 = Math['floor'](_0x189436 % 0xe10 / 0x3c);
  if (_0x303fca > 0x0) return _0x303fca + '天' + (_0x543c1b > 0x0 ? _0x543c1b + '小时' : '');
  if (_0x543c1b > 0x0) return _0x543c1b + '小时' + (_0xf9acd8 > 0x0 ? _0xf9acd8 + '分' : '');
  return _0xf9acd8 + '分钟';
}
function _0x1014fb(_0x95fb22) {
  try {
    _0x16e738["set"](_0x48240a['CACHED_DATA'], JSON["stringify"]({
      'data': _0x95fb22,
      'timestamp': Date["now"]()
    }));
  } catch (_0x3a5317) {}
}
function _0x45ba4b() {
  try {
    if (!_0x16e738["has"](_0x48240a['CACHED_DATA'])) return null;
    const _0x3e6b84 = JSON["parse"](_0x16e738["get"](_0x48240a["CACHED_DATA"]));
    return _0x3e6b84 && _0x3e6b84["data"] ? _0x3e6b84["data"] : null;
  } catch (_0x2e416c) {
    return null;
  }
}
function _0x7b26fa(_0x3aea47) {
  const _0x32768e = Date["now"]() - (Number(_0x3aea47) || 0x0);
  return _0x32768e >= 0x0 ? _0x32768e : Infinity;
}
const _0x37717a = "192.168.8.1";
const _0x4dec1d = {
  'okGap': 0x4e20,
  'failCool': 0x7530,
  'limitedCool': 0x1d4c0,
  'tsTTL': 0x1e * 0x3c * 0x3e8
};
const _0x3ff4d1 = 0x18 * 0x3c * 0x3c * 0x3e8;
const _0x326bb6 = 0x7 * 0x18 * 0x3c * 0x3c * 0x3e8;
function _0xd64c49(_0x9842c2) {
  let _0x25a6d9 = String(_0x9842c2 || '')['trim']();
  if (!_0x25a6d9) _0x25a6d9 = _0x37717a;
  if (!(/^https?:\/\//i)["test"](_0x25a6d9)) _0x25a6d9 = "http://" + _0x25a6d9;
  return _0x25a6d9["replace"](/\/+$/, '');
}
const _0x2b2ce7 = {
  '46000': '中国移动',
  '46002': '中国移动',
  '46004': "中国移动",
  '46007': '中国移动',
  '46008': "中国移动",
  '46001': "中国联通",
  '46006': '中国联通',
  '46009': "中国联通",
  '46003': "中国电信",
  '46005': "中国电信",
  '46011': "中国电信",
  '46015': "中国广电"
};
function _0x17c783(_0xdedc8f) {
  const _0x3abe1f = String(_0xdedc8f == null ? '' : _0xdedc8f)["replace"](/\D/g, '');
  if (_0x3abe1f["length"] < 0x5) return '';
  return _0x2b2ce7[_0x3abe1f['slice'](0x0, 0x5)] || '';
}
function _0x454eba(_0x360453) {
  const _0x1870de = String(_0x360453 == null ? '' : _0x360453)["trim"]();
  if (!_0x1870de || _0x1870de === '0' || _0x1870de === '-' || (/^<unknown/i)["test"](_0x1870de) || (/^unknown$/i)["test"](_0x1870de)) return '';
  if ((/移动|china\s*mobile|^CMCC$/i)["test"](_0x1870de)) return "中国移动";
  if ((/联通|unicom|^CUCC?$/i)["test"](_0x1870de)) return '中国联通';
  if ((/电信|telecom|ctcc|^CT$/i)["test"](_0x1870de)) return "中国电信";
  if ((/广电|china\s*broadnet|^CB$|^CBN$/i)["test"](_0x1870de)) return "中国广电";
  return _0x1870de;
}
function _0x14e602(_0x5e1681, _0x190b00) {
  (_0x5e1681 = _0x5e1681 || ({}), _0x190b00 = _0x190b00 || ({}));
  const _0x33313a = _0x17c783(_0x190b00["imsi"] || _0x5e1681["IMSI"] || _0x5e1681["imsi"] || '');
  if (_0x33313a) return _0x33313a;
  const _0x35f35d = _0x454eba(_0x190b00["carrierName"] || _0x5e1681["CarrierName"] || _0x5e1681["carrierName"] || '');
  if (_0x35f35d) return _0x35f35d;
  const _0x267999 = _0x17c783(_0x190b00['simPlmn'] || _0x5e1681['SimPlmn'] || _0x5e1681["simPlmn"] || '');
  if (_0x267999) return _0x267999;
  const _0x31ac1e = String(_0x5e1681["PLMN"] || _0x5e1681["plmn"] || '')['trim'](), _0x24a1a6 = _0x17c783(_0x31ac1e);
  if (_0x24a1a6) return _0x24a1a6;
  if (_0x31ac1e) return _0x31ac1e;
  const _0x395b20 = String(_0x190b00["imsi"] || _0x5e1681["IMSI"] || _0x5e1681['imsi'] || _0x190b00["carrierName"] || _0x5e1681["CarrierName"] || _0x190b00["simPlmn"] || _0x5e1681["SimPlmn"] || '')["trim"]();
  return _0x395b20 ? '未知' : "未插卡";
}
var _0x2e7f5a = 'opqrstuvwxyz{|}~';
var _0xb1e1d8 = "pqrstuvwxyz{|}~" + String["fromCharCode"](0x7f);
var _0x1ef177 = /^LG6121[HFD]$/i;
var _0x18038f = 'Bfx18';
var _0x104035 = [0x5, 0x7, 0xa, 0xb, 0xd];
var _0x4be16a = (function () {
  function _0x218e43(_0x14c1b4, _0x3b1843) {
    var _0x432ca6 = 0x0;
    for (var _0x5b3a9b = 0x0; _0x5b3a9b < 0x8; _0x5b3a9b++) {
      if (_0x3b1843 & 0x1) _0x432ca6 ^= _0x14c1b4;
      var _0x2d6c01 = _0x14c1b4 & 0x80;
      _0x14c1b4 = _0x14c1b4 << 0x1 & 0xff;
      if (_0x2d6c01) _0x14c1b4 ^= 0x1b;
      _0x3b1843 >>= 0x1;
    }
    return _0x432ca6 & 0xff;
  }
  function _0x9e05d6(_0x39ec39) {
    if (_0x39ec39 === 0x0) return 0x0;
    for (var _0x34f0bd = 0x0; _0x34f0bd < 0x100; _0x34f0bd++) if (_0x218e43(_0x39ec39, _0x34f0bd) === 0x1) return _0x34f0bd;
    return 0x0;
  }
  function _0x1e8531(_0x4ae10e, _0x6bff96) {
    return (_0x4ae10e << _0x6bff96 | _0x4ae10e >>> 0x8 - _0x6bff96) & 0xff;
  }
  var _0x407a93 = new Uint8Array(0x100);
  for (var _0x157eeb = 0x0; _0x157eeb < 0x100; _0x157eeb++) {
    var _0x7dce2 = _0x9e05d6(_0x157eeb);
    _0x407a93[_0x157eeb] = (_0x7dce2 ^ _0x1e8531(_0x7dce2, 0x1) ^ _0x1e8531(_0x7dce2, 0x2) ^ _0x1e8531(_0x7dce2, 0x3) ^ _0x1e8531(_0x7dce2, 0x4) ^ 0x63) & 0xff;
  }
  return _0x407a93;
})();
var _0x1bc7ff = (function () {
  var _0x43b96b = new Uint8Array(0x100);
  for (var _0x5c08e9 = 0x0; _0x5c08e9 < 0x100; _0x5c08e9++) _0x43b96b[_0x4be16a[_0x5c08e9]] = _0x5c08e9;
  return _0x43b96b;
})();
var _0x506dce = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
function _0x47b013(_0x29d372) {
  return (_0x29d372 << 0x1 ^ (_0x29d372 & 0x80 ? 0x1b : 0x0)) & 0xff;
}
function _0x315eb7(_0x1df369, _0x2eabb6) {
  var _0x3bc3c7 = 0x0;
  while (_0x2eabb6) {
    if (_0x2eabb6 & 0x1) _0x3bc3c7 ^= _0x1df369;
    (_0x1df369 = _0x47b013(_0x1df369), _0x2eabb6 >>= 0x1);
  }
  return _0x3bc3c7 & 0xff;
}
function _0x88284f(_0x47a0a3) {
  var _0x15f1b0 = new Uint8Array(0xb0);
  _0x15f1b0["set"](_0x47a0a3, 0x0);
  for (var _0x90b6e9 = 0x10; _0x90b6e9 < 0xb0; _0x90b6e9 += 0x4) {
    var _0x197e6c = [_0x15f1b0[_0x90b6e9 - 0x4], _0x15f1b0[_0x90b6e9 - 0x3], _0x15f1b0[_0x90b6e9 - 0x2], _0x15f1b0[_0x90b6e9 - 0x1]];
    _0x90b6e9 % 0x10 === 0x0 && (_0x197e6c = [_0x197e6c[0x1], _0x197e6c[0x2], _0x197e6c[0x3], _0x197e6c[0x0]]['map'](function (_0x20d601) {
      return _0x4be16a[_0x20d601];
    }), _0x197e6c[0x0] ^= _0x506dce[_0x90b6e9 / 0x10 - 0x1]);
    for (var _0x48dc1a = 0x0; _0x48dc1a < 0x4; _0x48dc1a++) _0x15f1b0[_0x90b6e9 + _0x48dc1a] = _0x15f1b0[_0x90b6e9 - 0x10 + _0x48dc1a] ^ _0x197e6c[_0x48dc1a];
  }
  return _0x15f1b0;
}
function _0x133a5f(_0xf590ad, _0x214797) {
  for (var _0x2934ff = 0x0; _0x2934ff < 0x10; _0x2934ff++) _0xf590ad[_0x2934ff] = _0x214797[_0xf590ad[_0x2934ff]];
}
function _0x4b4799(_0x5a15b0) {
  var _0x1cdc76;
  (_0x1cdc76 = _0x5a15b0[0x1], _0x5a15b0[0x1] = _0x5a15b0[0x5], _0x5a15b0[0x5] = _0x5a15b0[0x9], _0x5a15b0[0x9] = _0x5a15b0[0xd], _0x5a15b0[0xd] = _0x1cdc76, _0x1cdc76 = _0x5a15b0[0x2], _0x5a15b0[0x2] = _0x5a15b0[0xa], _0x5a15b0[0xa] = _0x1cdc76, _0x1cdc76 = _0x5a15b0[0x6], _0x5a15b0[0x6] = _0x5a15b0[0xe], _0x5a15b0[0xe] = _0x1cdc76, _0x1cdc76 = _0x5a15b0[0xf], _0x5a15b0[0xf] = _0x5a15b0[0xb], _0x5a15b0[0xb] = _0x5a15b0[0x7], _0x5a15b0[0x7] = _0x5a15b0[0x3], _0x5a15b0[0x3] = _0x1cdc76);
}
function _0x2c12b6(_0x413367) {
  var _0x56abb5;
  (_0x56abb5 = _0x413367[0xd], _0x413367[0xd] = _0x413367[0x9], _0x413367[0x9] = _0x413367[0x5], _0x413367[0x5] = _0x413367[0x1], _0x413367[0x1] = _0x56abb5, _0x56abb5 = _0x413367[0x2], _0x413367[0x2] = _0x413367[0xa], _0x413367[0xa] = _0x56abb5, _0x56abb5 = _0x413367[0x6], _0x413367[0x6] = _0x413367[0xe], _0x413367[0xe] = _0x56abb5, _0x56abb5 = _0x413367[0x3], _0x413367[0x3] = _0x413367[0x7], _0x413367[0x7] = _0x413367[0xb], _0x413367[0xb] = _0x413367[0xf], _0x413367[0xf] = _0x56abb5);
}
function _0x5277d9(_0x486fe5) {
  for (var _0x56bba9 = 0x0; _0x56bba9 < 0x4; _0x56bba9++) {
    var _0x1cc14c = _0x56bba9 * 0x4, _0x5e86bd = _0x486fe5[_0x1cc14c], _0x2c447d = _0x486fe5[_0x1cc14c + 0x1], _0x2c085c = _0x486fe5[_0x1cc14c + 0x2], _0x5a767e = _0x486fe5[_0x1cc14c + 0x3];
    (_0x486fe5[_0x1cc14c] = _0x47b013(_0x5e86bd) ^ (_0x47b013(_0x2c447d) ^ _0x2c447d) ^ _0x2c085c ^ _0x5a767e, _0x486fe5[_0x1cc14c + 0x1] = _0x5e86bd ^ _0x47b013(_0x2c447d) ^ (_0x47b013(_0x2c085c) ^ _0x2c085c) ^ _0x5a767e, _0x486fe5[_0x1cc14c + 0x2] = _0x5e86bd ^ _0x2c447d ^ _0x47b013(_0x2c085c) ^ (_0x47b013(_0x5a767e) ^ _0x5a767e), _0x486fe5[_0x1cc14c + 0x3] = _0x47b013(_0x5e86bd) ^ _0x5e86bd ^ _0x2c447d ^ _0x2c085c ^ _0x47b013(_0x5a767e));
  }
}
function _0x28b8f1(_0x38fce3) {
  for (var _0x44912a = 0x0; _0x44912a < 0x4; _0x44912a++) {
    var _0x4de626 = _0x44912a * 0x4, _0x400089 = _0x38fce3[_0x4de626], _0x4ef111 = _0x38fce3[_0x4de626 + 0x1], _0x5b2c79 = _0x38fce3[_0x4de626 + 0x2], _0x3919d9 = _0x38fce3[_0x4de626 + 0x3];
    (_0x38fce3[_0x4de626] = _0x315eb7(_0x400089, 0xe) ^ _0x315eb7(_0x4ef111, 0xb) ^ _0x315eb7(_0x5b2c79, 0xd) ^ _0x315eb7(_0x3919d9, 0x9), _0x38fce3[_0x4de626 + 0x1] = _0x315eb7(_0x400089, 0x9) ^ _0x315eb7(_0x4ef111, 0xe) ^ _0x315eb7(_0x5b2c79, 0xb) ^ _0x315eb7(_0x3919d9, 0xd), _0x38fce3[_0x4de626 + 0x2] = _0x315eb7(_0x400089, 0xd) ^ _0x315eb7(_0x4ef111, 0x9) ^ _0x315eb7(_0x5b2c79, 0xe) ^ _0x315eb7(_0x3919d9, 0xb), _0x38fce3[_0x4de626 + 0x3] = _0x315eb7(_0x400089, 0xb) ^ _0x315eb7(_0x4ef111, 0xd) ^ _0x315eb7(_0x5b2c79, 0x9) ^ _0x315eb7(_0x3919d9, 0xe));
  }
}
function _0x2f8774(_0x27a3a5, _0x3e3858) {
  var _0x185dd6 = Uint8Array["from"](_0x27a3a5);
  for (var _0x1beeac = 0x0; _0x1beeac < 0x10; _0x1beeac++) _0x185dd6[_0x1beeac] ^= _0x3e3858[_0x1beeac];
  for (var _0x23d464 = 0x1; _0x23d464 < 0xa; _0x23d464++) {
    (_0x133a5f(_0x185dd6, _0x4be16a), _0x4b4799(_0x185dd6), _0x5277d9(_0x185dd6));
    for (var _0x3136a5 = 0x0; _0x3136a5 < 0x10; _0x3136a5++) _0x185dd6[_0x3136a5] ^= _0x3e3858[_0x23d464 * 0x10 + _0x3136a5];
  }
  (_0x133a5f(_0x185dd6, _0x4be16a), _0x4b4799(_0x185dd6));
  for (var _0x4954ac = 0x0; _0x4954ac < 0x10; _0x4954ac++) _0x185dd6[_0x4954ac] ^= _0x3e3858[0xa0 + _0x4954ac];
  return _0x185dd6;
}
function _0x5bae27(_0x40342b, _0x39ca93) {
  var _0x3b621c = Uint8Array["from"](_0x40342b);
  for (var _0x5e9dbd = 0x0; _0x5e9dbd < 0x10; _0x5e9dbd++) _0x3b621c[_0x5e9dbd] ^= _0x39ca93[0xa0 + _0x5e9dbd];
  for (var _0x4315b9 = 0x9; _0x4315b9 >= 0x1; _0x4315b9--) {
    (_0x2c12b6(_0x3b621c), _0x133a5f(_0x3b621c, _0x1bc7ff));
    for (var _0x3f9bcd = 0x0; _0x3f9bcd < 0x10; _0x3f9bcd++) _0x3b621c[_0x3f9bcd] ^= _0x39ca93[_0x4315b9 * 0x10 + _0x3f9bcd];
    _0x28b8f1(_0x3b621c);
  }
  (_0x2c12b6(_0x3b621c), _0x133a5f(_0x3b621c, _0x1bc7ff));
  for (var _0x3e907b = 0x0; _0x3e907b < 0x10; _0x3e907b++) _0x3b621c[_0x3e907b] ^= _0x39ca93[_0x3e907b];
  return _0x3b621c;
}
function _0x45e29a(_0x10146f) {
  var _0xf26d84 = [];
  for (var _0x360e90 = 0x0; _0x360e90 < _0x10146f['length']; _0x360e90++) {
    var _0x383a55 = _0x10146f['charCodeAt'](_0x360e90);
    if (_0x383a55 < 0x80) _0xf26d84["push"](_0x383a55); else {
      if (_0x383a55 < 0x800) _0xf26d84["push"](0xc0 | _0x383a55 >> 0x6, 0x80 | _0x383a55 & 0x3f); else _0xf26d84["push"](0xe0 | _0x383a55 >> 0xc, 0x80 | _0x383a55 >> 0x6 & 0x3f, 0x80 | _0x383a55 & 0x3f);
    }
  }
  return _0xf26d84;
}
function _0x587def(_0x15a587) {
  var _0x5da7e8 = '', _0x31e1a2 = 0x0;
  while (_0x31e1a2 < _0x15a587["length"]) {
    var _0x32c750 = _0x15a587[_0x31e1a2];
    if (_0x32c750 < 0x80) (_0x5da7e8 += String['fromCharCode'](_0x32c750), _0x31e1a2++); else {
      if (_0x32c750 < 0xe0) (_0x5da7e8 += String["fromCharCode"]((_0x32c750 & 0x1f) << 0x6 | _0x15a587[_0x31e1a2 + 0x1] & 0x3f), _0x31e1a2 += 0x2); else _0x32c750 < 0xf0 ? (_0x5da7e8 += String["fromCharCode"]((_0x32c750 & 0xf) << 0xc | (_0x15a587[_0x31e1a2 + 0x1] & 0x3f) << 0x6 | _0x15a587[_0x31e1a2 + 0x2] & 0x3f), _0x31e1a2 += 0x3) : (_0x5da7e8 += String['fromCharCode']((_0x32c750 & 0x7) << 0x12 | (_0x15a587[_0x31e1a2 + 0x1] & 0x3f) << 0xc | (_0x15a587[_0x31e1a2 + 0x2] & 0x3f) << 0x6 | _0x15a587[_0x31e1a2 + 0x3] & 0x3f), _0x31e1a2 += 0x4);
    }
  }
  return _0x5da7e8;
}
function _0x294511(_0x1ca2ad, _0x4cd213, _0x4e5372) {
  var _0x27b95b = _0x88284f(Uint8Array['from'](_0x45e29a(_0x4cd213))), _0x24ba3d = _0x45e29a(_0x4e5372), _0x54de7a = _0x45e29a(_0x1ca2ad), _0x56bb8d = 0x10 - _0x54de7a["length"] % 0x10;
  for (var _0x2dec56 = 0x0; _0x2dec56 < _0x56bb8d; _0x2dec56++) _0x54de7a["push"](_0x56bb8d);
  var _0x3531dc = [], _0x2da186 = _0x24ba3d;
  for (var _0x5903ba = 0x0; _0x5903ba < _0x54de7a['length']; _0x5903ba += 0x10) {
    var _0x2cec0b = _0x54de7a["slice"](_0x5903ba, _0x5903ba + 0x10)["map"](function (_0x5d79c4, _0x23e272) {
      return _0x5d79c4 ^ _0x2da186[_0x23e272];
    }), _0x30e022 = _0x2f8774(_0x2cec0b, _0x27b95b);
    for (var _0x1017f3 = 0x0; _0x1017f3 < 0x10; _0x1017f3++) _0x3531dc["push"](_0x30e022[_0x1017f3]);
    _0x2da186 = _0x30e022;
  }
  return _0x3531dc["map"](function (_0x37475a) {
    return (_0x37475a < 0x10 ? '0' : '') + _0x37475a["toString"](0x10);
  })["join"]('');
}
function _0x17e274(_0x4ca947, _0x387a69, _0x18fdd7) {
  var _0x4b2427 = _0x88284f(Uint8Array["from"](_0x45e29a(_0x387a69))), _0x32ac7e = _0x45e29a(_0x18fdd7), _0x48f045 = [];
  for (var _0x10d51e = 0x0; _0x10d51e < _0x4ca947["length"]; _0x10d51e += 0x2) _0x48f045["push"](parseInt(_0x4ca947["substr"](_0x10d51e, 0x2), 0x10));
  var _0x3374d3 = [], _0x1c8dd2 = _0x32ac7e;
  for (var _0x55a2fb = 0x0; _0x55a2fb < _0x48f045["length"]; _0x55a2fb += 0x10) {
    var _0x163f70 = _0x48f045["slice"](_0x55a2fb, _0x55a2fb + 0x10), _0x2cf895 = _0x5bae27(_0x163f70, _0x4b2427);
    for (var _0x238524 = 0x0; _0x238524 < 0x10; _0x238524++) _0x3374d3["push"](_0x2cf895[_0x238524] ^ _0x1c8dd2[_0x238524]);
    _0x1c8dd2 = _0x163f70;
  }
  var _0x58a049 = _0x3374d3[_0x3374d3["length"] - 0x1];
  if (_0x58a049 >= 0x1 && _0x58a049 <= 0x10) _0x3374d3["length"] = _0x3374d3["length"] - _0x58a049;
  return _0x587def(_0x3374d3);
}
var _0x24e1aa = 0xb7223f5d912f6998d78e448b833856af0a93bdd887a1fe382507cbc0ab17b7a40d956a464d34737b71a1ef35be034c200c951705ad155fd4ad8218729dae08b22467b49300270b05138a109ef6390cce5f9934a1d8b56b9f52fec84a1f856577c78bf86eca5fcca883f36a0201de0969009e13ed3ee05864f5f9f9257a467c5117cca9b4d751aff74010a6c1f2ab76fe188883ae3eaa627f160af4159e3582943b259b17e74a562f569ecf66539e53bf0db7c85d7f8d8a579b3bfd313667c9b82720a9d77579814b21b1c718fd855a9dbd0b8ccac945a2b1b1c472080da192dbabd94dda9f246785a010871cc5f319a342ff5b85d31f3b540edabb88f1b81391n;
var _0x308e8f = 0x280f55cd21f53d243202ecfb97b8bb3d8f12c2749b36d46573b440dde48f4b9c975c17e349003042d0989bbb25d592d16fef2d1a10c29c33e9c08b9886e58b016cf5428ae57da4eb775abc4809947138b3b0cfd2979517f5c231f99e3d46f0eb42bb5b9ce0a8141cc8c0766ff9f89816600c344fb17161e4b3e9fa96382933082b64dc5824ce8beed27a836429a397c1f929ac109848d762e8ea1c88c54b51a55dd7a307a1fb1eb9a50a3d7a1323cbda6bb31b4f84465c43e2b976f07cde86e63f468b7ccdf1cfb5226f6b2cb71750d9f0c490a6b79708b1274a63f0702f961b7f3c1665249faa754866661915f0852f2e3911f3567fcb4934e0f2e509509n;
var _0x3c290b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function _0x24a583(_0xe4adf8) {
  var _0x16144d = [], _0xad5fed = 0x0, _0x293f81 = 0x0;
  for (var _0x4ea8a2 = 0x0; _0x4ea8a2 < _0xe4adf8["length"]; _0x4ea8a2++) {
    var _0x251ef8 = _0x3c290b['indexOf'](_0xe4adf8["charAt"](_0x4ea8a2));
    if (_0x251ef8 < 0x0) {
      if (_0xe4adf8["charAt"](_0x4ea8a2) === '=') break;
      continue;
    }
    (_0xad5fed = _0xad5fed << 0x6 | _0x251ef8, _0x293f81 += 0x6, _0x293f81 >= 0x8 && (_0x293f81 -= 0x8, _0x16144d["push"](_0xad5fed >> _0x293f81 & 0xff)));
  }
  return _0x16144d;
}
function _0x549b31(_0x576da4) {
  var _0x36fc55 = 0x0n;
  for (var _0x446167 = 0x0; _0x446167 < _0x576da4["length"]; _0x446167++) _0x36fc55 = _0x36fc55 << 0x8n | BigInt(_0x576da4[_0x446167]);
  var _0x15851d = 0x1n, _0xc38324 = _0x36fc55 % _0x24e1aa, _0x355028 = _0x308e8f;
  while (_0x355028 > 0x0n) {
    if (_0x355028 & 0x1n) _0x15851d = _0x15851d * _0xc38324 % _0x24e1aa;
    (_0xc38324 = _0xc38324 * _0xc38324 % _0x24e1aa, _0x355028 >>= 0x1n);
  }
  var _0x1f8c97 = _0x15851d['toString'](0x10);
  while (_0x1f8c97["length"] < 0x200) _0x1f8c97 = '0' + _0x1f8c97;
  var _0x2dd99c = [];
  for (var _0x5f038c = 0x0; _0x5f038c < 0x100; _0x5f038c++) _0x2dd99c['push'](parseInt(_0x1f8c97["substr"](_0x5f038c * 0x2, 0x2), 0x10));
  return _0x2dd99c;
}
var _0x28dc4a = {};
let _0xfd4bec = 0x0;
let _0x294a79 = false;
let _0x4aa694 = 0x0;
const _0x30eda1 = 0xea60;
const _0x37a277 = 0xea60;
const _0x18201e = {};
let _0x21cafb = '';
let _0x2f5188 = null;
function _0xf011c2() {
  let _0x15e0e6 = {};
  try {
    _0x15e0e6 = JSON["parse"](_0x16e738["has"](_0x48240a['UI_PREFS']) ? _0x16e738['get'](_0x48240a["UI_PREFS"]) : '{}') || ({});
  } catch (_0x3bbab9) {
    _0x15e0e6 = {};
  }
  if (_0x15e0e6["theme"] !== 'light' && _0x15e0e6["theme"] !== "dark") _0x15e0e6["theme"] = 'auto';
  return (_0x15e0e6["diag"] = _0x15e0e6["diag"] ? 0x1 : 0x0, _0x15e0e6);
}
async function _0x313b69(_0x1279c6) {
  if (_0x28dc4a[_0x1279c6]) return _0x28dc4a[_0x1279c6];
  var _0x36c7b6 = '';
  try {
    _0x36c7b6 = _0x16e738["get"](_0x48240a["FH_SEED"] + _0x1279c6) || '';
  } catch (_0x1f4c1e) {}
  if (_0x36c7b6) return (_0x28dc4a[_0x1279c6] = _0x36c7b6, _0x36c7b6);
  var _0x3c3e1f = await _0x403514(_0x1279c6, "/fh_api/tmp/FHNCAPIS?ajaxmethod=is_encrypt", {
    'timeoutMs': 0x1388
  }), _0x598d8f = _0x3c3e1f && _0x3c3e1f["data"] ? String(_0x3c3e1f['data']) : '';
  if (_0x598d8f['length'] < 0x104) return '';
  var _0x2a0093 = _0x24a583(_0x598d8f["slice"](0x6));
  if (_0x2a0093["length"] < 0x100) return '';
  var _0x109302 = _0x549b31(_0x2a0093);
  if (_0x109302[0x0] !== 0x0 || _0x109302[0x1] !== 0x2) return '';
  var _0x5182be = -0x1;
  for (var _0x246b0a = 0x2; _0x246b0a < _0x109302["length"]; _0x246b0a++) {
    if (_0x109302[_0x246b0a] === 0x0) {
      _0x5182be = _0x246b0a;
      break;
    }
  }
  if (_0x5182be < 0x0) return '';
  var _0x54ed2e = [];
  for (var _0x4d098e = _0x5182be + 0x1; _0x4d098e < _0x109302["length"]; _0x4d098e++) _0x54ed2e["push"](String["fromCharCode"](_0x109302[_0x4d098e]));
  var _0x4e2f0c = _0x54ed2e["join"]('');
  if (!_0x4e2f0c) return '';
  _0x28dc4a[_0x1279c6] = _0x4e2f0c;
  try {
    _0x16e738["set"](_0x48240a["FH_SEED"] + _0x1279c6, _0x4e2f0c);
  } catch (_0x21eeb0) {}
  return _0x4e2f0c;
}
function _0x51b1ef(_0x24d0bf, _0x1783c0) {
  var _0x2432c1 = _0x24d0bf["length"], _0xc5e226 = _0x24d0bf["charCodeAt"](0x1) % 0x3 - 0x1, _0x533fea = [], _0x14cf38 = 0x0;
  for (var _0x40dfef = 0x0; _0x40dfef < 0x10; _0x40dfef++) {
    if (_0x104035["indexOf"](_0x40dfef) !== -0x1) {
      var _0x8e7427 = _0x1783c0 ? _0x1783c0["charAt"](_0x14cf38 % _0x1783c0['length']) : _0x18038f["charAt"](_0x14cf38);
      (_0x533fea["push"](String["fromCharCode"](_0x8e7427['charCodeAt'](0x0) + _0xc5e226)), _0x14cf38++);
    } else {
      if (_0x2432c1 > _0x40dfef * 0x4 + 0x2) _0x533fea['push'](String["fromCharCode"](_0x24d0bf["charCodeAt"](_0x2432c1 - 0x2 - _0x40dfef * 0x4) - 0x1)); else _0x533fea["push"](String["fromCharCode"](_0x24d0bf["charCodeAt"](_0x40dfef * 0x4 - 0x1f) + 0x1));
    }
  }
  return _0x533fea["join"]('');
}
function _0x3d055c() {
  var _0x657748 = '', _0x310de2 = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var _0x3d92dd = 0x0; _0x3d92dd < 0x6; _0x3d92dd++) _0x657748 += _0x310de2["charAt"](Math["floor"](Math['random']() * _0x310de2["length"]));
  return _0x657748;
}
function _0x5d3648(_0x393218, _0xb57677, _0x37e530) {
  var _0x670fa0 = _0x51b1ef(_0xb57677, _0x37e530);
  return {
    'body': _0x3d055c() + _0x294511(JSON["stringify"](_0x393218), _0x670fa0, _0x2e7f5a),
    'key': _0x670fa0
  };
}
function _0x4e26c4(_0x33c876, _0x3d75d0) {
  var _0x3ed732 = String(_0x33c876), _0x473906 = _0x3ed732["length"] > 0x6 && (/^[0-9a-fA-F]+$/)["test"](_0x3ed732['slice'](0x6)) ? _0x3ed732["slice"](0x6) : _0x3ed732;
  return JSON["parse"](_0x17e274(_0x473906, _0x3d75d0, _0x2e7f5a));
}
function _0x779261(_0x5d9285, _0x44d2c1) {
  var _0x230e39 = String(_0x44d2c1 == null ? '' : _0x44d2c1)["slice"](0x0, 0x10);
  if (_0x230e39["length"] < 0x10) return null;
  return {
    'body': _0x294511(JSON['stringify'](_0x5d9285), _0x230e39, _0xb1e1d8),
    'key': _0x230e39
  };
}
function _0x50626a(_0x472094) {
  var _0x1d17f0 = String(_0x472094 == null ? '' : _0x472094)['trim']()['match'](/^(\d+)\|(-?\d*)$/);
  if (!_0x1d17f0) return null;
  var _0x3c93c8 = {
    'result': Number(_0x1d17f0[0x1])
  };
  if (_0x1d17f0[0x2] !== '') _0x3c93c8["user"] = Number(_0x1d17f0[0x2]);
  return (_0x3c93c8['_compact'] = true, _0x3c93c8);
}
function _0x1a7603(_0x608a68, _0x4ddf6e) {
  var _0x21b3ba = String(_0x608a68 == null ? '' : _0x608a68)['trim']();
  if (!_0x21b3ba) return null;
  if ((/^(?:0|ok|success|true)$/i)["test"](_0x21b3ba)) return {
    'result': 0x0
  };
  if ((/^[0-9a-fA-F]+$/)["test"](_0x21b3ba)) try {
    return JSON['parse'](_0x17e274(_0x21b3ba, _0x4ddf6e, _0xb1e1d8));
  } catch (_0x54ceeb) {}
  if (_0x21b3ba['length'] > 0x6 && (/^[0-9a-fA-F]+$/)["test"](_0x21b3ba['slice'](0x6))) try {
    return JSON["parse"](_0x17e274(_0x21b3ba["slice"](0x6), _0x4ddf6e, _0xb1e1d8));
  } catch (_0x3c6fb5) {}
  var _0x56b8ab = _0x50626a(_0x21b3ba);
  if (_0x56b8ab) return _0x56b8ab;
  return _0x21b3ba;
}
function _0x4e8f87() {
  for (let _0x56b57d = 0x0; _0x56b57d < arguments["length"]; _0x56b57d++) {
    const _0x4947b3 = String(arguments[_0x56b57d] == null ? '' : arguments[_0x56b57d])['trim']();
    if (!_0x4947b3 || _0x4947b3 === '-' || (/^<unknown/i)["test"](_0x4947b3)) continue;
    const _0xed42c4 = parseInt(_0x4947b3, 0xa);
    if (!isNaN(_0xed42c4) && _0xed42c4 <= -0x14 && _0xed42c4 >= -0x8c) return String(_0xed42c4);
  }
  return '';
}
var _0x2b8557 = {
  'pcc': "X_FH_MobileNetwork.NetworkInfo.PCCInfo.",
  'pcc2': 'X_FH_MobileNetwork.NetworkInfo.PCCInfo2.',
  'scc': "X_FH_MobileNetwork.NetworkInfo.SCCInfos.",
  'pccF': {
    'Type': "pccType",
    'Band': "pccBand",
    'Pci': "pccPci",
    'Arfcn': "pccArfcn",
    'DlBandWidth': "pccDlBandWidth",
    'UlBandWidth': 'pccUlBandWidth'
  },
  'sccF': {
    'Type': "sccType",
    'State': 'sccState',
    'Band': "sccBand",
    'Pci': "sccPci",
    'Arfcn': "sccArfcn",
    'DlBandWidth': 'sccDlBandWidth',
    'UlBandWidth': "sccUlBandWidth"
  },
  'sccNums': "sccNumbers"
};
let _0xff15d6 = 0x0;
const _0x239103 = {
  'get_lan_device_info_all': "设备列表",
  'get_value_by_xmlnode': '读节点',
  'get_xml_childnode_value': "读列表",
  'app_get_base_info': "base",
  'app_do_login': '登录',
  'app_get_login_status': "登录态"
};
async function _0x30127f(_0x46a711, _0x4612a1) {
  const _0x16bea6 = (await _0x1a0c06(_0x46a711))["profile"], _0x303dd6 = _0x16bea6 && _0x16bea6['mode'] === "web" && _0x16bea6["sid"] ? _0x16bea6["sid"] : _0x4506d1(_0x46a711, "sid", '/api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid', ['web']);
  for (let _0x3fd1e9 = 0x0; _0x3fd1e9 < 0x3; _0x3fd1e9++) {
    const _0x3af004 = await _0x403514(_0x46a711, _0x303dd6, {
      'timeoutMs': _0x4612a1 || 0xbb8
    });
    if (_0x3af004 && _0x3af004["sessionid"]) return _0x3af004["sessionid"];
    if (_0x3fd1e9 < 0x2) await _0x1bc2d5(_0x3fd1e9 === 0x0 ? 0x258 : 0x4b0);
  }
  return null;
}
async function _0x32b090(_0x5a194a, _0x1ff46c) {
  const _0xed5a66 = (await _0x1a0c06(_0x5a194a))['profile'], _0x4f676c = _0xed5a66 && (_0xed5a66["mode"] === "enc" || _0xed5a66["mode"] === 'legacy') && _0xed5a66["sid"] ? _0xed5a66["sid"] : _0x4506d1(_0x5a194a, "sid", "/fh_api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid", ["enc", "legacy"]), _0x30eb63 = Date["now"]();
  for (let _0x3a3411 = 0x0; _0x3a3411 < 0x4; _0x3a3411++) {
    const _0x58feed = await _0x403514(_0x5a194a, _0x4f676c, {
      'timeoutMs': _0x1ff46c || 0xbb8
    });
    if (_0x58feed && _0x58feed["sessionid"]) {
      if (_0x3a3411 > 0x0) _0x578483('warn', '全局', "sid 第" + (_0x3a3411 + 0x1) + '发\x20' + ((Date["now"]() - _0x30eb63) / 0x3e8)["toFixed"](0x1) + 's');
      return _0x58feed["sessionid"];
    }
    if (_0x3a3411 < 0x3) await _0x1bc2d5(_0x3a3411 === 0x0 ? 0x3e8 : _0x3a3411 === 0x1 ? 0x7d0 : 0x9c4);
  }
  return null;
}
async function _0x200899(_0x12a238, _0x57c478) {
  const _0x5467e9 = await _0x403514(_0x12a238, "/fh_api/tmp/heartbeat", {
    'raw': true,
    'timeoutMs': 0x9c4
  });
  if (_0x5467e9 == null) return false;
  const _0x2776bf = String(_0x5467e9)['trim']();
  _0x21cafb = _0x2776bf;
  if (_0x57c478 && typeof _0x57c478 === "object") _0x57c478["raw"] = _0x2776bf;
  try {
    if ((/^\d+$/)["test"](_0x2776bf)) {
      const _0x2e173a = parseInt(_0x2776bf, 0xa);
      (_0x2e173a === 0x1 || _0x2e173a === 0x3) && (_0x24baca = _0x2e173a, _0x4bb4e9(_0x12a238, _0x2e173a));
    }
  } catch (_0x301e9c) {}
  return (/^\d+$/)["test"](_0x2776bf) && parseInt(_0x2776bf, 0xa) > 0x0;
}
function _0x248216(_0x116fc8) {
  const _0x33dc67 = Number(_0x116fc8);
  if (_0x33dc67 === 0x1) return 'occupied';
  if (_0x33dc67 === 0x2) return 'locked';
  if (_0x33dc67 === 0x3) return "disabled";
  if (_0x33dc67 === 0x4) return "login";
  return '';
}
function _0x5879cc(_0x29f01b) {
  return !!_0x29f01b && typeof _0x29f01b === "object";
}
async function _0x20819e(_0x540db5, _0x3b1413) {
  if (!_0x3b1413 || !String(_0x3b1413["pass"] || '')) return "nopass";
  const _0x2de848 = Date["now"](), _0x8392e = await _0x32b090(_0x540db5), _0xdf1b46 = Date["now"]();
  if (!_0x8392e) return "unreachable";
  const _0x2e6e2b = _0x3b1413["user"] || "admin", _0x25acbb = {
    'dataObj': {
      'username': _0x2e6e2b,
      'password': _0x3b1413["pass"] || ''
    },
    'ajaxmethod': "DO_WEB_LOGIN",
    'sessionid': _0x8392e
  }, _0x2588e4 = await _0x313b69(_0x540db5), _0x4c4a0d = Date["now"](), _0x172988 = _0x5d3648(_0x25acbb, _0x8392e, _0x2588e4), _0x1fc488 = (await _0x1a0c06(_0x540db5))["profile"], _0x312e06 = _0x1fc488 && (_0x1fc488["mode"] === 'enc' || _0x1fc488["mode"] === "legacy") && _0x1fc488["sign"] ? _0x1fc488['sign'] : _0x4506d1(_0x540db5, 'sign', "/fh_api/sign/DO_WEB_LOGIN", ["enc", "legacy"]), _0x370987 = await _0x403514(_0x540db5, _0x312e06 + "?_0." + Math["random"](), {
    'method': "POST",
    'body': _0x172988["body"],
    'raw': true,
    'referer': _0x540db5 + "/login.html",
    'timeoutMs': 0x1770
  }), _0x2b64a9 = Date["now"]();
  if (!_0x370987) return 'fail';
  let _0x1e4959 = null;
  try {
    _0x1e4959 = JSON["parse"](_0x370987);
  } catch (_0x292692) {}
  if (!_0x1e4959) {
    const _0x28771c = _0x50626a(_0x370987);
    if (_0x28771c) _0x1e4959 = _0x28771c;
  }
  const _0xc8d10f = _0x1e4959 ? _0x1e4959['result'] !== undefined ? _0x1e4959["result"] : _0x1e4959['login_result'] : null;
  if (_0x1e4959 && _0xc8d10f !== undefined && _0xc8d10f !== null && Number(_0xc8d10f) === 0x0) {
    const _0x329893 = _0x1e4959["user"] !== undefined ? Number(_0x1e4959["user"]) : NaN;
    if (!isNaN(_0x329893)) _0x4bb4e9(_0x540db5, _0x329893);
    return (_0x578483("info", '全局', "登录 sid" + ((_0xdf1b46 - _0x2de848) / 0x3e8)['toFixed'](0x1) + '\x20seed' + ((_0x4c4a0d - _0xdf1b46) / 0x3e8)["toFixed"](0x1) + '\x20登' + ((_0x2b64a9 - _0x4c4a0d) / 0x3e8)["toFixed"](0x1)), 'ok');
  }
  try {
    _0x52fdf2 = await _0x4b23bd(_0x540db5);
  } catch (_0x558577) {
    _0x52fdf2 = '';
  }
  try {
    _0x3fade3 = {
      'line': "enc",
      'body': _0x370987["slice"](0x0, 0xc8),
      'otherLogged': _0x52fdf2 || ''
    };
  } catch (_0x56e401) {}
  if (_0x370987["indexOf"]("\"result\":9") !== -0x1 || Number(_0xc8d10f) === 0x9) {
    const _0x2d0ccd = _0x1e4959 && _0x1e4959["user"] !== undefined && _0x1e4959['user'] !== null;
    if (!_0x2d0ccd) return (_0x2860c2 = 0x0, 'expired');
    const _0x43195d = _0x370987["match"](/"remaintime"\s*:\s*(\d+)/);
    return (_0x2860c2 = _0x43195d ? Math["min"](parseInt(_0x43195d[0x1], 0xa) * 0x3e8, 0x493e0) : 0x0, "limited");
  }
  const _0x29bf73 = _0x248216(_0xc8d10f);
  if (_0x29bf73) return _0x29bf73;
  if (!_0x1e4959) return "nolib";
  return 'fail';
}
const _0x2857a9 = [{
  'id': 'fh_api_tmp',
  'label': "加密线",
  'mode': "enc",
  'cipher': "derived",
  'toolPath': "/api/tmp/FHTOOLAPIS",
  'sid': "/fh_api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid",
  'sign': "/fh_api/sign/DO_WEB_LOGIN",
  'dataNull': "/fh_api/tmp/FHNCAPIS",
  'dataObj': "/fh_api/tmp/FHAPIS"
}, {
  'id': "api_tmp",
  'label': "明文网页线",
  'mode': "web",
  'cipher': "session16",
  'toolPath': '/api/tmp/FHTOOLAPIS',
  'sid': "/api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid",
  'sign': "/api/sign/DO_WEB_LOGIN",
  'dataNull': "/api/tmp/FHNCAPIS",
  'dataObj': '/api/tmp/FHAPIS'
}, {
  'id': 'api_tmp_plain',
  'label': '明文网页线·不加密',
  'mode': "web",
  'cipher': "none",
  'toolPath': "/api/tmp/FHTOOLAPIS",
  'probe': false,
  'sid': "/api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid",
  'sign': "/api/sign/DO_WEB_LOGIN",
  'dataNull': "/api/tmp/FHNCAPIS",
  'dataObj': '/api/tmp/FHAPIS'
}, {
  'id': "fh_api_tool",
  'label': '明文工具线',
  'mode': "tool",
  'cipher': 'none',
  'toolPath': "/fh_api/tmp/FHTOOLAPIS",
  'sid': "/fh_api/tmp/FHTOOLAPIS?ajaxmethod=get_refresh_sessionid",
  'sign': '',
  'dataNull': '/fh_api/tmp/FHTOOLAPIS',
  'dataObj': "/fh_api/tmp/FHTOOLAPIS"
}, {
  'id': "fh_api_direct",
  'label': "加密线·直连",
  'mode': "enc",
  'cipher': "derived",
  'toolPath': "/api/tmp/FHTOOLAPIS",
  'sid': '/fh_api/FHNCAPIS?ajaxmethod=get_refresh_sessionid',
  'sign': "/fh_api/sign/DO_WEB_LOGIN",
  'dataNull': "/fh_api/FHNCAPIS",
  'dataObj': '/fh_api/FHAPIS'
}, {
  'id': "root_tmp",
  'label': "老加密线",
  'mode': 'legacy',
  'cipher': "session16",
  'toolPath': "/api/tmp/FHTOOLAPIS",
  'sid': "/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid",
  'sign': '/sign/DO_WEB_LOGIN',
  'dataNull': "/tmp/FHNCAPIS",
  'dataObj': "/tmp/FHAPIS"
}];
const _0x5ca108 = {
  'fh_api_tmp': "加密1",
  'api_tmp': "明文1",
  'api_tmp_plain': "明文0",
  'fh_api_tool': "工具1",
  'fh_api_direct': "加密2",
  'root_tmp': "老加密1"
};
function _0x5d6466(_0x1c7da9) {
  return _0x5ca108[_0x1c7da9] || '未知';
}
let _0x2e4263 = null;
let _0x3e8775 = '';
let _0x38cdef = false;
function _0x4368ba(_0x8c346d, _0x3987f2) {
  (_0x2e4263 = _0x3987f2, _0x3e8775 = _0x8c346d, _0x38cdef = true);
  try {
    _0x16e738["set"](_0x48240a["FH_ACTIVE_LINE"] + _0x8c346d, _0x3987f2['id'] + '|' + Date['now']());
  } catch (_0x3aeada) {}
}
function _0x36c2a6(_0x386a1e) {
  return _0x3e8775 === _0x386a1e ? _0x2e4263 : null;
}
function _0x2a633d(_0x2658e2) {
  _0x3e8775 === _0x2658e2 && (_0x2e4263 = null, _0x3e8775 = '');
  _0x38cdef = false;
  try {
    _0x16e738['remove'](_0x48240a["FH_ACTIVE_LINE"] + _0x2658e2);
  } catch (_0x240cae) {}
}
function _0x5382df(_0x52a4b9) {
  if (_0x3e8775 === _0x52a4b9 && _0x2e4263) return;
  try {
    const _0x316b64 = _0x16e738["get"](_0x48240a["FH_ACTIVE_LINE"] + _0x52a4b9) || '';
    if (!_0x316b64) return;
    const _0x46bb79 = _0x316b64["indexOf"]('|'), _0x21dc83 = _0x46bb79 < 0x0 ? _0x316b64 : _0x316b64['slice'](0x0, _0x46bb79), _0x1ed3c5 = parseInt(_0x46bb79 < 0x0 ? '' : _0x316b64['slice'](_0x46bb79 + 0x1), 0xa) || 0x0;
    if (!_0x1ed3c5 || _0x7b26fa(_0x1ed3c5) > _0x326bb6) {
      _0x16e738["remove"](_0x48240a["FH_ACTIVE_LINE"] + _0x52a4b9);
      return;
    }
    const _0x3318a9 = _0x2857a9["find"](function (_0x511459) {
      return _0x511459['id'] === _0x21dc83;
    });
    _0x3318a9 ? (_0x2e4263 = _0x3318a9, _0x3e8775 = _0x52a4b9, _0x38cdef = false) : _0x16e738["remove"](_0x48240a['FH_ACTIVE_LINE'] + _0x52a4b9);
  } catch (_0xf56ac5) {}
}
function _0x4506d1(_0x289295, _0x9c1ae4, _0xd9b3d, _0x207d10) {
  const _0x3abf3a = _0x36c2a6(_0x289295);
  if (!_0x3abf3a) return _0xd9b3d;
  if (_0x207d10 && _0x207d10["indexOf"](_0x3abf3a["mode"]) < 0x0) return _0xd9b3d;
  return _0x3abf3a[_0x9c1ae4] || _0xd9b3d;
}
async function _0x101119(_0x391cfd, _0x109cd3, _0x3db721) {
  for (let _0x33a292 = 0x0; _0x33a292 < 0x3; _0x33a292++) {
    try {
      const _0x26e300 = await _0x403514(_0x391cfd, _0x109cd3['sid'], {
        'timeoutMs': _0x3db721 || 0x5dc
      }), _0x40227b = _0x26e300 && (_0x26e300["sessionid"] || _0x26e300['data'] && _0x26e300["data"]["sessionid"]), _0x2b5fcf = _0x40227b == null ? '' : String(_0x40227b)["trim"]();
      if (_0x2b5fcf["length"] >= 0x8) return _0x2b5fcf;
    } catch (_0x48f5e5) {}
    if (_0x33a292 < 0x2) await _0x1bc2d5(0x96);
  }
  return '';
}
let _0x319cec = {};
async function _0x40da82(_0x744cdd, _0x14242e) {
  const _0x435f08 = _0x319cec[_0x744cdd];
  if (_0x435f08 && _0x7b26fa(_0x435f08['at']) < 0x5 * 0x3c * 0x3e8) {
    if (!_0x435f08['id']) return null;
    const _0x598226 = _0x2857a9["find"](function (_0x15e7fc) {
      return _0x15e7fc['id'] === _0x435f08['id'];
    });
    if (_0x598226) {
      const _0x502c64 = await _0x101119(_0x744cdd, _0x598226, _0x14242e);
      if (_0x502c64) return {
        'line': _0x598226,
        'sid': _0x502c64
      };
    }
  }
  for (const _0x2d0676 of _0x2857a9) {
    if (_0x2d0676["probe"] === false) continue;
    const _0x39efbd = await _0x101119(_0x744cdd, _0x2d0676, _0x14242e);
    if (_0x39efbd) return (_0x319cec[_0x744cdd] = {
      'at': Date["now"](),
      'id': _0x2d0676['id']
    }, {
      'line': _0x2d0676,
      'sid': _0x39efbd
    });
    await _0x1bc2d5(0x96);
  }
  return (_0x319cec[_0x744cdd] = {
    'at': Date["now"](),
    'id': ''
  }, null);
}
async function _0x337f31(_0x1cf7f2) {
  if (_0x36c2a6(_0x1cf7f2)) {
    if (_0x38cdef) return false;
    _0x2a633d(_0x1cf7f2);
  }
  const _0x4c940f = await _0x40da82(_0x1cf7f2);
  if (!_0x4c940f) return false;
  return (_0x4368ba(_0x1cf7f2, _0x4c940f["line"]), true);
}
let _0x4702a3 = {};
let _0x3e933c = {};
async function _0x574246(_0x480925, _0x23dae2, _0x4c49cf) {
  if (!_0x23dae2 || !_0x23dae2['sid']) return {
    'sid': ''
  };
  const _0x5940e7 = await _0x403514(_0x480925, _0x23dae2["sid"], {
    'raw': true,
    'timeoutMs': _0x4c49cf || 0x5dc
  });
  if (_0x5940e7 == null) return {
    'sid': ''
  };
  const _0x151576 = String(_0x5940e7);
  if ((/^\s*<(!doctype|html)/i)['test'](_0x151576)) return {
    'sid': '',
    'dead': true
  };
  let _0x25d7bc = null;
  try {
    _0x25d7bc = JSON["parse"](_0x151576);
  } catch (_0x1fd0bc) {}
  const _0x55564c = _0x25d7bc ? _0x25d7bc["sessionid"] || _0x25d7bc['data'] && _0x25d7bc["data"]['sessionid'] : '';
  return {
    'sid': _0x55564c == null ? '' : String(_0x55564c)["trim"]()
  };
}
async function _0x1e9c29(_0x49cc2c, _0x4f97c3) {
  if (_0x3e933c[_0x49cc2c] && _0x7b26fa(_0x3e933c[_0x49cc2c]) < 0xea60) return {
    'profile': null,
    'sid': '',
    'tried': ['(60s内已全失败,跳过)']
  };
  const _0x20b3c3 = [];
  for (const _0x628f3e of _0x2857a9) {
    if (_0x628f3e['probe'] === false) continue;
    const _0x1be34c = await _0x574246(_0x49cc2c, _0x628f3e, _0x4f97c3);
    _0x20b3c3["push"](_0x628f3e['id'] + '=' + (_0x1be34c["sid"] ? '通' : _0x1be34c['dead'] ? '拒' : '无'));
    if (_0x1be34c["sid"]) return (delete _0x3e933c[_0x49cc2c], {
      'profile': _0x628f3e,
      'sid': _0x1be34c["sid"],
      'tried': _0x20b3c3
    });
    if (_0x1be34c["dead"]) return (_0x3e933c[_0x49cc2c] = Date["now"](), {
      'profile': null,
      'sid': '',
      'tried': _0x20b3c3,
      'dead': true
    });
    await _0x1bc2d5(0x96);
  }
  return (_0x3e933c[_0x49cc2c] = Date["now"](), {
    'profile': null,
    'sid': '',
    'tried': _0x20b3c3
  });
}
async function _0x19bbd9(_0x222ef8) {
  try {
    const _0x206d37 = _0x4f44fb();
    if (_0x206d37 && (_0x206d37["fhLine"] === 'pro' || _0x206d37["fhLine"] === "pro2")) {
      const _0x1c9b86 = _0x206d37["fhLine"] === "pro" ? 'api_tmp' : "fh_api_tmp", _0x208bb1 = _0x2857a9["find"](function (_0x54dc6f) {
        return _0x54dc6f['id'] === _0x1c9b86;
      });
      if (_0x208bb1) return {
        'profile': _0x208bb1,
        'source': "账号指定"
      };
    }
  } catch (_0x2284bb) {}
  if (_0x4702a3[_0x222ef8]) return {
    'profile': _0x4702a3[_0x222ef8],
    'source': "会话记忆"
  };
  try {
    let _0x1f97bd = '', _0x21b45f = '';
    const _0x4e22f9 = _0x4f44fb(), _0x55234f = _0x4e22f9 ? String(_0x4e22f9["name"] || '')["trim"]() : '';
    _0x55234f && _0x55234f !== String(_0x4e22f9['host'] || '') && _0x55234f["length"] >= 0x2 && (_0x1f97bd = _0x301fac(_0x55234f), _0x21b45f = '直用');
    if (!_0x1f97bd) {
      const _0x26df09 = await _0x15c9c7(_0x222ef8);
      _0x26df09 && (_0x1f97bd = _0x26df09, _0x21b45f = '现问');
    }
    if (_0x1f97bd) {
      _0x48f5ef[_0x222ef8] = _0x1f97bd;
      const _0xe9cee0 = _0x502014(_0x1f97bd);
      if (_0xe9cee0) {
        const _0x58e797 = _0xe9cee0 === "pro" ? "api_tmp" : "fh_api_tmp", _0x214ac3 = _0x2857a9["find"](function (_0x57b956) {
          return _0x57b956['id'] === _0x58e797;
        });
        if (_0x214ac3) return (_0x4702a3[_0x222ef8] = _0x214ac3, _0x393388[_0x222ef8] = _0xe9cee0, {
          'profile': _0x214ac3,
          'source': _0x21b45f
        });
      }
    }
  } catch (_0x1f7048) {}
  let _0x32cf65 = '';
  try {
    if (_0x464d1d[_0x222ef8] === true) _0x32cf65 = "api_tmp";
  } catch (_0x5b9179) {}
  const _0x39d7dc = await _0x1e9c29(_0x222ef8);
  if (_0x39d7dc["profile"]) return (_0x4702a3[_0x222ef8] = _0x39d7dc["profile"], {
    'profile': _0x39d7dc["profile"],
    'source': '遍历' + (_0x32cf65 && _0x32cf65 === _0x39d7dc["profile"]['id'] ? '(型号提示一致)' : _0x32cf65 ? '(型号提示=' + _0x32cf65 + "不符)" : ''),
    'tried': _0x39d7dc['tried']
  });
  return _0x39d7dc["dead"] ? {
    'profile': null,
    'source': "被拒(停止遍历)",
    'tried': _0x39d7dc["tried"]
  } : null;
}
let _0x105dad = {};
const _0x48f5ef = {};
let _0x263d1d = 0x0;
async function _0x1a0c06(_0x51e44a) {
  let _0x2dd2df = null;
  const _0x30508c = Date["now"]();
  try {
    const _0x465ad8 = await _0x19bbd9(_0x51e44a);
    if (_0x465ad8 && _0x465ad8["profile"]) _0x2dd2df = _0x465ad8;
  } catch (_0x5b696e) {}
  if (!_0x2dd2df) try {
    const _0x549ba5 = await _0x1d1655(_0x51e44a), _0x26f33e = _0x549ba5 === "pro" ? "api_tmp" : "fh_api_tmp", _0x537637 = _0x2857a9["find"](function (_0x2f99ac) {
      return _0x2f99ac['id'] === _0x26f33e;
    });
    if (_0x537637) _0x2dd2df = {
      'profile': _0x537637,
      'source': "回落旧判定(" + _0x549ba5 + ')'
    };
  } catch (_0x4a49b9) {}
  if (!_0x2dd2df) _0x2dd2df = {
    'profile': _0x2857a9[0x0],
    'source': "兜底默认"
  };
  try {
    if (_0x2dd2df["source"] && _0x2dd2df["source"]['indexOf']('遍历') === 0x0) _0x263d1d = Date["now"]();
  } catch (_0x103441) {}
  try {
    !_0x105dad[_0x51e44a] && _0x2dd2df["profile"] && (_0x105dad[_0x51e44a] = true, _0x578483('info', '全局', '档案\x20' + _0x5d6466(_0x2dd2df["profile"]['id']) + '\x20·\x20' + _0x2dd2df["source"]));
  } catch (_0x3b1e3f) {}
  return _0x2dd2df;
}
async function _0x3c2676(_0x570ba2, _0x8b4026) {
  try {
    const _0x4183dc = await _0x44d3fc(_0x570ba2);
    if (_0x4183dc === true) return "session16";
    if (_0x4183dc === false) return "none";
  } catch (_0x2a830b) {}
  return _0x8b4026 && _0x8b4026['cipher'] || "none";
}
function _0x2cd410(_0x381e38, _0x51f039) {
  try {
    _0x578483('warn', '全局', '兜底：' + (_0x51f039 === "web" ? "加密→明文" : "明文→加密") + "通（不改档案）");
  } catch (_0x4dd400) {}
}
function _0x5e4cf3(_0x52e2ab) {
  if (_0x52e2ab == null) return false;
  if (typeof _0x52e2ab === "string") {
    const _0x4997dd = _0x52e2ab['trim']();
    return _0x4997dd["length"] > 0x0 && !(/^<(!doctype|html)/i)["test"](_0x4997dd);
  }
  if (typeof _0x52e2ab === "object") return Object["keys"](_0x52e2ab)['length'] > 0x0;
  return true;
}
async function _0x78e9a(_0x5614d1) {
  try {
    return await _0x3c2676(_0x5614d1, (await _0x1a0c06(_0x5614d1))['profile']) === "session16";
  } catch (_0x4ff79e) {
    return false;
  }
}
function _0x53fe55(_0x2024bc, _0x7d268d) {
  const _0x57d1c2 = _0x4702a3[_0x2024bc];
  if (_0x57d1c2 && _0x57d1c2["toolPath"]) return _0x57d1c2["toolPath"];
  return _0x7d268d ? _0x4506d1(_0x2024bc, "dataObj", "/api/tmp/FHTOOLAPIS", ["tool"]) : _0x4506d1(_0x2024bc, "dataNull", "/api/tmp/FHTOOLAPIS", ["tool"]);
}
let _0x52fdf2 = '';
async function _0x4b23bd(_0x4c5ab8) {
  const _0x50348d = _0x36c2a6(_0x4c5ab8), _0x3d39c1 = _0x50348d && _0x50348d['id'] === "fh_api_direct" ? "/fh_api/other_logged" : "/fh_api/tmp/other_logged";
  try {
    const _0x5ef174 = await _0x403514(_0x4c5ab8, _0x3d39c1, {
      'timeoutMs': 0x9c4
    });
    if (!_0x5ef174) return '';
    const _0x274f72 = _0x5ef174['login_ip'] || _0x5ef174["loginIP"] || _0x5ef174["data"] && _0x5ef174["data"]['login_ip'] || '', _0x3a6b78 = _0x5ef174["login_status"] !== undefined ? _0x5ef174["login_status"] : _0x5ef174["result"];
    return _0x274f72 || Number(_0x3a6b78) === 0x1 ? String(_0x274f72 || "occupied") : '';
  } catch (_0x255375) {
    return '';
  }
}
async function _0x287b5e(_0x1e5789) {
  for (let _0x288c5b = 0x0; _0x288c5b < 0x2; _0x288c5b++) {
    try {
      const _0x1d003c = await _0x403514(_0x1e5789, "/fh_api/tmp/FHNCAPIS?ajaxmethod=is_encrypt", {
        'timeoutMs': 0xfa0
      });
      if (_0x1d003c && _0x1d003c['data'] && String(_0x1d003c["data"])["length"] > 0x28) return true;
      if (_0x1d003c && !_0x1d003c["_err"]) return false;
    } catch (_0x3b3328) {}
    await _0x1bc2d5(0x190);
  }
  return null;
}
let _0x393388 = {};
let _0x35c883 = {};
let _0x464d1d = {};
function _0x301fac(_0x4418bc) {
  return String(_0x4418bc == null ? '' : _0x4418bc)["trim"]()["toUpperCase"]();
}
function _0x502014(_0x27e791) {
  const _0x3ab9ff = _0x301fac(_0x27e791);
  if (!_0x3ab9ff) return '';
  try {
    const _0x3d3074 = _0x16e738["get"](_0x48240a["MODEL_LINE"] + _0x3ab9ff) || '';
    return _0x3d3074 === "pro" || _0x3d3074 === "pro2" ? _0x3d3074 : '';
  } catch (_0x5ec642) {
    return '';
  }
}
function _0x121e32(_0x4b9342, _0x1c78f9) {
  const _0x406a84 = _0x301fac(_0x4b9342);
  if (!_0x406a84 || _0x406a84['length'] < 0x2) return;
  if (_0x1c78f9 !== "pro" && _0x1c78f9 !== "pro2") return;
  try {
    _0x16e738["set"](_0x48240a["MODEL_LINE"] + _0x406a84, _0x1c78f9);
  } catch (_0x3edca0) {}
}
async function _0x44d3fc(_0x4086c5) {
  if (_0x464d1d[_0x4086c5] === true) return true;
  if (_0x464d1d[_0x4086c5] === false) return false;
  try {
    var _0x406bf4 = _0x16e738['get'](_0x48240a['FH_ENC16'] + _0x4086c5) || '';
    if (_0x406bf4 === '1') return (_0x464d1d[_0x4086c5] = true, true);
    if (_0x406bf4 === '0') return (_0x464d1d[_0x4086c5] = false, false);
  } catch (_0x1998c2) {}
  try {
    var _0xcc1563 = await _0x15c9c7(_0x4086c5);
    if (_0xcc1563) {
      var _0x386259 = _0x1ef177["test"](_0xcc1563);
      _0x464d1d[_0x4086c5] = _0x386259;
      try {
        _0x16e738['set'](_0x48240a["FH_ENC16"] + _0x4086c5, _0x386259 ? '1' : '0');
      } catch (_0x3324da) {}
      return _0x386259;
    }
  } catch (_0x103c99) {}
  return null;
}
function _0x4ff2bb(_0x132d56, _0x123ca6) {
  try {
    var _0x1f3315 = _0x301fac(_0x123ca6);
    if (!_0x1f3315) return;
    var _0x5d6848 = _0x1ef177["test"](_0x1f3315);
    (_0x464d1d[_0x132d56] = _0x5d6848, _0x16e738["set"](_0x48240a["FH_ENC16"] + _0x132d56, _0x5d6848 ? '1' : '0'));
  } catch (_0x40129b) {}
}
let _0x13ac2e = '';
async function _0x15c9c7(_0x3aabdb) {
  try {
    const _0x6ce5ff = await _0x403514(_0x3aabdb, "/api/tmp/FHTOOLAPIS?ajaxmethod=app_get_base_info&sessionid=", {
      'timeoutMs': 0x5dc
    });
    try {
      if (_0x6ce5ff && typeof _0x6ce5ff === "object") {
        const _0x25a403 = Object["keys"](_0x6ce5ff)["sort"]()['join'](',')["slice"](0x0, 0xb4);
        _0x25a403 && _0x25a403 !== _0x13ac2e && (_0x13ac2e = _0x25a403, _0x578483('info', '全局', "工具口 " + Object["keys"](_0x6ce5ff)["length"] + '\x20项'));
      }
    } catch (_0x5c6574) {}
    const _0x417dcf = _0x6ce5ff && (_0x6ce5ff["modelName"] || _0x6ce5ff["ModelName"]);
    return _0x301fac(_0x417dcf);
  } catch (_0xd7910) {
    return '';
  }
}
async function _0x1d1655(_0x3dbc75) {
  try {
    const _0x49683f = _0x4f44fb();
    if (_0x49683f && (_0x49683f["fhLine"] === "pro" || _0x49683f["fhLine"] === "pro2")) return _0x49683f["fhLine"];
  } catch (_0x54db37) {}
  if (_0x35c883[_0x3dbc75]) return _0x35c883[_0x3dbc75];
  _0x5382df(_0x3dbc75);
  const _0x497fdf = _0x36c2a6(_0x3dbc75);
  if (_0x497fdf) return _0x497fdf["mode"] === 'enc' || _0x497fdf["mode"] === "legacy" ? "pro2" : "pro";
  if (_0x393388[_0x3dbc75]) return _0x393388[_0x3dbc75];
  try {
    const _0x2452ee = await _0x15c9c7(_0x3dbc75);
    _0x4ff2bb(_0x3dbc75, _0x2452ee);
    const _0x417a0a = _0x502014(_0x2452ee);
    if (_0x417a0a) return (_0x393388[_0x3dbc75] = _0x417a0a, _0x417a0a);
  } catch (_0xb3df09) {}
  let _0x3dd792 = '', _0x1778a5 = 0x0;
  try {
    (_0x3dd792 = _0x16e738["get"](_0x48240a["FH_LINE"] + _0x3dbc75) || '', _0x1778a5 = parseInt(_0x16e738["get"](_0x48240a["FH_PROBE_AT"] + _0x3dbc75), 0xa) || 0x0);
  } catch (_0x483d22) {}
  if ((_0x3dd792 === 'pro2' || _0x3dd792 === "pro") && _0x1778a5 && _0x7b26fa(_0x1778a5) < _0x3ff4d1) return (_0x393388[_0x3dbc75] = _0x3dd792, _0x3dd792);
  const _0x558fb5 = await _0x287b5e(_0x3dbc75);
  let _0x43916c;
  if (_0x558fb5 === true) _0x43916c = "pro2"; else {
    if (_0x558fb5 === false) _0x43916c = "pro"; else {
      let _0x45943e = 0x0;
      try {
        _0x45943e = parseInt(_0x16e738["get"](_0x48240a["FH_LOGIN_AT"] + _0x3dbc75), 0xa) || 0x0;
      } catch (_0x4dee0a) {}
      _0x43916c = _0x45943e && _0x7b26fa(_0x45943e) < 0x18 * 0x3c * 0x3c * 0x3e8 ? "pro2" : "pro";
    }
  }
  let _0x39a69a = _0x43916c;
  if (_0x558fb5 !== true) {
    const _0x16105a = _0x43916c === 'pro2' ? _0x2857a9[0x0] : _0x2857a9[0x1], _0x3536f3 = _0x43916c === "pro2" ? _0x2857a9[0x1] : _0x2857a9[0x0], _0xea1d6 = await _0x101119(_0x3dbc75, _0x16105a);
    if (!_0xea1d6) {
      const _0x1549ec = await _0x101119(_0x3dbc75, _0x3536f3);
      if (_0x1549ec) _0x39a69a = _0x43916c === "pro2" ? "pro" : "pro2";
    }
  }
  _0x393388[_0x3dbc75] = _0x39a69a;
  if (_0x558fb5 === true || _0x558fb5 === false) try {
    (_0x16e738["set"](_0x48240a["FH_LINE"] + _0x3dbc75, _0x43916c), _0x16e738["set"](_0x48240a["FH_PROBE_AT"] + _0x3dbc75, String(Date["now"]())));
  } catch (_0x246994) {}
  return _0x39a69a;
}
async function _0x53a36b(_0x25575f) {
  const _0xd87274 = (await _0x1a0c06(_0x25575f))["profile"], _0x42ea82 = _0xd87274 && _0xd87274["mode"] === "web" && _0xd87274["sid"] ? _0xd87274["sid"] : _0x4506d1(_0x25575f, "sid", "/api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid", ['web']);
  for (let _0x4eb977 = 0x0; _0x4eb977 < 0x2; _0x4eb977++) {
    const _0x3b8b51 = await _0x403514(_0x25575f, _0x42ea82, {
      'timeoutMs': 0x1388
    });
    if (_0x3b8b51 && _0x3b8b51["sessionid"]) return _0x3b8b51["sessionid"];
    if (_0x4eb977 < 0x1) await _0x1bc2d5(0xc8);
  }
  return null;
}
let _0x336845 = 0x0;
let _0x335e3d = '';
let _0xc77ead = 0x0;
let _0x50f71f = 0x0;
let _0x46803e = false;
let _0x4bfecb = null;
function _0x4003cc() {
  if (!_0x336845) return 0x0;
  const _0x3ce81c = _0x335e3d === 'limited' ? _0xc77ead > 0x0 ? _0xc77ead : _0x4dec1d["limitedCool"] : _0x4dec1d["failCool"], _0x3335c0 = _0x3ce81c - _0x7b26fa(_0x336845);
  return _0x3335c0 > 0x0 ? _0x3335c0 : 0x0;
}
async function _0x5ca67b(_0x5edea8, _0x45e820) {
  if (!_0x45e820 || !String(_0x45e820["pass"] || '')) return "nopass";
  const _0xafb1b0 = await _0x53a36b(_0x5edea8);
  if (!_0xafb1b0) return 'unreachable';
  const _0x2f7746 = _0x45e820['user'] || "admin", _0x3628b7 = _0x45e820["pass"] || '', _0x53dd09 = (await _0x1a0c06(_0x5edea8))["profile"], _0x5ec628 = (_0x53dd09 && _0x53dd09["mode"] === "web" && _0x53dd09["sign"] ? _0x53dd09["sign"] : _0x4506d1(_0x5edea8, "sign", "/api/sign/DO_WEB_LOGIN", ["web"])) + "?_0." + Math["random"](), _0xf3781 = {
    'dataObj': {
      'username': _0x2f7746,
      'userName': _0x2f7746,
      'password': _0x3628b7,
      'Password': _0x3628b7
    },
    'ajaxmethod': "DO_WEB_LOGIN",
    'sessionid': _0xafb1b0
  };
  let _0x19288d;
  if (await _0x44d3fc(_0x5edea8) === true) {
    const _0x13949d = _0x779261(_0xf3781, _0xafb1b0);
    if (!_0x13949d) return "fail";
    const _0x55a1a1 = await _0x403514(_0x5edea8, _0x5ec628, {
      'method': "POST",
      'body': _0x13949d["body"],
      'referer': _0x5edea8 + "/login.html",
      'timeoutMs': 0x1770,
      'raw': true
    });
    try {
      _0x3fade3 = {
        'line': "pro",
        'body': String(_0x55a1a1 == null ? '空' : _0x55a1a1)["slice"](0x0, 0xc8)
      };
    } catch (_0x5a0d8f) {}
    _0x19288d = _0x1a7603(_0x55a1a1, _0x13949d["key"]);
  } else {
    _0x19288d = await _0x403514(_0x5edea8, _0x5ec628, {
      'method': "POST",
      'body': _0xf3781,
      'referer': _0x5edea8 + "/login.html",
      'timeoutMs': 0x1770
    });
    try {
      _0x3fade3 = {
        'line': "pro",
        'body': JSON["stringify"](_0x19288d)["slice"](0x0, 0xc8)
      };
    } catch (_0x51ebd6) {}
  }
  if (!_0x19288d) return 'fail';
  if (typeof _0x19288d === "string") {
    const _0x733f11 = _0x50626a(_0x19288d);
    if (_0x733f11) _0x19288d = _0x733f11;
  }
  const _0x5caa52 = _0x5879cc(_0x19288d), _0x62d26 = _0x5caa52 ? _0x19288d['login_result'] !== undefined ? _0x19288d["login_result"] : _0x19288d["result"] : null;
  if (_0x5caa52 && _0x62d26 !== undefined && _0x62d26 !== null && (Number(_0x62d26) === 0x0 || Number(_0x62d26) === 0x1)) {
    try {
      const _0x5b298d = _0x19288d["user"] !== undefined ? _0x19288d["user"] : _0x19288d["login_user"] !== undefined ? _0x19288d["login_user"] : _0x19288d["level"], _0x298b40 = parseInt(_0x5b298d, 0xa);
      if (!isNaN(_0x298b40)) _0x4bb4e9(_0x5edea8, _0x298b40);
    } catch (_0x1c0c23) {}
    return 'ok';
  }
  const _0x241eed = _0x5caa52 ? parseInt(_0x19288d["remaintime"], 0xa) || 0x0 : 0x0;
  if (Number(_0x62d26) === 0x9 || _0x241eed > 0x0) return (_0xc77ead = Math["min"](_0x241eed * 0x3e8, 0x493e0), "limited");
  const _0x2a9107 = _0x248216(_0x62d26);
  if (_0x2a9107) return _0x2a9107;
  if (!_0x5caa52) {
    if ((/403|forbidden|unauthorized/i)["test"](String(_0x19288d || ''))) return "expired";
    return "nolib";
  }
  return "fail";
}
async function _0x149445(_0x2eb1f0, _0x21960a, _0x20e33d) {
  if (!_0x20e33d && _0x46803e) return true;
  const _0x2e9868 = _0x4003cc() > 0x0 && Date["now"]() <= _0x3c8d6b && !_0x83d856 && _0x335e3d !== "limited";
  if (_0x4003cc() > 0x0 && !_0x2e9868) return false;
  if (_0x2e9868) _0x83d856 = true;
  if (!_0x20e33d) {
    let _0x3b6415 = 0x0;
    try {
      _0x3b6415 = parseInt(_0x16e738["get"](_0x48240a["PWEB_LOGIN_AT"] + _0x2eb1f0), 0xa) || 0x0;
    } catch (_0x4f72d8) {}
    if (_0x3b6415 && _0x7b26fa(_0x3b6415) < _0x5d4f26) return (_0x46803e = true, true);
  }
  if (_0x20e33d && _0x50f71f && _0x7b26fa(_0x50f71f) < _0x4dec1d['okGap']) return _0x46803e;
  if (_0x4bfecb) return _0x4bfecb;
  return (_0x4bfecb = _0x5ca67b(_0x2eb1f0, _0x21960a)["then"](function (_0x895d2e) {
    _0x4bfecb = null;
    if (_0x895d2e === 'ok') {
      (_0x46803e = true, _0x336845 = 0x0, _0x50f71f = Date["now"](), _0x474b68 = '');
      try {
        _0x16e738["set"](_0x48240a["PWEB_LOGIN_AT"] + _0x2eb1f0, String(Date['now']()));
      } catch (_0x282fce) {}
      return true;
    }
    return (_0x46803e = false, _0x336845 = Date['now'](), _0x335e3d = _0x895d2e === 'limited' ? "limited" : "fail", _0x474b68 = _0x895d2e, false);
  }, function () {
    return (_0x4bfecb = null, _0x336845 = Date['now'](), _0x335e3d = "fail", _0x474b68 = "fail", false);
  }), _0x4bfecb);
}
async function _0x1f5039(_0x4e38f6, _0x5a6325, _0x56a0af, _0x55a3c, _0x1b07fa) {
  const _0x21dd14 = await _0x1a0c06(_0x4e38f6), _0x51ca0d = await _0x3c2676(_0x4e38f6, _0x21dd14["profile"]), _0x1ea0a5 = _0x51ca0d === "session16", _0x1d9f9c = async () => {
    const _0x3b60e0 = await _0x53a36b(_0x4e38f6);
    if (!_0x3b60e0) return null;
    const _0xa22a83 = {
      'dataObj': _0x56a0af == null ? null : _0x56a0af,
      'ajaxmethod': _0x5a6325,
      'sessionid': _0x3b60e0
    };
    if (_0x55a3c) _0xa22a83["multipost"] = 0x1;
    const _0x5c7e52 = function (_0x3bc205, _0x360058) {
      if (!_0x1b07fa && _0x21dd14["profile"] && _0x21dd14['profile']["mode"] === "web" && _0x21dd14["profile"][_0x3bc205]) return _0x21dd14["profile"][_0x3bc205];
      return _0x4506d1(_0x4e38f6, _0x3bc205, _0x360058, ['web']);
    }, _0x27f17c = _0x56a0af == null ? _0x5c7e52("dataNull", "/api/tmp/FHNCAPIS") : _0x5c7e52('dataObj', "/api/tmp/FHAPIS");
    if (_0x1ea0a5) {
      const _0x305181 = _0x779261(_0xa22a83, _0x3b60e0);
      if (!_0x305181) return null;
      const _0x3aa383 = await _0x403514(_0x4e38f6, _0x27f17c + '?_0.' + Math["random"](), {
        'method': "POST",
        'body': _0x305181["body"],
        'referer': _0x4e38f6 + '/main.html',
        'timeoutMs': 0x1770,
        'raw': true
      });
      return _0x1a7603(_0x3aa383, _0x305181["key"]);
    }
    return await _0x403514(_0x4e38f6, _0x27f17c + "?_0." + Math["random"](), {
      'method': "POST",
      'body': _0xa22a83,
      'referer': _0x4e38f6 + "/main.html",
      'timeoutMs': 0x1770
    });
  };
  let _0x7447ed = await _0x1d9f9c();
  _0x7447ed == null && (await _0x1bc2d5(0x258), _0x7447ed = await _0x1d9f9c());
  if (_0x7447ed == null) {
    if (await _0x2ae0a1(_0x4e38f6, _0x4f44fb() || ({}), true)) _0x7447ed = await _0x1d9f9c();
  }
  if (_0x7447ed == null) delete _0x4702a3[_0x4e38f6];
  if (_0x7447ed == null && !_0x1b07fa) {
    const _0x3a3d96 = await _0x3d8483(_0x4e38f6, _0x5a6325, _0x56a0af, _0x55a3c, undefined, true);
    if (_0x5e4cf3(_0x3a3d96)) return (_0x2cd410(_0x4e38f6, 'enc'), _0x3a3d96);
  }
  return _0x7447ed;
}
let _0x8712e2 = '';
let _0x236325 = false;
let _0x4c0ccf = null;
let _0x2fa85b = "admin";
let _0x34e6ab = null;
let _0x24baca = 0x0;
let _0x5bda90 = '';
function _0x22a7ec() {
  let _0x28b358 = 'none', _0x36deaa = false;
  if (_0x2fa85b === "superadmin") (_0x36deaa = true, _0x28b358 = 'login'); else {
    if (_0x24baca === 0x3) (_0x36deaa = true, _0x28b358 = "heartbeat"); else try {
      if (_0x34e6ab === null) {
        const _0x34ff33 = _0x4f44fb(), _0x96f38e = _0x34ff33 ? _0xd64c49(_0x34ff33["host"]) : '';
        _0x34e6ab = _0x96f38e ? String(_0x16e738["get"](_0x48240a["FH_USER_LVL"] + _0x96f38e) || '') : '';
      }
      _0x34e6ab === '3' && (_0x36deaa = true, _0x28b358 = "keychain");
    } catch (_0x1361f4) {}
  }
  try {
    const _0x11d03b = (_0x36deaa ? '1' : '0') + '|' + _0x28b358 + '|' + _0x2fa85b + '|' + String(_0x34e6ab) + '|' + _0x24baca;
    _0x5bda90 !== _0x11d03b && (_0x5bda90 = _0x11d03b, _0x578483("info", '全局', "身份 " + (_0x36deaa ? '超密' : '普通') + '·' + _0x28b358));
  } catch (_0x5c7012) {}
  return _0x36deaa;
}
function _0x4bb4e9(_0x41467f, _0x4039fc) {
  const _0x575640 = Number(_0x4039fc) === 0x3;
  (_0x24baca = _0x575640 ? 0x3 : 0x1, _0x2fa85b = _0x575640 ? "superadmin" : 'admin', _0x34e6ab = _0x575640 ? '3' : '1');
  try {
    if (String(_0x16e738["get"](_0x48240a["FH_USER_LVL"] + _0x41467f) || '') !== _0x34e6ab) _0x16e738["set"](_0x48240a["FH_USER_LVL"] + _0x41467f, _0x34e6ab);
  } catch (_0x335530) {}
}
let _0x5f0c6d = 0x0;
let _0x5259e1 = '';
let _0x3abdfd = '';
let _0x474b68 = '';
let _0x5531d8 = 0x0;
let _0x2860c2 = 0x0;
let _0x3c8d6b = 0x0;
let _0x83d856 = false;
function _0x5cc0c9(_0x408fed) {
  if (Date["now"]() > _0x3c8d6b) return false;
  if (_0x83d856) return false;
  if (_0x3abdfd === "limited") return false;
  return _0x5259e1 === _0x408fed;
}
function _0x56d8fc(_0x3e287a) {
  if (_0x5259e1 !== _0x3e287a || !_0x5f0c6d) return 0x0;
  if (_0x3abdfd === "limited" && _0x2860c2 > 0x0) {
    const _0x1c66c3 = _0x2860c2 - _0x7b26fa(_0x5f0c6d);
    return _0x1c66c3 > 0x0 ? _0x1c66c3 : 0x0;
  }
  const _0x1219c3 = _0x3abdfd === 'limited' ? _0x4dec1d['limitedCool'] : _0x4dec1d["failCool"], _0x500ae8 = _0x1219c3 - _0x7b26fa(_0x5f0c6d);
  return _0x500ae8 > 0x0 ? _0x500ae8 : 0x0;
}
const _0x5d4f26 = _0x4dec1d["tsTTL"];
function _0x2e047b(_0x3e2faf, _0x11617f, _0x23f33d) {
  const _0x4b16de = !!_0x23f33d['knownDead'];
  if (!_0x11617f && _0x236325 && _0x8712e2 === _0x3e2faf) return {
    'type': 'allow',
    'value': true
  };
  const _0x5c9ad3 = _0x56d8fc(_0x3e2faf) > 0x0 && _0x5cc0c9(_0x3e2faf), _0x1da176 = _0x4b16de && _0x3abdfd !== "limited";
  if (_0x56d8fc(_0x3e2faf) > 0x0 && !_0x5c9ad3 && !_0x1da176) return {
    'type': 'deny'
  };
  if (_0x5c9ad3) _0x83d856 = true;
  if (!_0x11617f) {
    let _0x3b58c2 = 0x0;
    try {
      _0x3b58c2 = parseInt(_0x16e738["get"](_0x48240a["FH_LOGIN_AT"] + _0x3e2faf), 0xa) || 0x0;
    } catch (_0x555f4f) {}
    if (_0x3b58c2 && _0x7b26fa(_0x3b58c2) < _0x5d4f26) return (_0x236325 = true, _0x8712e2 = _0x3e2faf, {
      'type': "allow",
      'value': true
    });
  }
  if (_0x11617f && _0x8712e2 === _0x3e2faf && _0x5531d8 && _0x7b26fa(_0x5531d8) < _0x4dec1d['okGap']) return {
    'type': "allow",
    'value': _0x236325
  };
  if (_0x4c0ccf && _0x8712e2 === _0x3e2faf) return {
    'type': "shared",
    'promise': _0x4c0ccf
  };
  return {
    'type': 'pass'
  };
}
async function _0x2ae0a1(_0x39ca4f, _0x5f52d0, _0xfe867, _0x59ff7e) {
  _0x59ff7e = _0x59ff7e || ({});
  if (!!_0x59ff7e['knownDead']) _0xfe867 = true;
  const _0x5aa564 = (await _0x1a0c06(_0x39ca4f))['profile'];
  if (_0x5aa564 && (_0x5aa564["mode"] === "web" || _0x5aa564["mode"] === "tool")) return _0x149445(_0x39ca4f, _0x5f52d0, _0xfe867);
  const _0x34f092 = _0x2e047b(_0x39ca4f, _0xfe867, _0x59ff7e);
  if (_0x34f092['type'] === "allow") return _0x34f092["value"];
  if (_0x34f092["type"] === 'deny') return false;
  if (_0x34f092["type"] === 'shared') return _0x34f092['promise'];
  return (_0x8712e2 = _0x39ca4f, _0x4c0ccf = (async function () {
    try {
      let _0x185313 = '';
      try {
        const _0x14237f = await _0x4b23bd(_0x39ca4f);
        _0x14237f && (_0x185313 = _0x14237f !== "occupied" ? _0x14237f : "occupied", _0x578483('warn', '全局', '检测' + (_0x14237f !== "occupied" ? '(' + _0x14237f + ')' : '') + "登录→接管"));
      } catch (_0x1ae9ce) {}
      let _0x38037b;
      try {
        _0x38037b = await _0x20819e(_0x39ca4f, _0x5f52d0);
      } catch (_0x59c259) {
        return (_0x5f0c6d = Date['now'](), _0x5259e1 = _0x39ca4f, _0x3abdfd = "fail", _0x474b68 = 'fail', _0x578483("error", '全局', "登录失败 请求异常"), false);
      }
      if (_0x38037b === 'ok') {
        (_0x236325 = true, _0x5f0c6d = 0x0, _0x5259e1 = '', _0x5531d8 = Date["now"](), _0x474b68 = '', _0xfd4bec = Date["now"]());
        try {
          _0x16e738['set'](_0x48240a["FH_LOGIN_AT"] + _0x39ca4f, String(Date["now"]()));
        } catch (_0x396be8) {}
        _0x578483("info", '全局', (_0x59ff7e["knownDead"] ? '补卡成功（' : "登录成功（") + (_0x2fa85b || "admin") + '）');
        if (_0x185313) try {
          __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('已接管网页后台','success');");
        } catch (_0x5992be) {}
        return true;
      }
      (_0x236325 = false, _0x5f0c6d = Date["now"](), _0x5259e1 = _0x39ca4f, _0x3abdfd = _0x38037b === 'limited' ? "limited" : _0x38037b === "expired" ? "expired" : 'fail', _0x474b68 = _0x38037b);
      const _0x458394 = _0x38037b === "unreachable" && _0x263d1d && _0x7b26fa(_0x263d1d) < 0xbb8;
      return (_0x458394 ? _0x578483('info', '全局', _0x59ff7e["knownDead"] ? "补卡瞬时·静默" : "登录瞬时·静默") : _0x578483(_0x38037b === 'unreachable' ? "warn" : "error", '全局', (_0x59ff7e["knownDead"] ? "补卡失败 " : "登录失败 ") + _0x18c954(_0x38037b)), false);
    } finally {
      _0x4c0ccf = null;
    }
  })(), _0x4c0ccf);
}
function _0x3f6ab9() {
  const _0x436ccc = (_0x18c2c1, _0x5d08bd, _0x3fe606) => {
    const _0x2550fa = {};
    return (Object['keys'](_0x5d08bd)['forEach'](function (_0x3e477c) {
      _0x2550fa[_0x3fe606 + _0x3e477c] = _0x18c2c1 + _0x5d08bd[_0x3e477c];
    }), _0x2550fa);
  }, _0x4f9b88 = (_0x3f142e, _0x22ad29) => {
    const _0x14e24a = {};
    return (Object['keys'](_0x3f142e)['forEach'](function (_0x5ebf2a) {
      _0x14e24a[_0x22ad29 + _0x5ebf2a] = _0x3f142e[_0x5ebf2a];
    }), _0x14e24a);
  };
  return {
    'data_1': _0x436ccc(_0x2b8557['pcc'], _0x2b8557["pccF"], "PCC_"),
    'data_2': _0x436ccc(_0x2b8557["pcc2"], _0x2b8557["pccF"], "PCC_"),
    'data_3': {
      'url': _0x2b8557["scc"],
      'num': 0x4,
      'node': _0x4f9b88(_0x2b8557["sccF"], "SCC_")
    },
    'data_4': {
      'sccNumbers': _0x2b8557["scc"] + _0x2b8557['sccNums']
    }
  };
}
const _0x4af19c = true;
let _0x43460f = 0x0;
let _0x27bcdf = false;
const _0x2d0d97 = "X_FH_MobileNetwork.RadioSignalParameter.";
const _0xce8d65 = {
  'modelName': "DeviceInfo.ModelName",
  'fw': "DeviceInfo.SoftwareVersion",
  'RSSI': _0x2d0d97 + "RSSI",
  'NR_Band': _0x2d0d97 + 'NR_Band',
  'PCI': _0x2d0d97 + "PCI",
  'BAND': _0x2d0d97 + "BAND",
  'EARFCN': _0x2d0d97 + "EARFCN",
  'RSRP': _0x2d0d97 + "RSRP",
  'SINR': _0x2d0d97 + "SINR",
  'RSRQ': _0x2d0d97 + "RSRQ",
  'SSB_RSRP': _0x2d0d97 + "SSB_RSRP",
  'SSB_SINR': _0x2d0d97 + "SSB_SINR",
  'SSB_RSSI': _0x2d0d97 + "SSB_RSSI",
  'SSB_RSRQ': _0x2d0d97 + "SSB_RSRQ",
  'pccRssi': "X_FH_MobileNetwork.NetworkInfo.PCCInfo.RSSI",
  'WorkMode': _0x2d0d97 + "WorkMode",
  'DlBandWidth': _0x2d0d97 + "DlBandWidth",
  'UlBandWidth': _0x2d0d97 + "UlBandWidth",
  'NetworkMode': "X_FH_MobileNetwork.SIM.1.NetworkMode",
  'PLMN': _0x2d0d97 + "PLMN",
  'carrierName': "X_FH_MobileNetwork.SIM.1.CarrierName",
  'simPlmn': "X_FH_MobileNetwork.SIM.1.plmn",
  'DL_AMBR': _0x2d0d97 + "DL_AMBR",
  'UL_AMBR': _0x2d0d97 + "UL_AMBR",
  'QCI': _0x2d0d97 + 'QCI',
  'BAND_NBR': _0x2d0d97 + "BAND_NBR",
  'EARFCN_NBR': _0x2d0d97 + "EARFCN_NBR",
  'PCI_NBR': _0x2d0d97 + "PCI_NBR",
  'RSRP_NBR': _0x2d0d97 + "RSRP_NBR",
  'SINR_NBR': _0x2d0d97 + "SINR_NBR",
  'RSRQ_NBR': _0x2d0d97 + 'RSRQ_NBR',
  'todayRxBytes': "X_FH_MobileNetwork.TrafficStats.TodayTotalRxBytes",
  'todayTxBytes': "X_FH_MobileNetwork.TrafficStats.TodayTotalTxBytes",
  'monthRxBytes': "X_FH_MobileNetwork.TrafficStats.MonthRxBytes",
  'monthTxBytes': 'X_FH_MobileNetwork.TrafficStats.MonthTxBytes'
};
function _0x1186b4() {
  const _0x542a47 = _0x3f6ab9();
  return {
    'data_1': _0xce8d65,
    'data_2': _0x17227b,
    'data_3': _0x542a47["data_1"],
    'data_4': _0x542a47["data_2"],
    'data_5': _0x542a47["data_3"],
    'data_6': _0x542a47['data_4']
  };
}
let _0x9b1b5d = 0x0;
async function _0x3d8483(_0x3ff5c0, _0x57dea0, _0x5a2171, _0x54636c, _0x1eef24, _0x40b5e6, _0x4f502c) {
  const _0x377bd3 = _0x54636c ? '大包' : _0x239103[_0x57dea0] || _0x57dea0, _0x373bfa = Date["now"](), _0x42ff01 = [], _0x459a37 = await _0x1a0c06(_0x3ff5c0);
  if (!_0x40b5e6 && _0x459a37['profile'] && (_0x459a37["profile"]["mode"] === "web" || _0x459a37["profile"]["mode"] === "tool")) return _0x1f5039(_0x3ff5c0, _0x57dea0, _0x5a2171, _0x54636c, false);
  if (_0x18201e[_0x3ff5c0]) {
    let _0x85f884 = _0x5531d8;
    try {
      const _0x1a90e2 = parseInt(_0x16e738["get"](_0x48240a['FH_LOGIN_AT'] + _0x3ff5c0), 0xa) || 0x0;
      if (_0x1a90e2 > _0x85f884) _0x85f884 = _0x1a90e2;
    } catch (_0x3be7e1) {}
    _0x85f884 && Date["now"]() - _0x85f884 > 0x493e0 && (!_0x9b1b5d || _0x7b26fa(_0x9b1b5d) > 0x7530) && (_0x9b1b5d = Date["now"](), _0x578483("info", '全局', "死透预检 补卡"), await _0x2ae0a1(_0x3ff5c0, _0x4f44fb() || ({}), true, {
      'knownDead': true
    }));
  }
  _0x18201e[_0x3ff5c0] && !(_0xfd4bec && _0x7b26fa(_0xfd4bec) < 0x46cd0) && (await _0x200899(_0x3ff5c0) ? _0xfd4bec = Date["now"]() : await _0x2ae0a1(_0x3ff5c0, _0x4f44fb() || ({}), false, {
    'knownDead': true
  }));
  const _0x7fdf5b = async () => {
    const _0x442ee5 = await _0x32b090(_0x3ff5c0);
    if (!_0x442ee5) return (_0x42ff01["push"]("sid空"), null);
    const _0x32abca = {
      'dataObj': _0x5a2171 == null ? null : _0x5a2171,
      'ajaxmethod': _0x57dea0,
      'sessionid': _0x442ee5
    };
    if (_0x54636c) _0x32abca['multipost'] = 0x1;
    const _0x275032 = await _0x313b69(_0x3ff5c0), _0x54abdc = _0x5d3648(_0x32abca, _0x442ee5, _0x275032), _0x350864 = function (_0xc58097, _0x10bdab) {
      if (!_0x40b5e6 && _0x459a37["profile"] && (_0x459a37["profile"]['mode'] === "enc" || _0x459a37["profile"]["mode"] === "legacy") && _0x459a37["profile"][_0xc58097]) return _0x459a37["profile"][_0xc58097];
      return _0x4506d1(_0x3ff5c0, _0xc58097, _0x10bdab, ["enc", "legacy"]);
    }, _0x992616 = _0x4f502c === "dataObj" || _0x4f502c === 'dataNull' ? _0x350864(_0x4f502c, _0x4f502c === "dataNull" ? "/fh_api/tmp/FHNCAPIS" : "/fh_api/tmp/FHAPIS") : _0x5a2171 == null ? _0x350864("dataNull", "/fh_api/tmp/FHNCAPIS") : _0x350864('dataObj', "/fh_api/tmp/FHAPIS"), _0x23005e = await _0x403514(_0x3ff5c0, _0x992616 + '?_0.' + Math["random"](), {
      'method': "POST",
      'body': _0x54abdc["body"],
      'raw': true,
      'timeoutMs': _0x1eef24 || 0x1770,
      '_tag': _0x377bd3
    });
    if (!_0x23005e) return (_0x42ff01["push"]('回空'), null);
    if ((/^\s*<(!doctype|html)/i)["test"](String(_0x23005e))) return (_0x42ff01['push']("403"), "_dead");
    try {
      const _0x4daab7 = _0x4e26c4(_0x23005e, _0x54abdc["key"]);
      return (_0x42ff01['push']('通'), _0x4daab7);
    } catch (_0x3f697b) {
      (_0x42ff01["push"]('解封败'), _0x28dc4a[_0x3ff5c0] = '');
      try {
        _0x16e738["remove"](_0x48240a["FH_SEED"] + _0x3ff5c0);
      } catch (_0x250d19) {}
      return null;
    }
  };
  let _0x28e7f7 = await _0x7fdf5b(), _0x403983 = _0x28e7f7 === '_dead';
  if (_0x28e7f7 === "_dead") _0x28e7f7 = null; else _0x28e7f7 == null && (await _0x1bc2d5(0x258), _0x28e7f7 = await _0x7fdf5b(), _0x28e7f7 === "_dead" && (_0x28e7f7 = null, _0x403983 = true));
  _0x28e7f7 == null && !_0x403983 && _0xfd4bec && _0x7b26fa(_0xfd4bec) < 0xea60 && (_0x42ff01["push"]("等再试"), await _0x1bc2d5(0x5dc), _0x28e7f7 = await _0x7fdf5b(), _0x28e7f7 === '_dead' && (_0x28e7f7 = null, _0x403983 = true));
  let _0x2e863e = false;
  if (_0x28e7f7 == null) {
    _0x28dc4a[_0x3ff5c0] = '';
    try {
      _0x16e738['remove'](_0x48240a["FH_SEED"] + _0x3ff5c0);
    } catch (_0x58221e) {}
    _0x42ff01["push"]('重登');
    const _0x219a86 = await _0x2ae0a1(_0x3ff5c0, _0x4f44fb() || ({}), true);
    if (_0x219a86) _0x28e7f7 = await _0x7fdf5b(); else _0x3abdfd === "limited" && (_0x42ff01["push"]("限流收手"), _0x2e863e = true);
    if (_0x28e7f7 === "_dead") _0x28e7f7 = null;
  }
  if (_0x28e7f7 == null && !_0x2e863e && await _0x337f31(_0x3ff5c0)) {
    (_0x42ff01['push']('换线'), _0x28e7f7 = await _0x7fdf5b());
    if (_0x28e7f7 === "_dead") _0x28e7f7 = null;
  }
  if (_0x28e7f7 && typeof _0x28e7f7 === "object") _0xfd4bec = Date["now"]();
  if (_0x28e7f7 == null) {
    delete _0x4702a3[_0x3ff5c0];
    const _0x2435fb = _0x48f5ef[_0x3ff5c0] || '';
    if (_0x2435fb) try {
      _0x16e738['remove'](_0x48240a["MODEL_LINE"] + _0x2435fb);
    } catch (_0x295ee3) {}
  }
  if (_0x28e7f7 == null && !_0x40b5e6 && !_0x2e863e) {
    const _0x3b71c7 = await _0x1f5039(_0x3ff5c0, _0x57dea0, _0x5a2171, _0x54636c, true);
    if (_0x5e4cf3(_0x3b71c7)) return (_0x2cd410(_0x3ff5c0, 'web'), _0x42ff01['push']('明文'), _0x3b71c7);
  }
  return (!(_0x42ff01["length"] === 0x1 && _0x42ff01[0x0] === '通') && _0x578483(_0x42ff01["indexOf"]('通') >= 0x0 ? "warn" : 'error', '全局', _0x377bd3 + '\x20' + (_0x42ff01["join"]('→') || '无')), _0x28e7f7);
}
function _0x42086e(_0x5544a1) {
  const _0x4e7d29 = String(_0x5544a1 || '')['toUpperCase']()["trim"]()["replace"](/\s+/g, '');
  if (_0x4e7d29 === '1' || _0x4e7d29 === 'SA_ONLY' || _0x4e7d29 === "仅SA") return '1';
  if (_0x4e7d29 === '2' || _0x4e7d29 === "NSA_ONLY" || _0x4e7d29 === "仅NSA") return '2';
  if (_0x4e7d29 === '3' || _0x4e7d29 === "SA_NSA" || _0x4e7d29 === "SA+NSA" || _0x4e7d29 === "SA/NSA" || _0x4e7d29 === "NSA/SA") return '3';
  if (_0x4e7d29 === "NSA") return '2';
  if (_0x4e7d29 === 'SA') return '1';
  return '3';
}
function _0x22fb69(_0x248044) {
  if (!_0x248044 || _0x248044["_error"]) return null;
  const _0x4fdf3f = _0x248044["data_1"] || ({}), _0x9bea6f = _0x248044["data_2"] || ({}), _0x5e4582 = _0x357cfd => _0x4fdf3f['PCC_' + _0x357cfd] || _0x9bea6f["PCC_" + _0x357cfd] || '', _0x5abeae = _0x5e4582("Band");
  if (!_0x5abeae) return null;
  const _0x397789 = {
    'Type': _0x5e4582('Type'),
    'Band': _0x5abeae,
    'PCI': _0x5e4582('Pci'),
    'Arfcn': _0x5e4582('Arfcn'),
    'DIBandWidth': _0x5e4582("DlBandWidth"),
    'UlBandWidth': _0x5e4582('UlBandWidth'),
    'RSRP': '',
    'SINR': '',
    'RSRQ': ''
  };
  let _0x1b7282 = (_0x248044["data_3"] && _0x248044['data_3']["data"] || [])["filter"](function (_0x9d0528) {
    return _0x9d0528 && _0x9d0528["SCC_Band"] && _0x9d0528["SCC_Band"] !== '-';
  })["map"](function (_0x11fa90) {
    return {
      'Type': _0x11fa90["SCC_Type"],
      'Band': _0x11fa90['SCC_Band'],
      'PCI': _0x11fa90["SCC_Pci"],
      'Arfcn': _0x11fa90["SCC_Arfcn"],
      'DIBandWidth': _0x11fa90["SCC_DlBandWidth"]
    };
  });
  const _0x20f03f = parseInt(_0x248044['data_4'] && _0x248044['data_4']["sccNumbers"] || '', 0xa);
  if (!isNaN(_0x20f03f)) _0x1b7282 = _0x1b7282["slice"](0x0, Math['max'](0x0, _0x20f03f));
  return {
    'main_CA_info': _0x397789,
    'sub_CA_info': _0x1b7282
  };
}
const _0x238095 = "WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.";
const _0x17227b = {
  'cpuusage': "DeviceInfo.ProcessStatus.CPUUsage",
  'SSID1': "WiFi.SSID.1.SSID",
  'modemTemp': "X_FH_MobileNetwork.Temperature.Modem5GTemperature",
  'memFree': "DeviceInfo.MemoryStatus.Free",
  'memTotal': "DeviceInfo.MemoryStatus.Total",
  'uptime': "DeviceInfo.X_FH_Multiwan_Total_Uptime",
  'uptime2': "DeviceInfo.UpTime",
  'onlineNum': 'LANDevice.1.Hosts.OnlineDevNum',
  'fw': 'DeviceInfo.SoftwareVersion',
  'pname': "DeviceInfo.Description",
  'netMode': 'X_FH_MobileNetwork.NetworkSettings.NetworkMode',
  'hw': "DeviceInfo.HardwareVersion",
  'n79': "DeviceInfo.X_FH_N79_Enable",
  'imei': "X_FH_MobileNetwork.SIM.1.IMEI",
  'imsi': "X_FH_MobileNetwork.SIM.1.IMSI",
  'phone': "X_FH_MobileNetwork.SIM.1.PhoneNumber",
  'carrierName': "X_FH_MobileNetwork.SIM.1.CarrierName",
  'simPlmn': "X_FH_MobileNetwork.SIM.1.plmn",
  'wanIp': _0x238095 + "ExternalIPAddress",
  'wanMask': _0x238095 + 'SubnetMask',
  'wanGw': _0x238095 + "DefaultGateway",
  'wanDns': _0x238095 + 'DNSServers',
  'wanStatus': _0x238095 + "ConnectionStatus",
  'wanConnTime': _0x238095 + "X_FH_ConnectionTotalTime",
  'wanConnType': _0x238095 + "ConnectionType",
  'v6Ip': _0x238095 + "X_FH_IPv6IPAddress",
  'v6Status': _0x238095 + 'X_FH_IPv6ConnStatus',
  'v6Dns': _0x238095 + 'X_FH_IPv6DNSServers'
};
async function _0x18a856(_0x3341dd, _0x5ad7b4, _0x4079ed) {
  const _0x484cbe = _0x4079ed || await _0x3d8483(_0x3341dd, "get_value_by_xmlnode", _0x17227b) || ({}), _0x3feed0 = true;
  let _0x3f0ce4 = null;
  if (!_0x3feed0) {
    const _0x2182d4 = await _0x78e9a(_0x3341dd);
    if (_0x2182d4) {
      const _0x2218a8 = function (_0x2fd6a5) {
        try {
          return _0x2fd6a5 ? Array["isArray"](_0x2fd6a5["data"]) ? "data:" + _0x2fd6a5["data"]["length"] : String(JSON["stringify"](_0x2fd6a5))['slice'](0x0, 0x3c) : 'null';
        } catch (_0x1600d7) {
          return "err";
        }
      }, _0x383134 = await _0x3d8483(_0x3341dd, 'get_lan_device_info_all', null, true);
      let _0x2ec0a2 = null;
      if (_0x383134 && Array["isArray"](_0x383134["data"]) && _0x383134["data"]["length"]) _0x3f0ce4 = _0x383134;
      if (!_0x3f0ce4) {
        _0x2ec0a2 = await _0x3d8483(_0x3341dd, "get_xml_childnode_value", {
          'url': "LANDevice.1.Hosts.Host.",
          'node': {
            'HostName': "HostName",
            'DevName': "DevName",
            'MACAddress': "MACAddress",
            'IPAddress': "IPAddress",
            'Active': "Active",
            'OnlineTime': "OnlineTime",
            'UpSpeed': "UpSpeed",
            'DownSpeed': "DownSpeed"
          }
        });
        if (_0x2ec0a2 && Array['isArray'](_0x2ec0a2['data']) && _0x2ec0a2["data"]["length"]) _0x3f0ce4 = _0x2ec0a2;
        if (!_0x3f0ce4) _0x3f0ce4 = await _0x3d8483(_0x3341dd, "get_lan_device_info_all", null);
      }
      _0x578483("info", '概览', "topo(Air) 在" + (_0x484cbe["onlineNum"] === undefined ? '?' : _0x484cbe["onlineNum"] || '-') + " 列表" + _0x2218a8(_0x383134) + '/' + (_0x2ec0a2 ? '跳' : '-') + '→' + _0x2218a8(_0x3f0ce4));
    } else _0x3f0ce4 = await _0x3d8483(_0x3341dd, 'get_lan_device_info_all', null);
  }
  if (_0x484cbe['fw'] && _0x484cbe['fw'] !== '--') try {
    _0x16e738["set"](_0x48240a["DEVICE_VERSION"], _0x484cbe['fw']);
  } catch (_0x42a9d2) {}
  const _0x4fafb2 = parseInt(_0x484cbe["memTotal"], 0xa) || 0x0, _0x1f71b4 = parseInt(_0x484cbe["memFree"], 0xa) || 0x0, _0x3bcf90 = _0x4fafb2 > 0x0 ? String(Math["round"]((0x1 - _0x1f71b4 / _0x4fafb2) * 0x2710) / 0x64) : '', _0x344b23 = _0x3f0ce4 && _0x3f0ce4['data'] || [];
  return {
    '__ok': Object['keys'](_0x484cbe)["length"] > 0x0,
    'UpTime': _0x484cbe["uptime"] || _0x484cbe['uptime2'] || '',
    'FWVersion': _0x484cbe['fw'] || _0x5ad7b4 && _0x5ad7b4["Software_version"] || '',
    'DeviceType': _0x5ad7b4 && _0x5ad7b4["modelName"] || '',
    'SSID1': _0x484cbe["SSID1"] || '',
    'cpuusage': _0x484cbe["cpuusage"] || '',
    'modemTemp': _0x484cbe["modemTemp"] || '',
    'onlineNum': _0x484cbe["onlineNum"] === undefined ? '' : String(_0x484cbe["onlineNum"]),
    'ramusage': _0x3bcf90,
    'HWVersion': _0x484cbe['hw'] || '',
    'ip': _0x484cbe['wanIp'] || '',
    '__sim': {
      'imei': _0x484cbe['imei'] || '',
      'imsi': _0x484cbe["imsi"] || '',
      'phone': _0x484cbe["phone"] || '',
      'pname': _0x484cbe['pname'] || '',
      'carrierName': _0x484cbe["carrierName"] || '',
      'simPlmn': _0x484cbe["simPlmn"] || ''
    },
    '__n79': _0x484cbe["n79"] || '',
    '__wan': {
      'status': _0x484cbe["wanStatus"] || '',
      'connTime': _0x484cbe['wanConnTime'] || '',
      'connType': _0x484cbe['wanConnType'] || '',
      'netMode': _0x484cbe['netMode'] || '',
      'ip': _0x484cbe["wanIp"] || '',
      'mask': _0x484cbe["wanMask"] || '',
      'gw': _0x484cbe['wanGw'] || '',
      'dns': _0x484cbe['wanDns'] || '',
      'v6Status': _0x484cbe['v6Status'] || '',
      'v6Ip': _0x484cbe['v6Ip'] || '',
      'v6Dns': _0x484cbe['v6Dns'] || ''
    },
    'MainBaseInfo': _0x344b23["map"](function (_0x7995c) {
      return {
        'Name': _0x7995c["DevName"] || _0x7995c["HostName"] || "unknown",
        'Mac': _0x7995c['MACAddress'] || '--',
        'ip': _0x7995c["IPAddress"] || '--',
        'NetStatus': String(_0x7995c["Active"] != null ? _0x7995c['Active'] : '0'),
        'AccessType': '',
        'AccessTime': _0x7995c["OnlineTime"] || '0',
        'DownSpeed': _0x7995c["DownSpeed"] || '0',
        'UpSpeed': _0x7995c["UpSpeed"] || '0'
      };
    })
  };
}
let _0x4e4636 = 0x0;
let _0x3e68a8 = '';
let _0x398946 = false;
let _0x37abfd = 0x0;
let _0x1fe808 = '';
let _0x427691 = 0x0;
async function _0x4fafb7(_0x4ba6cd, _0x17c2ce) {
  if (!_0x17c2ce || !String(_0x17c2ce["pass"] || '')) return "nopass";
  const _0x275d61 = await _0x30127f(_0x4ba6cd);
  if (!_0x275d61) return "unreachable";
  const _0x5a4fa4 = await _0x403514(_0x4ba6cd, _0x53fe55(_0x4ba6cd), {
    'method': "POST",
    'body': {
      'ajaxmethod': 'app_do_login',
      'dataObj': {
        'username': _0x17c2ce["user"],
        'password': _0x17c2ce["pass"]
      },
      'sessionid': _0x275d61
    }
  });
  try {
    _0x3fade3 = {
      'line': "tool",
      'body': JSON["stringify"](_0x5a4fa4 || ({}))["slice"](0x0, 0xc8)
    };
  } catch (_0x2b6176) {}
  if (typeof _0x5a4fa4 === "string") {
    const _0x3afe54 = _0x50626a(_0x5a4fa4);
    if (_0x3afe54) _0x5a4fa4 = _0x3afe54;
  }
  const _0x5b074f = _0x5879cc(_0x5a4fa4), _0x31b219 = _0x5b074f ? _0x5a4fa4["login_result"] !== undefined ? _0x5a4fa4["login_result"] : _0x5a4fa4["result"] : null;
  if (!_0x5b074f || _0x31b219 === null || _0x31b219 === undefined || !(Number(_0x31b219) === 0x0 || Number(_0x31b219) === 0x1)) {
    if (_0x5b074f && (Number(_0x5a4fa4["remaincount"]) || 0x0) <= 0x0) return "limited";
    const _0x36e2c4 = _0x248216(_0x31b219);
    if (_0x36e2c4) return _0x36e2c4;
    if (!_0x5b074f) return "nolib";
    return "login";
  }
  const _0x3e555c = await _0x30127f(_0x4ba6cd);
  if (!_0x3e555c) return "unreachable";
  const _0x45c9cf = await _0x403514(_0x4ba6cd, _0x53fe55(_0x4ba6cd), {
    'method': "POST",
    'body': {
      'ajaxmethod': "app_get_login_status",
      'dataObj': {},
      'sessionid': _0x3e555c
    }
  });
  if (!_0x45c9cf || _0x45c9cf["login_status"] !== 0x1) return 'session';
  return 'ok';
}
let _0x2d7105 = null;
async function _0x5c7ee5(_0x58aa95, _0x3c790b) {
  const _0x82b19c = await _0x30127f(_0x58aa95);
  if (!_0x82b19c) return {
    'error': "unreachable"
  };
  const _0x35e450 = await _0x403514(_0x58aa95, _0x53fe55(_0x58aa95) + "?ajaxmethod=app_get_base_info&sessionid=", {
    'timeoutMs': 0x1388
  });
  if (_0x35e450 && (_0x35e450['NR_Band'] || _0x35e450["BAND"] || _0x35e450['RSSI'])) return {
    'data': _0x35e450
  };
  await _0x1bc2d5(0x258);
  const _0x59f7da = await _0x403514(_0x58aa95, _0x53fe55(_0x58aa95) + "?ajaxmethod=app_get_base_info&sessionid=", {
    'timeoutMs': 0x1388
  });
  if (_0x59f7da && (_0x59f7da["NR_Band"] || _0x59f7da["BAND"] || _0x59f7da["RSSI"])) return {
    'data': _0x59f7da
  };
  const _0x134411 = _0x1fe808 === 'limited' || _0x1fe808 === "locked" ? _0x4dec1d["limitedCool"] : _0x4dec1d['failCool'], _0x34c33b = _0x427691 && _0x7b26fa(_0x427691) < _0x4dec1d['okGap'] || _0x37abfd && _0x7b26fa(_0x37abfd) < _0x134411;
  if (!_0x34c33b) {
    let _0x5ecf6c;
    _0x2d7105 && _0x3e68a8 === _0x58aa95 ? _0x5ecf6c = await _0x2d7105 : (_0x3e68a8 = _0x58aa95, _0x2d7105 = _0x4fafb7(_0x58aa95, _0x3c790b), _0x5ecf6c = await _0x2d7105, _0x2d7105 = null);
    if (_0x5ecf6c === 'ok') {
      (_0x427691 = Date["now"](), _0x37abfd = 0x0, _0x1fe808 = '', await _0x1bc2d5(0x190));
      const _0x4e6a60 = await _0x403514(_0x58aa95, _0x53fe55(_0x58aa95) + '?ajaxmethod=app_get_base_info&sessionid=', {
        'timeoutMs': 0x1388
      });
      if (_0x4e6a60 && (_0x4e6a60["NR_Band"] || _0x4e6a60["BAND"] || _0x4e6a60["RSSI"])) return {
        'data': _0x4e6a60
      };
    } else {
      if (_0x5ecf6c === "unreachable") return {
        'error': "unreachable"
      }; else (_0x37abfd = Date["now"](), _0x1fe808 = _0x5ecf6c);
    }
  }
  return await _0x853667(_0x58aa95, _0x3c790b);
}
async function _0x853667(_0x166b29, _0x35681c) {
  if (!await _0x2ae0a1(_0x166b29, _0x35681c)) return {
    'error': _0x427691 ? 'empty' : _0x474b68 || "login"
  };
  const _0x33f0be = await _0x3d8483(_0x166b29, "get_value_by_xmlnode", _0xce8d65);
  if (!_0x33f0be || _0x33f0be["_error"] || !_0x33f0be["RSSI"] && !_0x33f0be["NR_Band"] && !_0x33f0be["modelName"]) return {
    'error': "empty"
  };
  return _0x33813f(_0x33f0be, _0x166b29);
}
function _0x33813f(_0x5f13e6, _0x36606c) {
  return (!_0x16e738['has'](_0x48240a["MAC"]) && _0x3d8483(_0x36606c, 'get_device_info', null)["then"](function (_0x26d348) {
    if (_0x26d348 && _0x26d348["brmac"]) try {
      _0x16e738["set"](_0x48240a["MAC"], String(_0x26d348["brmac"]));
    } catch (_0x12f309) {}
  }, function () {}), {
    'data': {
      'modelName': _0x5f13e6["modelName"] || '',
      'Software_version': _0x5f13e6['fw'] || '',
      'Mac': _0x16e738["has"](_0x48240a["MAC"]) ? _0x16e738["get"](_0x48240a["MAC"]) : '',
      'RSSI': _0x4e8f87(_0x5f13e6["pccRssi"], _0x5f13e6["RSSI"], _0x5f13e6["SSB_RSSI"]),
      'NR_Band': _0x5f13e6["NR_Band"] || '',
      'PCI': _0x5f13e6["PCI"] || '',
      'BAND': _0x5f13e6["BAND"] || '',
      'EARFCN': _0x5f13e6["EARFCN"] || '',
      'RSRP': _0x5f13e6["RSRP"] || '',
      'SINR': _0x5f13e6["SINR"] || '',
      'RSRQ': _0x5f13e6["RSRQ"] || '',
      'SSB_RSRP': _0x5f13e6["SSB_RSRP"] || '',
      'SSB_SINR': _0x5f13e6["SSB_SINR"] || '',
      'SSB_RSSI': _0x5f13e6["SSB_RSSI"] || '',
      'SSB_RSRQ': _0x5f13e6['SSB_RSRQ'] || '',
      'WorkMode': _0x5f13e6['WorkMode'] || '',
      'DlBandWidth': _0x5f13e6["DlBandWidth"] || '',
      'UlBandWidth': _0x5f13e6['UlBandWidth'] || '',
      'PLMN': _0x5f13e6["PLMN"] || '',
      'CarrierName': _0x5f13e6["carrierName"] || '',
      'SimPlmn': _0x5f13e6["simPlmn"] || '',
      'BAND_NBR': _0x5f13e6['BAND_NBR'] || '',
      'EARFCN_NBR': _0x5f13e6["EARFCN_NBR"] || '',
      'PCI_NBR': _0x5f13e6["PCI_NBR"] || '',
      'RSRP_NBR': _0x5f13e6["RSRP_NBR"] || '',
      'SINR_NBR': _0x5f13e6["SINR_NBR"] || '',
      'RSRQ_NBR': _0x5f13e6["RSRQ_NBR"] || '',
      'DL_AMBR': _0x5f13e6['DL_AMBR'] || '',
      'UL_AMBR': _0x5f13e6['UL_AMBR'] || '',
      'QCI': _0x5f13e6["QCI"] || '',
      'todayRxBytes': _0x5f13e6['todayRxBytes'] || '0',
      'todayTxBytes': _0x5f13e6["todayTxBytes"] || '0',
      'monthRxBytes': _0x5f13e6["monthRxBytes"] || '0',
      'monthTxBytes': _0x5f13e6["monthTxBytes"] || '0',
      'NetworkMode': _0x5f13e6["NetworkMode"] || ''
    }
  });
}
async function _0x30dd1c(_0xbb7fd2) {
  const _0x382f43 = _0xd64c49(_0xbb7fd2 && _0xbb7fd2["host"]), _0x53e948 = (await _0x1a0c06(_0x382f43))["profile"], _0x5cf238 = !_0x53e948 || _0x53e948["mode"] === "web" || _0x53e948['mode'] === "tool";
  if (_0x22a7ec()) return await _0x853667(_0x382f43, _0xbb7fd2);
  if (_0x5cf238) return _0x5c7ee5(_0x382f43, _0xbb7fd2);
  const _0xfe2235 = _0x398946 && _0x3e68a8 === _0x382f43 && _0x7b26fa(_0x4e4636) < 0x5 * 0x3c * 0x3e8;
  if (!_0xfe2235) {
    const _0x3ff3c3 = await _0x30127f(_0x382f43);
    if (!_0x3ff3c3) return {
      'error': "unreachable"
    };
    let _0x5f3cf7 = await _0x403514(_0x382f43, _0x53fe55(_0x382f43) + "?ajaxmethod=app_get_base_info&sessionid=", {
      'timeoutMs': 0x1388
    });
    !(_0x5f3cf7 && (_0x5f3cf7["NR_Band"] || _0x5f3cf7["BAND"] || _0x5f3cf7["RSSI"])) && (await _0x1bc2d5(0x258), _0x5f3cf7 = await _0x403514(_0x382f43, _0x53fe55(_0x382f43) + '?ajaxmethod=app_get_base_info&sessionid=', {
      'timeoutMs': 0x1388
    }));
    if (_0x5f3cf7 && (_0x5f3cf7['NR_Band'] || _0x5f3cf7["BAND"] || _0x5f3cf7['RSSI'])) return (_0x4e4636 = Date["now"](), _0x3e68a8 = _0x382f43, _0x398946 = true, {
      'data': _0x5f3cf7
    });
    const _0x5c9e87 = _0x1fe808 === "limited" || _0x1fe808 === "locked" ? _0x4dec1d["limitedCool"] : _0x4dec1d['failCool'];
    if (_0x37abfd && _0x7b26fa(_0x37abfd) < _0x5c9e87) return await _0x853667(_0x382f43, _0xbb7fd2);
    let _0x1525cf;
    _0x2d7105 && _0x3e68a8 === _0x382f43 ? _0x1525cf = await _0x2d7105 : (_0x3e68a8 = _0x382f43, _0x2d7105 = _0x4fafb7(_0x382f43, _0xbb7fd2), _0x1525cf = await _0x2d7105, _0x2d7105 = null);
    if (_0x1525cf !== 'ok') {
      if (_0x1525cf !== "unreachable") return (_0x37abfd = Date["now"](), _0x1fe808 = _0x1525cf, await _0x853667(_0x382f43, _0xbb7fd2));
      return {
        'error': "unreachable"
      };
    }
    (_0x4e4636 = Date["now"](), _0x3e68a8 = _0x382f43, _0x398946 = true, _0x37abfd = 0x0, _0x1fe808 = '');
  }
  const _0x36a3d4 = await _0x403514(_0x382f43, _0x53fe55(_0x382f43) + '?ajaxmethod=app_get_base_info&sessionid=', {
    'timeoutMs': 0x1388
  });
  if (!_0x36a3d4 || !_0x36a3d4["NR_Band"] && !_0x36a3d4["BAND"] && !_0x36a3d4["RSSI"]) {
    if (_0xfe2235) return (_0x398946 = false, await _0x58da7d(_0xbb7fd2));
    return await _0x853667(_0x382f43, _0xbb7fd2);
  }
  return {
    'data': _0x36a3d4
  };
}
async function _0x58da7d(_0x19b71f) {
  const _0x156838 = _0xd64c49(_0x19b71f && _0x19b71f['host']), _0x57c4fa = await _0x30dd1c(_0x19b71f);
  if (_0x57c4fa && _0x57c4fa["data"]) {
    if (_0x36c2a6(_0x156838)) _0x38cdef = true;
    return _0x57c4fa;
  }
  if (_0x57c4fa && _0x57c4fa['error'] === "unreachable") return _0x57c4fa;
  if (await _0x337f31(_0x156838)) {
    const _0x58ddd9 = await _0x30dd1c(_0x19b71f);
    if (_0x58ddd9 && _0x58ddd9["data"]) return _0x58ddd9;
    _0x2a633d(_0x156838);
  }
  return _0x57c4fa;
}
function _0x1b142d(_0x57cab3, _0x127b6c) {
  const _0x5d1e0a = _0x525079 => {
    const _0x380e06 = parseInt(_0x525079, 0xa);
    return isNaN(_0x380e06) ? 0x0 : _0x380e06;
  };
  return (_0x127b6c = _0x127b6c || ({}), {
    'deviceName': _0x127b6c["pname"] || _0x57cab3["modelName"] || '',
    'deviceModel': _0x57cab3["modelName"] || '',
    'Mac': _0x16e738["has"](_0x48240a["MAC"]) ? _0x16e738["get"](_0x48240a["MAC"]) : '',
    'SPN': _0x14e602(_0x57cab3, _0x127b6c),
    'IMEI': _0x127b6c["imei"] || '',
    'IMSI': _0x127b6c["imsi"] || '',
    'PhoneNum': _0x127b6c['phone'] || '',
    'WorkMode': _0x57cab3["WorkMode"] || "",
    'DlBandWidth': _0x57cab3["DlBandWidth"] || '--',
    'UlBandWidth': _0x57cab3['UlBandWidth'] || '--',
    'BAND_NBR': _0x57cab3['BAND_NBR'] || '',
    'EARFCN_NBR': _0x57cab3["EARFCN_NBR"] || '',
    'PCI_NBR': _0x57cab3["PCI_NBR"] || '',
    'RSRP_NBR': _0x57cab3["RSRP_NBR"] || '',
    'SINR_NBR': _0x57cab3['SINR_NBR'] || '',
    'RSRQ_NBR': _0x57cab3["RSRQ_NBR"] || '',
    'RSSI': _0x57cab3["RSSI"] || '--',
    'SSB_RSRP': _0x57cab3['SSB_RSRP'] || '--',
    'SSB_SINR': _0x57cab3["SSB_SINR"] || '--',
    'SSB_RSSI': _0x57cab3["SSB_RSSI"] || '',
    'SSB_RSRQ': _0x57cab3['SSB_RSRQ'] || '',
    'RSRP': _0x57cab3['RSRP'] || '--',
    'SINR': _0x57cab3['SINR'] || '',
    'RSRQ': _0x57cab3["RSRQ"] || '',
    'PCI': _0x57cab3['PCI'] || '',
    'BAND': _0x57cab3["NR_Band"] || '',
    'EARFCN': _0x57cab3["EARFCN"] || '',
    'NR_BAND': _0x57cab3['NR_Band'] || '',
    'todayRxBytes': _0x5d1e0a(_0x57cab3["todayRxBytes"]),
    'todayTxBytes': _0x5d1e0a(_0x57cab3["todayTxBytes"]),
    'monthRxBytes': _0x5d1e0a(_0x57cab3['monthRxBytes']),
    'monthTxBytes': _0x5d1e0a(_0x57cab3["monthTxBytes"]),
    'trafficDayOn': false,
    'trafficMonOn': false,
    'trafficDayMaxMB': 0x0,
    'trafficMonMaxMB': 0x0,
    'DL_AMBR': _0x57cab3["DL_AMBR"] || '--',
    'UL_AMBR': _0x57cab3["UL_AMBR"] || '--',
    'QCI': _0x57cab3["QCI"] || '--'
  });
}
let _0x34de3c = 0x0;
let _0x307b22 = null;
let _0x233fa6 = '';
let _0x2cfded = {};
async function _0xceee17(_0x586046, _0x26d332) {
  const _0x58a5e4 = Object['keys'](_0x26d332);
  let _0x4296e3;
  if (_0x58a5e4["length"] === 0x1) _0x4296e3 = await _0x3d8483(_0x586046, "set_single_by_xmlnode", {
    'url': _0x58a5e4[0x0],
    'value': _0x26d332[_0x58a5e4[0x0]]
  }); else {
    const _0x10b06a = {}, _0x3b6c4e = {};
    (_0x58a5e4["forEach"](function (_0x36d0f5) {
      (_0x10b06a[_0x36d0f5] = _0x36d0f5, _0x3b6c4e[_0x36d0f5] = _0x26d332[_0x36d0f5]);
    }), _0x4296e3 = await _0x3d8483(_0x586046, "set_value_by_xmlnode", {
      'url': _0x10b06a,
      'value': _0x3b6c4e
    }));
  }
  return !!(_0x4296e3 && _0x4296e3['success'] === 'true');
}
async function _0x1aadab() {
  const _0x2e3777 = _0x4f44fb(), _0x30e20c = _0x2e3777 ? _0xd64c49(_0x2e3777["host"]) : '';
  if (!_0x2e3777 || !await _0x2ae0a1(_0x30e20c, _0x2e3777)) return null;
  return _0x30e20c;
}
async function _0x241e4f() {
  const _0x13470d = _0x4f44fb();
  if (!_0x13470d) return null;
  const _0x5af612 = _0xd64c49(_0x13470d["host"]);
  _0x233fa6 !== _0x5af612 && (_0x34de3c = 0x0, _0x307b22 = null, _0x233fa6 = _0x5af612);
  const _0x4afcd3 = Date["now"]();
  if (_0x34de3c > 0x0 && _0x7b26fa(_0x34de3c) < 0x320 && _0x307b22) return _0x307b22;
  const _0x9c1cb6 = await _0x3d8483(_0x5af612, "get_value_by_xmlnode", {
    'spdTx': 'X_FH_MobileNetwork.TrafficStats.SpeedTxBytes',
    'spdRx': "X_FH_MobileNetwork.TrafficStats.SpeedRxBytes"
  });
  if (!_0x9c1cb6) return null;
  const _0x21d156 = parseFloat(_0x9c1cb6["spdTx"]), _0x112984 = parseFloat(_0x9c1cb6["spdRx"]);
  if (isNaN(_0x21d156) || isNaN(_0x112984)) return null;
  if (await _0x78e9a(_0x5af612)) {
    const _0x462a37 = _0x2cfded[_0x5af612] || 0x0, _0x232517 = _0x34de3c > 0x0 ? Math['round']((_0x4afcd3 - _0x34de3c) / 0x64) / 0xa : 0x0;
    (_0x34de3c = _0x4afcd3, _0x307b22 = {
      'up': Math["round"](_0x21d156) / 0x3e8,
      'down': Math["round"](_0x112984) / 0x3e8
    });
    if (_0x462a37 < 0x5) {
      _0x2cfded[_0x5af612] = _0x462a37 + 0x1;
      const _0x179ec6 = function (_0x4dcb82) {
        return (_0x4dcb82 = Number(_0x4dcb82) || 0x0, _0x4dcb82 >= 0x100000 ? (_0x4dcb82 / 0x100000)["toFixed"](0x1) + 'M' : _0x4dcb82 >= 0x400 ? Math["round"](_0x4dcb82 / 0x400) + 'k' : String(Math["round"](_0x4dcb82)));
      };
      _0x578483("info", '概览', "网速 ↓" + _0x307b22["down"] + '\x20↑' + _0x307b22['up']);
    }
    return _0x307b22;
  }
  const _0x24203e = _0x34de3c > 0x0 ? (_0x4afcd3 - _0x34de3c) / 0x3e8 : 0x1;
  return (_0x34de3c = _0x4afcd3, _0x307b22 = {
    'up': Math['round'](_0x21d156 / _0x24203e) / 0x3e8,
    'down': Math["round"](_0x112984 / _0x24203e) / 0x3e8
  }, _0x307b22);
}
let _0xc49ce1 = null;
let _0x5f4c28 = '';
async function _0x35200b() {
  const _0x36dae7 = _0x4f44fb();
  if (!_0x36dae7) return {
    'error': 'no-config'
  };
  const _0x4cdd0a = _0xd64c49(_0x36dae7["host"]);
  if (_0xc49ce1 && _0x5f4c28 === _0x4cdd0a) return _0xc49ce1;
  return (_0x5f4c28 = _0x4cdd0a, _0xc49ce1 = _0x464524(_0x36dae7)["then"](function (_0x2e9875) {
    return (_0xc49ce1 = null, _0x2e9875);
  }, function (_0x137642) {
    _0xc49ce1 = null;
    throw _0x137642;
  }), _0xc49ce1);
}
async function _0x464524(_0x57f36f) {
  const _0x46a2e4 = _0xd64c49(_0x57f36f['host']);
  let _0x54e64e = null, _0x43e51d = null, _0x5bce10 = null, _0x3a7248 = false, _0x36836a = null, _0x51e468 = {}, _0x242203 = '', _0x1215f9 = false, _0x56bd09 = true;
  try {
    const _0x32c22a = (await _0x1a0c06(_0x46a2e4))["profile"], _0x4c2f0e = (function () {
      let _0x4f6da1 = _0x5531d8;
      try {
        const _0x2ffb78 = parseInt(_0x16e738["get"](_0x48240a['FH_LOGIN_AT'] + _0x46a2e4), 0xa) || 0x0;
        if (_0x2ffb78 > _0x4f6da1) _0x4f6da1 = _0x2ffb78;
      } catch (_0x30be0f) {}
      return _0x4f6da1 ? Date["now"]() - _0x4f6da1 : -0x1;
    })();
    if (_0x4c2f0e > 0x3f7a0 && !(_0x32c22a && (_0x32c22a["mode"] === "web" || _0x32c22a["mode"] === "tool"))) {
      const _0x536e0d = {}, _0x5190cc = Date["now"](), _0x55c47a = _0xff15d6;
      let _0x17b8e3 = false, _0x49ab6d = '';
      try {
        _0x17b8e3 = await _0x200899(_0x46a2e4, _0x536e0d);
      } catch (_0x27fb8f) {
        _0x49ab6d = String(_0x27fb8f)['slice'](0x0, 0x28);
      }
      const _0xb3f033 = Date["now"]() - _0x5190cc;
      _0x578483(_0x17b8e3 ? "info" : "warn", '全局', "会话超龄" + (_0x4c2f0e / 0xea60)["toFixed"](0x1) + 'm\x20' + (_0x17b8e3 ? '续期' : "设备不通"));
      (!_0x17b8e3 || _0xb3f033 > 0x320) && _0x578483(_0x17b8e3 ? "info" : 'warn', '全局', "心跳体检 " + _0xb3f033 + "ms " + (_0x17b8e3 ? '通(' + (_0x536e0d['raw'] || '?') + ')' : '不通') + " 并发" + _0x55c47a + '/' + _0xff15d6 + (_0x49ab6d ? " 异常:" + _0x49ab6d : ''));
      if (!_0x17b8e3) {
        const _0x385ee2 = _0xfd4bec ? Math['round'](_0x7b26fa(_0xfd4bec) / 0x3e8) : -0x1;
        _0x578483("warn", '全局', '窗口' + _0x385ee2 + 's');
      }
      if (_0x17b8e3) _0x56bd09 = await _0x2ae0a1(_0x46a2e4, _0x57f36f, true, {}); else _0x4c2f0e > 0x493e0 && _0xb3f033 < 0x320 && (_0x578483('info', '全局', "死透补卡"), _0x56bd09 = await _0x2ae0a1(_0x46a2e4, _0x57f36f, true, {
        'knownDead': true
      }));
    }
    if (!(_0xfd4bec && _0x7b26fa(_0xfd4bec) < 0x46cd0)) {
      if (!(_0x32c22a && (_0x32c22a["mode"] === "web" || _0x32c22a["mode"] === 'tool'))) {
        const _0x4da2a4 = Date["now"]();
        let _0x45c870 = await _0x200899(_0x46a2e4);
        const _0x12a0fe = Date["now"]();
        !_0x45c870 && (await _0x1bc2d5(0x190), _0x45c870 = await _0x200899(_0x46a2e4));
        const _0x2d990b = Date['now']();
        _0x578483("info", '概览', "取数心跳 " + (_0x45c870 ? '通' : '不通') + (_0x45c870 && _0x12a0fe - _0x4da2a4 > 0x320 ? '(复查)' : ''));
        if (_0x45c870) (_0x18201e[_0x46a2e4] = true, _0xfd4bec = Date['now'](), _0x236325 = true, _0x8712e2 = _0x46a2e4); else _0x18201e[_0x46a2e4] ? _0x56bd09 = await _0x2ae0a1(_0x46a2e4, _0x57f36f, false, {
          'knownDead': true
        }) : _0x56bd09 = await _0x2ae0a1(_0x46a2e4, _0x57f36f);
      } else _0x56bd09 = await _0x2ae0a1(_0x46a2e4, _0x57f36f);
    }
    if (_0x4af19c && !_0x27bcdf && !(_0x32c22a && _0x32c22a["mode"] === "tool")) {
      const _0x3708fc = Date["now"](), _0x67bf6c = await _0x3d8483(_0x46a2e4, "get_value_by_xmlnode|get_value_by_xmlnode|get_value_by_xmlnode|get_value_by_xmlnode|get_xml_childnode_value|get_value_by_xmlnode", _0x1186b4(), true, 0x2710), _0x23373b = Date["now"]() - _0x3708fc;
      if (_0x67bf6c && _0x67bf6c["data_1"] && !_0x67bf6c['data_1']["_error"] && (_0x67bf6c["data_1"]['RSSI'] || _0x67bf6c["data_1"]["NR_Band"] || _0x67bf6c["data_1"]["modelName"])) (_0x54e64e = _0x33813f(_0x67bf6c["data_1"], _0x46a2e4), _0x5bce10 = _0x67bf6c["data_2"], _0x43e51d = {
        'data_1': _0x67bf6c["data_3"],
        'data_2': _0x67bf6c["data_4"],
        'data_3': _0x67bf6c['data_5'],
        'data_4': _0x67bf6c["data_6"]
      }, _0x3a7248 = true, _0x43460f = 0x0, _0x578483('info', '概览', "合并包·通")); else {
        _0x43460f++;
        if (_0x43460f >= 0x2) _0x27bcdf = true;
        _0x578483("warn", '概览', "合并包 空→分请求");
      }
    }
    if (_0x3a7248) {
      const _0x39b55d = _0x18a856(_0x46a2e4, _0x54e64e['data'], _0x5bce10)["catch"](function () {
        return {
          '__ok': false
        };
      }), _0x138b0d = (async function () {
        try {
          return await _0x241e4f();
        } catch (_0x1f64b6) {
          return null;
        }
      })(), _0x148000 = await Promise['all']([_0x39b55d, _0x138b0d]);
      (_0x51e468 = _0x148000[0x0] || ({}), _0x36836a = _0x22fb69(_0x43e51d));
      if (_0x51e468["__ok"] === false) _0x1215f9 = true;
      try {
        const _0x3c3dd7 = _0x148000[0x1];
        _0x3c3dd7 && (_0x51e468["UpSpeed"] = _0x3c3dd7['up'], _0x51e468["DownSpeed"] = _0x3c3dd7['down']);
      } catch (_0xafce6a) {}
    } else {
      if (_0x3abdfd === "limited" && _0x56d8fc(_0x46a2e4) > 0x0) return (_0x578483("warn", '概览', '分请求跳过\x20限流' + Math["ceil"](_0x56d8fc(_0x46a2e4) / 0x3e8) + 's'), {
        'rawData': null,
        'error': "limited",
        '_topoFail': true
      }); else {
        _0x54e64e = await _0x58da7d(_0x57f36f);
        if (_0x54e64e['error']) return _0x54e64e;
        const _0x51b577 = _0x3d8483(_0x46a2e4, 'get_value_by_xmlnode|get_value_by_xmlnode|get_xml_childnode_value|get_value_by_xmlnode', _0x3f6ab9(), true)["catch"](function () {
          return null;
        }), _0x30dcdb = _0x18a856(_0x46a2e4, _0x54e64e["data"])["catch"](function () {
          return {
            '__ok': false
          };
        }), _0x281bac = (async function () {
          try {
            return await _0x241e4f();
          } catch (_0x7ad6d5) {
            return null;
          }
        })(), _0x468cb5 = await Promise['all']([_0x51b577, _0x30dcdb, _0x281bac]), _0x775116 = _0x468cb5[0x0];
        (_0x51e468 = _0x468cb5[0x1] || ({}), _0x36836a = _0x22fb69(_0x775116));
        if (_0x51e468["__ok"] === false) _0x1215f9 = true;
        try {
          const _0x52ef1b = _0x468cb5[0x2];
          _0x52ef1b && (_0x51e468["UpSpeed"] = _0x52ef1b['up'], _0x51e468['DownSpeed'] = _0x52ef1b["down"]);
        } catch (_0x4b1e50) {}
      }
    }
    if (!_0x56bd09) _0x242203 = _0x3abdfd === 'limited' ? "limited" : _0x3abdfd === 'expired' ? "expired" : 'session';
  } catch (_0x5dde8d) {
    _0x1215f9 = true;
  }
  const _0x179047 = _0x1b142d(_0x54e64e["data"], _0x51e468["__sim"]);
  try {
    const _0x403e38 = _0x54e64e["data"] && _0x54e64e["data"]["modelName"];
    if (_0x403e38) {
      const _0x2293d5 = _0x301fac(_0x403e38), _0x156688 = _0x4702a3[_0x46a2e4], _0x1d830b = _0x156688 ? _0x156688["mode"] === "web" || _0x156688['mode'] === "tool" ? 'pro' : "pro2" : await _0x1d1655(_0x46a2e4);
      _0x48f5ef[_0x46a2e4] = _0x2293d5;
      try {
        const _0x1bb5bb = _0x16e738['get'](_0x48240a["MODEL_LINE"] + _0x2293d5) || '';
        if (_0x1bb5bb !== _0x1d830b) _0x578483('info', '全局', "型号记录 " + _0x2293d5 + '→' + (_0x1d830b === "pro2" ? "加密线" : "明文线"));
      } catch (_0x7bca11) {}
      (_0x121e32(_0x403e38, _0x1d830b), _0x4ff2bb(_0x46a2e4, _0x403e38));
      const _0x29bdf8 = _0x3ed42d(), _0x26fce7 = _0x4f1a06();
      _0x29bdf8[_0x26fce7] && (!_0x29bdf8[_0x26fce7]["name"] || _0x29bdf8[_0x26fce7]["name"] === _0x29bdf8[_0x26fce7]['host']) && (_0x29bdf8[_0x26fce7]["name"] = String(_0x403e38), _0x16e738["set"](_0x48240a["LOCAL_ACCOUNTS"], JSON['stringify'](_0x29bdf8)), __CPE["evalJS"]('window.localAccountsRenamed\x20&&\x20window.localAccountsRenamed();'));
    }
  } catch (_0x1fce5a) {}
  return {
    'rawData': _0x179047,
    'remoteCa': _0x36836a,
    'topoData': _0x51e468,
    'error': _0x242203 || undefined,
    '_topoFail': _0x1215f9
  };
}
let _0x52a69c = '';
let _0x3fade3 = null;
function _0x5daeaf(_0x55848d) {
  if (_0x55848d === "no-config") return '未配置本地账号';
  if (_0x55848d === "unreachable") return "连接失败，请检查设备网络";
  if (_0x55848d === "occupied") return '设备已被别处登录';
  if (_0x55848d === 'locked') return '登录已锁定，稍后再试';
  if (_0x55848d === "disabled") return "该账号已被禁用";
  if (_0x55848d === "nolib") return "设备不支持此登录方式";
  if (_0x55848d === "login") return "账号或密码不正确";
  if (_0x55848d === 'limited') return "登录被限流，请稍后再试";
  if (_0x55848d === "nopass") return '请填写密码';
  if (_0x55848d === "expired") return '登录已超时';
  if (_0x55848d === "session") return "设备被占用，自动恢复中";
  if (_0x55848d === 'empty') return "设备未返回数据，请稍后重试";
  return "局域网取数失败";
}
function _0x18c954(_0x223695) {
  const _0xe5a025 = {
    'unreachable': "连不上",
    'occupied': "被占用",
    'locked': "已锁定",
    'disabled': "已禁用",
    'nolib': "不支持",
    'login': "密码错",
    'limited': '限流',
    'nopass': "缺密码",
    'expired': '已超时',
    'session': '被占用',
    'empty': '无数据',
    'no-config': "未配置"
  };
  return _0xe5a025[_0x223695] || String(_0x223695 || '失败');
}
let _0x2dae87 = '';
let _0x28bcdf = '';
let _0x2f2b83 = '';
function _0x2f89dc(_0x1a91e7, _0x4e5f85, _0x5835d0, _0x243150) {
  const _0x493527 = _0x1a91e7 && _0x1a91e7 !== '--' ? String(_0x1a91e7) : _0x5835d0 && _0x5835d0 !== '--' ? String(_0x5835d0) : '', _0x3a43b4 = _0x4e5f85 && _0x4e5f85 !== '--' ? String(_0x4e5f85) : _0x243150 && _0x243150 !== '--' ? String(_0x243150) : '';
  if (_0x493527 && _0x3a43b4) return _0x493527 === _0x3a43b4 ? _0x493527 : 'DL\x20' + _0x493527 + '\x20/\x20UL\x20' + _0x3a43b4;
  return _0x493527 || _0x3a43b4 || '--';
}
function _0x4f9a4d(_0x2e0d16, _0xc40d74) {
  const _0x572949 = _0x2e0d16['DlBandWidth'] || '--', _0x432836 = _0x2e0d16["UlBandWidth"] || '--', _0x51cf45 = (_0x2e0d16["BAND_NBR"] || '')['split'](',')['map'](_0x27564a => _0x27564a["trim"]())['filter'](_0x26f36a => _0x26f36a !== ''), _0x2702a2 = (_0x2e0d16['EARFCN_NBR'] || '')['split'](',')['map'](_0x5b65c3 => _0x5b65c3["trim"]())["filter"](_0x51ef78 => _0x51ef78 !== ''), _0x3fabc3 = (_0x2e0d16["PCI_NBR"] || '')['split'](',')["map"](_0x538974 => _0x538974["trim"]())['filter'](_0x4c66de => _0x4c66de !== ''), _0x150df7 = (_0x2e0d16["RSRP_NBR"] || '')["split"](',')["map"](_0x39ebb3 => _0x39ebb3["trim"]())["filter"](_0x154d64 => _0x154d64 !== ''), _0x33f5ed = (_0x2e0d16['SINR_NBR'] || '')["split"](',')['map'](_0x26f514 => _0x26f514["trim"]())["filter"](_0x3139ea => _0x3139ea !== ''), _0x37a724 = (_0x2e0d16["RSRQ_NBR"] || '')["split"](',')['map'](_0x586184 => _0x586184['trim']())["filter"](_0xcd3439 => _0xcd3439 !== ''), _0x176251 = [];
  for (let _0x2cd03f = 0x0; _0x2cd03f < _0x51cf45["length"]; _0x2cd03f++) {
    _0x176251["push"]({
      'band': _0x51cf45[_0x2cd03f] || '--',
      'arfcn': _0x2702a2[_0x2cd03f] || '--',
      'pci': _0x3fabc3[_0x2cd03f] || '--',
      'rsrp': _0x150df7[_0x2cd03f] || '--',
      'sinr': _0x33f5ed[_0x2cd03f] || '--',
      'rsrq': _0x37a724[_0x2cd03f] || '--'
    });
  }
  const _0x374777 = [];
  let _0x36a76c = false;
  if (_0xc40d74) {
    const _0x276cfe = _0xc40d74["main_CA_info"], _0x172044 = _0xc40d74["sub_CA_info"] || [];
    if (_0x276cfe && _0x276cfe["Band"] && _0x276cfe['Band'] !== '-') {
      _0x36a76c = true;
      const _0xb3d7f7 = (_0x5e6bb4, _0x1f1290, _0xdf9415) => {
        const _0x1f43cf = String(_0x5e6bb4 || '')["trim"](), _0x7565d7 = String(_0x1f1290 || '')["trim"](), _0x5712ce = String(_0xdf9415 || '')["trim"]()["toLowerCase"]()["replace"](/^[nb]/i, '');
        let _0x33c70f = _0x176251["find"](_0x4f75be => String(_0x4f75be["pci"])["trim"]() === _0x1f43cf && String(_0x4f75be['arfcn'])["trim"]() === _0x7565d7);
        if (!_0x33c70f) _0x33c70f = _0x176251['find'](_0x727cd3 => {
          const _0x2ffa55 = String(_0x727cd3["band"])["trim"]()["toLowerCase"]()["replace"](/^[nb]/i, '');
          return String(_0x727cd3["pci"])["trim"]() === _0x1f43cf && _0x2ffa55 === _0x5712ce;
        });
        if (!_0x33c70f) _0x33c70f = _0x176251["find"](_0x3e6fc7 => String(_0x3e6fc7['pci'])["trim"]() === _0x1f43cf);
        return {
          'rsrp': _0x33c70f ? _0x33c70f["rsrp"] : '--',
          'sinr': _0x33c70f ? _0x33c70f['sinr'] : '--',
          'rsrq': _0x33c70f ? _0x33c70f['rsrq'] : '--'
        };
      }, _0x560937 = _0xb3d7f7(_0x276cfe['PCI'], _0x276cfe["Arfcn"], _0x276cfe["Band"]), _0x25c9ab = _0x276cfe["Type"] && _0x276cfe['Type']["toUpperCase"]()["includes"]('NR') || parseInt(_0x276cfe["Band"]) >= 0x28;
      (_0x374777['push']({
        'type': "PCC",
        'band': _0x4499ba((_0x25c9ab ? 'n' : 'B') + _0x276cfe['Band']),
        'arfcn': _0x276cfe["Arfcn"],
        'pci': _0x276cfe["PCI"],
        'rsrp': _0x276cfe["RSRP"] && _0x276cfe["RSRP"] !== '-' && _0x276cfe["RSRP"] !== '--' && _0x276cfe["RSRP"] !== '0' ? _0x276cfe["RSRP"] : _0x560937["rsrp"],
        'sinr': _0x276cfe["SINR"] && _0x276cfe["SINR"] !== '-' && _0x276cfe["SINR"] !== '--' && _0x276cfe["SINR"] !== '0' ? _0x276cfe['SINR'] : _0x560937["sinr"],
        'rsrq': _0x276cfe["RSRQ"] && _0x276cfe["RSRQ"] !== '-' && _0x276cfe["RSRQ"] !== '--' && _0x276cfe["RSRQ"] !== '0' ? _0x276cfe["RSRQ"] : _0x560937["rsrq"],
        'rssi': _0x2e0d16["RSSI"] || '--',
        'bandwidth': _0x2f89dc(_0x572949, _0x432836, _0x276cfe["DIBandWidth"], _0x276cfe["UIBandWidth"] || _0x276cfe['UlBandWidth']),
        'role': '主载波'
      }), _0x172044['forEach']((_0x2fa1dc, _0x4a747c) => {
        if (_0x2fa1dc && _0x2fa1dc["Band"] && _0x2fa1dc["Band"] !== '-') {
          const _0x539eb5 = _0xb3d7f7(_0x2fa1dc["PCI"], _0x2fa1dc["Arfcn"], _0x2fa1dc['Band']), _0xf4d12e = _0x2fa1dc["Type"] && _0x2fa1dc["Type"]['toUpperCase']()['includes']('NR') || parseInt(_0x2fa1dc["Band"]) >= 0x28;
          _0x374777["push"]({
            'type': 'SCC',
            'band': _0x4499ba((_0xf4d12e ? 'n' : 'B') + _0x2fa1dc["Band"]),
            'arfcn': _0x2fa1dc["Arfcn"],
            'pci': _0x2fa1dc["PCI"],
            'rsrp': _0x2fa1dc['RSRP'] && _0x2fa1dc["RSRP"] !== '-' && _0x2fa1dc['RSRP'] !== '--' && _0x2fa1dc["RSRP"] !== '0' ? _0x2fa1dc['RSRP'] : _0x539eb5["rsrp"],
            'sinr': _0x2fa1dc["SINR"] && _0x2fa1dc["SINR"] !== '-' && _0x2fa1dc["SINR"] !== '--' && _0x2fa1dc["SINR"] !== '0' ? _0x2fa1dc['SINR'] : _0x539eb5["sinr"],
            'rsrq': _0x2fa1dc["RSRQ"] && _0x2fa1dc["RSRQ"] !== '-' && _0x2fa1dc["RSRQ"] !== '--' && _0x2fa1dc["RSRQ"] !== '0' ? _0x2fa1dc['RSRQ'] : _0x539eb5["rsrq"],
            'rssi': '--',
            'bandwidth': _0x2fa1dc["DIBandWidth"] ? _0x2fa1dc['DIBandWidth'] : '--',
            'role': "从载波 " + (_0x4a747c + 0x1)
          });
        }
      }));
    }
  }
  if (!_0x36a76c) {
    const _0x5860ba = new Set();
    for (let _0x1d2f7a = 0x0; _0x1d2f7a < _0x51cf45["length"]; _0x1d2f7a++) {
      const _0x403101 = _0x51cf45[_0x1d2f7a] || '--', _0x19bc59 = _0x403101 !== '--' && (_0x403101['startsWith']('N') || _0x403101["startsWith"]('n') || parseInt(_0x403101) >= 0x28), _0x539452 = _0x403101 !== '--' ? _0x4499ba((_0x19bc59 ? 'n' : 'B') + _0x403101["replace"](/^[Nn]/, '')) : '--', _0x401efc = _0x2702a2[_0x1d2f7a] || '--', _0x291c2c = _0x3fabc3[_0x1d2f7a] || '--', _0x2a864d = _0x150df7[_0x1d2f7a] || '--', _0x2c01aa = _0x33f5ed[_0x1d2f7a] || '--', _0x55e1c3 = _0x37a724[_0x1d2f7a] || '--', _0x19e8b9 = _0x401efc !== '--' && !_0x5860ba["has"](_0x401efc);
      if (_0x19e8b9) {
        _0x5860ba['add'](_0x401efc);
        const _0x5e21be = _0x374777['length'] === 0x0;
        _0x374777['push']({
          'type': _0x5e21be ? 'PCC' : "SCC",
          'band': _0x539452,
          'arfcn': _0x401efc,
          'pci': _0x291c2c,
          'rsrp': _0x2a864d,
          'sinr': _0x2c01aa,
          'rsrq': _0x55e1c3,
          'rssi': _0x5e21be ? _0x2e0d16["RSSI"] || '--' : '--',
          'bandwidth': _0x5e21be ? _0x572949 !== '--' ? "DL " + _0x572949 + '\x20/\x20UL\x20' + _0x432836 : '--' : '--',
          'role': _0x5e21be ? "主载波" : "从载波 " + _0x374777['length']
        });
      }
    }
  }
  const _0xc8bae6 = [], _0x1d7781 = [];
  for (let _0x336e36 = 0x0; _0x336e36 < _0x51cf45["length"]; _0x336e36++) {
    const _0x2ae4b4 = String(_0x2702a2[_0x336e36] || '')["trim"](), _0x31052e = String(_0x3fabc3[_0x336e36] || '')["trim"](), _0x3c3688 = _0x51cf45[_0x336e36] || '--', _0x5e80d2 = _0x3fabc3[_0x336e36] || '--';
    if (_0x2ae4b4 === '--' || _0x2ae4b4 === '' || _0x31052e === '--' || _0x31052e === '') continue;
    let _0x556aa9 = false;
    for (let _0x589e35 = 0x0; _0x589e35 < _0x374777["length"]; _0x589e35++) {
      const _0x2b1634 = _0x374777[_0x589e35];
      if (String(_0x2b1634['arfcn'] || '')["trim"]() === _0x2ae4b4 && String(_0x2b1634['pci'] || '')["trim"]() === _0x31052e) {
        _0x556aa9 = true;
        break;
      }
    }
    if (_0x556aa9) continue;
    if (_0x5e80d2 === '--' || _0x5e80d2 === '' || _0x3c3688 === '--' || _0x3c3688 === '') continue;
    _0x1d7781["push"]({
      'pci': _0x5e80d2,
      'band': _0x3c3688,
      'rsrp': _0x150df7[_0x336e36] || '--',
      'sinr': _0x33f5ed[_0x336e36] || '--',
      'rsrq': _0x37a724[_0x336e36] || '--',
      'earfcn': _0x2ae4b4,
      'isCarrier': false,
      'carrierIndex': -0x1
    });
  }
  (_0x374777["forEach"]((_0x345d0c, _0x13537b) => {
    _0xc8bae6["push"]({
      'pci': _0x345d0c["pci"],
      'band': _0x345d0c['band'],
      'earfcn': _0x345d0c["arfcn"],
      'rsrp': _0x345d0c["rsrp"],
      'sinr': _0x345d0c["sinr"],
      'rsrq': _0x345d0c["rsrq"],
      'rssi': _0x345d0c['rssi'] || '--',
      'bandwidth': _0x345d0c["bandwidth"] || '--',
      'role': _0x345d0c['role'] || '',
      'isCarrier': true,
      'carrierIndex': _0x13537b
    });
  }), _0x1d7781["forEach"](_0x2df211 => _0xc8bae6["push"](_0x2df211)));
  const _0x459d5b = new Set(), _0x4e7f0a = [];
  return (_0xc8bae6['forEach'](_0x37e282 => {
    if (_0x37e282["isCarrier"] && _0x37e282["carrierIndex"] !== -0x1) {
      if (_0x459d5b['has'](_0x37e282['carrierIndex'])) return;
      _0x459d5b["add"](_0x37e282['carrierIndex']);
    }
    if (!_0x37e282["isCarrier"]) {
      if (!_0x37e282["pci"] || _0x37e282["pci"] === '--' || _0x37e282["pci"] === '' || !_0x37e282["band"] || _0x37e282["band"] === '--' || _0x37e282["band"] === '') return;
    }
    _0x4e7f0a["push"](_0x37e282);
  }), {
    'cells': _0x4e7f0a,
    'carriers': _0x374777
  });
}
let _0x1ad200 = false;
let _0x5371f5 = 0x0;
let _0x364f49 = 0x0;
async function _0x4315b7(_0x47a98c) {
  const _0x6eac46 = async _0x1008ad => {
    try {
      await __CPE["evalJS"]('window.ctrlRefreshDone\x20&&\x20window.ctrlRefreshDone(' + _0x1008ad + ", 'neighbor');");
    } catch (_0x3736e0) {}
  };
  if (_0x1ad200) {
    if (_0x47a98c === true) try {
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('正在刷新，请稍候', 'warning')");
    } catch (_0x3803bd) {}
    await _0x6eac46(-0x1);
    return;
  }
  const _0x3cb75b = Date['now'](), _0x262f15 = _0x47a98c ? _0x364f49 : _0x5371f5, _0x24db37 = _0x47a98c ? _0x53c415 : _0x52815f;
  if (_0x262f15 > 0x0 && _0x3cb75b - _0x262f15 < _0x24db37) {
    if (_0x47a98c === true) try {
      await __CPE['evalJS']("window.showUpdateToast && window.showUpdateToast('刷新太频繁，请稍后重试', 'warning')");
    } catch (_0x2839dd) {}
    await _0x6eac46(-0x1);
    return;
  }
  _0x1ad200 = true;
  let _0x6c3f39 = 0x0;
  try {
    let _0x304233 = {}, _0x2a0738 = {};
    const _0x3f08a5 = await _0x35200b();
    _0x3f08a5 && _0x3f08a5["rawData"] && (_0x304233 = _0x3f08a5["rawData"], _0x2a0738 = _0x3f08a5['remoteCa'] || ({}));
    _0x6c3f39 = [_0x304233, _0x2a0738]["filter"](_0x20ee24 => _0x20ee24 && Object['keys'](_0x20ee24)['length'] > 0x0)['length'];
    if (_0x6c3f39 > 0x0) {
      const _0x3f324c = _0x304233["SSB_RSRP"] || _0x304233['RSRP'] || _0x2a0738["main_CA_info"]?.["RSRP"] || '--', _0x720a4d = _0x304233["SSB_SINR"] || _0x304233["SINR"] || _0x2a0738["main_CA_info"]?.['SINR'] || '--', _0x5c6fe9 = _0x304233['SSB_RSRQ'] || _0x304233['RSRQ'] || _0x2a0738["main_CA_info"]?.["RSRQ"] || '--', _0x2eefbe = _0x304233['SSB_RSSI'] || _0x304233["RSSI"] || _0x2a0738["main_CA_info"]?.['RSSI'] || '--', _0x13064a = _0x304233["PCI"] || _0x2a0738['main_CA_info']?.["PCI"] || '--', _0x1e9b47 = _0x304233["BAND"] || _0x304233['NR_BAND'] || _0x304233["LTE_BAND"] || _0x2a0738["main_CA_info"]?.["Band"] || '--', _0x35f030 = _0x304233["EARFCN"] || _0x2a0738['main_CA_info']?.["Arfcn"] || '--';
      let _0x21d709 = _0x304233["BAND_NBR"] ? _0x304233["BAND_NBR"]["split"](',')["map"](_0x3ad4ab => _0x3ad4ab['trim']()) : [], _0x4d6e7f = _0x304233["EARFCN_NBR"] ? _0x304233["EARFCN_NBR"]['split'](',')["map"](_0x42b886 => _0x42b886["trim"]()) : [], _0x2b0228 = _0x304233["PCI_NBR"] ? _0x304233["PCI_NBR"]["split"](',')["map"](_0x5323d8 => _0x5323d8["trim"]()) : [], _0x3428b3 = _0x304233['RSRP_NBR'] ? _0x304233['RSRP_NBR']["split"](',')['map'](_0x2c5ba6 => _0x2c5ba6['trim']()) : [], _0x1f9917 = _0x304233["SINR_NBR"] ? _0x304233["SINR_NBR"]["split"](',')["map"](_0x8636ca => _0x8636ca["trim"]()) : [], _0x168e65 = [];
      if (_0x304233['RSRQ_NBR']) _0x168e65 = _0x304233["RSRQ_NBR"]["split"](',')["map"](_0x51102f => _0x51102f['trim']()); else {
        if (_0x3428b3["length"] > 0x0) _0x168e65 = Array(_0x3428b3["length"])["fill"](_0x5c6fe9);
      }
      _0x21d709["length"] === 0x0 && _0x1e9b47 !== '--' && (_0x21d709["push"](_0x1e9b47), _0x4d6e7f["push"](_0x35f030), _0x2b0228['push'](_0x13064a), _0x3428b3['push'](_0x3f324c), _0x1f9917["push"](_0x720a4d), _0x168e65['push'](_0x5c6fe9));
      _0x2a0738 && Array['isArray'](_0x2a0738['sub_CA_info']) && _0x2a0738["sub_CA_info"]["forEach"](_0x154ad5 => {
        if (_0x154ad5 && _0x154ad5["Band"] && _0x154ad5["Band"] !== '-') {
          let _0x38df68 = false;
          for (let _0x270f8c = 0x0; _0x270f8c < _0x21d709["length"]; _0x270f8c++) {
            if (String(_0x2b0228[_0x270f8c])["trim"]() === String(_0x154ad5['PCI'])['trim']() && String(_0x4d6e7f[_0x270f8c])["trim"]() === String(_0x154ad5['Arfcn'])["trim"]()) {
              _0x38df68 = true;
              break;
            }
          }
          !_0x38df68 && (_0x21d709["push"](_0x154ad5["Band"]), _0x4d6e7f["push"](_0x154ad5["Arfcn"] || '--'), _0x2b0228['push'](_0x154ad5["PCI"] || '--'), _0x3428b3['push'](_0x154ad5['RSRP'] || '--'), _0x1f9917["push"](_0x154ad5["SINR"] || '--'), _0x168e65["push"](_0x154ad5["RSRQ"] || '--'));
        }
      });
      const _0x20ba0c = _0x2a0738["main_CA_info"]?.["DIBandWidth"] || '--', _0x40ced1 = {
        'WorkMode': _0x304233["WorkMode"] || "",
        'DlBandWidth': _0x20ba0c,
        'UlBandWidth': '--',
        'BAND_NBR': _0x21d709["join"](','),
        'EARFCN_NBR': _0x4d6e7f["join"](','),
        'PCI_NBR': _0x2b0228["join"](','),
        'RSRP_NBR': _0x3428b3["join"](','),
        'SINR_NBR': _0x1f9917["join"](','),
        'RSRQ_NBR': _0x168e65["join"](','),
        'RSSI': _0x2eefbe
      }, _0x28da50 = _0x4f9a4d(_0x40ced1, _0x2a0738), _0x4de404 = _0x28da50["carriers"], _0x4be0da = _0x4de404["length"] > 0x0 ? _0x4de404[0x0]["rsrp"] : '--', _0x3bf2c1 = _0x4de404["length"] > 0x0 ? _0x4de404[0x0]["sinr"] : '--', _0x2b70ac = _0x4de404["length"] > 0x0 ? _0x4de404[0x0]['rsrq'] : '--', _0x1f5b3d = _0x4de404["map"](_0x21c947 => _0x4499ba(_0x21c947["band"])), _0x46222a = _0x1f5b3d["length"] > 0x0 ? _0x1f5b3d["join"]('+') : '--';
      let _0x4bcf1e = "1CC · 主单载波";
      if (_0x4de404["length"] > 0x1) {
        const _0x344817 = ['单', '双', '三', '四', '五', '六'], _0x456927 = _0x344817[_0x4de404["length"] - 0x1] || '' + _0x4de404["length"];
        _0x4bcf1e = _0x4de404["length"] + 'CC\x20·\x20' + _0x456927 + '载波聚合激活';
      }
      const _0x182b18 = {
        'allCells': _0x28da50["cells"],
        'carriers': _0x4de404,
        'rsrp': _0x4be0da,
        'sinr': _0x3bf2c1,
        'rsrq': _0x2b70ac,
        'rssi': _0x2eefbe,
        'rsrpColor': _0x161928(_0x4be0da),
        'sinrColor': _0x2d0292(_0x3bf2c1),
        'rsrqColor': _0x1eccf4(_0x2b70ac),
        'mode': _0x64e5ff(_0x40ced1["WorkMode"], _0x4de404),
        'bandTag': _0x46222a,
        'caSummary': _0x4bcf1e,
        'bandwidth': _0x20ba0c !== '--' ? "DL " + _0x20ba0c + " / UL --" : '--',
        'pci': _0x4de404["length"] > 0x0 ? _0x4de404[0x0]["pci"] : '--',
        'pccArfcn': _0x4de404["length"] > 0x0 ? _0x4de404[0x0]['arfcn'] : '--',
        'updateTime': new Date()["toLocaleString"]("zh-CN", {
          'hour12': false
        })
      }, _0x148d1a = Object["assign"]({}, _0x45ba4b() || ({}), _0x182b18);
      delete _0x148d1a["deviceOnline"];
      try {
        await __CPE["evalJS"]("updateData(" + JSON['stringify'](_0x148d1a) + ');');
      } catch (_0x45f964) {}
    }
  } finally {
    const _0x370e14 = Date["now"]();
    (_0x5371f5 = _0x370e14, _0x364f49 = _0x370e14, _0x1ad200 = false);
    if (_0x6c3f39 === 0x0) {
      let _0x494502 = false;
      try {
        _0x494502 = await _0x32dbea();
      } catch (_0x3df6b1) {}
      if (_0x494502) try {
        await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('网络不可用，请检查网络', 'warning')");
      } catch (_0x9e9e82) {} else {
        if (_0x47a98c === true) {
          const _0x5f2ab9 = _0x5daeaf(_0x52a69c);
          try {
            await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(' + JSON['stringify'](_0x5f2ab9) + ", 'warning')");
          } catch (_0x59b156) {}
        }
      }
    }
    await _0x6eac46(_0x6c3f39);
  }
}
function _0x10dc89(_0x1f7d52, _0x15f74e, _0x536a69) {
  _0x536a69 = _0x536a69 || ({});
  const _0x41a3ac = _0x1f7d52["SPN"] || '--', _0xeb1d05 = String(_0x1f7d52["SPN"] || '')["trim"]() === "未插卡", _0x4cff15 = _0x1f7d52["WorkMode"] || '--', _0x1f786c = _0x1f7d52["DlBandWidth"] || '--', _0x4b0f0c = _0x1f7d52['UlBandWidth'] || '--', _0x3f39c4 = (_0x1f7d52["BAND_NBR"] || '')["split"](',')["map"](_0x15ea0c => _0x15ea0c["trim"]())["filter"](_0x50257f => _0x50257f !== ''), _0x3e2667 = (_0x1f7d52["EARFCN_NBR"] || '')["split"](',')['map'](_0x1dffd6 => _0x1dffd6["trim"]())['filter'](_0x4aed58 => _0x4aed58 !== ''), _0xd044cb = (_0x1f7d52["PCI_NBR"] || '')["split"](',')['map'](_0xa5ca4b => _0xa5ca4b['trim']())['filter'](_0x485afa => _0x485afa !== ''), _0x20e9be = (_0x1f7d52["RSRP_NBR"] || '')['split'](',')["map"](_0x5aca9a => _0x5aca9a["trim"]())['filter'](_0x1c6d85 => _0x1c6d85 !== ''), _0x74ef3d = (_0x1f7d52["SINR_NBR"] || '')["split"](',')["map"](_0xd3b9fa => _0xd3b9fa["trim"]())["filter"](_0x55af2a => _0x55af2a !== ''), _0x368fee = (_0x1f7d52["RSRQ_NBR"] || '')["split"](',')["map"](_0xef20eb => _0xef20eb["trim"]())["filter"](_0x1c59bf => _0x1c59bf !== ''), _0x7933ce = [];
  for (let _0x249ead = 0x0; _0x249ead < _0x3f39c4['length']; _0x249ead++) {
    _0x7933ce["push"]({
      'band': _0x3f39c4[_0x249ead] || '--',
      'arfcn': _0x3e2667[_0x249ead] || '--',
      'pci': _0xd044cb[_0x249ead] || '--',
      'rsrp': _0x20e9be[_0x249ead] || '--',
      'sinr': _0x74ef3d[_0x249ead] || '--',
      'rsrq': _0x368fee[_0x249ead] || '--'
    });
  }
  const _0x762d86 = [];
  let _0x2691b2 = false;
  if (_0x15f74e) {
    const _0x15e2f0 = _0x15f74e["main_CA_info"], _0x3bfafe = _0x15f74e["sub_CA_info"] || [];
    if (_0x15e2f0 && _0x15e2f0["Band"] && _0x15e2f0["Band"] !== '-') {
      _0x2691b2 = true;
      const _0x4d5776 = (_0x149e8f, _0x4d4ecb, _0x2cd2ec) => {
        const _0x540c2f = String(_0x149e8f || '')["trim"](), _0x4aaeb0 = String(_0x4d4ecb || '')['trim'](), _0x2fa31b = String(_0x2cd2ec || '')['trim']()["toLowerCase"]()["replace"](/^[nb]/i, '');
        let _0x5e74dd = _0x7933ce["find"](_0x3bc288 => String(_0x3bc288["pci"])["trim"]() === _0x540c2f && String(_0x3bc288["arfcn"])["trim"]() === _0x4aaeb0);
        if (!_0x5e74dd) _0x5e74dd = _0x7933ce["find"](_0x44ab7b => {
          const _0x39c001 = String(_0x44ab7b["band"])["trim"]()["toLowerCase"]()["replace"](/^[nb]/i, '');
          return String(_0x44ab7b["pci"])["trim"]() === _0x540c2f && _0x39c001 === _0x2fa31b;
        });
        if (!_0x5e74dd) _0x5e74dd = _0x7933ce["find"](_0x3b9d86 => String(_0x3b9d86['pci'])["trim"]() === _0x540c2f);
        return {
          'rsrp': _0x5e74dd ? _0x5e74dd["rsrp"] : '--',
          'sinr': _0x5e74dd ? _0x5e74dd["sinr"] : '--',
          'rsrq': _0x5e74dd ? _0x5e74dd["rsrq"] : '--'
        };
      }, _0x4aa9d5 = _0x4d5776(_0x15e2f0["PCI"], _0x15e2f0["Arfcn"], _0x15e2f0["Band"]), _0x5ecf83 = _0x15e2f0["Type"] && _0x15e2f0['Type']['toUpperCase']()["includes"]('NR') || parseInt(_0x15e2f0["Band"]) >= 0x28;
      (_0x762d86["push"]({
        'type': "PCC",
        'band': _0x4499ba((_0x5ecf83 ? 'n' : 'B') + _0x15e2f0["Band"]),
        'arfcn': _0x15e2f0['Arfcn'],
        'pci': _0x15e2f0["PCI"],
        'rsrp': _0x15e2f0["RSRP"] && _0x15e2f0["RSRP"] !== '-' && _0x15e2f0["RSRP"] !== '--' && _0x15e2f0['RSRP'] !== '0' ? _0x15e2f0["RSRP"] : _0x4aa9d5["rsrp"],
        'sinr': _0x15e2f0['SINR'] && _0x15e2f0["SINR"] !== '-' && _0x15e2f0['SINR'] !== '--' && _0x15e2f0["SINR"] !== '0' ? _0x15e2f0["SINR"] : _0x4aa9d5["sinr"],
        'rsrq': _0x15e2f0['RSRQ'] && _0x15e2f0["RSRQ"] !== '-' && _0x15e2f0["RSRQ"] !== '--' && _0x15e2f0["RSRQ"] !== '0' ? _0x15e2f0["RSRQ"] : _0x4aa9d5["rsrq"],
        'rssi': _0x1f7d52["RSSI"] || '--',
        'bandwidth': _0x2f89dc(_0x1f786c, _0x4b0f0c, _0x15e2f0["DIBandWidth"], _0x15e2f0["UIBandWidth"] || _0x15e2f0['UlBandWidth']),
        'role': "主载波"
      }), _0x3bfafe["forEach"]((_0x1baa66, _0x5dc154) => {
        if (_0x1baa66 && _0x1baa66["Band"] && _0x1baa66["Band"] !== '-') {
          const _0x3c1682 = _0x4d5776(_0x1baa66["PCI"], _0x1baa66["Arfcn"], _0x1baa66["Band"]), _0x304017 = _0x1baa66["Type"] && _0x1baa66["Type"]["toUpperCase"]()["includes"]('NR') || parseInt(_0x1baa66["Band"]) >= 0x28;
          _0x762d86["push"]({
            'type': 'SCC',
            'band': _0x4499ba((_0x304017 ? 'n' : 'B') + _0x1baa66["Band"]),
            'arfcn': _0x1baa66["Arfcn"],
            'pci': _0x1baa66["PCI"],
            'rsrp': _0x1baa66["RSRP"] && _0x1baa66["RSRP"] !== '-' && _0x1baa66["RSRP"] !== '--' && _0x1baa66["RSRP"] !== '0' ? _0x1baa66['RSRP'] : _0x3c1682['rsrp'],
            'sinr': _0x1baa66["SINR"] && _0x1baa66['SINR'] !== '-' && _0x1baa66["SINR"] !== '--' && _0x1baa66["SINR"] !== '0' ? _0x1baa66["SINR"] : _0x3c1682["sinr"],
            'rsrq': _0x1baa66["RSRQ"] && _0x1baa66["RSRQ"] !== '-' && _0x1baa66["RSRQ"] !== '--' && _0x1baa66["RSRQ"] !== '0' ? _0x1baa66['RSRQ'] : _0x3c1682["rsrq"],
            'rssi': '--',
            'bandwidth': _0x1baa66['DIBandWidth'] ? _0x1baa66["DIBandWidth"] : '--',
            'role': '从载波\x20' + (_0x5dc154 + 0x1)
          });
        }
      }));
    }
  }
  if (!_0x2691b2) {
    const _0x994e06 = new Set();
    for (let _0x52fa36 = 0x0; _0x52fa36 < _0x3f39c4["length"]; _0x52fa36++) {
      const _0x5f3505 = _0x3f39c4[_0x52fa36] || '--', _0x125cb4 = _0x5f3505 !== '--' && (_0x5f3505["startsWith"]('N') || _0x5f3505["startsWith"]('n') || parseInt(_0x5f3505) >= 0x28), _0x130769 = _0x5f3505 !== '--' ? _0x4499ba((_0x125cb4 ? 'n' : 'B') + _0x5f3505["replace"](/^[Nn]/, '')) : '--', _0x8920a2 = _0x3e2667[_0x52fa36] || '--', _0x1dee6d = _0xd044cb[_0x52fa36] || '--', _0x4373bc = _0x20e9be[_0x52fa36] || '--', _0x15d099 = _0x74ef3d[_0x52fa36] || '--', _0x1c8bfd = _0x368fee[_0x52fa36] || '--', _0x5c7bbd = _0x8920a2 !== '--' && !_0x994e06["has"](_0x8920a2);
      if (_0x5c7bbd) {
        _0x994e06['add'](_0x8920a2);
        const _0x328284 = _0x762d86["length"] === 0x0;
        _0x762d86["push"]({
          'type': _0x328284 ? "PCC" : 'SCC',
          'band': _0x130769,
          'arfcn': _0x8920a2,
          'pci': _0x1dee6d,
          'rsrp': _0x4373bc,
          'sinr': _0x15d099,
          'rsrq': _0x1c8bfd,
          'rssi': _0x328284 ? _0x1f7d52["RSSI"] || '--' : '--',
          'bandwidth': _0x328284 ? _0x1f786c !== '--' ? "DL " + _0x1f786c + " / UL " + _0x4b0f0c : '--' : '--',
          'role': _0x328284 ? "主载波" : "从载波 " + _0x762d86["length"]
        });
      }
    }
  }
  const _0x394bf0 = [], _0x36fd40 = [];
  for (let _0x5f88c4 = 0x0; _0x5f88c4 < _0x3f39c4["length"]; _0x5f88c4++) {
    const _0x5dbb94 = String(_0x3e2667[_0x5f88c4] || '')["trim"](), _0x42cab4 = String(_0xd044cb[_0x5f88c4] || '')["trim"](), _0x36e894 = _0x3f39c4[_0x5f88c4] || '--', _0x29f6b5 = _0xd044cb[_0x5f88c4] || '--';
    if (_0x5dbb94 === '--' || _0x5dbb94 === '' || _0x42cab4 === '--' || _0x42cab4 === '') continue;
    let _0x32b2e0 = false;
    for (let _0x29481c = 0x0; _0x29481c < _0x762d86["length"]; _0x29481c++) {
      const _0x54e19d = _0x762d86[_0x29481c];
      if (String(_0x54e19d["arfcn"] || '')["trim"]() === _0x5dbb94 && String(_0x54e19d["pci"] || '')["trim"]() === _0x42cab4) {
        _0x32b2e0 = true;
        break;
      }
    }
    if (_0x32b2e0) continue;
    if (_0x29f6b5 === '--' || _0x29f6b5 === '' || _0x36e894 === '--' || _0x36e894 === '') continue;
    _0x36fd40["push"]({
      'pci': _0x29f6b5,
      'band': _0x36e894,
      'rsrp': _0x20e9be[_0x5f88c4] || '--',
      'sinr': _0x74ef3d[_0x5f88c4] || '--',
      'rsrq': _0x368fee[_0x5f88c4] || '--',
      'earfcn': _0x5dbb94,
      'isCarrier': false,
      'carrierIndex': -0x1
    });
  }
  (_0x762d86["forEach"]((_0x3344d3, _0x23f3c0) => {
    _0x394bf0['push']({
      'pci': _0x3344d3['pci'],
      'band': _0x3344d3["band"],
      'earfcn': _0x3344d3["arfcn"],
      'rsrp': _0x3344d3["rsrp"],
      'sinr': _0x3344d3['sinr'],
      'rsrq': _0x3344d3['rsrq'],
      'rssi': _0x3344d3["rssi"] || '--',
      'bandwidth': _0x3344d3["bandwidth"] || '--',
      'role': _0x3344d3["role"] || '',
      'isCarrier': true,
      'carrierIndex': _0x23f3c0
    });
  }), _0x36fd40["forEach"](_0x3b72ed => _0x394bf0["push"](_0x3b72ed)));
  const _0x2c3272 = new Set(), _0x31e1fc = [];
  _0x394bf0["forEach"](_0x59a001 => {
    if (_0x59a001["isCarrier"] && _0x59a001["carrierIndex"] !== -0x1) {
      if (_0x2c3272['has'](_0x59a001["carrierIndex"])) return;
      _0x2c3272["add"](_0x59a001['carrierIndex']);
    }
    if (!_0x59a001['isCarrier']) {
      if (!_0x59a001['pci'] || _0x59a001["pci"] === '--' || _0x59a001["pci"] === '' || !_0x59a001['band'] || _0x59a001["band"] === '--' || _0x59a001["band"] === '') return;
    }
    _0x31e1fc['push'](_0x59a001);
  });
  const _0x880add = _0x762d86["length"] > 0x0 ? _0x762d86[0x0]["rsrp"] : '--', _0x2c9520 = _0x762d86['length'] > 0x0 ? _0x762d86[0x0]["sinr"] : '--', _0x35fe56 = _0x762d86["length"] > 0x0 ? _0x762d86[0x0]["rsrq"] : '--', _0x564056 = _0x1f7d52["RSSI"] || '--', _0x778943 = _0x762d86["map"](_0x4000f8 => _0x4499ba(_0x4000f8["band"])), _0x5ad7c7 = _0x778943["length"] > 0x0 ? _0x778943["join"]('+') : '--';
  let _0x14ed12 = "1CC · 主单载波";
  if (_0x762d86["length"] > 0x1) {
    const _0x52f4f9 = ['单', '双', '三', '四', '五', '六'], _0x1c35ae = _0x52f4f9[_0x762d86["length"] - 0x1] || '' + _0x762d86['length'];
    _0x14ed12 = _0x762d86["length"] + "CC · " + _0x1c35ae + "载波聚合激活";
  }
  const _0x1ed959 = _0x762d86['length'] > 0x0 ? _0x762d86[0x0]['arfcn'] : '--', _0x48403a = _0x762d86['length'] > 0x0 ? _0x762d86[0x0]["pci"] : '--', _0x55e062 = _0x4867bf(_0x1f7d52["todayRxBytes"]), _0x51c5f4 = _0x4867bf(_0x1f7d52["todayTxBytes"]), _0x10d56f = _0x4867bf(_0x1f7d52['monthRxBytes']), _0x356e86 = _0x4867bf(_0x1f7d52['monthTxBytes']), _0x48edcd = _0xcb1190(_0x1f7d52['DL_AMBR']), _0x45209b = _0xcb1190(_0x1f7d52["UL_AMBR"]), _0x14f0a3 = _0x1f7d52["QCI"] || '--';
  (_0x4d793f = _0x536a69, _0x56dd77 = Date["now"]());
  let _0x424272 = '--';
  if (_0x536a69 && _0x536a69["UpTime"]) {
    const _0x424f8b = parseInt(_0x536a69["UpTime"]);
    if (!isNaN(_0x424f8b) && _0x424f8b > 0x0) {
      const _0x4f9939 = Math['floor'](_0x424f8b / 0x15180), _0x35b00e = Math["floor"](_0x424f8b % 0x15180 / 0xe10), _0x5ce897 = Math['floor'](_0x424f8b % 0xe10 / 0x3c);
      let _0x479a44 = [];
      if (_0x4f9939 > 0x0) _0x479a44["push"](_0x4f9939 + '天');
      if (_0x35b00e > 0x0 || _0x4f9939 > 0x0) _0x479a44['push'](_0x35b00e + '小时');
      (_0x479a44["push"](_0x5ce897 + '分'), _0x424272 = _0x479a44["join"]('\x20'));
    }
  }
  let _0x265bf3 = _0x16e738["has"](_0x48240a["DEVICE_NAME"]) ? _0x16e738["get"](_0x48240a["DEVICE_NAME"]) : _0x536a69["Name"] || '--';
  if (_0x536a69["Name"]) _0x16e738["set"](_0x48240a['DEVICE_NAME'], _0x536a69["Name"]);
  let _0xb6aee7 = _0x16e738['has'](_0x48240a["DEVICE_MODEL"]) ? _0x16e738["get"](_0x48240a["DEVICE_MODEL"]) : _0x536a69["DeviceType"] || '--';
  if (_0x536a69["DeviceType"]) _0x16e738["set"](_0x48240a["DEVICE_MODEL"], _0x536a69["DeviceType"]);
  let _0x5cfb87 = _0x536a69["FWVersion"] || '--';
  if (_0x536a69["FWVersion"] && _0x536a69["FWVersion"] !== '--') _0x16e738["set"](_0x48240a["DEVICE_VERSION"], _0x536a69['FWVersion']);
  let _0x18483c = _0x536a69["cpuusage"] || '--', _0x8f2918 = _0x536a69['ramusage'] || '--', _0x2c169e = null;
  const _0x1cc4cf = parseFloat(_0x536a69["modemTemp"]);
  !isNaN(_0x1cc4cf) && _0x1cc4cf > -0x7530 && _0x1cc4cf < 0x249f0 && (_0x2c169e = (_0x1cc4cf / 0x3e8)["toFixed"](0x1) + '°');
  const _0x5df95c = ('modemTemp' in _0x536a69) ? _0x2c169e || '' : null, _0x1585c3 = ("onlineNum" in _0x536a69) ? String(_0x536a69["onlineNum"] || '') : null;
  let _0x1d33a3 = _0x16e738["has"](_0x48240a["DEVICE_SN"]) ? _0x16e738["get"](_0x48240a["DEVICE_SN"]) : _0x536a69['SN'] || '--', _0x3678ee = _0x536a69["HWVersion"] || '--', _0x1ae428 = _0x1f7d52["IMEI"] || '--', _0x2caf7b = _0x1f7d52['IMSI'] || '--', _0x3fe1e5 = _0x1f7d52['PhoneNum'] || '--', _0x431e77 = _0x16e738["has"](_0x48240a['MAC']) ? _0x16e738["get"](_0x48240a["MAC"]) : _0x536a69['Mac'] || '--', _0x3771f4 = _0x536a69['ip'] || '--', _0x3c1509 = _0x536a69["SSID1"] || '--', _0x592b79 = _0x536a69["SSID2"] || '--';
  const _0x448b5e = {
    'operator': _0x41a3ac,
    'noSim': _0xeb1d05,
    'mode': _0x64e5ff(_0x4cff15, _0x762d86),
    'bandTag': _0x5ad7c7,
    'bandwidth': _0x1f786c !== '--' ? 'DL\x20' + _0x1f786c + " / UL " + _0x4b0f0c : '--',
    'caSummary': _0x14ed12,
    'carriers': _0x762d86,
    'pci': _0x48403a,
    'pccArfcn': _0x1ed959,
    'rsrp': _0x880add,
    'sinr': _0x2c9520,
    'rsrq': _0x35fe56,
    'rssi': _0x564056,
    'rsrpColor': _0x161928(_0x880add),
    'sinrColor': _0x2d0292(_0x2c9520),
    'rsrqColor': _0x1eccf4(_0x35fe56),
    'deviceName': _0x265bf3,
    'deviceModel': _0xb6aee7,
    'swVersion': _0x5cfb87,
    'hwVersion': _0x3678ee,
    'imei': _0x1ae428,
    'imsi': _0x2caf7b,
    'phoneNumber': _0x3fe1e5,
    'deviceMac': _0x431e77,
    'macWlan0': _0x536a69["Wlan0Mac"] || '',
    'macWlan1': _0x536a69['Wlan1Mac'] || '',
    'wanIp': _0x3771f4,
    'ssid1': _0x3c1509,
    'ssid2': _0x592b79,
    'cpuUsage': _0x18483c,
    'ramUsage': _0x8f2918,
    'modemTemp': _0x5df95c,
    'onlineNum': _0x1585c3,
    'deviceSN': _0x1d33a3,
    'rxToday': _0x47f275(_0x1f7d52["todayRxBytes"]),
    'txToday': _0x47f275(_0x1f7d52['todayTxBytes']),
    'todayRxToday': _0x55e062,
    'todayTxToday': _0x51c5f4,
    'monthRxToday': _0x10d56f,
    'monthTxToday': _0x356e86,
    'trafficMonOn': _0x1f7d52["trafficMonOn"],
    'trafficMonMaxMB': _0x1f7d52["trafficMonMaxMB"],
    'trafficDayOn': _0x1f7d52['trafficDayOn'],
    'trafficDayMaxMB': _0x1f7d52["trafficDayMaxMB"],
    'dlAmbrMbps': _0x48edcd,
    'ulAmbrMbps': _0x45209b,
    'qci': _0x14f0a3,
    'allCells': _0x31e1fc,
    'uptimeText': _0x424272,
    'upSpeed': _0x536a69["UpSpeed"] != null ? String(_0x536a69["UpSpeed"]) : null,
    'downSpeed': _0x536a69["DownSpeed"] != null ? String(_0x536a69["DownSpeed"]) : null,
    'updateTime': new Date()['toLocaleString']("zh-CN", {
      'hour12': false
    }),
    'clientDevices': Array["isArray"](_0x536a69["MainBaseInfo"]) ? _0x536a69["MainBaseInfo"]["map"](_0x4f9fe6 => ({
      'name': _0x4f9fe6['Name'] || _0x4f9fe6["ByName"] || "unknown",
      'mac': _0x4f9fe6["Mac"] || '--',
      'ip': _0x4f9fe6['ip'] || '--',
      'netStatus': String(_0x4f9fe6["NetStatus"] || '0'),
      'accessType': _0x4f9fe6['AccessType'] || '0',
      'accessTypeText': _0x4f9fe6["AccessType"] === '4' ? "5G接入" : _0x4f9fe6['AccessType'] === '2' ? '2.4G接入' : '接入',
      'accessTimeText': _0x998c8e(_0x4f9fe6["AccessTime"]),
      'downSpeed': _0x4f9fe6["DownSpeed"] || '0',
      'upSpeed': _0x4f9fe6["UpSpeed"] || '0',
      'accessEnable': String(_0x4f9fe6["AccessEnable"] !== undefined ? _0x4f9fe6["AccessEnable"] : '1'),
      'speedLimit': String(_0x4f9fe6["SpeedLimit"] || '0'),
      'upLimit': String(_0x4f9fe6["UpLimit"] || '0'),
      'downLimit': String(_0x4f9fe6["DownLimit"] || '0'),
      'netMonopoly': String(_0x4f9fe6["NetMonopoly"] || '0'),
      'devType': String(_0x4f9fe6["DevType"] || '3')
    })) : [],
    'offlineDevSwitch': _0x536a69["OfflineDevSwitch"] !== undefined ? String(_0x536a69["OfflineDevSwitch"]) : null,
    'superMode': _0x22a7ec() ? '1' : '0',
    'deviceOnline': true
  };
  return (_0x1014fb(_0x448b5e), _0x448b5e);
}
let _0x4d793f = null;
let _0x56dd77 = 0x0;
let _0x2e12ad = false;
let _0x4ff86d = 0x0;
let _0x2e1721 = 0x0;
let _0x5cb38a = false;
let _0x5a2c76 = null;
let _0x376838 = false;
const _0x52815f = 0x7530;
const _0x53c415 = 0x1388;
async function _0x55b11f() {
  try {
    const _0x55e5a7 = {};
    if (_0x16e738["has"](_0x48240a["LOCK_CELL"])) _0x55e5a7["lockCellInfo"] = JSON["parse"](_0x16e738['get'](_0x48240a["LOCK_CELL"]));
    if (_0x16e738['has'](_0x48240a['LOCK_BAND'])) {
      const _0x3b82a0 = JSON["parse"](_0x16e738["get"](_0x48240a['LOCK_BAND']));
      (_0x55e5a7["bandLockData"] = _0x3b82a0, _0x55e5a7['bandLockEnabled'] = _0x3b82a0["LockFrequencyBand"] || '0', _0x55e5a7["bandLock4g"] = (_0x3b82a0['Frequency_4G'] || '')["split"](',')["filter"](Boolean)["map"](_0x50222c => 'B' + _0x50222c["trim"]())["join"]('\x20'), _0x55e5a7["bandLock5g"] = (_0x3b82a0["Frequency_5G"] || '')['split'](',')["filter"](Boolean)['map'](_0x3ca509 => 'N' + _0x3ca509["trim"]())["join"]('\x20'));
    }
    if (_0x16e738['has'](_0x48240a["LED"])) _0x55e5a7['ledStatus'] = _0x16e738['get'](_0x48240a["LED"]); else _0x55e5a7['ledStatus'] = "unknown";
    if (_0x16e738['has'](_0x48240a["FAN"])) {
      const _0x16a9c4 = JSON["parse"](_0x16e738["get"](_0x48240a["FAN"]));
      (_0x55e5a7["fanMode"] = _0x16a9c4["label"], _0x55e5a7['fanModeValue'] = _0x16a9c4["value"]);
    }
    if (_0x16e738["has"](_0x48240a["NR_MODE"])) {
      const _0x32340a = {
        '1': "sa_only",
        '2': "nsa_only",
        '3': "sa_nsa"
      }, _0xe6c41d = {
        '1': "仅SA",
        '2': "仅NSA",
        '3': "SA+NSA"
      }, _0x5d062f = _0x16e738["get"](_0x48240a["NR_MODE"]);
      (_0x55e5a7["nrModeValue"] = _0x32340a[_0x5d062f] || "sa_nsa", _0x55e5a7["nrMode"] = _0xe6c41d[_0x5d062f] || 'SA+NSA');
    }
    if (_0x16e738["has"](_0x48240a['CA'])) _0x55e5a7["caStatus"] = _0x16e738['get'](_0x48240a['CA']); else _0x55e5a7['caStatus'] = "unknown";
    if (_0x16e738["has"](_0x48240a['NET_MODE'])) {
      const _0x3e999d = {
        '0': ["4g_only", '仅4G'],
        '1': ["4g_only", "仅4G"],
        '2': ["5g_only", "仅5G"],
        '3': ["5g_auto", '5G优先'],
        '4': ['3g_only', "仅3G"]
      }, _0x50b0ac = _0x16e738['get'](_0x48240a['NET_MODE']), _0x6d3214 = _0x3e999d[_0x50b0ac] || ["5g_auto", "5G优先"];
      _0x55e5a7['modeValue'] = _0x6d3214[0x0];
    }
    if (_0x16e738["has"](_0x48240a["REBOOT"])) try {
      const _0x1b1b4c = JSON["parse"](_0x16e738["get"](_0x48240a['REBOOT']));
      (_0x55e5a7["rebootEnabled"] = _0x1b1b4c['enable'] || '0', _0x55e5a7["rebootText"] = _0x1b1b4c["enable"] === '1' ? _0x1be9b3(_0x1b1b4c['days']) + '\x20' + (_0x1b1b4c["time"] || '') : "已禁用");
    } catch (_0x4b73c0) {}
    (_0x55e5a7["smsTabEnabled"] = _0x16e738["has"](_0x48240a["SMS_TAB"]) ? _0x16e738['get'](_0x48240a["SMS_TAB"]) : '0', _0x55e5a7["speedUnit"] = _0x16e738["has"](_0x48240a["SPEED_UNIT"]) ? _0x16e738["get"](_0x48240a["SPEED_UNIT"]) : 'kb');
    let _0x5214e0 = _0x45ba4b();
    if (_0x5214e0 && Array["isArray"](_0x5214e0['clientDevices'])) _0x55e5a7["clientDevices"] = _0x5214e0["clientDevices"];
    if (Object["keys"](_0x55e5a7)["length"] > 0x0) await __CPE['evalJS']("updateData(" + JSON["stringify"](_0x55e5a7) + ');');
  } catch (_0x24cee3) {}
}
async function _0x37b228(_0x57ed88) {
  const _0x1f730a = {};
  if (_0x57ed88 === "net" && _0x16e738['has'](_0x48240a["NET_MODE"])) {
    const _0x499de7 = {
      '0': "4g_only",
      '1': "4g_only",
      '2': '5g_only',
      '3': '5g_auto',
      '4': "3g_only"
    };
    _0x1f730a["modeValue"] = _0x499de7[_0x16e738['get'](_0x48240a["NET_MODE"])] || "5g_auto";
  } else {
    if (_0x57ed88 === 'nr' && _0x16e738["has"](_0x48240a['NR_MODE'])) {
      const _0x20c851 = _0x16e738["get"](_0x48240a["NR_MODE"]);
      (_0x1f730a["nrModeValue"] = ({
        '1': 'sa_only',
        '2': "nsa_only",
        '3': 'sa_nsa'
      })[_0x20c851] || "sa_nsa", _0x1f730a["nrMode"] = ({
        '1': "仅SA",
        '2': '仅NSA',
        '3': "SA+NSA"
      })[_0x20c851] || "SA+NSA");
    } else {
      if (_0x57ed88 === 'ca' && _0x16e738["has"](_0x48240a['CA'])) _0x1f730a["caStatus"] = _0x16e738["get"](_0x48240a['CA']); else {
        if (_0x57ed88 === 'led' && _0x16e738["has"](_0x48240a["LED"])) _0x1f730a["ledStatus"] = _0x16e738["get"](_0x48240a["LED"]); else {
          if (_0x57ed88 === "fan" && _0x16e738["has"](_0x48240a["FAN"])) try {
            const _0x2e0fe3 = JSON["parse"](_0x16e738["get"](_0x48240a["FAN"]));
            (_0x1f730a["fanModeValue"] = _0x2e0fe3["value"], _0x1f730a['fanMode'] = _0x2e0fe3["label"]);
          } catch (_0x2100a7) {}
        }
      }
    }
  }
  try {
    Object["keys"](_0x1f730a)["length"] && (_0x1f730a['_ctrlRevert'] = true, await __CPE["evalJS"]("updateData(" + JSON["stringify"](_0x1f730a) + ');'));
  } catch (_0x41bf2e) {}
  try {
    await __CPE['evalJS']('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27远程服务正在恢复，请稍候\x27,\x20\x27warning\x27)');
  } catch (_0x195b10) {}
}
async function _0x2becd7(_0x176c0e) {
  await _0x55b11f();
  if (_0x2e12ad) {
    if (_0x176c0e === true) try {
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('正在刷新，请稍候', 'warning')");
    } catch (_0x3f7c41) {}
    try {
      await __CPE["evalJS"]('window.ctrlRefreshDone\x20&&\x20window.ctrlRefreshDone(-1);');
    } catch (_0xb0c4cc) {}
    return;
  }
  const _0x20bc8d = Date["now"](), _0xc21506 = _0x176c0e ? _0x2e1721 : _0x4ff86d, _0x31ae19 = _0x176c0e ? _0x53c415 : _0x5cb38a ? _0x53c415 : _0x52815f;
  if (_0xc21506 > 0x0 && _0x20bc8d - _0xc21506 < _0x31ae19) {
    if (_0x176c0e === true) try {
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('刷新太频繁，请稍后重试', 'warning')");
    } catch (_0x40f8cc) {}
    try {
      await __CPE["evalJS"]("window.ctrlRefreshDone && window.ctrlRefreshDone(-1);");
    } catch (_0xd52287) {}
    return;
  }
  (_0x2e12ad = true, __CPE["timer"](0xc8, async () => {
    const _0x61d326 = Date["now"]();
    let _0x43eeae = 0x0;
    try {
      let _0x246ab7 = false;
      const _0x3844c5 = _0x3d4111 => {
        if (_0x246ab7 || !_0x3d4111) return;
        _0x246ab7 = true;
        try {
          __CPE["evalJS"]('window.ctrlRefreshDone\x20&&\x20window.ctrlRefreshDone(1,\x206);')['catch'](() => {});
        } catch (_0x22884a) {}
      };
      const _0x1eea28 = _0x4f44fb(), _0x9cfe01 = _0x1eea28 ? _0xd64c49(_0x1eea28["host"]) : '';
      if (!_0x1eea28 || !await _0x2ae0a1(_0x9cfe01, _0x1eea28)) {
        if (!_0x246ab7) try {
          await __CPE["evalJS"]("window.ctrlRefreshDone && window.ctrlRefreshDone(0, 6);");
        } catch (_0x4f9f1f) {}
      } else {
        let _0x5ee04e = 0x0, _0x472ea9 = false;
        const _0x4ba302 = async _0x42dd7a => {
          try {
            await __CPE["evalJS"]("updateData(" + JSON["stringify"](_0x42dd7a) + ');');
          } catch (_0x428a34) {}
        }, _0x511f9c = _0x409fd6 => _0x409fd6 !== '' && _0x409fd6 != null && _0x409fd6 !== undefined, _0x40bfa3 = await _0x3d8483(_0x9cfe01, "get_value_by_xmlnode", {
          'led': 'DeviceInfo.X_FH_LedControl.Switch',
          'fan': 'X_FH_MobileNetwork.FanAutoConfig.mode',
          'bandEn': "X_FH_MobileNetwork.NetworkSettings.LockBandEnable",
          'bandLTE': "X_FH_MobileNetwork.NetworkSettings.LTELockBAND",
          'bandNR': "X_FH_MobileNetwork.NetworkSettings.NRLockBAND",
          'netMode': 'X_FH_MobileNetwork.NetworkSettings.NetworkMode',
          'workMode': 'X_FH_MobileNetwork.NetworkSettings.ENDC',
          'caNR': "X_FH_MobileNetwork.NetworkInfo.CaEnable",
          'rbEn': "DeviceInfo.TimedReboot.1.enable",
          'rbDays': "DeviceInfo.TimedReboot.1.week_of_day",
          'rbTime': 'DeviceInfo.TimedReboot.1.time'
        }) || ({});
        _0x511f9c(_0x40bfa3["led"]) && (_0x16e738["set"](_0x48240a["LED"], String(_0x40bfa3["led"])), await _0x4ba302({
          'ledStatus': String(_0x40bfa3["led"])
        }), _0x5ee04e++);
        if (_0x511f9c(_0x40bfa3["fan"])) {
          const _0x59c731 = ({
            '0': ["auto", '标准'],
            '1': ["power", '静音'],
            '2': ["silent", '性能']
          })[String(_0x40bfa3["fan"])] || ["auto", '标准'];
          (_0x16e738['set'](_0x48240a["FAN"], JSON["stringify"]({
            'value': _0x59c731[0x0],
            'label': _0x59c731[0x1]
          })), await _0x4ba302({
            'fanMode': _0x59c731[0x1],
            'fanModeValue': _0x59c731[0x0]
          }), _0x5ee04e++);
        }
        if (_0x511f9c(_0x40bfa3["bandEn"])) {
          const _0x2788b7 = String(_0x40bfa3["bandLTE"] || '')['split'](',')["filter"](Boolean)['map'](_0x2285ac => 'B' + _0x2285ac["trim"]())["join"]('\x20'), _0x28a541 = String(_0x40bfa3["bandNR"] || '')["split"](',')["filter"](Boolean)["map"](_0x10f720 => 'N' + _0x10f720['trim']())["join"]('\x20'), _0xc527a6 = {
            'LockFrequencyBand': String(_0x40bfa3["bandEn"]),
            'Frequency_4G': String(_0x40bfa3['bandLTE'] || ''),
            'Frequency_5G': String(_0x40bfa3["bandNR"] || '')
          };
          (_0x16e738["set"](_0x48240a["LOCK_BAND"], JSON["stringify"](_0xc527a6)), await _0x4ba302({
            'bandLockData': _0xc527a6,
            'bandLockEnabled': String(_0x40bfa3["bandEn"]),
            'bandLock4g': _0x2788b7,
            'bandLock5g': _0x28a541
          }), _0x5ee04e++);
        }
        if (_0x511f9c(_0x40bfa3['netMode']) || _0x511f9c(_0x40bfa3["workMode"]) || _0x511f9c(_0x40bfa3["caNR"])) {
          const _0x53fb81 = _0x42086e(_0x40bfa3["workMode"]), _0x599c28 = _0x511f9c(_0x40bfa3["netMode"]) ? String(_0x40bfa3["netMode"]) : '3', _0x271ccd = _0x511f9c(_0x40bfa3["caNR"]) ? String(_0x40bfa3['caNR']) : '0';
          (_0x16e738["set"](_0x48240a["NR_MODE"], _0x53fb81), _0x16e738["set"](_0x48240a["NET_MODE"], _0x599c28), _0x16e738["set"](_0x48240a['CA'], _0x271ccd));
          const _0x52f537 = {
            '1': "仅SA",
            '2': '仅NSA',
            '3': "SA+NSA"
          }, _0x2dccfd = {
            '1': "sa_only",
            '2': 'nsa_only',
            '3': "sa_nsa"
          }, _0x3fbeeb = {
            '0': ["4g_only", "仅4G"],
            '1': ["4g_only", "仅4G"],
            '2': ['5g_only', "仅5G"],
            '3': ["5g_auto", "5G优先"],
            '4': ["3g_only", "仅3G"]
          }, _0x1886a5 = _0x3fbeeb[_0x599c28] || ["5g_auto", "5G优先"];
          (await _0x4ba302({
            'nrModeValue': _0x2dccfd[_0x53fb81] || "sa_nsa",
            'nrMode': _0x52f537[_0x53fb81] || 'SA+NSA',
            'caStatus': _0x271ccd,
            'modeValue': _0x1886a5[0x0]
          }), _0x5ee04e++, _0x472ea9 = true, _0x5cb38a = false);
          _0x5a2c76 && (clearTimeout(_0x5a2c76), _0x5a2c76 = null);
          try {
            await __CPE["evalJS"]('window.netSettingState\x20&&\x20window.netSettingState(\x27ok\x27,\x20' + _0x61d326 + ')');
          } catch (_0x289710) {}
        }
        if (_0x511f9c(_0x40bfa3["rbEn"])) {
          const _0x456afd = String(_0x40bfa3['rbEn']), _0x3c369e = String(_0x40bfa3["rbDays"] || ''), _0x65c978 = String(_0x40bfa3["rbTime"] || '');
          (_0x16e738["set"](_0x48240a["REBOOT"], JSON["stringify"]({
            'enable': _0x456afd,
            'days': _0x3c369e,
            'time': _0x65c978
          })), await _0x4ba302({
            'rebootEnabled': _0x456afd,
            'rebootText': _0x456afd === '1' ? _0x1be9b3(_0x3c369e) + '\x20' + _0x65c978 : "已禁用"
          }), _0x5ee04e++);
        }
        const _0x47d47a = await _0x3d8483(_0x9cfe01, "get_value_by_xmlnode|get_xml_childnode_value", {
          'data_1': {
            'CellEn': 'X_FH_MobileNetwork.LockCellList.LockEnable'
          },
          'data_2': {
            'url': "X_FH_MobileNetwork.LockCellList.LockCell.",
            'num': 0x8,
            'node': {
              'PCI': 'PCI',
              'arfcn': "arfcn",
              'NRARFCN': "NRARFCN",
              'act': 'act'
            }
          }
        }, true) || ({});
        if (_0x47d47a["data_1"] && _0x511f9c(_0x47d47a['data_1']["CellEn"])) {
          const _0xfe01a9 = ((_0x47d47a['data_2'] || ({}))["data"] || [])["map"](function (_0x18c9fa) {
            const _0x1fe785 = _0x511f9c(_0x18c9fa["NRARFCN"]) ? String(_0x18c9fa["NRARFCN"]) : String(_0x18c9fa["arfcn"] || ''), _0x34eb35 = parseInt(_0x1fe785, 0xa);
            return {
              'Id': String(_0x18c9fa['child_node_idx'] || ''),
              'PCI': String(_0x18c9fa['PCI'] || ''),
              'FrequencyPoint': _0x1fe785,
              'Standard': !isNaN(_0x34eb35) && _0x34eb35 > 0x3ffff ? '2' : '1'
            };
          }), _0x14e548 = {
            'LockCommunity': String(_0x47d47a['data_1']['CellEn']),
            'lock_cell_list': _0xfe01a9
          };
          (_0x16e738["set"](_0x48240a["LOCK_CELL"], JSON['stringify'](_0x14e548)), await _0x4ba302({
            'lockCellInfo': _0x14e548
          }), _0x5ee04e++);
        }
        _0x43eeae = _0x5ee04e;
        if (!_0x472ea9) try {
          await __CPE["evalJS"]("window.netSettingState && window.netSettingState('unknown')");
        } catch (_0x3e5be6) {}
        if (_0x43eeae > 0x0) _0x3844c5(true);
      }
      if (!_0x246ab7) try {
        await __CPE["evalJS"]("window.ctrlRefreshDone && window.ctrlRefreshDone(0, 6);");
      } catch (_0x5a1591) {}
    } catch (_0x335ba1) {}
    const _0x4ec639 = Date["now"]();
    (_0x4ff86d = _0x4ec639, _0x2e1721 = _0x4ec639, _0x2e12ad = false);
    try {
      const _0x434cbc = 0x6, _0x5b8a45 = _0x176c0e === true;
      let _0x260e36 = null, _0x1f844a = "warning";
      if (_0x43eeae === 0x0) {
        (_0x260e36 = "局域网取数失败", _0x1f844a = 'warning');
      } else _0x5b8a45 && (_0x260e36 = _0x43eeae < _0x434cbc ? "部分数据未更新" : '数据已更新', _0x1f844a = _0x43eeae < _0x434cbc ? 'warning' : "success");
      if (_0x260e36) await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast(" + JSON["stringify"](_0x260e36) + ',\x20' + JSON['stringify'](_0x1f844a) + ')');
    } catch (_0x90cde1) {}
  }));
}
const _0x2d3a24 = _0x228303 + "WIFI_CACHE";
let _0xebe832 = false;
let _0x4a5a6f = false;
function _0x39d186(_0xcc63b5, _0x5dff88) {
  const _0xc20e4a = _0xcc63b5 && _0xcc63b5["WIFIList"] || [];
  for (let _0x3d0af5 = 0x0; _0x3d0af5 < _0xc20e4a["length"]; _0x3d0af5++) {
    if (String(_0xc20e4a[_0x3d0af5]['SSIDIndex']) === String(_0x5dff88)) try {
      return JSON["parse"](JSON["stringify"](_0xc20e4a[_0x3d0af5]));
    } catch (_0x1bf6a6) {
      return Object["assign"]({}, _0xc20e4a[_0x3d0af5]);
    }
  }
  return {};
}
function _0x3a253c(_0x5892fd) {
  function _0xb43cae(_0x58571c) {
    return _0x58571c ? {
      'ssid': String(_0x58571c["SSID"] || ''),
      'pwd': String(_0x58571c["PWD"] || ''),
      'enable': String(_0x58571c["Enable"]) === '1',
      'hide': String(_0x58571c["AdvertisementEnable"]) === '0'
    } : null;
  }
  return {
    'ssid2g': _0xb43cae(_0x39d186(_0x5892fd, '1')),
    'ssid5g': _0xb43cae(_0x39d186(_0x5892fd, '5')),
    'sta': String(_0x5892fd && _0x5892fd["StaCtrl"]) === '1',
    'mlo': String(_0x5892fd && _0x5892fd["MloCtrl"]) === '1',
    'radio2': String(_0x5892fd && _0x5892fd['radio_enable_2']) === '1',
    'radio5': String(_0x5892fd && _0x5892fd["radio_enable_5"]) === '1'
  };
}
function _0x4395b6(_0x2d5ba0) {
  function _0x1d2b9a(_0xfc2ce) {
    return _0xfc2ce ? {
      'ssid': String(_0xfc2ce["SSID"] || ''),
      'pwd': String(_0xfc2ce["PWD"] || ''),
      'enable': String(_0xfc2ce["Enable"]) === '1'
    } : null;
  }
  return {
    'ssid2g': _0x1d2b9a(_0x39d186(_0x2d5ba0, '3')),
    'ssid5g': _0x1d2b9a(_0x39d186(_0x2d5ba0, '7'))
  };
}
async function _0x5a020f(_0x1c6d31) {
  if (!_0x1c6d31 || !_0x1c6d31["action"]) return;
  try {
    if (_0x1c6d31['page']) _0x2dae87 = String(_0x1c6d31["page"]);
  } catch (_0x3d0f40) {}
  if (_0x1c6d31["action"] === "switchPage") {
    const _0xa88434 = _0x1c6d31['page'] || "overview";
    await __CPE['evalJS']("if (typeof showPage === 'function') showPage('" + _0xa88434 + "');");
    if (_0xa88434 === "settings" && true) {
      const _0x34b3c7 = _0x28bcdf;
      if (_0x34b3c7 === 'ok') try {
        await __CPE["evalJS"]("window.setAcLocalState && window.setAcLocalState('ok', " + JSON["stringify"](_0x2f2b83 || '') + ');');
      } catch (_0x20faa1) {} else {
        if (_0x34b3c7 === "fail" || _0x34b3c7 === "busy") try {
          await __CPE["evalJS"]('window.setAcLocalState\x20&&\x20window.setAcLocalState(' + JSON["stringify"](_0x34b3c7) + ');');
        } catch (_0x303d8c) {} else __CPE["timer"](0x78, function () {
          try {
            _0x5a020f({
              'action': "refresh",
              'page': "settings"
            });
          } catch (_0x73366b) {}
        });
      }
    }
    _0xa88434 === "control" && _0x2becd7(_0x1c6d31['resume'] === true ? "resume" : false);
    _0xa88434 === "neighbor" && _0x1c6d31['resume'] === true && _0x4315b7('resume');
    return;
  }
  if (_0x1c6d31['action'] === "trafficGet") {
    try {
      const _0x31a222 = await _0x1aadab(), _0x340b86 = "X_FH_MobileNetwork.TrafficStats.", _0x441aa0 = _0x31a222 && await _0x3d8483(_0x31a222, 'get_value_by_xmlnode', {
        'drx': _0x340b86 + 'TodayTotalRxBytes',
        'dtx': _0x340b86 + "TodayTotalTxBytes",
        'mrx': _0x340b86 + "MonthRxBytes",
        'mtx': _0x340b86 + "MonthTxBytes",
        'den': _0x340b86 + 'TodayThresholdSwitch',
        'dmax': _0x340b86 + 'TodayThresholdBytes',
        'men': _0x340b86 + "monthThresholdSwitch",
        'mmax': _0x340b86 + 'MonthThresholdBytes'
      });
      if (!_0x441aa0 || _0x441aa0["_error"] || _0x441aa0["drx"] === undefined) {
        await __CPE["evalJS"]("window.trafficNotify && window.trafficNotify(" + JSON["stringify"]({
          'ok': false,
          'msg': "流量查询失败"
        }) + ');');
        return;
      }
      const _0x2fb7fe = _0x5de770 => {
        const _0x4b6501 = parseFloat(_0x5de770);
        return isNaN(_0x4b6501) ? 0x0 : Math["round"](_0x4b6501 / 0x100000 * 0x64) / 0x64;
      }, _0x486940 = {
        'day_rx_traffic': _0x2fb7fe(_0x441aa0["drx"]),
        'day_tx_traffic': _0x2fb7fe(_0x441aa0['dtx']),
        'month_rx_traffic': _0x2fb7fe(_0x441aa0["mrx"]),
        'month_tx_traffic': _0x2fb7fe(_0x441aa0["mtx"]),
        'day_max_traffic': _0x2fb7fe(_0x441aa0["dmax"]),
        'month_max_traffic': _0x2fb7fe(_0x441aa0["mmax"]),
        'day_limmit_enable': String(_0x441aa0["den"]) === '1' ? '1' : '0',
        'month_limmit_enable': String(_0x441aa0['men']) === '1' ? '1' : '0'
      };
      await __CPE["evalJS"]("window.trafficData(" + JSON["stringify"](_0x486940) + ');');
    } catch (_0x4a9081) {
      try {
        await __CPE["evalJS"]("window.trafficNotify && window.trafficNotify(" + JSON["stringify"]({
          'ok': false,
          'msg': "流量查询失败"
        }) + ');');
      } catch (_0xe3e8d5) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === 'trafficSet') {
    try {
      const _0x22a9ed = await _0x1aadab();
      if (!_0x22a9ed) {
        await __CPE["evalJS"]('window.trafficNotify\x20&&\x20window.trafficNotify(' + JSON['stringify']({
          'ok': false,
          'msg': "设置失败，请稍后重试"
        }) + ');');
        return;
      }
      const _0x4a932c = 'X_FH_MobileNetwork.TrafficStats.', _0x47f638 = _0x4ab506 => String(Math["round"]((parseFloat(_0x4ab506) || 0x0) * 0x100000)), _0x2095ed = {};
      (_0x2095ed[_0x4a932c + "TodayThresholdSwitch"] = _0x1c6d31["dayEnable"] === true ? '1' : '0', _0x2095ed[_0x4a932c + "TodayThresholdBytes"] = _0x47f638(_0x1c6d31["dayMax"]), _0x2095ed[_0x4a932c + "monthThresholdSwitch"] = _0x1c6d31["monthEnable"] === true ? '1' : '0', _0x2095ed[_0x4a932c + 'MonthThresholdBytes'] = _0x47f638(_0x1c6d31["monthMax"]));
      const _0xe2412c = await _0xceee17(_0x22a9ed, _0x2095ed);
      await __CPE["evalJS"]("window.trafficNotify && window.trafficNotify(" + JSON["stringify"]({
        'ok': !!_0xe2412c,
        'msg': _0xe2412c ? "限制已保存" : "设置失败，请稍后重试"
      }) + ');');
    } catch (_0x341e3c) {
      try {
        await __CPE["evalJS"]('window.trafficNotify\x20&&\x20window.trafficNotify(' + JSON['stringify']({
          'ok': false,
          'msg': "设置失败，请稍后重试"
        }) + ');');
      } catch (_0x45b0a6) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "trafficCalibrate") {
    try {
      const _0xb384cd = await _0x1aadab();
      if (!_0xb384cd) {
        await __CPE["evalJS"]('window.trafficNotify\x20&&\x20window.trafficNotify(' + JSON["stringify"]({
          'ok': false,
          'msg': "校准失败，请稍后重试"
        }) + ');');
        return;
      }
      const _0x4154d0 = await _0xceee17(_0xb384cd, {
        'X_FH_MobileNetwork.TrafficStats.MonthTotalBytes': String(Math["round"]((parseFloat(_0x1c6d31['kb']) || 0x0) * 0x400))
      });
      await __CPE["evalJS"]("window.trafficNotify && window.trafficNotify(" + JSON["stringify"]({
        'ok': !!_0x4154d0,
        'msg': _0x4154d0 ? "校准成功" : "校准失败，请稍后重试"
      }) + ');');
    } catch (_0x2b528e) {
      try {
        await __CPE["evalJS"]("window.trafficNotify && window.trafficNotify(" + JSON["stringify"]({
          'ok': false,
          'msg': '校准失败，请稍后重试'
        }) + ');');
      } catch (_0x2812a1) {}
    }
    return;
  }
  if (_0x1c6d31['action'] === 'wifiLoad') {
    if (_0x4a5a6f) return;
    _0x4a5a6f = true;
    try {
      try {
        const _0x164714 = _0x16e738["get"](_0x2d3a24);
        if (_0x164714) {
          const _0x3c276b = JSON["parse"](_0x164714);
          if (_0x3c276b && _0x3c276b['ok']) await __CPE['evalJS']("window.wifiData && window.wifiData(" + JSON["stringify"](Object['assign']({}, _0x3c276b, {
            '_fromCache': true
          })) + ');');
        }
      } catch (_0x412982) {}
      const _0x179538 = await Promise["all"]([_0x2c7b30('GET_WIFI_LIST_INFO', {
        'SequenceId': "wifi_m_get"
      }, 0x2710), _0x2c7b30('GET_GUEST_WIFI_LIST_INFO', {
        'SequenceId': "wifi_g_get"
      }, 0x2710)]), _0x3eebc3 = _0x179538[0x0], _0x28aa58 = _0x179538[0x1], _0x923ec5 = !!(_0x3eebc3 && _0x3eebc3["resultCode"] === 0x0), _0x350334 = {
        'ok': _0x923ec5,
        'main': _0x923ec5 ? _0x3a253c(_0x3eebc3) : null,
        'guest': _0x28aa58 && _0x28aa58["resultCode"] === 0x0 ? _0x4395b6(_0x28aa58) : null
      };
      if (_0x923ec5) {
        const _0x530a90 = await _0x1aadab();
        if (_0x530a90) {
          const _0x50523f = await _0x3d8483(_0x530a90, "get_value_by_xmlnode", {
            'sta': "WiFi.WifiBandSteering.Enable",
            'mlo': "WiFi.X_FH_MultiLinkGroup.1.Enable"
          });
          if (_0x50523f && !_0x50523f['_err']) {
            if (_0x50523f["sta"] !== undefined && _0x50523f["sta"] !== '') _0x350334['main']['sta'] = String(_0x50523f["sta"]) === '1';
            if (_0x50523f['mlo'] !== undefined && _0x50523f["mlo"] !== '') _0x350334["main"]["mlo"] = String(_0x50523f["mlo"]) === '1';
          }
        }
      }
      if (_0x923ec5) try {
        _0x16e738["set"](_0x2d3a24, JSON["stringify"](_0x350334));
      } catch (_0x253de4) {}
      await __CPE["evalJS"]("window.wifiData && window.wifiData(" + JSON["stringify"](_0x350334) + ');');
    } catch (_0x724064) {
      try {
        await __CPE["evalJS"]("window.wifiData && window.wifiData({ ok: false, err: \"读取失败\" });");
      } catch (_0x17a2eb) {}
    } finally {
      _0x4a5a6f = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === 'wifiSetMain') {
    if (_0xebe832) {
      try {
        await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"上一项设置正在生效中，请稍候\" });");
      } catch (_0xe37ff) {}
      return;
    }
    _0xebe832 = true;
    const _0x4c6386 = _0x1c6d31["patch"] || ({});
    try {
      const _0x5076c1 = await _0x2c7b30("GET_WIFI_LIST_INFO", {
        'SequenceId': 'wifi_m_pre'
      }, 0x2710);
      if (!_0x5076c1 || _0x5076c1["resultCode"] !== 0x0) {
        await __CPE['evalJS']("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"读取当前配置失败，请重试\" });");
        return;
      }
      const _0x3ef4c0 = _0x39d186(_0x5076c1, '1'), _0x26fc38 = _0x39d186(_0x5076c1, '5');
      if (!_0x3ef4c0["SSIDIndex"] || !_0x26fc38["SSIDIndex"]) {
        await __CPE["evalJS"]('window.wifiSetResult\x20&&\x20window.wifiSetResult({\x20ok:\x20false,\x20msg:\x20\x22WiFi\x20配置读取不完整，请重试\x22\x20});');
        return;
      }
      const _0x24a990 = String(_0x5076c1["StaCtrl"] || '0');
      let _0x16b499 = _0x24a990, _0x3fefa5 = String(_0x5076c1["MloCtrl"] || '0');
      const _0x2d960d = _0x4c6386["ssid2g"] || null, _0x293874 = _0x4c6386["ssid5g"] || null;
      if (_0x2d960d) {
        if (_0x2d960d['ssid'] !== undefined) _0x3ef4c0['SSID'] = String(_0x2d960d['ssid']);
        if (_0x2d960d["pwd"] !== undefined) _0x3ef4c0["PWD"] = String(_0x2d960d["pwd"]);
        if (_0x2d960d["enable"] !== undefined) _0x3ef4c0["Enable"] = _0x2d960d['enable'] ? '1' : '0';
        if (_0x2d960d['hide'] !== undefined) _0x3ef4c0["AdvertisementEnable"] = _0x2d960d['hide'] ? '0' : '1';
      }
      if (_0x293874) {
        if (_0x293874["ssid"] !== undefined) _0x26fc38['SSID'] = String(_0x293874["ssid"]);
        if (_0x293874["pwd"] !== undefined) _0x26fc38["PWD"] = String(_0x293874['pwd']);
        if (_0x293874["enable"] !== undefined) _0x26fc38['Enable'] = _0x293874["enable"] ? '1' : '0';
        if (_0x293874["hide"] !== undefined) _0x26fc38["AdvertisementEnable"] = _0x293874["hide"] ? '0' : '1';
      }
      if (_0x4c6386["sta"] !== undefined) _0x16b499 = _0x4c6386["sta"] ? '1' : '0';
      if (_0x4c6386['mlo'] !== undefined) {
        _0x3fefa5 = _0x4c6386["mlo"] ? '1' : '0';
        if (_0x4c6386['mlo']) _0x16b499 = '1';
      }
      if (_0x24a990 === '0' && _0x16b499 === '1') try {
        _0x16e738['set']('CPE_WIFI_5G_NAME', String(_0x26fc38['SSID'] || ''));
      } catch (_0x41b5b6) {} else {
        if (_0x24a990 === '1' && _0x16b499 === '0') {
          let _0xb87541 = '';
          try {
            _0xb87541 = String(_0x16e738['get']("CPE_WIFI_5G_NAME") || '');
          } catch (_0x1c1c70) {}
          if (!_0xb87541 || _0xb87541 === String(_0x3ef4c0['SSID'])) _0xb87541 = String(_0x3ef4c0["SSID"]) + "-5G";
          _0x26fc38['SSID'] = _0xb87541;
        }
      }
      if (_0x16b499 === '1') {
        const _0x3fc4a9 = _0x293874 && !_0x2d960d ? _0x26fc38 : _0x3ef4c0;
        (_0x3ef4c0['SSID'] = _0x3fc4a9["SSID"], _0x26fc38['SSID'] = _0x3fc4a9["SSID"], _0x3ef4c0["PWD"] = _0x3fc4a9['PWD'], _0x26fc38["PWD"] = _0x3fc4a9['PWD'], _0x3ef4c0["Enable"] = _0x3fc4a9['Enable'], _0x26fc38['Enable'] = _0x3fc4a9['Enable'], _0x3ef4c0["AdvertisementEnable"] = _0x3fc4a9["AdvertisementEnable"], _0x26fc38['AdvertisementEnable'] = _0x3fc4a9["AdvertisementEnable"]);
      }
      const _0x579226 = await _0x1aadab();
      if (!_0x579226) {
        (_0xebe832 = false, await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"连接失败\" });"));
        return;
      }
      const _0x5a3fa0 = {}, _0x1f4bf3 = {
        '1': '1',
        '5': '5'
      };
      if (_0x2d960d) {
        const _0xcc047e = _0x1f4bf3['1'];
        if (_0x2d960d['ssid'] !== undefined) _0x5a3fa0["WiFi.SSID." + _0xcc047e + ".SSID"] = String(_0x2d960d['ssid']);
        if (_0x2d960d["pwd"] !== undefined) _0x5a3fa0["WiFi.AccessPoint." + _0xcc047e + ".Security.PreSharedKey"] = String(_0x2d960d["pwd"]);
        if (_0x2d960d['enable'] !== undefined) _0x5a3fa0["WiFi.SSID." + _0xcc047e + ".Enable"] = _0x2d960d["enable"] ? '1' : '0';
        if (_0x2d960d['hide'] !== undefined) _0x5a3fa0["WiFi.AccessPoint." + _0xcc047e + '.SSIDAdvertisementEnabled'] = _0x2d960d["hide"] ? '0' : '1';
      }
      if (_0x293874) {
        const _0x3a357b = _0x1f4bf3['5'];
        if (_0x293874['ssid'] !== undefined) _0x5a3fa0["WiFi.SSID." + _0x3a357b + ".SSID"] = String(_0x293874['ssid']);
        if (_0x293874["pwd"] !== undefined) _0x5a3fa0["WiFi.AccessPoint." + _0x3a357b + ".Security.PreSharedKey"] = String(_0x293874['pwd']);
        if (_0x293874["enable"] !== undefined) _0x5a3fa0["WiFi.SSID." + _0x3a357b + '.Enable'] = _0x293874["enable"] ? '1' : '0';
        if (_0x293874["hide"] !== undefined) _0x5a3fa0["WiFi.AccessPoint." + _0x3a357b + ".SSIDAdvertisementEnabled"] = _0x293874["hide"] ? '0' : '1';
      }
      if (_0x4c6386['sta'] !== undefined) _0x5a3fa0["WiFi.WifiBandSteering.Enable"] = _0x4c6386["sta"] ? '1' : '0';
      if (_0x4c6386["mlo"] !== undefined) {
        _0x5a3fa0["WiFi.X_FH_MultiLinkGroup.1.Enable"] = _0x4c6386["mlo"] ? '1' : '0';
        if (_0x4c6386["mlo"]) _0x5a3fa0["WiFi.WifiBandSteering.Enable"] = '1';
      }
      const _0x3407de = Object["keys"](_0x5a3fa0)["length"] > 0x0 && await _0xceee17(_0x579226, _0x5a3fa0);
      if (_0x3407de && (_0x4c6386["sta"] !== undefined || _0x4c6386['mlo'] !== undefined)) {
        const _0x18f9e8 = await _0x3d8483(_0x579226, "get_value_by_xmlnode", {
          'sta': "WiFi.WifiBandSteering.Enable",
          'mlo': 'WiFi.X_FH_MultiLinkGroup.1.Enable'
        }), _0x36463a = _0x4c6386["sta"] === undefined || _0x18f9e8 && String(_0x18f9e8["sta"]) === (_0x4c6386["sta"] ? '1' : '0'), _0x4eea31 = _0x4c6386["mlo"] === undefined || _0x18f9e8 && String(_0x18f9e8['mlo']) === (_0x4c6386['mlo'] ? '1' : '0');
        if (!_0x18f9e8 || !_0x36463a || !_0x4eea31) {
          (_0xebe832 = false, await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"设备未保存该设置，请重试\" });"));
          return;
        }
      }
      if (_0x3407de) {
        if (_0x2d960d) {
          (_0x3ef4c0["SSID"] = _0x2d960d["ssid"] !== undefined ? String(_0x2d960d["ssid"]) : _0x3ef4c0["SSID"], _0x3ef4c0["PWD"] = _0x2d960d["pwd"] !== undefined ? String(_0x2d960d["pwd"]) : _0x3ef4c0['PWD']);
          if (_0x2d960d['enable'] !== undefined) _0x3ef4c0["Enable"] = _0x2d960d["enable"] ? '1' : '0';
          if (_0x2d960d["hide"] !== undefined) _0x3ef4c0["AdvertisementEnable"] = _0x2d960d["hide"] ? '0' : '1';
        }
        if (_0x293874) {
          (_0x26fc38["SSID"] = _0x293874["ssid"] !== undefined ? String(_0x293874["ssid"]) : _0x26fc38["SSID"], _0x26fc38["PWD"] = _0x293874["pwd"] !== undefined ? String(_0x293874['pwd']) : _0x26fc38["PWD"]);
          if (_0x293874["enable"] !== undefined) _0x26fc38["Enable"] = _0x293874['enable'] ? '1' : '0';
          if (_0x293874['hide'] !== undefined) _0x26fc38["AdvertisementEnable"] = _0x293874["hide"] ? '0' : '1';
        }
        (_0xebe832 = false, await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: true });"));
      } else (_0xebe832 = false, await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"设置失败\" });"));
      return;
    } catch (_0x59df19) {
      try {
        await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"设置失败，请稍后重试\" });");
      } catch (_0x504a1a) {}
    } finally {
      _0xebe832 = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === "wifiSetGuest") {
    if (_0xebe832) {
      try {
        await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"上一项设置正在生效中，请稍候\" });");
      } catch (_0x1c93cc) {}
      return;
    }
    _0xebe832 = true;
    const _0x18d0eb = _0x1c6d31['band'] === '5g' ? '5g' : '2g', _0x5ba4c6 = _0x18d0eb === '5g' ? '7' : '3';
    const _0xc44045 = _0x1c6d31['patch'] || ({}), _0x22ab71 = {};
    if (_0xc44045["ssid"] !== undefined) _0x22ab71['WiFi.SSID.' + _0x5ba4c6 + ".SSID"] = String(_0xc44045["ssid"]);
    if (_0xc44045["pwd"] !== undefined) _0x22ab71['WiFi.AccessPoint.' + _0x5ba4c6 + '.Security.PreSharedKey'] = String(_0xc44045['pwd']);
    if (_0xc44045["enable"] !== undefined) _0x22ab71["WiFi.SSID." + _0x5ba4c6 + ".Enable"] = _0xc44045["enable"] ? '1' : '0';
    const _0x924909 = await _0x1aadab(), _0x89d588 = _0x924909 && Object["keys"](_0x22ab71)['length'] > 0x0 && await _0xceee17(_0x924909, _0x22ab71);
    _0xebe832 = false;
    if (_0x89d588) {
      let _0x45b096 = "timeout";
      try {
        const _0x4553e7 = await _0x3d8483(_0x924909, "get_value_by_xmlnode|get_xml_childnode_value", {
          'data_1': {
            'x': "DeviceInfo.SoftwareVersion"
          },
          'data_2': {
            'url': "WiFi.SSID.",
            'index': _0x5ba4c6 + '-' + _0x5ba4c6,
            'node': {
              'SSID': "SSID",
              'Enable': "Enable"
            }
          }
        }), _0x573418 = ((_0x4553e7 || ({}))["data_2"] || ({}))["data"] || [], _0x214c3e = _0x573418["find"](function (_0x2fad62) {
          return String(_0x2fad62["child_node_idx"]) === _0x5ba4c6;
        }) || ({}), _0x4462c5 = _0xc44045["ssid"] === undefined || String(_0x214c3e["SSID"]) === String(_0xc44045["ssid"]), _0x3ba8da = _0xc44045['enable'] === undefined || String(_0x214c3e["Enable"]) === (_0xc44045["enable"] ? '1' : '0');
        _0x45b096 = _0x4462c5 && _0x3ba8da ? true : "mismatch";
      } catch (_0x58adda) {}
      await __CPE["evalJS"]('window.wifiSetResult\x20&&\x20window.wifiSetResult(' + JSON["stringify"]({
        'ok': true,
        'phase': _0x45b096 === true ? 'done' : String(_0x45b096),
        'guest': true
      }) + ');');
    } else await __CPE["evalJS"]("window.wifiSetResult && window.wifiSetResult({ ok: false, msg: \"设置失败\" });");
    return;
  }
  async function _0x122c3d(_0x582436) {
    const _0x4bddb6 = _0x4f44fb(), _0x5edf59 = async function () {
      const _0x10bd65 = await _0x30127f(_0x582436);
      if (!_0x10bd65) return null;
      return await _0x403514(_0x582436, _0x53fe55(_0x582436, true), {
        'method': "POST",
        'body': {
          'ajaxmethod': "app_get_cell_list",
          'dataObj': null,
          'sessionid': _0x10bd65
        },
        'timeoutMs': 0x1388
      });
    };
    let _0xa7a534 = await _0x5edf59();
    return (_0xa7a534 && (_0xa7a534["timeout"] === 'true' || _0xa7a534["timeout"] === true) && (_0x4bddb6 && await _0x4fafb7(_0x582436, _0x4bddb6) === 'ok' && (await _0x1bc2d5(0x190), _0xa7a534 = await _0x5edf59())), _0xa7a534 && Array["isArray"](_0xa7a534['lock_cell']) ? _0xa7a534 : null);
  }
  async function _0x2793d8(_0x34bb5c) {
    const _0x1bd903 = "X_FH_MobileNetwork.LockCellList.";
    let _0x4848da = null;
    try {
      _0x4848da = await _0x122c3d(_0x34bb5c);
      if (_0x4848da) {
        const _0x2e570c = _0x4848da["lock_cell"]["map"](function (_0x1def42, _0x3a2a9e) {
          const _0x48e00b = String(_0x1def42["pci"] == null ? '' : _0x1def42["pci"]), _0x1bde5c = String(_0x1def42['arfcn'] == null ? '' : _0x1def42['arfcn']), _0x1d587e = String(_0x1def42["act"] == null ? '' : _0x1def42["act"]);
          return {
            'Id': String(_0x3a2a9e + 0x1),
            'PCI': _0x48e00b,
            'FrequencyPoint': _0x1bde5c,
            'NRARFCN': '',
            'arfcn': _0x1bde5c,
            'Standard': _0x1d587e === '1' ? '1' : '2'
          };
        });
        return {
          'enabled': String(_0x4848da['enable']) === '1' ? '1' : '0',
          'cells': _0x2e570c,
          'via': "tool"
        };
      }
    } catch (_0x5caca3) {}
    if (!_0x4848da) _0x578483("info", '小区', "锁小区 网页节点");
    const _0xa224b = await _0x3d8483(_0x34bb5c, "get_value_by_xmlnode|get_xml_childnode_value", {
      'data_1': {
        'LockEnable': _0x1bd903 + "LockEnable"
      },
      'data_2': {
        'url': _0x1bd903 + "LockCell.",
        'num': 0x8,
        'node': {
          'act': 'act',
          'arfcn': 'arfcn',
          'pci': "pci",
          'PCI': "PCI"
        }
      }
    }, true);
    if (!_0xa224b || _0xa224b["_error"]) return (_0x78e9a(_0x34bb5c)["then"](function (_0x34b800) {
      if (_0x34b800) _0x578483("error", '小区', '锁小区(Air)读失败');
    }, function () {}), null);
    const _0x339c39 = _0xa224b["data_1"] || ({}), _0x39fc86 = _0x339c39['data'] && typeof _0x339c39['data'] === "object" && !Array["isArray"](_0x339c39["data"]) ? _0x339c39["data"] : _0x339c39, _0x1626ba = (function () {
      const _0x6f8d37 = [_0x39fc86["LockEnable"], _0x39fc86["lockEnable"], _0x39fc86['en'], _0x39fc86['Enable']];
      for (let _0x263b45 = 0x0; _0x263b45 < _0x6f8d37["length"]; _0x263b45++) {
        if (_0x6f8d37[_0x263b45] != null && _0x6f8d37[_0x263b45] !== '') return String(_0x6f8d37[_0x263b45]);
      }
      return '';
    })(), _0x54e6cd = _0xa224b["data_2"] || ({}), _0x5a3b34 = Array["isArray"](_0x54e6cd) ? _0x54e6cd : Array['isArray'](_0x54e6cd["data"]) ? _0x54e6cd["data"] : [], _0x4799fc = function () {
      for (var _0x1247ed = 0x0; _0x1247ed < arguments["length"]; _0x1247ed++) {
        if (arguments[_0x1247ed] != null && arguments[_0x1247ed] !== '') return String(arguments[_0x1247ed]);
      }
      return '';
    }, _0x56097b = _0x5a3b34["map"](function (_0x4603cd) {
      const _0xdb0fdd = _0x4799fc(_0x4603cd["pci"], _0x4603cd["PCI"], _0x4603cd["Pci"]), _0xf49363 = _0x4799fc(_0x4603cd['arfcn']), _0x18a951 = _0x4799fc(_0x4603cd["NRARFCN"]), _0x1eaf84 = _0x18a951 !== '' && _0x18a951 !== '0' ? _0x18a951 : _0xf49363, _0x563085 = parseInt(_0x1eaf84, 0xa), _0x21307c = _0x4799fc(_0x4603cd["act"]);
      return {
        'Id': _0x4799fc(_0x4603cd["child_node_idx"], _0x4603cd["index"]),
        'PCI': _0xdb0fdd,
        'FrequencyPoint': _0x1eaf84,
        'NRARFCN': _0x18a951,
        'arfcn': _0xf49363,
        'Standard': _0x21307c === '1' ? '1' : _0x21307c === '2' ? '2' : !isNaN(_0x563085) && _0x563085 > 0x3ffff ? '2' : '1'
      };
    }), _0x5aa9a2 = _0x56097b["length"] > 0x0 && _0x56097b["every"](function (_0x56059e) {
      return !_0x56059e["PCI"];
    });
    if (_0x56097b["length"] === 0x0 || _0x5aa9a2) {
      const _0x29f3e3 = _0x5a3b34[0x0] ? JSON["stringify"](_0x5a3b34[0x0])["slice"](0x0, 0xdc) : '-';
      _0x578483("info", '小区', "锁小区" + (_0x56097b["length"] === 0x0 ? "空列表" : "PCI全空") + '\x20条' + _0x5a3b34["length"] + " d2=" + (Array["isArray"](_0x54e6cd) ? "arr" : _0x54e6cd['data'] ? "wrap" : 'other') + '\x20首' + _0x29f3e3["slice"](0x0, 0x3c));
    }
    return {
      'enabled': _0x1626ba === '1' ? '1' : '0',
      'cells': _0x56097b
    };
  }
  if (_0x1c6d31['action'] === "applyLockCellData") {
    const _0x46fcb7 = "X_FH_MobileNetwork.LockCellList.", _0x431f59 = await _0x1aadab();
    if (!_0x431f59) {
      await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27连接失败\x27,\x20\x27warning\x27)');
      return;
    }
    const _0x392ff9 = _0x1c6d31["targetEnable"], _0x47b176 = _0x1c6d31['cellsToSave'] || [], _0x4beae3 = _0x1c6d31["cellsToDelete"] || [];
    let _0x384b3f = true;
    try {
      if (!await _0xceee17(_0x431f59, {
        [_0x46fcb7 + "LockEnable"]: '0'
      })) _0x384b3f = false;
      await _0x1bc2d5(0x1f4);
      const _0x39430a = _0x4beae3['length'] > 0x0 || _0x47b176["some"](_0x48416e => _0x48416e["isUpdated"] && !_0x48416e["isNew"] && _0x48416e['Id']), _0x3133d9 = {};
      if (_0x39430a) try {
        const _0x6d2523 = await _0x3d8483(_0x431f59, "get_xml_childnode_value", {
          'url': _0x46fcb7 + "LockCell.",
          'num': 0x8,
          'node': {
            'act': "act",
            'arfcn': "arfcn",
            'pci': "pci",
            'PCI': 'PCI',
            'Pci': "Pci"
          }
        }), _0x2fc4b5 = Array['isArray'](_0x6d2523) ? _0x6d2523 : _0x6d2523 && Array["isArray"](_0x6d2523["data"]) ? _0x6d2523["data"] : [];
        _0x2fc4b5['forEach'](function (_0x293839) {
          if (!_0x293839 || _0x293839["child_node_idx"] == null) return;
          const _0x376ef3 = String(_0x293839["pci"] != null && _0x293839["pci"] !== '' ? _0x293839['pci'] : _0x293839["PCI"] != null && _0x293839["PCI"] !== '' ? _0x293839["PCI"] : _0x293839["Pci"] != null ? _0x293839["Pci"] : '');
          _0x3133d9[String(_0x293839["arfcn"] == null ? '' : _0x293839["arfcn"]) + '|' + _0x376ef3] = String(_0x293839["child_node_idx"]);
        });
      } catch (_0x5eaae3) {}
      const _0x358f47 = function (_0x4cda94) {
        const _0x225c7b = String(_0x4cda94["FrequencyPoint"] || '') + '|' + String(_0x4cda94["PCI"] || '');
        if (_0x3133d9[_0x225c7b] != null) return parseInt(_0x3133d9[_0x225c7b], 0xa);
        return parseInt(_0x4cda94['Id'], 0xa);
      }, _0x1392bc = _0x4beae3["map"](_0x358f47)["filter"](_0x2d177a => !isNaN(_0x2d177a))["sort"]((_0x3583f7, _0x137ac6) => _0x137ac6 - _0x3583f7);
      for (const _0x56a485 of _0x1392bc) {
        const _0x1bebe3 = await _0x3d8483(_0x431f59, "del_xmlnode", {
          'url': _0x46fcb7 + "LockCell.",
          'index': _0x56a485
        });
        if (!(_0x1bebe3 && _0x1bebe3["success"] === "true")) _0x384b3f = false;
        await _0x1bc2d5(0x190);
      }
      const _0xfc7934 = _0x47b176["filter"](_0x13625f => _0x13625f["isUpdated"] && !_0x13625f['isNew'] && _0x13625f['Id'])['map'](_0x358f47)['filter'](_0x30f537 => !isNaN(_0x30f537))["sort"]((_0x3381f0, _0x5a861a) => _0x5a861a - _0x3381f0);
      for (const _0x3f32d7 of _0xfc7934) {
        const _0x382385 = await _0x3d8483(_0x431f59, 'del_xmlnode', {
          'url': _0x46fcb7 + 'LockCell.',
          'index': _0x3f32d7
        });
        if (!(_0x382385 && _0x382385['success'] === "true")) _0x384b3f = false;
        await _0x1bc2d5(0x190);
      }
      const _0x23da08 = _0x47b176["filter"](_0x3aa47f => _0x3aa47f["isNew"] || _0x3aa47f["isUpdated"]);
      for (const _0x2ef832 of _0x23da08) {
        const _0x1da056 = _0x2ef832["Standard"] === '1' ? '1' : '2', _0x422862 = await _0x3d8483(_0x431f59, "add_set_xmlnode", {
          'url': _0x46fcb7 + "LockCell.",
          'setNode': {
            'url': {
              'act': "act",
              'arfcn': "arfcn",
              'pci': "pci"
            },
            'value': {
              'act': _0x1da056,
              'arfcn': String(_0x2ef832["FrequencyPoint"] || ''),
              'pci': String(_0x2ef832["PCI"] || '')
            }
          }
        });
        if (!(_0x422862 && _0x422862['success'] === "true")) _0x384b3f = false;
        await _0x1bc2d5(0x190);
      }
      if (!await _0xceee17(_0x431f59, {
        [_0x46fcb7 + "LockEnable"]: _0x392ff9 === '1' ? '1' : '0'
      })) _0x384b3f = false;
      await _0x1bc2d5(0x320);
      let _0x12953e = await _0x2793d8(_0x431f59);
      !_0x12953e && (await _0x1bc2d5(0x258), _0x12953e = await _0x2793d8(_0x431f59));
      let _0x53c9cc = null;
      if (_0x12953e) {
        const _0x36333f = _0x12953e["cells"]["map"](function (_0x42da8c) {
          return {
            'Id': _0x42da8c['Id'],
            'PCI': _0x42da8c['PCI'],
            'FrequencyPoint': _0x42da8c["FrequencyPoint"],
            'Standard': _0x42da8c["Standard"]
          };
        });
        if (_0x36333f["length"] === 0x0 && _0x23da08["length"] > 0x0 && _0x384b3f) {
          if (await _0x78e9a(_0x431f59)) _0x578483("error", '小区', "锁小区写回异常 读回0");
        } else _0x53c9cc = {
          'LockCommunity': _0x12953e["enabled"],
          'lock_cell_list': _0x36333f
        };
      }
      if (await _0x78e9a(_0x431f59)) _0x578483("info", '小区', "锁小区写回 增" + _0x23da08["length"] + '删' + (_0x1392bc['length'] + _0xfc7934["length"]) + '\x20读' + (_0x12953e ? _0x12953e["cells"]["length"] : "null"));
      _0x53c9cc ? (_0x16e738['set'](_0x48240a["LOCK_CELL"], JSON['stringify'](_0x53c9cc)), await __CPE["evalJS"]("updateData(" + JSON["stringify"]({
        'lockCellInfo': _0x53c9cc
      }) + ');'), await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast(" + (_0x384b3f ? "'锁小区已保存'" : "'部分操作未生效，已刷新当前状态'") + ',\x20' + (_0x384b3f ? '\x27success\x27' : "'warning'") + ')')) : await __CPE['evalJS']('window.showUpdateToast\x20&&\x20window.showUpdateToast(' + (_0x384b3f ? "'已保存，回显读取失败'" : "'部分操作未生效，回显读取失败'") + ',\x20\x27warning\x27)');
    } catch (_0x333dbf) {
      await __CPE['evalJS']('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27局域网操作失败，请重试\x27,\x20\x27warning\x27)');
    }
    return;
  }
  if (_0x1c6d31['action'] === "toggleLed") {
    if (_0x376838) return;
    _0x376838 = true;
    try {
      const _0x167fcc = _0x1c6d31["switch"] === '1' ? '1' : '0';
      let _0x4a8cca;
      const _0x4985d9 = await _0x1aadab();
      _0x4a8cca = _0x4985d9 && await _0xceee17(_0x4985d9, {
        'DeviceInfo.X_FH_LedControl.Switch': _0x167fcc
      }) ? {
        'resultCode': 0x0
      } : null;
      if (_0x4a8cca && _0x4a8cca["resultCode"] === 0x0) {
        try {
          (_0x16e738["set"](_0x48240a['LED'], _0x167fcc), await __CPE["evalJS"]("updateData(" + JSON["stringify"]({
            'ledStatus': _0x167fcc
          }) + ');'));
        } catch (_0x33da1c) {}
        await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('指示灯' + (" + JSON["stringify"](_0x167fcc) + " === '1' ? '已开启' : '已关闭'), 'success')");
      } else await _0x37b228("led");
    } finally {
      _0x376838 = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === 'rebootDevice') {
    if (_0x376838) return;
    _0x376838 = true;
    try {
      const _0x5b7324 = await _0x1aadab(), _0x5ee8ff = _0x5b7324 && await _0x3d8483(_0x5b7324, 'do_cmd_web', {
        'key': 'REBOOT_WEB'
      });
      _0x5ee8ff && _0x5ee8ff["success"] === "true" ? await __CPE['evalJS']("window.showUpdateToast && window.showUpdateToast('正在重启，请稍候…', 'success')") : await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('重启命令下发失败', 'warning')");
    } catch (_0x492bed) {
      try {
        await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('重启命令下发失败', 'warning')");
      } catch (_0x5ebd3e) {}
    } finally {
      _0x376838 = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === 'setFanMode') {
    if (_0x376838) return;
    _0x376838 = true;
    try {
      const _0x35ab13 = {
        'auto': '0',
        'power': '1',
        'silent': '2'
      }, _0x52d2e5 = _0x35ab13[_0x1c6d31["fanMode"]] || '0';
      let _0x409285;
      const _0x4f01b7 = await _0x1aadab();
      _0x409285 = _0x4f01b7 && await _0xceee17(_0x4f01b7, {
        'X_FH_MobileNetwork.FanAutoConfig.mode': _0x52d2e5
      }) ? {
        'resultCode': 0x0
      } : null;
      if (_0x409285 && _0x409285['resultCode'] === 0x0) {
        try {
          const _0x41b370 = {
            'auto': '标准',
            'power': '静音',
            'silent': '性能'
          }, _0x3909a2 = _0x35ab13[_0x1c6d31['fanMode']] !== undefined ? _0x1c6d31["fanMode"] : 'auto';
          (_0x16e738['set'](_0x48240a["FAN"], JSON["stringify"]({
            'value': _0x3909a2,
            'label': _0x41b370[_0x3909a2] || '标准'
          })), await __CPE["evalJS"]("updateData(" + JSON["stringify"]({
            'fanModeValue': _0x3909a2,
            'fanMode': _0x41b370[_0x3909a2] || '标准'
          }) + ');'));
        } catch (_0x5a7601) {}
        await __CPE['evalJS']("window.showUpdateToast && window.showUpdateToast('风扇模式已切换', 'success')");
      } else await _0x37b228("fan");
    } finally {
      _0x376838 = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === "sendAtCommand") {
    const _0x1fd5f6 = String(_0x1c6d31["cmd"] || '')["trim"]();
    if (!_0x1fd5f6) {
      await __CPE['evalJS']("window.atResult && window.atResult({ ok: false, output: \"指令不能为空\" });");
      return;
    }
    try {
      const _0x8f7b54 = _0x4f44fb();
      if (!_0x8f7b54) {
        await __CPE["evalJS"]("window.atResult && window.atResult({ ok: false, output: \"未配置本地账号\" });");
        return;
      }
      const _0x132643 = _0xd64c49(_0x8f7b54["host"]);
      if (!(_0x236325 && _0x8712e2 === _0x132643 && _0x2fa85b === "superadmin")) {
        await __CPE["evalJS"]("window.atResult && window.atResult({ ok: false, output: \"超密登录未生效，请重新登录后再试\" });");
        return;
      }
      const _0x1e8fbe = await _0x3d8483(_0x132643, "set_at_command", {
        'command': _0x1fd5f6
      });
      let _0x83faba = '';
      (_0x1e8fbe && !_0x1e8fbe['_error'] && (_0x83faba = String(_0x1e8fbe["result"] !== undefined ? _0x1e8fbe["result"] : _0x1e8fbe['response'] || _0x1e8fbe["output"] || _0x1e8fbe["data"] || ''), _0x83faba = _0x83faba["replace"](/^AT\s*response\s*[：:]\s*/i, '')["trim"]()), await __CPE["evalJS"]("window.atResult && window.atResult(" + JSON['stringify']({
        'ok': !!_0x83faba,
        'output': _0x83faba || '(无返回)'
      }) + ');'));
    } catch (_0x32f318) {
      await __CPE["evalJS"]("window.atResult && window.atResult(" + JSON['stringify']({
        'ok': false,
        'output': '发送异常：' + String(_0x32f318 && _0x32f318["message"] || _0x32f318)
      }) + ');');
    }
    return;
  }
  async function _0x2a634d() {
    try {
      const _0x22c89c = _0x4f44fb();
      if (!_0x22c89c) return false;
      const _0x27ea94 = _0xd64c49(_0x22c89c["host"]);
      if (!await _0x2ae0a1(_0x27ea94, _0x22c89c)) return false;
      const _0x41170d = await _0x3d8483(_0x27ea94, "get_lan_device_info_all", null), _0xafad60 = (_0x41170d || ({}))["data"] || [], _0x5f4022 = _0xafad60["map"](function (_0x1f112d) {
        const _0x2a3753 = String(_0x1f112d['InternetAccess'] || '2'), _0x2e4b77 = String(_0x1f112d["MaxUSBandwidth"] || '0'), _0x352726 = String(_0x1f112d["MaxDSBandwidth"] || '0'), _0x278419 = String(_0x1f112d["Layer2Interface"] || ''), _0x3c7329 = _0x278419['indexOf']('WLANConfiguration.5') >= 0x0 ? '4' : _0x278419["indexOf"]("WLANConfiguration.1") >= 0x0 ? '2' : '0';
        return {
          'name': _0x1f112d["DevName"] || _0x1f112d["HostName"] || "unknown",
          'mac': _0x1f112d["MACAddress"] || '--',
          'ip': _0x1f112d["IPAddress"] || '--',
          'netStatus': String(_0x1f112d['Active'] != null ? _0x1f112d["Active"] : '0'),
          'accessType': _0x3c7329,
          'accessTypeText': _0x3c7329 === '4' ? "5G接入" : _0x3c7329 === '2' ? "2.4G接入" : '接入',
          'accessTimeText': _0x998c8e(_0x1f112d["OnlineTime"]),
          'downSpeed': _0x1f112d["DownSpeed"] || '0',
          'upSpeed': _0x1f112d["UpSpeed"] || '0',
          'accessEnable': _0x2a3753 === '1' ? '0' : '1',
          'speedLimit': parseFloat(_0x2e4b77) > 0x0 || parseFloat(_0x352726) > 0x0 ? '1' : '0',
          'upLimit': _0x2e4b77,
          'downLimit': _0x352726,
          'netMonopoly': '0',
          'devType': '3'
        };
      });
      let _0x35df1c = '0';
      try {
        const _0x458a73 = await _0x3d8483(_0x27ea94, 'get_value_by_xmlnode', {
          'sw': "LANDevice.1.Hosts.EnableDelInactiveDev"
        });
        _0x35df1c = _0x458a73 && (String(_0x458a73['sw']) === "true" || String(_0x458a73['sw']) === '1') ? '1' : '0';
      } catch (_0x513137) {}
      return (await __CPE['evalJS']('updateData(' + JSON["stringify"]({
        'clientDevices': _0x5f4022,
        'offlineDevSwitch': _0x35df1c
      }) + ')'), true);
    } catch (_0x25f9ca) {
      return false;
    }
  }
  if (_0x1c6d31["action"] === 'refreshClients') {
    const _0x18ad46 = await _0x2a634d();
    if (_0x1c6d31["silent"]) return;
    const _0x31254a = _0x18ad46 ? "设备列表已更新" : '刷新失败', _0x2f42fe = _0x18ad46 ? "success" : "warning";
    await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('" + _0x31254a + "', '" + _0x2f42fe + '\x27)');
    return;
  }
  if (_0x1c6d31["action"] === "setDeviceConfig") {
    const _0x361db2 = String(_0x1c6d31["mac"] || '')["toUpperCase"]();
    if (!_0x361db2) {
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('缺少设备信息', 'warning')");
      return;
    }
    const _0x4256a2 = _0x1c6d31["dev"] || ({});
    const _0x111ce4 = await _0x1aadab();
    if (!_0x111ce4) {
      await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27连接失败\x27,\x20\x27warning\x27)');
      return;
    }
    const _0x152588 = await _0x3d8483(_0x111ce4, 'get_lan_device_info_all', null), _0x2bee05 = ((_0x152588 || ({}))['data'] || [])["find"](function (_0x343299) {
      return String(_0x343299['MACAddress'] || '')["toUpperCase"]() === _0x361db2;
    }) || null;
    if (!_0x2bee05) {
      await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27设备未在本地列表中，请刷新后重试\x27,\x20\x27warning\x27)');
      return;
    }
    const _0x2ea776 = String(_0x2bee05['index'] != null ? _0x2bee05["index"] : String(_0x2bee05["interfaceURL"] || '')["replace"](/^.*Hosts\.Host\.(\d+)\.?$/, '$1'));
    if (!(/^\d+$/)['test'](_0x2ea776)) {
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('操作失败，请稍后重试', 'warning')");
      return;
    }
    const _0x618708 = "LANDevice.1.Hosts.Host." + _0x2ea776;
    let _0x957c73 = false, _0x26eea6 = '操作成功';
    if (_0x1c6d31['op'] === "rename") {
      const _0x130327 = String(_0x1c6d31["name"] || '')["trim"]()["slice"](0x0, 0x1e);
      if (!_0x130327) {
        await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('设备名不能为空', 'warning')");
        return;
      }
      (_0x957c73 = await _0xceee17(_0x111ce4, (function () {
        const _0x23e0ac = {};
        return (_0x23e0ac[_0x618708 + ".DevName"] = _0x130327, _0x23e0ac);
      })()), _0x26eea6 = "设备已改名");
    } else {
      if (_0x1c6d31['op'] === "block") (_0x957c73 = await _0xceee17(_0x111ce4, (function () {
        const _0x5637ed = {};
        return (_0x5637ed[_0x618708 + ".InternetAccess"] = '1', _0x5637ed);
      })()), _0x26eea6 = "设备已拉黑"); else {
        if (_0x1c6d31['op'] === "unblock") (_0x957c73 = await _0xceee17(_0x111ce4, (function () {
          const _0x1b9e61 = {};
          return (_0x1b9e61[_0x618708 + ".InternetAccess"] = '2', _0x1b9e61);
        })()), _0x26eea6 = "设备已恢复上网"); else {
          if (_0x1c6d31['op'] === "speed" || _0x1c6d31['op'] === 'unlimit' || _0x1c6d31['op'] === 'saveAll') {
            let _0x49be08 = true;
            const _0x2c6dcc = _0x1c6d31['op'] === "saveAll" ? String(_0x1c6d31["name"] || '')["trim"]()["slice"](0x0, 0x1e) : '';
            _0x1c6d31['op'] === "saveAll" && _0x2c6dcc && (_0x49be08 = await _0xceee17(_0x111ce4, (function () {
              const _0x22e37f = {};
              return (_0x22e37f[_0x618708 + '.DevName'] = _0x2c6dcc, _0x22e37f);
            })()));
            if (_0x49be08) {
              const _0x460fc8 = _0x1c6d31['op'] === "saveAll" ? String(_0x1c6d31["accessEnable"] === '0' ? '1' : '2') : _0x2bee05["InternetAccess"] === '1' ? '1' : '2';
              _0x49be08 = await _0xceee17(_0x111ce4, (function () {
                const _0x1c8d63 = {};
                return (_0x1c8d63[_0x618708 + ".InternetAccess"] = _0x460fc8, _0x1c8d63);
              })());
            }
            if (_0x49be08) {
              let _0x5618bb = 0x0, _0x3acf37 = 0x0;
              if (_0x1c6d31['op'] === "unlimit") (_0x5618bb = 0x0, _0x3acf37 = 0x0); else {
                if (_0x1c6d31['op'] === "speed") (_0x5618bb = Math['round'](Math["max"](0x0, Math['min'](Number(_0x1c6d31["upMbps"]) || 0x0, 0x3e8)) * 0x400), _0x3acf37 = Math["round"](Math['max'](0x0, Math["min"](Number(_0x1c6d31["downMbps"]) || 0x0, 0x3e8)) * 0x400)); else _0x1c6d31["speedOn"] && (_0x5618bb = Math["round"](Math["max"](0x0, Math['min'](Number(_0x1c6d31["upMbps"]) || 0x0, 0x3e8)) * 0x400), _0x3acf37 = Math["round"](Math["max"](0x0, Math["min"](Number(_0x1c6d31["downMbps"]) || 0x0, 0x3e8)) * 0x400));
              }
              _0x49be08 = await _0xceee17(_0x111ce4, (function () {
                const _0x52b40c = {};
                return (_0x52b40c[_0x618708 + ".MaxUSBandwidth"] = _0x5618bb, _0x52b40c[_0x618708 + ".MaxDSBandwidth"] = _0x3acf37, _0x52b40c);
              })());
            }
            (_0x957c73 = _0x49be08, _0x26eea6 = _0x1c6d31['op'] === "unlimit" ? "已取消限速" : _0x1c6d31['op'] === 'speed' ? "限速已生效" : '设置已保存');
          } else {
            await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27未知操作\x27,\x20\x27warning\x27)');
            return;
          }
        }
      }
    }
    _0x957c73 ? (await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('" + _0x26eea6 + "', 'success')"), await _0x2a634d()) : await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('设置失败', 'warning')");
    return;
  }
  if (_0x1c6d31['action'] === 'applyNetConfig') {
    const _0x262b05 = ({
      '3g_only': '4',
      '4g_only': '0',
      '5g_only': '2',
      '5g_auto': '3'
    })[_0x1c6d31["netMode"]] || '3', _0x45269e = ({
      'sa_only': '1',
      'nsa_only': '2',
      'sa_nsa': '3'
    })[_0x1c6d31['nrMode']] || '3', _0x1c7dd8 = _0x16e738["has"](_0x48240a['CA']) ? _0x16e738['get'](_0x48240a['CA']) : '0';
    const _0x47a80a = _0x16e738["has"](_0x48240a['NR_MODE']) ? _0x16e738['get'](_0x48240a['NR_MODE']) : '3';
    if (_0x45269e !== _0x47a80a) {
      const _0x4d5105 = {
        'sa_only': '1',
        'nsa_only': '2',
        'sa_nsa': '3'
      }, _0x409d9b = _0x4d5105[_0x45269e] || '3', _0x44e81e = await _0x1aadab(), _0x9db5b = _0x44e81e && await _0xceee17(_0x44e81e, {
        'X_FH_MobileNetwork.NetworkSettings.NetworkMode': _0x262b05,
        'X_FH_MobileNetwork.NetworkSettings.ENDC': _0x409d9b,
        'X_FH_MobileNetwork.NetworkInfo.CaEnable': _0x1c7dd8
      });
      _0x9db5b ? (_0x16e738["set"](_0x48240a["NET_MODE"], _0x262b05), _0x16e738["set"](_0x48240a["NR_MODE"], _0x45269e), await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('组网切换成功', 'success')")) : await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27设置失败\x27,\x20\x27warning\x27)');
      return;
    }
    const _0xbdcd1a = await _0x1aadab(), _0x1c9c12 = _0xbdcd1a && await _0xceee17(_0xbdcd1a, {
      'X_FH_MobileNetwork.NetworkSettings.NetworkMode': _0x262b05,
      'X_FH_MobileNetwork.NetworkInfo.CaEnable': _0x1c7dd8
    });
    _0x1c9c12 ? (_0x16e738["set"](_0x48240a["NET_MODE"], _0x262b05), await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('网络设置已更新', 'success')")) : await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('设置失败', 'warning')");
    return;
  }
  if (_0x1c6d31["action"] === "getUiPrefs") {
    const _0x24eb35 = _0xf011c2();
    _0x2f5188 = _0x24eb35;
    try {
      await __CPE["evalJS"]("window.uiPrefsResult && window.uiPrefsResult(" + JSON["stringify"](_0x24eb35) + ');');
    } catch (_0x4f3ebd) {}
    return;
  }
  if (_0x1c6d31["action"] === "setUiPrefs") {
    const _0x47f477 = _0xf011c2(), _0x481cc8 = String(_0x1c6d31["key"] || '');
    if (_0x481cc8 === "theme") {
      const _0x16432a = String(_0x1c6d31["value"] || '');
      _0x47f477['theme'] = _0x16432a === 'light' || _0x16432a === 'dark' ? _0x16432a : "auto";
    } else _0x481cc8 === "diag" && (_0x47f477["diag"] = _0x1c6d31['value'] === 0x1 || _0x1c6d31["value"] === '1' || _0x1c6d31["value"] === true ? 0x1 : 0x0);
    let _0x54ad0a = 0x0;
    try {
      _0x16e738["set"](_0x48240a["UI_PREFS"], JSON['stringify'](_0x47f477));
      let _0x3aca4f = null;
      try {
        _0x3aca4f = JSON["parse"](_0x16e738["has"](_0x48240a['UI_PREFS']) ? _0x16e738["get"](_0x48240a["UI_PREFS"]) : "null");
      } catch (_0x319f7d) {
        _0x3aca4f = null;
      }
      _0x54ad0a = _0x3aca4f && _0x3aca4f[_0x481cc8] === (_0x481cc8 === "diag" ? _0x47f477["diag"] : _0x47f477['theme']) ? 0x1 : 0x0;
    } catch (_0x22468f) {
      _0x54ad0a = 0x0;
    }
    (_0x2f5188 = _0x47f477, _0x578483("info", '我的', "偏好→" + _0x481cc8 + '=' + (_0x481cc8 === "diag" ? _0x47f477["diag"] : _0x47f477["theme"]) + (_0x54ad0a ? "·已存" : "·存盘失败")));
    try {
      await __CPE["evalJS"]('window.uiPrefsResult\x20&&\x20window.uiPrefsResult(' + JSON["stringify"](Object["assign"]({}, _0x47f477, {
        'ok': _0x54ad0a
      })) + ');');
    } catch (_0x2d4f7a) {}
    return;
  }
  if (_0x1c6d31["action"] === 'getHomeCards') {
    let _0x27ac33 = {};
    try {
      _0x27ac33 = JSON["parse"](_0x16e738["has"](_0x48240a['HOME_CARDS']) ? _0x16e738["get"](_0x48240a["HOME_CARDS"]) : '{}') || ({});
    } catch (_0x14317b) {
      _0x27ac33 = {};
    }
    try {
      await __CPE["evalJS"]("window.homeCardsResult && window.homeCardsResult(" + JSON["stringify"]({
        'conf': _0x27ac33
      }) + ');');
    } catch (_0xb27907) {}
    return;
  }
  if (_0x1c6d31["action"] === "setHomeCards") {
    let _0x8feb2e = {};
    try {
      _0x8feb2e = JSON["parse"](_0x16e738["has"](_0x48240a["HOME_CARDS"]) ? _0x16e738['get'](_0x48240a['HOME_CARDS']) : '{}') || ({});
    } catch (_0x5219e3) {
      _0x8feb2e = {};
    }
    const _0x366744 = String(_0x1c6d31['key'] || ''), _0x399014 = _0x1c6d31["value"] === "pro" ? 'pro' : "basic";
    let _0x15fc6b = 0x0;
    if (_0x366744) {
      _0x8feb2e[_0x366744] = _0x399014;
      try {
        _0x16e738["set"](_0x48240a["HOME_CARDS"], JSON['stringify'](_0x8feb2e));
        let _0x47954a = null;
        try {
          _0x47954a = JSON["parse"](_0x16e738['has'](_0x48240a["HOME_CARDS"]) ? _0x16e738["get"](_0x48240a["HOME_CARDS"]) : "null");
        } catch (_0x1477da) {
          _0x47954a = null;
        }
        _0x15fc6b = _0x47954a && _0x47954a[_0x366744] === _0x399014 ? 0x1 : 0x0;
      } catch (_0x5a6f09) {
        _0x15fc6b = 0x0;
      }
    }
    _0x578483("info", '我的', "卡片样式→" + _0x366744 + '=' + _0x399014 + (_0x15fc6b ? "·已存" : "·存盘失败"));
    try {
      await __CPE["evalJS"]("window.homeCardsResult && window.homeCardsResult(" + JSON["stringify"]({
        'conf': _0x8feb2e,
        'saved': _0x366744 ? 0x1 : 0x0,
        'ok': _0x15fc6b
      }) + ');');
    } catch (_0x324e4c) {}
    if (_0x366744 === 'header' && _0x399014 === "pro") try {
      _0x505379();
    } catch (_0x422946) {}
    return;
  }
  if (_0x1c6d31["action"] === "toggleCA") {
    const _0x558102 = _0x1c6d31["switch"] === '1' ? '1' : '0', _0x73f16b = _0x16e738["has"](_0x48240a["NR_MODE"]) ? _0x16e738['get'](_0x48240a["NR_MODE"]) : '3', _0x3b8e6c = _0x16e738['has'](_0x48240a['NET_MODE']) ? _0x16e738["get"](_0x48240a["NET_MODE"]) : '3';
    let _0x2885c4;
    const _0x4762d3 = await _0x1aadab();
    _0x2885c4 = _0x4762d3 && await _0xceee17(_0x4762d3, {
      'X_FH_MobileNetwork.NetworkInfo.CaEnable': _0x558102
    }) ? {
      'resultCode': 0x0
    } : null;
    _0x2885c4 && _0x2885c4["resultCode"] === 0x0 ? (_0x16e738["set"](_0x48240a['CA'], _0x558102), await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('载波聚合' + (" + JSON['stringify'](_0x558102) + " === '1' ? '已开启' : '已关闭'), 'success', '远程服务即将重启')")) : await _0x37b228('ca');
    return;
  }
  if (_0x1c6d31['action'] === "getRebootInfo") {
    let _0xa11dde = null;
    try {
      const _0x3cd9ea = await _0x1aadab();
      if (_0x3cd9ea) {
        const _0x4b713c = await _0x3d8483(_0x3cd9ea, "get_value_by_xmlnode", {
          'enable': "DeviceInfo.TimedReboot.1.enable",
          'week': "DeviceInfo.TimedReboot.1.week_of_day",
          'time': "DeviceInfo.TimedReboot.1.time"
        });
        if (_0x4b713c && _0x4b713c["enable"] !== undefined && _0x4b713c["enable"] !== '') {
          const _0x56d89c = String(_0x4b713c['enable']) === '1' || String(_0x4b713c["enable"]) === "true" ? '1' : '0', _0xfd53be = String(_0x4b713c["time"] || '');
          _0xa11dde = {
            'GatewayRebootEnable': _0x56d89c,
            'DaysOfWeek': _0x56d89c === '1' ? String(_0x4b713c["week"] || '') : '',
            'Hour': _0xfd53be["split"](':')[0x0] || '',
            'Minute': _0xfd53be["split"](':')[0x1] || ''
          };
        }
      }
    } catch (_0x4da3f0) {}
    if (!_0xa11dde) {
      await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27读取失败，请稍后重试\x27,\x20\x27warning\x27);');
      return;
    }
    await __CPE["evalJS"]('window.populateRebootModal(' + JSON["stringify"](_0xa11dde) + ');');
    return;
  }
  if (_0x1c6d31["action"] === "setRebootInfo") {
    const _0x366bd1 = _0x1c6d31['enable'] === '1' ? '1' : '0', _0x5ecbc5 = _0x1c6d31['daysOfWeek'] || '', _0x23d0b8 = _0x1c6d31["time"] || "03:00", _0x221631 = _0x23d0b8["split"](':')[0x0], _0x47fed7 = _0x23d0b8["split"](':')[0x1], _0x1ad5a5 = await (async () => {
      const _0x2917a9 = await _0x1aadab();
      if (!_0x2917a9) return null;
      const _0x4d57da = _0x366bd1 === '1' ? {
        'DeviceInfo.TimedReboot.1.enable': '1',
        'DeviceInfo.TimedReboot.1.week_of_day': _0x5ecbc5,
        'DeviceInfo.TimedReboot.1.time': _0x23d0b8
      } : {
        'DeviceInfo.TimedReboot.1.enable': '0',
        'DeviceInfo.TimedReboot.1.week_of_day': '',
        'DeviceInfo.TimedReboot.1.time': ''
      };
      return await _0xceee17(_0x2917a9, _0x4d57da) ? {
        'resultCode': 0x0
      } : null;
    })();
    if (_0x1ad5a5 && _0x1ad5a5["resultCode"] === 0x0) {
      try {
        _0x16e738['set'](_0x48240a["REBOOT"], JSON["stringify"]({
          'enable': _0x366bd1,
          'days': _0x5ecbc5,
          'time': _0x23d0b8
        }));
      } catch (_0x54cb4a) {}
      await __CPE['evalJS']('window.rebootSaveResult\x20&&\x20window.rebootSaveResult(true);');
    } else {
      if (_0x16e738["has"](_0x48240a['REBOOT'])) try {
        const _0x24dcde = JSON["parse"](_0x16e738["get"](_0x48240a["REBOOT"]));
        await __CPE["evalJS"]('updateData(' + JSON['stringify']({
          'rebootEnabled': _0x24dcde["enable"] || '0',
          'rebootText': _0x24dcde['enable'] === '1' ? _0x1be9b3(_0x24dcde['days']) + '\x20' + (_0x24dcde["time"] || '') : "已禁用"
        }) + ');');
      } catch (_0x29cd1f) {}
      await __CPE['evalJS']("window.rebootSaveResult && window.rebootSaveResult(false);");
    }
    return;
  }
  if (_0x1c6d31["action"] === "setOfflineDevSwitch") {
    const _0x5cb89f = _0x1c6d31["enable"] === '1' ? '1' : '0';
    let _0x964459;
    const _0x2411a8 = await _0x1aadab();
    _0x964459 = _0x2411a8 && await _0xceee17(_0x2411a8, {
      'LANDevice.1.Hosts.EnableDelInactiveDev': _0x5cb89f === '1' ? 'true' : 'false'
    }) ? {
      'resultCode': 0x0
    } : null;
    if (_0x964459 && _0x964459["resultCode"] === 0x0) {
      try {
        await __CPE["evalJS"]("updateData(" + JSON["stringify"]({
          'offlineDevSwitch': _0x5cb89f
        }) + ');');
      } catch (_0x11f1de) {}
      await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('已" + (_0x5cb89f === '1' ? '开启' : '关闭') + "显示离线设备', 'success')");
    } else await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast('设置失败，请稍后重试', 'warning')");
    return;
  }
  if (_0x1c6d31["action"] === "wanInfo") {
    const _0x43a65d = _0x4f44fb(), _0x4c724a = _0x43a65d ? _0xd64c49(_0x43a65d["host"]) : '';
    let _0x54f02d = _0x4d793f && _0x4d793f["__wan"] || null, _0x34fc20 = _0x4d793f && _0x4d793f["__n79"] || '';
    if ((!_0x54f02d || !_0x54f02d['ip']) && _0x4c724a && await _0x2ae0a1(_0x4c724a, _0x43a65d)) {
      const _0x410179 = await _0x3d8483(_0x4c724a, "get_value_by_xmlnode", {
        'wanIp': _0x238095 + "ExternalIPAddress",
        'wanMask': _0x238095 + "SubnetMask",
        'wanGw': _0x238095 + 'DefaultGateway',
        'wanDns': _0x238095 + "DNSServers",
        'wanStatus': _0x238095 + "ConnectionStatus",
        'wanConnTime': _0x238095 + 'X_FH_ConnectionTotalTime',
        'wanConnType': _0x238095 + "ConnectionType",
        'v6Ip': _0x238095 + "X_FH_IPv6IPAddress",
        'v6Status': _0x238095 + "X_FH_IPv6ConnStatus",
        'v6Dns': _0x238095 + 'X_FH_IPv6DNSServers',
        'netMode': "X_FH_MobileNetwork.NetworkSettings.NetworkMode",
        'n79': "DeviceInfo.X_FH_N79_Enable"
      }) || ({});
      (_0x410179["wanIp"] || _0x410179['wanStatus']) && (_0x54f02d = {
        'status': _0x410179["wanStatus"] || '',
        'connTime': _0x410179['wanConnTime'] || '',
        'connType': _0x410179["wanConnType"] || '',
        'ip': _0x410179['wanIp'] || '',
        'mask': _0x410179["wanMask"] || '',
        'gw': _0x410179["wanGw"] || '',
        'dns': _0x410179['wanDns'] || '',
        'v6Status': _0x410179["v6Status"] || '',
        'v6Ip': _0x410179["v6Ip"] || '',
        'v6Dns': _0x410179["v6Dns"] || '',
        'netMode': _0x410179['netMode'] || ''
      }, _0x34fc20 = _0x410179["n79"] || _0x34fc20);
    }
    const _0xa6b49a = _0x54f02d ? (function () {
      const _0x5606bd = parseInt(_0x54f02d['connTime'], 0xa);
      let _0x516f9b = '--';
      if (!isNaN(_0x5606bd) && _0x5606bd > 0x0) {
        const _0x4b78d2 = Math['floor'](_0x5606bd / 0x15180), _0x465e42 = Math['floor'](_0x5606bd % 0x15180 / 0xe10), _0x14b223 = Math["floor"](_0x5606bd % 0xe10 / 0x3c), _0x16c8ce = [];
        if (_0x4b78d2 > 0x0) _0x16c8ce["push"](_0x4b78d2 + '天');
        if (_0x465e42 > 0x0 || _0x4b78d2 > 0x0) _0x16c8ce["push"](_0x465e42 + '小时');
        (_0x16c8ce['push'](_0x14b223 + '分'), _0x516f9b = _0x16c8ce["join"]('\x20'));
      }
      const _0x358547 = String(_0x54f02d['dns'] || '')['split'](','), _0x5b6926 = String(_0x54f02d['v6Dns'] || '')['split'](',');
      return {
        'CONNECTIONSTATUS': _0x54f02d["status"] || '',
        '__wanUptime': _0x516f9b,
        'CONNECTIONTYPE': _0x54f02d["connType"] || '',
        'NetworkMode': _0x54f02d["netMode"] || '',
        'IPADDRESS': _0x54f02d['ip'] || '',
        'SUBNETMASK': _0x54f02d['mask'] || '',
        'GATEWAY': _0x54f02d['gw'] || '',
        'DNS1': _0x358547[0x0] || '',
        'DNS2': _0x358547[0x1] || '',
        'IPV6_CONNECTIONSTATUS': _0x54f02d["v6Status"] || '',
        'IPV6_IPADDRESS': _0x54f02d["v6Ip"] || '',
        'IPV6_DNS1': _0x5b6926[0x0] || '',
        'IPV6_DNS2': _0x5b6926[0x1] || '',
        '__n79': String(_0x34fc20 == null ? '' : _0x34fc20)
      };
    })() : null;
    await __CPE["evalJS"]("window.wanInfoResult && window.wanInfoResult(" + JSON["stringify"](_0xa6b49a) + ');');
    return;
  }
  if (_0x1c6d31['action'] === "firmwareCheck") {
    try {
      const _0x4c9981 = await _0x1aadab();
      if (!_0x4c9981) {
        await __CPE["evalJS"]("window.firmwareResult && window.firmwareResult(" + JSON['stringify']({
          'ok': false
        }) + ');');
        return;
      }
      const _0x426554 = _0x16e738["get"](_0x48240a["DEVICE_VERSION"]) || '', _0x180abe = await _0x3d8483(_0x4c9981, 'version_detection', null, false, 0x7530), _0x3a65f6 = _0x180abe && _0x180abe['softwareVer'] ? String(_0x180abe["softwareVer"]) : '', _0x123831 = _0x180abe && _0x180abe["descriptions"] ? String(_0x180abe["descriptions"])["split"]('\x0a')["map"](_0x17b236 => _0x17b236['replace'](/^\s*\d+\s*[\.、]\s*/, '')['trim']())["filter"](Boolean) : [], _0x2fe282 = !!(_0x180abe && _0x180abe["result"] === 'SUCCESS'), _0x3a7d7c = !!(_0x2fe282 && _0x3a65f6 && _0x426554 && _0x3a65f6 !== _0x426554);
      await __CPE['evalJS']("window.firmwareResult && window.firmwareResult(" + JSON["stringify"]({
        'ok': _0x2fe282,
        'hasNew': _0x3a7d7c,
        'currentVer': _0x426554,
        'latestVer': _0x3a65f6,
        'notes': _0x123831
      }) + ');');
    } catch (_0x5c04ce) {
      try {
        await __CPE['evalJS']('window.firmwareResult\x20&&\x20window.firmwareResult(' + JSON["stringify"]({
          'ok': false
        }) + ');');
      } catch (_0x1af5c6) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "webLoginGet") {
    const _0x37d8be = _0x4f44fb(), _0x237de9 = _0x37d8be ? String(_0x37d8be["pass"] || '') : '';
    await __CPE["evalJS"]("window.webLoginResult && window.webLoginResult(" + JSON['stringify']({
      'ok': !!_0x37d8be,
      'password': _0x237de9
    }) + ');');
    return;
  }
  if (_0x1c6d31["action"] === "webLoginSet") {
    const _0x52c481 = String(_0x1c6d31["password"] || '');
    if (!_0x52c481) {
      await __CPE["evalJS"]("window.webLoginSaveResult && window.webLoginSaveResult(" + JSON["stringify"]({
        'ok': false,
        'msg': "密码不能为空"
      }) + ');');
      return;
    }
    try {
      const _0x5322f5 = _0x4f44fb();
      if (!_0x5322f5) {
        await __CPE["evalJS"]('window.webLoginSaveResult\x20&&\x20window.webLoginSaveResult(' + JSON['stringify']({
          'ok': false,
          'msg': "未配置本地账号"
        }) + ');');
        return;
      }
      const _0x393460 = await _0x1aadab();
      if (!_0x393460) {
        await __CPE["evalJS"]("window.webLoginSaveResult && window.webLoginSaveResult(" + JSON["stringify"]({
          'ok': false,
          'msg': "连接失败"
        }) + ');');
        return;
      }
      const _0xb2d71 = await _0x3d8483(_0x393460, "user_management", {
        'set_user': 0x1,
        'orgPd': _0x5322f5["pass"] || '',
        'newComPd': _0x52c481
      }), _0x414333 = !!(_0xb2d71 && _0xb2d71["success"] === "true");
      if (_0x414333) {
        const _0xda0f9 = _0x3ed42d(), _0x583384 = _0x4f1a06();
        if (_0xda0f9[_0x583384]) {
          _0xda0f9[_0x583384]['pass'] = _0x52c481;
          try {
            _0x16e738["set"](_0x48240a["LOCAL_ACCOUNTS"], JSON["stringify"](_0xda0f9));
          } catch (_0x4b3ebb) {}
        }
      }
      await __CPE['evalJS']("window.webLoginSaveResult && window.webLoginSaveResult(" + JSON["stringify"]({
        'ok': _0x414333
      }) + ');');
    } catch (_0x31e435) {
      try {
        await __CPE["evalJS"]('window.webLoginSaveResult\x20&&\x20window.webLoginSaveResult(' + JSON["stringify"]({
          'ok': false
        }) + ');');
      } catch (_0x345a29) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "getLockCellDetail") {
    let _0x44d903 = null;
    try {
      const _0x375197 = await _0x1aadab();
      if (_0x375197) {
        const _0x2702f9 = await _0x2793d8(_0x375197);
        _0x2702f9 && (_0x44d903 = {
          'LockCommunity': _0x2702f9['enabled'],
          'lock_cell_list': _0x2702f9["cells"]['map'](function (_0x2c48b9) {
            return {
              'Id': _0x2c48b9['Id'],
              'PCI': _0x2c48b9['PCI'],
              'FrequencyPoint': _0x2c48b9["FrequencyPoint"],
              'Standard': _0x2c48b9['Standard']
            };
          })
        });
      }
    } catch (_0x1e7b01) {}
    if (_0x44d903) try {
      _0x16e738["set"](_0x48240a["LOCK_CELL"], JSON["stringify"](_0x44d903));
    } catch (_0x5a4e24) {}
    await __CPE["evalJS"]("window.populateLockCellModal(" + JSON["stringify"](_0x44d903) + ');');
    return;
  }
  if (_0x1c6d31["action"] === "getLockBandDetail") {
    let _0x17e5a5 = null;
    try {
      const _0x594d5b = await _0x1aadab();
      if (_0x594d5b) {
        const _0x137a30 = "X_FH_MobileNetwork.NetworkSettings.", _0x5e9b09 = await _0x3d8483(_0x594d5b, "get_value_by_xmlnode", {
          'en': _0x137a30 + "LockBandEnable",
          'f4': _0x137a30 + "LTELockBAND",
          'f5': _0x137a30 + "NRLockBAND"
        });
        _0x5e9b09 && !_0x5e9b09["_error"] && _0x5e9b09['en'] !== undefined && (_0x17e5a5 = {
          'LockFrequencyBand': String(_0x5e9b09['en']) === '1' ? '1' : '0',
          'Frequency_4G': String(_0x5e9b09['f4'] || ''),
          'Frequency_5G': String(_0x5e9b09['f5'] || '')
        });
      }
    } catch (_0xdf5300) {}
    if (_0x17e5a5) try {
      _0x16e738["set"](_0x48240a["LOCK_BAND"], JSON['stringify'](_0x17e5a5));
    } catch (_0x34a913) {} else try {
      await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(\x27读取失败，请稍后重试\x27,\x20\x27warning\x27);\x20window.bandRefreshDone\x20&&\x20window.bandRefreshDone(false)');
    } catch (_0x3616ed) {}
    await __CPE['evalJS']('window.populateLockBandModal(' + JSON["stringify"](_0x17e5a5 || ({})) + ');');
    return;
  }
  if (_0x1c6d31["action"] === 'setLockBandEnable') {
    const _0x3732dd = _0x1c6d31["enable"] === '1' ? '1' : '0';
    let _0x5802b6 = true;
    const _0xdb4a51 = await (async () => {
      const _0x19b9f8 = await _0x1aadab();
      return _0x19b9f8 && await _0xceee17(_0x19b9f8, {
        'X_FH_MobileNetwork.NetworkSettings.LockBandEnable': _0x3732dd
      }) ? {
        'resultCode': 0x0
      } : null;
    })();
    if (!(_0xdb4a51 && (_0xdb4a51["resultCode"] === 0x0 || _0xdb4a51["resultCode"] === 0x4e2c))) _0x5802b6 = false;
    try {
      let _0x5b0319 = null;
      try {
        _0x5b0319 = JSON['parse'](_0x16e738["get"](_0x48240a['LOCK_BAND']) || "null");
      } catch (_0x2c301b) {}
      if (!_0x5b0319 || typeof _0x5b0319 !== "object") _0x5b0319 = {
        'LockFrequencyBand': _0x3732dd,
        'Frequency_4G': '',
        'Frequency_5G': ''
      };
      _0x5b0319["LockFrequencyBand"] = _0x3732dd;
      try {
        _0x16e738['set'](_0x48240a["LOCK_BAND"], JSON['stringify'](_0x5b0319));
      } catch (_0x1c773d) {}
    } catch (_0x2312ef) {}
    (await __CPE["evalJS"]("updateData(" + JSON["stringify"]({
      'bandLockEnabled': _0x3732dd
    }) + ');'), await __CPE["evalJS"]('window.showUpdateToast\x20&&\x20window.showUpdateToast(' + JSON['stringify'](_0x5802b6 ? _0x3732dd === '1' ? "锁频段已保存" : '锁频段已关闭' : '设置已记下，稍后自动核对') + ',\x20' + JSON["stringify"](_0x5802b6 ? "success" : "warning") + ')'));
    return;
  }
  if (_0x1c6d31['action'] === "saveLockBandInfo") {
    const _0x59df47 = _0x1c6d31["type"] === '1' ? '1' : '2', _0x531e71 = _0x1c6d31["freq"] || '';
    let _0x4a562f = true;
    const _0x55bbe9 = await (async () => {
      const _0x2cbd95 = await _0x1aadab();
      if (!_0x2cbd95) return null;
      const _0x42056c = _0x59df47 === '1' ? "X_FH_MobileNetwork.NetworkSettings.LTELockBAND" : "X_FH_MobileNetwork.NetworkSettings.NRLockBAND";
      return await _0xceee17(_0x2cbd95, {
        [_0x42056c]: _0x531e71
      }) ? {
        'resultCode': 0x0
      } : null;
    })();
    if (!(_0x55bbe9 && (_0x55bbe9["resultCode"] === 0x0 || _0x55bbe9["resultCode"] === 0x4e2c))) _0x4a562f = false;
    try {
      let _0x5d8e67 = null;
      try {
        _0x5d8e67 = JSON['parse'](_0x16e738["get"](_0x48240a["LOCK_BAND"]) || "null");
      } catch (_0x5a2234) {}
      if (!_0x5d8e67 || typeof _0x5d8e67 !== 'object') _0x5d8e67 = {
        'LockFrequencyBand': '0',
        'Frequency_4G': '',
        'Frequency_5G': ''
      };
      if (_0x59df47 === '1') _0x5d8e67["Frequency_4G"] = _0x531e71; else _0x5d8e67["Frequency_5G"] = _0x531e71;
      try {
        _0x16e738["set"](_0x48240a["LOCK_BAND"], JSON["stringify"](_0x5d8e67));
      } catch (_0x1010a2) {}
    } catch (_0x322098) {}
    await __CPE["evalJS"]("window.showUpdateToast && window.showUpdateToast(" + JSON["stringify"](_0x4a562f ? "频段已保存" : "设置已记下，稍后自动核对") + ',\x20' + JSON["stringify"](_0x4a562f ? "success" : 'warning') + ')');
    return;
  }
  function _0x86341b(_0x187bd7, _0x4da5c6) {
    try {
      const _0x49a82a = String(_0x4da5c6 && _0x4da5c6["body"] || '');
      if ((/login_result"?\s*:\s*4/)["test"](_0x49a82a) || (/(^|[^0-9])4\|0/)['test'](_0x49a82a)) return "login";
      if ((/login_result"?\s*:\s*2/)["test"](_0x49a82a) || (/(^|[^0-9])2\|/)["test"](_0x49a82a)) return 'locked';
      if ((/login_result"?\s*:\s*9/)['test'](_0x49a82a) || (/remaintime"?\s*:\s*[1-9]/)["test"](_0x49a82a)) return "limited";
    } catch (_0x15135f) {}
    return String(_0x187bd7 || "fail");
  }
  function _0x3cf905() {
    const _0x203956 = new Date(), _0x5879c4 = _0x3dff0c => _0x3dff0c < 0xa ? '0' + _0x3dff0c : '' + _0x3dff0c;
    return _0x203956['getFullYear']() + '/' + _0x5879c4(_0x203956['getMonth']() + 0x1) + '/' + _0x5879c4(_0x203956["getDate"]()) + '\x20' + _0x5879c4(_0x203956['getHours']()) + ':' + _0x5879c4(_0x203956["getMinutes"]());
  }
  if (_0x1c6d31['action'] === 'smsTab') {
    const _0xd598a = _0x1c6d31["enable"] === '1' ? '1' : '0';
    (_0x578483('info', '短信', "开关→" + (_0xd598a === '1' ? '开' : '关')), _0x16e738["set"](_0x48240a['SMS_TAB'], _0xd598a), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON['stringify']({
      'type': 'tab',
      'enable': _0xd598a
    }) + ');'));
    return;
  }
  if (_0x1c6d31['action'] === "speedUnit") {
    const _0x1179f8 = _0x1c6d31["unit"] === "mbps" ? 'mbps' : 'kb';
    (_0x16e738['set'](_0x48240a["SPEED_UNIT"], _0x1179f8), await __CPE["evalJS"]("window.speedUnitSaved && window.speedUnitSaved(" + JSON["stringify"](_0x1179f8) + ');'));
    return;
  }
  async function _0x3fd892(_0x2a204e, _0x48a357) {
    const _0xd4aa = await _0x3d8483(_0x2a204e, 'get_sms_data', _0x48a357['d'], false, undefined, undefined, _0x48a357['dp'] || undefined), _0x522164 = function (_0x4f0c01) {
      try {
        return _0x4f0c01 ? Array["isArray"](_0x4f0c01) ? "arr:" + _0x4f0c01["length"] : '{' + Object["keys"](_0x4f0c01)["slice"](0x0, 0x3)["join"](',') + (Object["keys"](_0x4f0c01)["length"] > 0x3 ? '…' : '') + '}' : "null";
      } catch (_0x4ff807) {
        return "err";
      }
    };
    if (!_0xd4aa || _0xd4aa["_error"] || _0xd4aa['success'] === "false") return (_0x578483('warn', '短信', "短信拉取失败(" + _0x48a357["tag"] + ")：resp=" + _0x522164(_0xd4aa)), null);
    let _0x18eb21 = _0xd4aa;
    if (_0x18eb21['data'] && typeof _0x18eb21["data"] === "object" && !Array['isArray'](_0x18eb21["data"])) _0x18eb21 = _0x18eb21["data"];
    const _0x4d02e1 = [], _0x5a58de = [];
    let _0x26eb9f = 0x0, _0x2a9e5f = 0x0, _0x5ac231 = 0x0;
    const _0x527a13 = Object['keys'](_0x18eb21)["length"];
    let _0x282dfa = '', _0xfc8c10 = '';
    Object["keys"](_0x18eb21)["forEach"](function (_0x10b91b) {
      const _0x293feb = _0x18eb21[_0x10b91b];
      if (!_0x293feb || typeof _0x293feb !== "object" || Array["isArray"](_0x293feb)) return;
      _0x26eb9f++;
      if (!_0x282dfa) _0x282dfa = Object['keys'](_0x293feb)["slice"](0x0, 0x8)["join"](',');
      let _0xaa409e = _0x293feb["session_phone"] || _0x293feb["phone"] || _0x293feb["number"] || _0x293feb["peer"] || _0x293feb["session_num"] || _0x293feb["msisdn"] || _0x293feb["addr"] || '';
      _0xaa409e = String(_0xaa409e || '')["trim"]();
      if (!_0xaa409e) _0xaa409e = (/^message_item/i)["test"](String(_0x10b91b)) || String(_0x10b91b)['length'] > 0x18 ? '--' : String(_0x10b91b);
      Object['keys'](_0x293feb)["forEach"](function (_0x4ae64e) {
        if (_0x4ae64e["indexOf"]("message_item") !== 0x0) return;
        const _0x4078df = _0x293feb[_0x4ae64e];
        if (!_0x4078df || typeof _0x4078df !== "object") return;
        if (_0x4078df["msg_content"] === undefined || _0x4078df['msg_content'] === null) return;
        _0x2a9e5f++;
        if (!_0xfc8c10) _0xfc8c10 = Object["keys"](_0x4078df)['slice'](0x0, 0x8)["join"](',');
        const _0x272771 = String(_0x4078df['childnode'] != null ? _0x4078df["childnode"] : _0x4078df['msg_id'] != null ? _0x4078df["msg_id"] : _0x4ae64e["replace"]("message_item", '')), _0x3b9139 = String(_0x4078df["rcvorsend"] == null ? '' : _0x4078df["rcvorsend"])["toLowerCase"](), _0x5df04b = _0x3b9139 === 'send' || _0x3b9139 === '1' || _0x3b9139 === '2';
        if (_0x5df04b) _0x5a58de["push"]({
          'Index': 's' + _0x272771,
          'Receiver': _0xaa409e,
          'Msg': String(_0x4078df["msg_content"]),
          'Sendtime': String(_0x4078df["time"] || '')
        }); else {
          if (_0x4078df['isOpened'] != null) _0x5ac231++;
          _0x4d02e1["push"]({
            'Index': 'r' + _0x272771,
            'Sender': _0xaa409e,
            'Msg': String(_0x4078df["msg_content"]),
            'Recvtime': String(_0x4078df["time"] || ''),
            'Isopened': _0x4078df['isOpened'] != null ? String(_0x4078df["isOpened"]) : ''
          });
        }
      });
    });
    _0x5ac231 > 0x0 ? _0x4d02e1['forEach'](function (_0x491385) {
      if (_0x491385["Isopened"] === '') _0x491385['Isopened'] = '0';
    }) : _0x4d02e1["forEach"](function (_0x4715a3) {
      if (_0x4715a3["Isopened"] === '') _0x4715a3['Isopened'] = '1';
    });
    const _0x488147 = {
      'sessions': _0x26eb9f,
      'items': _0x2a9e5f,
      'topKeys': _0x527a13,
      'opened': _0x5ac231,
      'sessKeys': _0x282dfa,
      'itemKeys': _0xfc8c10
    };
    if (_0x4d02e1["length"] === 0x0 && _0x5a58de["length"] === 0x0) {
      if (_0x26eb9f > 0x0) _0x578483('warn', '短信', "短信(本地)结构异常：会话" + _0x26eb9f + "/消息" + _0x2a9e5f + " 会话字段[" + _0x282dfa + ']\x20消息字段[' + _0xfc8c10 + ']'); else {
        if (_0x527a13 > 0x0) _0x578483("warn", '短信', "短信(本地)结构异常：顶层" + _0x527a13 + '键[' + Object["keys"](_0x18eb21)["slice"](0x0, 0x6)["join"](',') + "] 无可识别会话"); else _0x578483('info', '短信', "短信(本地)设备侧无短信");
      }
    }
    return {
      'recv': _0x4d02e1,
      'send': _0x5a58de,
      'meta': _0x488147
    };
  }
  let _0x3315f0 = null;
  async function _0xfb4388(_0x224923) {
    const _0x188daa = [{
      'd': null,
      'dp': "dataObj",
      'tag': 'null+FHAPIS'
    }, {
      'd': {},
      'dp': "dataObj",
      'tag': "{}+FHAPIS"
    }, {
      'd': null,
      'dp': null,
      'tag': "null+FHNCAPIS"
    }];
    if (_0x3315f0) {
      const _0x50f15d = await _0x3fd892(_0x224923, _0x3315f0);
      if (_0x50f15d) {
        const _0x2d1da6 = _0x50f15d["recv"]['length'] + _0x50f15d['send']["length"], _0x551981 = _0x50f15d["meta"] || ({});
        if (_0x2d1da6 > 0x0 || (_0x551981["sessions"] || 0x0) === 0x0 && (_0x551981["topKeys"] || 0x0) === 0x0) return _0x50f15d;
      }
    }
    let _0x7b0b5c = null;
    for (let _0x4e120e = 0x0; _0x4e120e < _0x188daa["length"]; _0x4e120e++) {
      const _0x5b64a1 = await _0x3fd892(_0x224923, _0x188daa[_0x4e120e]);
      if (!_0x5b64a1) continue;
      _0x7b0b5c = _0x5b64a1;
      if (_0x5b64a1["recv"]["length"] || _0x5b64a1["send"]["length"]) return (_0x3315f0 = _0x188daa[_0x4e120e], _0x5b64a1);
    }
    return _0x7b0b5c;
  }
  const _0x488b3c = {
    'recv': ["InternetGatewayDevice.X_FH_MobileNetwork.SMS_Recv.SMS_RecvMsg.", "X_FH_MobileNetwork.SMS_Recv.SMS_RecvMsg."],
    'send': ["InternetGatewayDevice.X_FH_MobileNetwork.SMS_Send.SMS_SendMsg.", 'X_FH_MobileNetwork.SMS_Send.SMS_SendMsg.']
  };
  function _0x1312ef(_0x1660b9) {
    if (!_0x1660b9 || _0x1660b9["_error"]) return false;
    if (_0x1660b9["success"] === "false" || _0x1660b9["success"] === false) return false;
    let _0x48f7ae = _0x1660b9["result"];
    if (_0x48f7ae !== undefined && _0x48f7ae !== null && typeof _0x48f7ae === "object") _0x48f7ae = undefined;
    if (_0x48f7ae === undefined || _0x48f7ae === null) _0x48f7ae = _0x1660b9["Result"];
    if (_0x48f7ae !== undefined && _0x48f7ae !== null && typeof _0x48f7ae === "object") _0x48f7ae = undefined;
    if (_0x48f7ae === undefined || _0x48f7ae === null) return true;
    const _0xb72d68 = String(_0x48f7ae)["trim"]();
    return _0xb72d68 === '' || _0xb72d68 === '0';
  }
  function _0x1164b6(_0x23f040) {
    const _0x14dd72 = _0x23f040 && typeof _0x23f040 === "object" ? _0x23f040["Index"] != null ? _0x23f040['Index'] : _0x23f040["index"] != null ? _0x23f040['index'] : '' : _0x23f040, _0x464417 = String(_0x14dd72 == null ? '' : _0x14dd72)["trim"](), _0x47cbe5 = (/^([rs])(\d+)$/)['exec'](_0x464417);
    if (!_0x47cbe5) return null;
    return {
      'dir': _0x47cbe5[0x1],
      'cn': parseInt(_0x47cbe5[0x2], 0xa),
      'key': _0x464417
    };
  }
  async function _0x46eb6b(_0x338b8d) {
    const _0x14a512 = await _0xfb4388(_0x338b8d);
    if (!_0x14a512) return null;
    const _0x5cd049 = {};
    return (_0x14a512["recv"]["forEach"](function (_0x450e19) {
      _0x5cd049[String(_0x450e19['Index'])] = 0x1;
    }), _0x14a512["send"]["forEach"](function (_0x20f2bb) {
      _0x5cd049[String(_0x20f2bb["Index"])] = 0x1;
    }), _0x5cd049);
  }
  async function _0x5cf13e(_0x19435e, _0x273428) {
    const _0x575812 = await _0xfb4388(_0x19435e);
    if (!_0x575812) return _0x273428["slice"]();
    const _0x3d08bc = {};
    return (_0x575812['recv']["forEach"](function (_0x40db02) {
      _0x3d08bc[String(_0x40db02["Index"])] = String(_0x40db02["Isopened"]);
    }), _0x273428["filter"](function (_0x5b7cb4) {
      const _0x111b25 = _0x3d08bc[_0x5b7cb4['key']];
      if (_0x111b25 === undefined) return false;
      return _0x111b25 === '0';
    }));
  }
  async function _0x112257(_0x314645, _0x8eceb7) {
    const _0x164828 = [];
    (_0x8eceb7 || [])['forEach'](function (_0x329c55) {
      const _0x236b6b = _0x1164b6(_0x329c55);
      if (_0x236b6b && _0x236b6b["dir"] === 'r' && !_0x164828["some"](function (_0x3369cb) {
        return _0x3369cb["key"] === _0x236b6b['key'];
      })) _0x164828['push'](_0x236b6b);
    });
    const _0x50a66c = {
      'total': _0x164828["length"],
      'ok': 0x0,
      'fail': 0x0,
      'wrote': 0x0
    };
    if (!_0x164828["length"]) return _0x50a66c;
    const _0x28e48c = {};
    for (const _0x1cd844 of _0x164828) {
      for (const _0x3cea8e of _0x488b3c["recv"]) {
        try {
          const _0x1310f3 = await _0x3d8483(_0x314645, 'set_value_by_xmlnode', {
            'url': {
              'v': _0x3cea8e + _0x1cd844['cn'] + ".isOpened"
            },
            'value': {
              'v': '1'
            }
          });
          if (_0x1312ef(_0x1310f3)) {
            (_0x28e48c[_0x1cd844["key"]] = _0x3cea8e, _0x50a66c["wrote"]++);
            break;
          }
        } catch (_0x1f21f9) {}
      }
    }
    let _0x113805 = await _0x5cf13e(_0x314645, _0x164828);
    if (_0x113805["length"]) {
      await _0x1bc2d5(0xb4);
      for (const _0x31ba88 of _0x113805) {
        for (const _0x26a339 of _0x488b3c["recv"]) {
          if (_0x28e48c[_0x31ba88["key"]] === _0x26a339) continue;
          try {
            const _0x108517 = await _0x3d8483(_0x314645, "set_value_by_xmlnode", {
              'url': {
                'v': _0x26a339 + _0x31ba88['cn'] + '.isOpened'
              },
              'value': {
                'v': '1'
              }
            });
            if (_0x1312ef(_0x108517)) break;
          } catch (_0x5bff05) {}
        }
      }
      (await _0x1bc2d5(0x1a4), _0x113805 = await _0x5cf13e(_0x314645, _0x164828));
    }
    return (_0x50a66c['ok'] = _0x164828['length'] - _0x113805["length"], _0x50a66c["fail"] = _0x113805["length"], _0x50a66c);
  }
  async function _0x5f4733(_0x3187ac, _0x2b8264, _0x2c5531) {
    const _0xc2d24b = [];
    (_0x2b8264 || [])["concat"](_0x2c5531 || [])['forEach'](function (_0x245a51) {
      const _0x191d98 = _0x1164b6(_0x245a51);
      if (_0x191d98 && !_0xc2d24b["some"](function (_0x537474) {
        return _0x537474['key'] === _0x191d98['key'];
      })) _0xc2d24b["push"](_0x191d98);
    });
    const _0x8b4167 = {
      'total': _0xc2d24b['length'],
      'ok': 0x0,
      'fail': 0x0,
      'gone': 0x0,
      'wrote': 0x0
    };
    if (!_0xc2d24b["length"]) return _0x8b4167;
    const _0x1ad435 = await _0x46eb6b(_0x3187ac), _0x44aa83 = _0x1ad435 ? _0xc2d24b["filter"](function (_0xd38297) {
      return _0x1ad435[_0xd38297["key"]];
    }) : _0xc2d24b["slice"]();
    _0x8b4167["gone"] = _0xc2d24b["length"] - _0x44aa83["length"];
    const _0x54be40 = {};
    for (const _0x472506 of _0x44aa83) {
      const _0x14e701 = _0x472506["dir"] === 's' ? _0x488b3c["send"] : _0x488b3c['recv'];
      for (const _0xf07abf of _0x14e701) {
        try {
          const _0x2f5764 = await _0x3d8483(_0x3187ac, "del_xmlnode", {
            'url': _0xf07abf,
            'index': _0x472506['cn']
          });
          if (_0x1312ef(_0x2f5764)) {
            (_0x54be40[_0x472506["key"]] = _0xf07abf, _0x8b4167["wrote"]++);
            break;
          }
        } catch (_0x58f869) {}
      }
      await _0x1bc2d5(0x12c);
    }
    let _0x483654 = await _0x46eb6b(_0x3187ac);
    if (!_0x483654) return (_0x8b4167['ok'] = 0x0, _0x8b4167["fail"] = 0x0, _0x8b4167["unverified"] = _0xc2d24b["length"], _0x8b4167);
    let _0x469dca = _0x44aa83["filter"](function (_0x3601f6) {
      return _0x483654[_0x3601f6["key"]];
    });
    if (_0x469dca["length"]) {
      await _0x1bc2d5(0x1f4);
      for (const _0x43e6b2 of _0x469dca) {
        const _0x47ee5f = _0x43e6b2["dir"] === 's' ? _0x488b3c['send'] : _0x488b3c["recv"];
        for (const _0x45a6e2 of _0x47ee5f) {
          if (_0x54be40[_0x43e6b2["key"]] === _0x45a6e2) continue;
          try {
            const _0x128674 = await _0x3d8483(_0x3187ac, "del_xmlnode", {
              'url': _0x45a6e2,
              'index': _0x43e6b2['cn']
            });
            if (_0x1312ef(_0x128674)) break;
          } catch (_0x61a8dd) {}
        }
        await _0x1bc2d5(0x12c);
      }
      (await _0x1bc2d5(0x1f4), _0x483654 = await _0x46eb6b(_0x3187ac));
      if (!_0x483654) return (_0x8b4167['ok'] = 0x0, _0x8b4167['fail'] = 0x0, _0x8b4167["unverified"] = _0xc2d24b["length"], _0x8b4167);
      _0x469dca = _0x44aa83["filter"](function (_0x1679b3) {
        return _0x483654[_0x1679b3['key']];
      });
    }
    return (_0x8b4167['ok'] = _0xc2d24b['length'] - _0x469dca["length"], _0x8b4167["fail"] = _0x469dca["length"], _0x8b4167);
  }
  if (_0x1c6d31["action"] === "smsBadgeProbe") {
    if (_0x16e738["get"](_0x48240a["SMS_TAB"]) !== '1') return;
    if (_0x294a79) return;
    if (_0x4aa694 && _0x7b26fa(_0x4aa694) < _0x30eda1) return;
    if (!_0xfd4bec || _0x7b26fa(_0xfd4bec) > _0x37a277) {
      _0x578483('info', '短信', '角标(本地)→跳过·无新鲜会话');
      return;
    }
    (_0x294a79 = true, _0x4aa694 = Date["now"]());
    try {
      const _0x28ebed = await _0x1aadab();
      if (!_0x28ebed) return;
      const _0x37f966 = await _0xfb4388(_0x28ebed);
      if (!_0x37f966) {
        _0x578483('warn', '短信', "角标(本地)→拉取失败");
        return;
      }
      const _0x271345 = _0x37f966["recv"]["filter"](function (_0x422fe8) {
        return String(_0x422fe8["Isopened"]) === '0';
      })["length"];
      (await __CPE['evalJS']("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
        'type': "badge",
        'count': _0x271345
      }) + ');'), _0x578483("info", '短信', "角标(本地)→" + _0x271345 + '条未读'));
    } catch (_0x43feee) {
      _0x578483("warn", '短信', "角标(本地)→异常:" + String(_0x43feee && _0x43feee['message'] || _0x43feee)["slice"](0x0, 0x28));
    } finally {
      _0x294a79 = false;
    }
    return;
  }
  if (_0x1c6d31["action"] === "smsList") {
    const _0xcc9878 = Date["now"]();
    try {
      const _0x254542 = await _0x1aadab(), _0x258fe9 = _0x254542 && await _0xfb4388(_0x254542);
      if (!_0x258fe9) {
        (_0x578483("warn", '短信', "索引(本地)→无数据·" + (Date["now"]() - _0xcc9878) + 'ms'), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': "list",
          'error': "短信拉取失败"
        }) + ');'));
        return;
      }
      const _0x2c6aaf = _0x258fe9['recv']["length"] + _0x258fe9["send"]["length"], _0x5d4423 = _0x258fe9["meta"] || ({}), _0x41b3e8 = _0x2c6aaf === 0x0 && ((_0x5d4423["sessions"] || 0x0) > 0x0 || (_0x5d4423["topKeys"] || 0x0) > 0x0) ? 0x1 : 0x0;
      _0x578483("info", '短信', "索引(本地)→收" + _0x258fe9["recv"]["length"] + '发' + _0x258fe9['send']["length"] + (_0x41b3e8 ? "·结构异常(会话" + (_0x5d4423["sessions"] || 0x0) + ')' : '') + '·' + (Date["now"]() - _0xcc9878) + 'ms');
      const _0x59d4d5 = _0x258fe9["recv"]['map'](function (_0x31672d) {
        return {
          'Index': _0x31672d['Index'],
          'Isopened': String(_0x31672d['Isopened'] == null ? '0' : _0x31672d['Isopened'])
        };
      }), _0x309117 = _0x258fe9["send"]["map"](function (_0x2ea52e) {
        return {
          'Index': _0x2ea52e["Index"]
        };
      });
      await __CPE["evalJS"]('window.smsUpdate\x20&&\x20window.smsUpdate(' + JSON["stringify"]({
        'type': "list",
        'recv_index_list': _0x59d4d5,
        'send_index_list': _0x309117,
        'suspicious': _0x41b3e8,
        'sessions': _0x5d4423["sessions"] || 0x0
      }) + ');');
    } catch (_0x3515cf) {
      _0x578483("error", '短信', "索引(本地)→异常:" + String(_0x3515cf && _0x3515cf["message"] || _0x3515cf)["slice"](0x0, 0x3c) + '·' + (Date["now"]() - _0xcc9878) + 'ms');
      try {
        await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': 'list',
          'error': "短信拉取失败"
        }) + ');');
      } catch (_0x2944a8) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "smsGet") {
    const _0xe43db4 = Date["now"](), _0x114e6e = (_0x1c6d31["recv"] || [])['length'] + (_0x1c6d31["send"] || [])['length'];
    try {
      const _0x553375 = await _0x1aadab(), _0x4f76e6 = _0x553375 && await _0xfb4388(_0x553375);
      if (!_0x4f76e6) {
        (_0x578483("warn", '短信', "详情(本地)→无数据·要" + _0x114e6e + '条·' + (Date["now"]() - _0xe43db4) + 'ms'), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON['stringify']({
          'type': "get",
          'error': "短信拉取失败"
        }) + ');'));
        return;
      }
      const _0x17981c = function (_0x39c8f5) {
        return (_0x39c8f5 || [])["map"](function (_0x20ae11) {
          const _0x26ad1a = _0x1164b6(_0x20ae11);
          return _0x26ad1a ? _0x26ad1a['key'] : null;
        })["filter"](function (_0x49da7e) {
          return !!_0x49da7e;
        });
      }, _0x5b0463 = _0x17981c(_0x1c6d31["recv"]), _0x5548ba = _0x17981c(_0x1c6d31["send"]);
      if (!_0x5b0463["length"] && !_0x5548ba["length"] && _0x114e6e > 0x0) {
        let _0x542917 = '';
        try {
          _0x542917 = String(JSON['stringify']((_0x1c6d31["recv"] || [])[0x0] || (_0x1c6d31['send'] || [])[0x0] || null))["slice"](0x0, 0x3c);
        } catch (_0x570f9b) {}
        _0x578483('warn', '短信', "详情(本地)→编号解析失败·要" + _0x114e6e + "条·样本" + _0x542917 + '·' + (Date["now"]() - _0xe43db4) + 'ms');
      }
      const _0x8ea10f = _0x4f76e6["recv"]['filter'](_0x25df40 => _0x5b0463["indexOf"](String(_0x25df40["Index"])) !== -0x1), _0xd4c4d1 = _0x4f76e6["send"]["filter"](_0x40ac53 => _0x5548ba["indexOf"](String(_0x40ac53["Index"])) !== -0x1);
      (_0x578483("info", '短信', "详情(本地)→收" + _0x8ea10f["length"] + '发' + _0xd4c4d1["length"] + '/要' + _0x114e6e + '·' + (Date['now']() - _0xe43db4) + 'ms'), await __CPE["evalJS"]('window.smsUpdate\x20&&\x20window.smsUpdate(' + JSON["stringify"]({
        'type': "get",
        'recv_msg_list': _0x8ea10f,
        'send_msg_list': _0xd4c4d1
      }) + ');'));
    } catch (_0x17f4ab) {
      _0x578483('error', '短信', '详情(本地)→异常:' + String(_0x17f4ab && _0x17f4ab['message'] || _0x17f4ab)["slice"](0x0, 0x3c) + '·' + (Date["now"]() - _0xe43db4) + 'ms');
      try {
        await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': "get",
          'error': "短信拉取失败"
        }) + ');');
      } catch (_0x2fae38) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "smsSend") {
    const _0x2d40c2 = Date['now']();
    const _0x3cb6e8 = String(_0x1c6d31['receiver'] || '')["trim"](), _0x536823 = String(_0x1c6d31["msg"] || '')['trim']();
    if (!_0x3cb6e8 || !_0x536823) return;
    try {
      const _0x5c7d00 = await _0x1aadab();
      if (!_0x5c7d00) {
        (_0x578483("warn", '短信', "发送(本地)→未登录·" + (Date['now']() - _0x2d40c2) + 'ms'), await __CPE['evalJS']('window.smsUpdate\x20&&\x20window.smsUpdate(' + JSON["stringify"]({
          'type': "send",
          'ok': false
        }) + ');'));
        return;
      }
      let _0xb67c8e = "GSM_8BIT";
      for (let _0xecd56b = 0x0; _0xecd56b < _0x536823['length']; _0xecd56b++) {
        if (_0x536823['charCodeAt'](_0xecd56b) >= 0x3e8) {
          _0xb67c8e = 'GSM_UCS2';
          break;
        }
      }
      const _0x7af281 = await _0x3d8483(_0x5c7d00, "send_msg", {
        'recv_number': _0x3cb6e8,
        'encode_schema': _0xb67c8e,
        'content': _0x536823
      }), _0x172626 = _0x1312ef(_0x7af281);
      let _0x4593c3 = '', _0x47465e = _0x3cf905(), _0x617f6 = 0x0;
      if (_0x172626) for (const _0x1b3792 of [0x0, 0x190, 0x384]) {
        if (_0x1b3792) await _0x1bc2d5(_0x1b3792);
        const _0x199ad5 = await _0xfb4388(_0x5c7d00);
        if (!_0x199ad5) continue;
        const _0x475a8b = _0x199ad5["send"]["filter"](function (_0x49f321) {
          return String(_0x49f321['Msg']) === _0x536823 && String(_0x49f321["Receiver"])["indexOf"](_0x3cb6e8) >= 0x0;
        })['sort'](function (_0x28c53e, _0x7ddbea) {
          return (parseInt(String(_0x7ddbea["Index"])["slice"](0x1), 0xa) || 0x0) - (parseInt(String(_0x28c53e["Index"])["slice"](0x1), 0xa) || 0x0);
        })[0x0];
        if (_0x475a8b) {
          (_0x4593c3 = _0x475a8b["Index"], _0x47465e = _0x475a8b['Sendtime'] || _0x47465e, _0x617f6 = 0x1);
          break;
        }
      }
      (_0x578483(_0x172626 ? "info" : "warn", '短信', "发送(本地)→" + (_0x172626 ? _0x617f6 ? '成功·已落库' : "成功·待同步" : '失败') + '·' + _0xb67c8e + '·' + (Date['now']() - _0x2d40c2) + 'ms'), await __CPE['evalJS']("window.smsUpdate && window.smsUpdate(" + JSON['stringify']({
        'type': "send",
        'ok': _0x172626,
        'index': _0x4593c3,
        'sendtime': _0x47465e
      }) + ');'));
    } catch (_0x1b315b) {
      _0x578483("error", '短信', "发送(本地)→异常:" + String(_0x1b315b && _0x1b315b["message"] || _0x1b315b)["slice"](0x0, 0x3c) + '·' + (Date["now"]() - _0x2d40c2) + 'ms');
      try {
        await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': 'send',
          'ok': false
        }) + ');');
      } catch (_0x218fed) {}
    }
    return;
  }
  if (_0x1c6d31['action'] === "smsRead") {
    const _0x5aca8f = Date['now']();
    try {
      const _0x126275 = await _0x1aadab();
      if (!_0x126275) {
        (_0x578483('warn', '短信', "已读(本地)→未登录·" + (Date["now"]() - _0x5aca8f) + 'ms'), await __CPE["evalJS"]('window.smsUpdate\x20&&\x20window.smsUpdate(' + JSON['stringify']({
          'type': "read",
          'ok': false
        }) + ');'));
        return;
      }
      const _0x2ce349 = await _0x112257(_0x126275, _0x1c6d31['recv'] || []), _0x47297a = _0x2ce349['fail'] === 0x0;
      (_0x578483(_0x47297a ? 'info' : 'warn', '短信', "已读(本地)→" + _0x2ce349['ok'] + '/' + _0x2ce349["total"] + (_0x2ce349["fail"] ? "·未生效" + _0x2ce349["fail"] : '') + '·' + (Date['now']() - _0x5aca8f) + 'ms'), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON['stringify']({
        'type': "read",
        'ok': _0x47297a
      }) + ');'));
    } catch (_0xfade9d) {
      _0x578483("error", '短信', "已读(本地)→异常:" + String(_0xfade9d && _0xfade9d["message"] || _0xfade9d)["slice"](0x0, 0x3c) + '·' + (Date["now"]() - _0x5aca8f) + 'ms');
      try {
        await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON['stringify']({
          'type': 'read',
          'ok': false
        }) + ');');
      } catch (_0x38d2ba) {}
    }
    return;
  }
  if (_0x1c6d31["action"] === "smsDelete") {
    const _0x42ce59 = Date["now"](), _0x4160bf = (_0x1c6d31["recv"] || [])['length'] + (_0x1c6d31["send"] || [])["length"];
    try {
      const _0x73d260 = await _0x1aadab();
      if (!_0x73d260) {
        (_0x578483('warn', '短信', "删除(本地)→未登录·" + (Date["now"]() - _0x42ce59) + 'ms'), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': "del",
          'ok': false
        }) + ');'));
        return;
      }
      const _0x26255f = await _0x5f4733(_0x73d260, _0x1c6d31['recv'] || [], _0x1c6d31["send"] || []), _0x35e3f0 = _0x26255f["fail"] === 0x0 && !_0x26255f["unverified"];
      (_0x578483(_0x35e3f0 ? "info" : "warn", '短信', "删除(本地)→" + _0x26255f['ok'] + '/' + _0x26255f["total"] + (_0x26255f['gone'] ? "·已不在" + _0x26255f["gone"] : '') + (_0x26255f["fail"] ? "·残留" + _0x26255f["fail"] : '') + (_0x26255f["unverified"] ? "·无法确认" + _0x26255f["unverified"] : '') + '·' + (Date["now"]() - _0x42ce59) + 'ms'), await __CPE["evalJS"]("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
        'type': "del",
        'ok': _0x35e3f0
      }) + ');'));
    } catch (_0x152184) {
      _0x578483('error', '短信', "删除(本地)→异常:" + String(_0x152184 && _0x152184["message"] || _0x152184)['slice'](0x0, 0x3c) + '·' + (Date['now']() - _0x42ce59) + 'ms');
      try {
        await __CPE['evalJS']("window.smsUpdate && window.smsUpdate(" + JSON["stringify"]({
          'type': "del",
          'ok': false
        }) + ');');
      } catch (_0x3d5639) {}
    }
    return;
  }
}

      // Header label: shared rule (network_mode.js). NSA is matched before SA,
      // only NR carriers count toward 5GA, and an unreported mode stays "--".
      const NetworkMode=typeof module!=='undefined'?require('./network_mode.js'):root.NetworkMode;
      const nrCarriers=carriers=>(Array.isArray(carriers)?carriers:[]).map(c=>({rat:/^n/i.test(String(c&&c.band||''))?'nr':'lte',dlMHz:String(c&&c.bandwidth||'').replace(/^DL\s*/i,'')}));
      _0x599085=function(value){return NetworkMode.label(value,[]);};
      _0x64e5ff=function(value,carriers){return NetworkMode.label(value,Array.isArray(carriers)?nrCarriers(carriers):[]);};

      // Upstream's session helper only honored web profiles and silently fell
      // back to /api for a detected tool profile. Keep the selected route all
      // the way through authentication.
      const upstreamToolSession=_0x30127f;
      _0x30127f=async function(host,timeout){
        const selected=(await _0x1a0c06(host)).profile;
        if(!selected||selected.mode!=='tool'||!selected.sid)return upstreamToolSession(host,timeout);
        for(let attempt=0;attempt<3;attempt++){
          const response=await _0x403514(host,selected.sid,{timeoutMs:timeout||3000});
          if(response&&response.sessionid)return response.sessionid;
          if(attempt<2)await _0x1bc2d5(attempt===0?600:1200);
        }
        return null;
      };
      // Guard the actual authentication entry points, including the tool path
      // that bypasses ensure(). Healthy session checks remain available.
      for(const [get,set] of [
        [()=>_0x20819e,fn=>{_0x20819e=fn;}],
        [()=>_0x5ca67b,fn=>{_0x5ca67b=fn;}],
        [()=>_0x4fafb7,fn=>{_0x4fafb7=fn;}]
      ]){const original=get();set(function(...args){return !connecting&&!reconnectAllowed?Promise.resolve('expired'):original(...args);});}
      // Drain upstream MAC prefetch before releasing the Android transaction
      // queue; a fresh session GET must not overtake a pending encrypted POST.
      const pendingOperations=new Set(),upstreamRequest=_0x3d8483;
      _0x3d8483=function(...args){
        const job=upstreamRequest(...args);pendingOperations.add(job);
        job.then(()=>pendingOperations.delete(job),()=>pendingOperations.delete(job));return job;
      };
      async function drain(){while(pendingOperations.size)await Promise.allSettled([...pendingOperations]);}
      function error(reason){
        const messages={nopass:'请输入设备管理密码',unreachable:'无法连接 CPE',occupied:'已有其他用户登录',locked:'账号被锁定',disabled:'设备账号已禁用',login:'用户名或密码错误',limited:'登录次数受限，请稍后重试',expired:'本地登录已失效',session:'登录后会话验证失败',empty:'设备响应不完整',nolib:'设备登录响应格式不匹配',fail:'本地登录失败'};
        const code=['locked','disabled','login','limited'].includes(reason)?'AUTH_REJECTED':reason==='occupied'?'AUTH_BUSY':'SESSION_EXPIRED';
        const details=reason==='session'||reason==='expired'?'（'+(diagnostic.line||'本地线路')+'，心跳 '+(diagnostic.heartbeat||'无响应')+'）':reason==='unreachable'?'（阶段：'+diagnostic.stage+'，HTTP '+diagnostic.status+'，'+diagnostic.path+'）':'';
        return Object.assign(Error((messages[reason]||'本地连接失败：'+String(reason||'未知'))+details),{code,reason,diagnostic:Object.assign({},diagnostic)});
      }
      return {
        async connect(user,password) {
          account=Object.assign({},account,{host:base,user,pass:password});
          _0x2fa85b=String(user||'').trim().toLowerCase();connecting=true;
          try {
            if(!String(password||''))throw error('nopass');
            diagnostic={stage:'线路探测',status:0,heartbeat:'',line:''};
            const selected=(await _0x1a0c06(base)).profile;
            diagnostic.line=selected.label;diagnostic.stage='账号登录';
            // _0x58da7d is a base-info/test entry, NOT an unconditional login:
            // anonymous tool data can short-circuit it, or missing /api sid can
            // fail it before the valid encrypted /fh_api login is attempted.
            // Call upstream's actual auth entry for the detected route instead.
            _0x236325=false;_0x5531d8=0;_0x46803e=false;_0x50f71f=0;
            let authenticated;
            if(selected.mode==='tool'){
              let status=await _0x4fafb7(base,account);
              // Some tool-route firmwares omit remaincount on ordinary login
              // rejection. Upstream treated a missing value as zero and falsely
              // reported rate limiting. Only accept "limited" when the device
              // explicitly returns result 9 or an exhausted remaincount.
              if(status==='limited'){
                let reply={};try{reply=JSON.parse(String(_0x3fade3&&_0x3fade3.body||'{}'));}catch(_){ }
                const result=reply.login_result!==undefined?reply.login_result:reply.result;
                const explicitLimit=Number(result)===9||Object.prototype.hasOwnProperty.call(reply,'remaincount')&&Number(reply.remaincount)<=0;
                if(!explicitLimit)status=_0x248216(result)||'login';
              }
              authenticated=status==='ok';
              if(!authenticated)throw error(status||'fail');
            }else{
              authenticated=await _0x2ae0a1(base,account,true,{knownDead:true});
              if(!authenticated)throw error(_0x474b68||'fail');
            }
            diagnostic.stage='会话验证';
            if(selected.mode==='enc'||selected.mode==='legacy'){
              let valid=false;
              for(let attempt=0;attempt<3;attempt++){
                if(attempt)await _0x1bc2d5(attempt===1?250:750);
                if(await _0x200899(base)){valid=true;break;}
              }
              if(!valid)throw error('session');
            }
            let data={};
            if(selected.mode!=='tool'){
              diagnostic.stage='登录后回读';
              data=await _0x3d8483(base,'get_value_by_xmlnode',{modelName:'DeviceInfo.ModelName'});
              if(!data||!String(data.modelName||data.ModelName||'').trim())throw error('empty');
            }
            await drain();diagnostic.stage='已连接';return {result:0,data,line:Object.assign({},selected)};
          }finally{connecting=false;}
        },
        async request(schema,endpoint) {
          const kind=endpoint&&/FHNCAPIS/.test(endpoint)?'dataNull':undefined;
          const result=await _0x3d8483(base,schema.ajaxmethod,schema.dataObj,!!schema.multipost,undefined,undefined,kind);
          if(result==null)throw error(_0x474b68||_0x3abdfd||'session');
          await drain();
          return result;
        },
        async probe() {
          const selected=(await _0x1a0c06(base)).profile;
          if(selected.mode==='enc'||selected.mode==='legacy'){
            if(!await _0x200899(base))throw error('expired');
          }else{
            const sid=await _0x30127f(base);
            if(!sid)throw error('unreachable');
            const result=await _0x403514(base,_0x53fe55(base)+'?ajaxmethod=app_get_base_info&sessionid=',{timeoutMs:4000});
            if(!result||!(result.NR_Band||result.BAND||result.RSSI||result.modelName))throw error('expired');
          }
          return true;
        },
        async path(path) {
          const selected=(await _0x1a0c06(base)).profile;
          return path.replace('/fh_api/tmp/FHNCAPIS',selected.dataNull).replace('/fh_api/tmp/FHAPIS',selected.dataObj);
        },
        async line(){return Object.assign({},(await _0x1a0c06(base)).profile);},
        async sample(){
          const result=await _0x35200b();
          if(!result||!result.rawData)throw error(result&&result.error||'empty');
      const data=_0x10dc89(result.rawData,result.remoteCa,result._topoFail?null:result.topoData);
      if((!data.deviceName||data.deviceName==='--')&&result.rawData.__sim&&result.rawData.__sim.pname)data.deviceName=String(result.rawData.__sim.pname);
          try{
            const identity=await _0x3d8483(base,'get_value_by_xmlnode',{
              serialNumber:'DeviceInfo.SerialNumber',deviceName:'DeviceInfo.Description'
            });
            if(identity){
              data.deviceSN=String(identity.serialNumber||identity.SN||data.deviceSN||'--');
              const name=identity.deviceName;if(name)data.deviceName=String(name);
            }
          }catch(_){ }
          await drain();return data;
        },
        async speed(){const result=await _0x241e4f();await drain();return result;},
        async action(message){await _0x5a020f(message);await drain();},
        async initialize(){
          await _0x55b11f();
          await _0x5a020f({action:'getUiPrefs'});
          await _0x5a020f({action:'getHomeCards'});
        },
        async refreshControl(){await _0x2becd7(true);await drain();},
        setReconnect(value){reconnectAllowed=!!value;},
        // Expose upstream pure primitives for byte-for-byte capture regressions.
        codec:{deriveKey:_0x51b1ef,pack:_0x5d3648,unpack:_0x4e26c4,networkMode:_0x64e5ff},
        storageKeys:{wifi:_0x2d3a24},
        profiles:_0x2857a9.map(p=>Object.assign({},p))
      };
    }
  };
  if(typeof module!=='undefined')module.exports=root.UpstreamLocal;
})(globalThis);
