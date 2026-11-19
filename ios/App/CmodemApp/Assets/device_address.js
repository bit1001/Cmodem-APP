/* Device address parsing shared by the core runtime and the login page.
 * Accepts http:// or https://, an IPv4/IPv6 literal (LAN or public) or a DNS
 * name, an optional port and an optional LuCI admin path. Without a
 * scheme, http:// is assumed. Credentials, other paths, query strings and
 * fragments are rejected. Returns a canonical origin such as
 * http://192.168.1.1, http://[2409:8a00::1]:8080 or https://air6.example.com.
 * Literal rules here match HttpEngine; names are checked natively after DNS
 * resolution, because only the resolved addresses are meaningful. */
(function(root){
  'use strict';
  const HINT='请输入 IP 地址或域名，例如 192.168.8.1、2409:8a00::1 或 https://air6.example.com';
  const fail=message=>{throw Error(message);};
  function checkV4(parts){
    if(parts.length!==4||parts.some(n=>!Number.isInteger(n)||n<0||n>255))fail(HINT);
    if(parts[0]===127)fail('不能使用本机回环地址');
    if(parts[0]===0)fail('地址无效');
    if(parts[0]===169&&parts[1]===254)fail('链路本地地址（169.254.x.x）无法使用');
    if(parts[0]>=224)fail('不能使用组播或广播地址');
  }
  function checkV6(inner){
    if(/^::ffff:/.test(inner))fail('请直接填写 IPv4 地址');
    if(inner==='::1')fail('不能使用本机回环地址');
    if(inner==='::')fail('地址无效');
    const first=inner.startsWith('::')?0:parseInt(inner.split(':')[0],16);
    if((first&0xffc0)===0xfe80)fail('IPv6 链路本地地址（fe80::）无法使用，请改用设备的全局 IPv6 地址');
    if((first&0xff00)===0xff00)fail('不能使用组播地址');
  }
  // RFC 1123 labels; at least one dot; final label alphabetic (rules out bare numbers).
  function checkName(name){
    if(name.length>253)fail(HINT);
    const labels=name.split('.');
    if(labels.length<2||labels.some(l=>!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(l)))fail(HINT);
    if(!/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(labels[labels.length-1]))fail(HINT);
    if(name==='localhost'||/\.localhost$/.test(name))fail('不能使用本机地址');
  }
  function parse(value){
    let text=String(value||'').trim().replace(/\/+$/,'').replace(/\/cgi-bin\/luci(?:\/admin(?:\/[^?#]*)?)?$/i,'');
    let scheme='http',m;
    if((m=/^(https?):\/\//i.exec(text))){scheme=m[1].toLowerCase();text=text.slice(m[0].length);}
    else if(/^[a-z][a-z0-9+.-]*:\/\//i.test(text))fail('只支持 http:// 或 https://');
    let host,port,kind;
    if((m=/^\[([0-9a-fA-F:.]+)\](?::(\d{1,5}))?$/.exec(text))){host=m[1];port=m[2];kind='v6';}
    else if(/^[0-9a-fA-F:.]+$/.test(text)&&text.split(':').length>2){host=text;kind='v6';}
    else if((m=/^(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?$/.exec(text))){host=m[1];port=m[2];kind='v4';}
    else if((m=/^([A-Za-z0-9.-]+)(?::(\d{1,5}))?$/.exec(text))&&/[A-Za-z]/.test(m[1])){host=m[1].toLowerCase().replace(/\.$/,'');port=m[2];kind='name';}
    else{
      // URL performs standards-compliant IDN -> punycode conversion. Keep
      // this as a narrow fallback; credentials, arbitrary paths and query
      // data remain forbidden.
      try{const parsed=new URL(scheme+'://'+text+'/');if(parsed.username||parsed.password||parsed.pathname!=='/'||parsed.search||parsed.hash)fail(HINT);host=parsed.hostname.toLowerCase().replace(/\.$/,'');port=parsed.port||undefined;if(!/[a-z]/.test(host))fail(HINT);kind='name';}catch(_){fail(HINT);}
    }
    if(port!==undefined&&(Number(port)<1||Number(port)>65535))fail('端口号无效');
    let canonical;
    if(kind==='v6'){
      try{canonical=new URL('http://['+host+']/').hostname;}catch(_){fail(HINT);}
      checkV6(canonical.slice(1,-1));
    }else if(kind==='v4'){
      const parts=host.split('.').map(Number);checkV4(parts);canonical=parts.join('.');
    }else{checkName(host);canonical=host;}
    const defaultPort=scheme==='https'?443:80;
    return scheme+'://'+canonical+(port!==undefined&&Number(port)!==defaultPort?':'+Number(port):'');
  }
  root.DeviceAddress={parse,HINT};
  if(typeof module!=='undefined')module.exports=root.DeviceAddress;
})(globalThis);
