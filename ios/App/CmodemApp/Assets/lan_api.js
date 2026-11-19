/* LAN facade: upstream FiberHome routes plus the independent Air6 route. */
(function(root){
  'use strict';
  const upstream=typeof module!=='undefined'?require('./upstream_local.js'):root.UpstreamLocal;
  const DeviceAddress=typeof module!=='undefined'?require('./device_address.js'):root.DeviceAddress;
  const air6=typeof module!=='undefined'?require('./air6_api.js'):root.Air6Local;
  const IV='opqrstuvwxyz{|}~';
  // IPv4 or IPv6, LAN or public; see device_address.js.
  const address=value=>DeviceAddress.parse(value);
  const problem=(text,code)=>Object.assign(Error(text),{code});
  function store(){const entries=new Map();return {get:key=>entries.get(key)||'',set:(key,value)=>entries.set(key,value),remove:key=>entries.delete(key)};}
  class LanApi{
    constructor(options){
      this.base=address(options.host);this.fetch=options.fetch;this.queue=Promise.resolve();this.line=null;
      this.options=options;
      this.engine=upstream.create(Object.assign({},options,{account:{host:this.base,name:options.name||'',fhLine:options.fhLine||''},address,fetch:options.fetch,storage:options.storage||store(),evalJS:options.evalJS,timer:options.timer}));
      this.platform=this.engine;
    }
    serial(work){const task=this.queue.then(work);this.queue=task.catch(()=>{});return task;}
    async http(path,options){
      path=await this.engine.path(path);
      const response=await this.fetch(this.base+path,Object.assign({},options,{headers:Object.assign({'Accept':'application/json, text/plain, */*','X-Requested-With':'XMLHttpRequest','Referer':this.base+'/main.html'},options&&options.headers)}));
      if(response.status===401||response.status===403)throw problem('登录已失效，请重新登录','SESSION_EXPIRED');
      if(!response.ok)throw problem(response.status?'设备 HTTP '+response.status:'无法连接 CPE，请检查网络或设备地址','NETWORK');
      return (await response.text()).trim();
    }
    login(user,password){return this.serial(async()=>{
      if(air6&&(this.options.fhLine==='air6'||await air6.detect({host:this.base,fetch:this.fetch})))this.engine=air6.create(Object.assign({},this.options,{host:this.base,platform:this.platform}));
      else this.engine=this.platform;
      const result=await this.engine.connect(user,password);this.line=result.line;return result;
    });}
    request(schema,endpoint){return this.serial(()=>this.engine.request(schema,endpoint));}
    post(method,data){return this.request({ajaxmethod:method,dataObj:data});}
    probe(){return this.serial(()=>this.engine.probe());}
    sample(options){return this.serial(()=>this.engine.sample(options));}
    speed(){
      if(this.line?.mode!=='air6')return this.serial(()=>this.engine.speed());
      if(this.speedFlight)return this.speedFlight;
      const engine=this.engine;this.speedFlight=Promise.resolve().then(()=>engine.speed()).finally(()=>{this.speedFlight=null;});return this.speedFlight;
    }
    action(message){return this.serial(()=>this.engine.action(message));}
    initialize(){return this.serial(()=>this.engine.initialize());}
    setReconnect(value){this.engine.setReconnect(value);}
  }
  // Capture tools use the upstream derivation itself, not a second implementation.
  function deriveKey(token,seed){
    if(typeof token!=='string'||token.length!==32||typeof seed!=='string'||seed.length!==5)throw Error('设备会话/握手格式不匹配');
    return upstream.create({account:{host:'http://192.168.8.1'},address,storage:store(),fetch:()=>{throw Error('Pure codec must not use network');}}).codec.deriveKey(token,seed);
  }
  root.LanProtocol={LanApi,deriveKey,address,IV};
  if(typeof module!=='undefined')module.exports=root.LanProtocol;
})(globalThis);
