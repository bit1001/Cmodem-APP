/* Conversation cards for the imported upstream SMS page. Device storage,
 * incremental loading, caching and writes remain owned by the upstream page. */
(function(){
  'use strict';
  const VIEW_KEY='lanSmsView',PAGE=20;
  const views=[['all','全部'],['recv','收件'],['send','发件']];
  let view='all',limit=PAGE,selected=new Set(),openGroupKey='',search='';
  try{const saved=localStorage.getItem(VIEW_KEY);if(views.some(([key])=>key===saved))view=saved;}catch(_){}
  const el=id=>document.getElementById(id);
  const active=()=>document.body?.dataset?.lanDevice==='air6';
  const write=(action,payload)=>{if(!(window.__smsWrite&&window.__smsWrite(action,payload)))sendToScriptable(action,payload);};
  const baseParse=window.parseSmsTime;

  function tolerantTime(value){
    const original=String(value??'').trim();if(!original)return 0;
    const upstream=typeof baseParse==='function'?baseParse(original):0;if(upstream)return upstream;
    if(/^\d{10,13}$/.test(original)){const n=Number(original)*(original.length===10?1000:1);if(Number.isFinite(n)&&!Number.isNaN(new Date(n).getTime()))return n;}
    const match=original.match(/^(\d{2}|\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})[ T,](\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(?:Z|[+-]\d{2}(?::?\d{2})?))?$/i);
    if(!match)return 0;
    let year=Number(match[1]);if(year<100)year+=year>=70?1900:2000;
    const parts=[year,...match.slice(2,7).map(v=>Number(v||0))],date=new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
    return date.getFullYear()===parts[0]&&date.getMonth()===parts[1]-1&&date.getDate()===parts[2]&&date.getHours()===parts[3]&&date.getMinutes()===parts[4]&&date.getSeconds()===parts[5]?date.getTime():0;
  }

  function numberKey(value){
    const raw=String(value||'未知号码').trim(),compact=raw.replace(/[\s()\-]/g,''),digits=raw.replace(/\D/g,'');
    if(/^\+86\d{3,20}$/.test(compact))return compact.slice(3);
    if(/^86\d{11}$/.test(digits))return digits.slice(2);
    return digits||raw.toLowerCase();
  }
  const indexRank=value=>Math.max(0,...(String(value||'').match(/\d+/g)||[]).map(Number));
  const keyOf=message=>message.dir+'|'+message.index;
  function messages(){
    const acc=smsDetailsAcc||{recv:[],send:[]},out=[];
    for(const row of acc.recv||[])out.push({dir:'recv',index:String(row.Index),number:row.Sender||'未知号码',text:row.Msg||'',rawTime:String(row.Recvtime||''),time:tolerantTime(row.Recvtime),unread:String(row.Isopened)==='0',pending:false,raw:row});
    for(const row of acc.send||[])out.push({dir:'send',index:String(row.Index),number:row.Receiver||'未知号码',text:row.Msg||'',rawTime:String(row.Sendtime||''),time:tolerantTime(row.Sendtime),unread:false,pending:/^tmp-/.test(String(row.Index)),raw:row});
    return out.sort((a,b)=>b.time-a.time||indexRank(b.index)-indexRank(a.index)||(a.dir===b.dir?0:a.dir==='recv'?-1:1));
  }
  function visibleMessages(){const all=messages();return view==='recv'?all.filter(m=>m.dir==='recv'):view==='send'?all.filter(m=>m.dir==='send'):all;}
  function groups(){
    const grouped=new Map();
    for(const message of visibleMessages()){
      const key=numberKey(message.number);let group=grouped.get(key);
      if(!group){group={key,number:message.number,messages:[],unread:0,lastTs:message.time,lastRank:indexRank(message.index)};grouped.set(key,group);}
      group.messages.push(message);if(message.unread)group.unread++;
    }
    return [...grouped.values()].filter(group=>!search||group.number.toLowerCase().includes(search)||group.messages.some(message=>message.text.toLowerCase().includes(search))).sort((a,b)=>b.lastTs-a.lastTs||b.lastRank-a.lastRank);
  }
  function fullTime(message){
    if(!message.time)return message.rawTime||'时间未知';
    const date=new Date(message.time),pad=value=>String(value).padStart(2,'0');
    return date.getFullYear()+'/'+pad(date.getMonth()+1)+'/'+pad(date.getDate())+' '+pad(date.getHours())+':'+pad(date.getMinutes())+':'+pad(date.getSeconds());
  }

  function ensureTabs(){
    let bar=el('smsViewTabs');if(bar)return bar;
    const list=el('smsListContainer');if(!list||!list.parentNode)return null;
    bar=document.createElement('div');bar.id='smsViewTabs';bar.className='sms-view-tabs';bar.setAttribute('role','tablist');
    for(const [key,label] of views){const button=document.createElement('button');button.type='button';button.dataset.view=key;button.setAttribute('role','tab');button.textContent=label;button.onclick=()=>setView(key);bar.appendChild(button);}
    list.parentNode.insertBefore(bar,list);
    const input=document.createElement('input');input.id='smsLocalSearch';input.type='search';input.placeholder='搜索号码或短信内容';input.setAttribute('aria-label','搜索号码或短信内容');input.oninput=()=>{search=input.value.trim().toLowerCase();limit=PAGE;window.renderSmsList();};list.parentNode.insertBefore(input,list);return bar;
  }
  function syncTabs(){
    const bar=ensureTabs();if(!bar)return;
    bar.style.display=active()?'':'none';if(!active())return;
    const searchBox=el('smsLocalSearch');if(searchBox)searchBox.style.display='';
    const all=messages(),counts={all:all.length,recv:all.filter(m=>m.dir==='recv').length,send:all.filter(m=>m.dir==='send').length},unread=all.filter(m=>m.unread).length;
    for(const button of bar.children){const key=button.dataset.view,active=key===view;button.classList.toggle('active',active);button.setAttribute('aria-selected',active?'true':'false');button.textContent=(key==='recv'&&unread?views.find(v=>v[0]===key)[1]+' '+unread:views.find(v=>v[0]===key)[1]);button.title=button.textContent+'（'+counts[key]+' 条）';}
  }
  function setView(key){if(view===key)return;view=key;limit=PAGE;selected.clear();try{localStorage.setItem(VIEW_KEY,key);}catch(_){}const list=el('smsListContainer');if(list)list.scrollTop=0;window.renderSmsList();}

  const icons={
    copy:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    reply:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>',
    trash:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>'
  };
  function actionButton(name,label,handler){const button=document.createElement('button');button.type='button';button.className='sms-card-act';button.title=label;button.setAttribute('aria-label',label);button.innerHTML=icons[name];button.onclick=event=>{event.stopPropagation();handler();};return button;}
  function copyText(message){
    const done=()=>showUpdateToast('已复制','success');
    try{if(navigator.clipboard?.writeText){navigator.clipboard.writeText(message.text).then(done,fallback);return;}}catch(_){}
    fallback();
    function fallback(){const input=document.createElement('textarea');input.value=message.text;input.style.cssText='position:fixed;opacity:0';document.body.appendChild(input);input.select();try{document.execCommand('copy');done();}catch(_){showUpdateToast('复制失败','warning');}input.remove();}
  }
  function deleteOne(message){if(!window.confirm('删除这条短信？'))return;write('smsDelete',{recv:message.dir==='recv'?[{Index:message.index}]:[],send:message.dir==='send'?[{Index:message.index}]:[]});}
  function markRead(group){
    const unread=group.messages.filter(message=>message.unread);if(!unread.length)return;
    const ids=new Set(unread.map(message=>message.index));
    for(const message of unread){message.raw.Isopened='1';message.unread=false;}
    for(const conversation of smsConversations?.convs||[]){for(const row of conversation.recv||[])if(ids.has(String(row.Index)))row.Isopened='1';conversation.unread=(conversation.recv||[]).filter(row=>String(row.Isopened)==='0').length;}
    write('smsRead',{recv:unread.map(message=>({Index:message.index})),send:[]});updateSmsBadge();
  }

  function allGroup(key){
    const all=messages().filter(message=>numberKey(message.number)===key),latest=all[0];
    return latest?{key,number:latest.number,messages:all,unread:all.filter(message=>message.unread).length,lastTs:latest.time,lastRank:indexRank(latest.index)}:null;
  }
  function openConversation(group){
    const complete=allGroup(group.key)||group;openGroupKey=complete.key;
    smsChat={number:complete.number,recv:complete.messages.filter(message=>message.dir==='recv').map(message=>message.raw),send:complete.messages.filter(message=>message.dir==='send').map(message=>message.raw),unread:complete.unread};
    smsChatEdit=false;smsChatSelected={};el('smsChatTitle').textContent=complete.number||'未知号码';el('smsChat').style.display='flex';el('smsChatEditBtn').innerHTML=smsCheckSvg(false);el('smsChatActions').style.display='none';el('smsChatInputBar').style.display='flex';
    markRead(complete);window.renderSmsChat();
  }
  function buildCard(group){
    const card=document.createElement('div');
    card.className='sms-row sms-card sms-thread-card'+(group.unread?' unread':'')+(selected.has(group.key)?' picked':'');card.dataset.key=group.key;card.dataset.count=String(group.messages.length);
    const head=document.createElement('div');head.className='sms-card-head';
    if(smsListEdit){const check=document.createElement('span');check.className='sms-card-check';check.innerHTML=smsCircleCheck(selected.has(group.key));head.appendChild(check);}
    const number=document.createElement('span');number.className='sms-card-num';number.textContent=group.number;head.appendChild(number);
    const count=document.createElement('span');count.className='sms-thread-count';count.textContent=group.messages.length+' 条';head.appendChild(count);
    if(group.unread){const unread=document.createElement('span');unread.className='sms-card-dot';unread.title=group.unread+' 条未读';head.appendChild(unread);}
    const time=document.createElement('span');time.className='sms-card-time';time.textContent=fullTime(group.messages[0]);head.appendChild(time);
    const chevron=document.createElement('span');chevron.className='sms-thread-chevron';chevron.textContent='›';head.appendChild(chevron);card.appendChild(head);
    const latest=group.messages[0],preview=document.createElement('div');preview.className='sms-thread-preview';
    const direction=document.createElement('span');direction.className='sms-card-dir '+latest.dir;direction.textContent=latest.dir==='send'?'发':'收';preview.appendChild(direction);
    const text=document.createElement('span');text.className='sms-thread-preview-text';text.textContent=latest.text||'（空短信）';preview.appendChild(text);card.appendChild(preview);
    card.onclick=()=>{
      if(smsListEdit){selected.has(group.key)?selected.delete(group.key):selected.add(group.key);window.renderSmsList();return;}
      openConversation(group);
    };
    return card;
  }
  function chatMessages(){
    if(!smsChat)return [];
    const rows=[];
    for(const raw of smsChat.recv||[])rows.push({dir:'recv',index:String(raw.Index),number:smsChat.number,text:raw.Msg||'',rawTime:String(raw.Recvtime||''),time:tolerantTime(raw.Recvtime),pending:false,raw});
    for(const raw of smsChat.send||[])rows.push({dir:'send',index:String(raw.Index),number:smsChat.number,text:raw.Msg||'',rawTime:String(raw.Sendtime||''),time:tolerantTime(raw.Sendtime),pending:/^tmp-/.test(String(raw.Index)),raw});
    return rows.sort((a,b)=>a.time-b.time||indexRank(a.index)-indexRank(b.index)||(a.dir===b.dir?0:a.dir==='recv'?-1:1));
  }
  function buildChatBubble(message){
    const key=keyOf(message),selectedNow=!!smsChatSelected[key],row=document.createElement('div');row.className='sms-chat-row '+message.dir+(selectedNow?' picked':'');row.dataset.key=key;
    if(smsChatEdit){const check=document.createElement('span');check.className='sms-chat-check';check.innerHTML=smsCircleCheck(selectedNow);row.appendChild(check);}
    const stack=document.createElement('div');stack.className='sms-chat-stack';
    const meta=document.createElement('div');meta.className='sms-chat-meta';const direction=document.createElement('span');direction.className='sms-card-dir';direction.textContent=message.dir==='send'?'发':'收';meta.appendChild(direction);const time=document.createElement('span');time.textContent=message.pending?'发送中…':fullTime(message);meta.appendChild(time);stack.appendChild(meta);
    const bubble=document.createElement('div');bubble.className='sms-chat-bubble';bubble.textContent=message.text||'（空短信）';stack.appendChild(bubble);
    if(!smsChatEdit){const actions=document.createElement('div');actions.className='sms-chat-message-actions';actions.appendChild(actionButton('copy','复制',()=>copyText(message)));if(!message.pending)actions.appendChild(actionButton('trash','删除',()=>deleteOne(message)));stack.appendChild(actions);}
    row.appendChild(stack);
    if(smsChatEdit)row.onclick=()=>{smsChatSelected[key]=!smsChatSelected[key];window.renderSmsChat();};
    return row;
  }
  const upstreamChatRender=window.renderSmsChat;
  window.renderSmsChat=function(){
    if(!active())return upstreamChatRender.apply(this,arguments);
    const body=el('smsChatBody');if(!body||!smsChat)return;const atBottom=body.scrollHeight-body.clientHeight-body.scrollTop<48,oldTop=body.scrollTop;body.textContent='';let day='';const rows=chatMessages();
    for(const message of rows){const label=smsDayLabel(message.time);if(label&&label!==day){day=label;const separator=document.createElement('div');separator.className='sms-chat-day';separator.textContent=label;body.appendChild(separator);}body.appendChild(buildChatBubble(message));}
    if(!rows.length){const empty=document.createElement('div');empty.className='sms-chat-empty';empty.textContent='暂无消息';body.appendChild(empty);}
    if(atBottom||oldTop===0)body.scrollTop=body.scrollHeight;else body.scrollTop=oldTop;
  };
  const upstreamCloseChat=window.closeSmsChat;
  window.closeSmsChat=function(){openGroupKey='';return upstreamCloseChat.apply(this,arguments);};
  const upstreamBuildConversations=window.smsBuildConversations;
  window.smsBuildConversations=function(){
    const body=el('smsChatBody'),oldTop=body?.scrollTop||0,atBottom=!body||body.scrollHeight-body.clientHeight-oldTop<48,result=upstreamBuildConversations.apply(this,arguments);
    if(openGroupKey&&el('smsChat')?.style.display!=='none'){
      const group=allGroup(openGroupKey);if(group){smsChat={number:group.number,recv:group.messages.filter(message=>message.dir==='recv').map(message=>message.raw),send:group.messages.filter(message=>message.dir==='send').map(message=>message.raw),unread:group.unread};window.renderSmsChat();if(body&&!atBottom)body.scrollTop=oldTop;}else window.closeSmsChat();
    }
    return result;
  };
  function moreHint(list,total){
    list.querySelectorAll('.sms-list-more').forEach(node=>node.remove());
    const text=smsLoadingMore?'加载更多短信…':total>limit?'上滑加载更多会话':'';if(!text)return;
    const hint=document.createElement('div');hint.className='sms-list-more';hint.style.cssText='text-align:center;padding:14px 20px;color:var(--ios-text-tertiary);font-size:12px;';hint.textContent=text;list.appendChild(hint);
  }

  const upstreamRender=window.renderSmsList,upstreamMore=window.smsAppendMore,upstreamBatch=window.smsBatchOp,upstreamEdit=window.toggleSmsListEdit;
  window.renderSmsList=function(){
    if(!active()){const bar=el('smsViewTabs');if(bar)bar.style.display='none';const searchBox=el('smsLocalSearch');if(searchBox)searchBox.style.display='none';return upstreamRender.apply(this,arguments);}
    syncTabs();const list=el('smsListContainer');if(!list)return;if(!smsLoadingMore)_dotSet('sms','online');
    list.querySelectorAll('.sms-row,.sms-list-loading,.sms-list-more,.sms-empty-view').forEach(node=>node.remove());
    const rows=groups();if(!rows.length){if(smsLoadingMore)return smsShowSkeleton();if(!messages().length){smsShowHintText(smsLostCount>0?'短信加载不完整('+smsLostCount+'条失败)，双击底部标签重试':'暂无短信');updateSmsBadge();return;}smsHideLoading();const empty=document.createElement('div');empty.className='sms-empty-view';empty.textContent=search?'没有找到匹配的号码或短信':view==='send'?'没有已发送的短信':'没有收到的短信';list.appendChild(empty);updateSmsBadge();return;}
    smsHideLoading();for(const group of rows.slice(0,limit))list.appendChild(buildCard(group));moreHint(list,rows.length);updateSmsBadge();
  };
  window.smsAppendMore=function(){if(!active())return upstreamMore.apply(this,arguments);const list=el('smsListContainer'),rows=groups();if(!list||rows.length<=limit)return;limit=Math.min(rows.length,limit+PAGE);window.renderSmsList();};
  window.smsBatchOp=function(kind){
    if(!active())return upstreamBatch.apply(this,arguments);
    const picked=groups().filter(group=>selected.has(group.key)).flatMap(group=>group.messages).filter(message=>!message.pending);
    if(!picked.length)return showUpdateToast('请先选择短信','warning');
    if(kind==='read'){
      const unread=picked.filter(message=>message.unread);if(!unread.length)showUpdateToast('所选短信已是已读','success');
      else{for(const message of unread){message.raw.Isopened='1';message.unread=false;}write('smsRead',{recv:unread.map(message=>({Index:message.index})),send:[]});updateSmsBadge();}
    }else{if(!window.confirm('删除所选 '+picked.length+' 条短信？'))return;write('smsDelete',{recv:picked.filter(message=>message.dir==='recv').map(message=>({Index:message.index})),send:picked.filter(message=>message.dir==='send').map(message=>({Index:message.index}))});}
    selected.clear();upstreamEdit.apply(this,[]);
  };
  window.toggleSmsListEdit=function(){selected.clear();return upstreamEdit.apply(this,arguments);};
  window.__smsCardsReset=()=>{limit=PAGE;selected.clear();openGroupKey='';search='';const input=el('smsLocalSearch');if(input)input.value='';};
  window.__smsCardsView=()=>view;
  ensureTabs();syncTabs();
})();
