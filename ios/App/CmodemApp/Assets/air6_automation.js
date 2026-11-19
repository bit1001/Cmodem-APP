/* Native-page editors for the Air6 scheduler and lock failover APIs. */
(function(root){
  'use strict';
  const modes=[['21','自动'],['19','4G + 5G'],['15','仅 5G'],['3','仅 4G'],['1','仅 3G']];
  const days=[['1','一'],['2','二'],['3','三'],['4','四'],['5','五'],['6','六'],['0','日']];
  function expression(timing,time,weekdays,custom){
    if(timing==='custom')return String(custom||'').trim();
    if(!/^\d{2}:\d{2}$/.test(time)||Number(time.slice(0,2))>23||Number(time.slice(3))>59)throw Error('请选择执行时间');
    if(timing==='weekly'&&!weekdays.length)throw Error('请至少选择一天');
    return Number(time.slice(3))+' '+Number(time.slice(0,2))+' * * '+(timing==='weekly'?weekdays.join(','):'*');
  }
  function deviceTime(value,offset){
    const date=new Date((Number(value)+Number(offset||0))*1000);return value&&Number.isFinite(date.getTime())?date.toISOString().slice(0,16).replace('T',' '):'暂无';
  }
  function summary(task){
    const p=task.params||{};
    if(task.action==='rat')return '网络制式 · '+(modes.find(v=>v[0]===String(p.rat))?.[1]||p.rat);
    if(task.action==='band')return ['锁频段',p.lte?'4G B'+String(p.lte).split('/').join('/B'):'',p.nr?'5G n'+String(p.nr).split('/').join('/n'):''].filter(Boolean).join(' · ');
    if(task.action==='unlock'||p.mode==='unlock')return ({all:'解除频段和小区锁定',band:'解除频段锁定',pci:'解除小区锁定'})[p.target||'pci'];
    return (p.rat==='nr'?'5G':'4G')+' · 频点 '+p.arfcn+' · PCI '+p.pci;
  }
  function create(h){
    const el=id=>document.getElementById(id),node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
    const button=(text,click)=>{const n=node('button','',text);n.type='button';n.onclick=click;return n;};
    let scheduler=null,failover=null,bands=null,editing=false,editingId=null,previewSequence=0,previewTimer=null,previewId='',uncertain=false;
    const failoverDraft=new Map();
    h.scheduler.innerHTML='<p class="air6-hint">按路由器时间执行，关闭 App 后仍然生效。</p><p id="air6TaskService" class="air6-hint"></p><button id="air6TaskAdd" class="air6-primary">新建任务</button><div id="air6TaskEditor" class="air6-task-editor" style="display:none"><h3 id="air6TaskTitle">新建任务</h3><label>任务名称<input id="air6TaskName" maxlength="40" placeholder="例如：夜间锁频"></label><label class="air6-automation-check"><input id="air6TaskEnabled" type="checkbox" checked>启用任务</label><label>重复规则<select id="air6TaskTiming"><option value="daily">每天</option><option value="weekly">每周</option><option value="custom">自定义 Cron</option></select></label><label id="air6TaskTimeField">执行时间<input id="air6TaskTime" type="time" value="02:00"></label><div id="air6TaskDays" class="air6-task-days"></div><label id="air6TaskCronField">Cron 表达式<input id="air6TaskCron" maxlength="120" value="0 2 * * *" placeholder="分 时 日 月 星期"></label><p id="air6TaskPreview" class="air6-hint" role="status"></p><label>执行操作<select id="air6TaskAction"><option value="band">锁频段</option><option value="pci">锁小区</option><option value="rat">切换网络制式</option><option value="unlock">解除锁定</option></select></label><div data-task-action="band"><p class="air6-hint">未选择的制式保持原配置。</p><strong>4G 频段</strong><div id="air6TaskLte" class="air6-task-bands"></div><strong>5G 频段</strong><div id="air6TaskNr" class="air6-task-bands"></div></div><div data-task-action="pci"><label>小区制式<select id="air6TaskCellRat"><option value="nr">5G NR</option><option value="lte">4G LTE</option></select></label><label>ARFCN / EARFCN<input id="air6TaskArfcn" type="number" min="1" step="1"></label><label>PCI<input id="air6TaskPci" type="number" min="0" step="1"></label></div><div data-task-action="rat"><label>网络制式<select id="air6TaskRat"></select></label></div><div data-task-action="unlock"><label>解除范围<select id="air6TaskUnlock"><option value="all">频段和小区</option><option value="band">仅频段</option><option value="pci">仅小区</option></select></label></div><p id="air6TaskError" class="air6-task-error" role="alert"></p><div class="air6-actions"><button id="air6TaskCancel">取消</button><button id="air6TaskSave" class="air6-primary">保存任务</button></div></div><div id="air6TaskList"></div>';
    for(const [value,label] of modes){const n=node('option','',label);n.value=value;el('air6TaskRat').appendChild(n);}
    for(const [value,label] of days){const wrap=node('label'),input=node('input');input.type='checkbox';input.value=value;wrap.appendChild(input);wrap.appendChild(node('span','','周'+label));el('air6TaskDays').appendChild(wrap);}
    h.failover.innerHTML='<p class="air6-hint">锁定后先等待 60 秒重连。持续断网达到设定时间后，自动解除对应锁定。</p><div id="air6FailoverForms"></div>';
    for(const [key,title] of [['band','锁频自动回退'],['pci','小区自动回退']]){
      const card=node('div','air6-card');card.appendChild(node('strong','',title));
      const label=node('label','air6-automation-check'),enabled=node('input');enabled.type='checkbox';enabled.id='air6FailoverEnabled_'+key;label.appendChild(enabled);label.appendChild(node('span','','启用自动回退'));card.appendChild(label);
      const time=node('label','','持续断网时间'),select=node('select');select.id='air6FailoverTimeout_'+key;for(const seconds of [30,60,90,120,180,300,600]){const option=node('option','',seconds+' 秒');option.value=String(seconds);select.appendChild(option);}time.appendChild(select);card.appendChild(time);
      const state=node('p','air6-hint','待读取');state.id='air6FailoverState_'+key;card.appendChild(state);const save=button('保存',()=>saveFailover(key));save.id='air6FailoverSave_'+key;save.className='air6-primary';card.appendChild(save);el('air6FailoverForms').appendChild(card);
      const changed=()=>{failoverDraft.set(key,{enabled:enabled.checked,timeout:Number(select.value)});h.editing(true);h.message('设置已修改');};enabled.onchange=select.onchange=changed;
    }
    const inputs=()=>({timing:el('air6TaskTiming').value,time:el('air6TaskTime').value,weekdays:[...el('air6TaskDays').querySelectorAll('input:checked')].map(n=>n.value),custom:el('air6TaskCron').value});
    const cron=()=>{const v=inputs();return expression(v.timing,v.time,v.weekdays,v.custom);};
    function preview(){
      clearTimeout(previewTimer);previewId='task-preview-'+(++previewSequence);if(!editing)return;
      let rule;try{rule=cron();}catch(e){el('air6TaskPreview').textContent=e.message;return;}
      el('air6TaskPreview').textContent='正在计算下次执行时间…';const id=previewId;
      previewTimer=setTimeout(()=>{previewTimer=null;if(editing&&id===previewId)h.preview({cron:rule,requestId:id});},350);
    }
    function fields(){
      const timing=el('air6TaskTiming').value,action=el('air6TaskAction').value,nr=el('air6TaskCellRat').value==='nr';
      el('air6TaskDays').style.display=timing==='weekly'?'flex':'none';el('air6TaskTimeField').style.display=timing==='custom'?'none':'';el('air6TaskCronField').style.display=timing==='custom'?'':'none';
      h.scheduler.querySelectorAll('[data-task-action]').forEach(n=>n.style.display=n.dataset.taskAction===action?'':'none');
      el('air6TaskArfcn').max=nr?'3279165':'262143';el('air6TaskPci').max=nr?'1007':'503';preview();
    }
    function bandFields(values={}){
      for(const [radio,id] of [['lte','air6TaskLte'],['nr','air6TaskNr']]){
        const box=el(id);box.textContent='';const supported=String(bands?.['support_'+radio+'_band']||'').split(/[\s,/]+/).filter(v=>/^\d+$/.test(v));const chosen=String(values[radio]||'').split('/');
        if(!supported.length){box.textContent='频段读取失败，请关闭编辑后刷新';continue;}
        for(const value of [...new Set([...supported,...chosen.filter(Boolean)])]){const wrap=node('label'),input=node('input');input.type='checkbox';input.value=value;input.checked=chosen.includes(value);wrap.appendChild(input);wrap.appendChild(node('span','',(radio==='nr'?'n':'B')+value+(!supported.includes(value)?'（不支持）':'')));box.appendChild(wrap);}
      }
    }
    function edit(task){
      if(h.busy()||uncertain)return;editing=true;editingId=task?.id||null;h.editing(true);el('air6TaskEditor').style.display='';el('air6TaskList').style.display='none';el('air6TaskAdd').style.display='none';el('air6TaskError').textContent='';
      el('air6TaskTitle').textContent=task?'编辑任务':'新建任务';el('air6TaskName').value=task?.name||'';el('air6TaskEnabled').checked=task?!!task.enabled:true;
      const p=task?.params||{},legacy=task?.action==='pci'&&p.mode==='unlock',rule=task?.cron||'0 2 * * *',parts=rule.trim().split(/\s+/);
      el('air6TaskAction').value=legacy?'unlock':task?.action||'band';el('air6TaskUnlock').value=legacy?'pci':p.target||'all';el('air6TaskRat').value=task?.action==='rat'?String(p.rat):'21';el('air6TaskCellRat').value=p.rat==='lte'?'lte':'nr';el('air6TaskArfcn').value=p.arfcn??'';el('air6TaskPci').value=p.pci??'';
      el('air6TaskCron').value=rule;el('air6TaskTiming').value=/^\d+ \d+ \* \* \*$/.test(rule)?'daily':/^\d+ \d+ \* \* [0-6,]+$/.test(rule)?'weekly':'custom';el('air6TaskTime').value=String(Number(parts[1])||0).padStart(2,'0')+':'+String(Number(parts[0])||0).padStart(2,'0');el('air6TaskDays').querySelectorAll('input').forEach(n=>n.checked=String(parts[4]).split(',').includes(n.value));bandFields(p);fields();
    }
    function closeEditor(){
      editing=false;editingId=null;clearTimeout(previewTimer);previewId='closed-'+(++previewSequence);el('air6TaskEditor').style.display='none';el('air6TaskList').style.display='';el('air6TaskAdd').style.display='';h.editing(failoverDraft.size>0);
    }
    function taskPayload(){
      const task={name:el('air6TaskName').value.trim(),enabled:el('air6TaskEnabled').checked,cron:cron(),action:el('air6TaskAction').value,params:{}};
      if(!task.name||task.name.length>40)throw Error('任务名称请填写 1–40 个字');if(editingId)task.id=editingId;
      if(task.action==='rat')task.params.rat=el('air6TaskRat').value;
      else if(task.action==='unlock')task.params.target=el('air6TaskUnlock').value;
      else if(task.action==='band'){for(const [radio,id] of [['lte','air6TaskLte'],['nr','air6TaskNr']])task.params[radio]=[...el(id).querySelectorAll('input:checked')].map(n=>n.value).join('/');if(!task.params.lte&&!task.params.nr)throw Error('请至少选择一个频段');}
      else{const nr=el('air6TaskCellRat').value==='nr',a=el('air6TaskArfcn').value,p=el('air6TaskPci').value;if(!a||!p||!Number.isInteger(Number(a))||!Number.isInteger(Number(p))||Number(a)<1||Number(a)>(nr?3279165:262143)||Number(p)<0||Number(p)>(nr?1007:503))throw Error('请填写有效的频点和 PCI');task.params={mode:'lock',rat:nr?'nr':'lte',arfcn:Number(a),pci:Number(p)};}
      return task;
    }
    function saveTask(){
      if(h.busy()||uncertain)return;try{const task=taskPayload();el('air6TaskError').textContent='';h.save({kind:'scheduler',op:'save',task},task.enabled?'保存并启用任务？操作将在设定时间执行。':'保存此任务？');}catch(e){el('air6TaskError').textContent=e.message;}
    }
    function renderTasks(){
      if(!scheduler)return;el('air6TaskService').textContent=(scheduler.service_running?'调度服务运行中':'调度服务未运行')+' · '+deviceTime(scheduler.now,scheduler.utc_offset)+' '+(scheduler.timezone||'');if(editing)return;
      const box=el('air6TaskList');box.textContent='';const tasks=Array.isArray(scheduler.tasks)?scheduler.tasks:[];if(!tasks.length)box.appendChild(node('p','air6-hint','暂无定时任务'));
      for(const task of tasks){const card=node('div','air6-card');card.appendChild(node('strong','',task.name));card.appendChild(node('p','air6-hint',summary(task)));card.appendChild(node('p','air6-hint',task.cron+'\n'+(task.enabled?'下次执行：'+deviceTime(task.next_run,scheduler.utc_offset):'已暂停')+(task.last?'\n上次执行：'+deviceTime(task.last.time,scheduler.utc_offset)+' '+task.last.message:'')));
        const actions=node('div','air6-actions');actions.appendChild(button('编辑',()=>edit(task)));actions.appendChild(button(task.enabled?'暂停':'启用',()=>{if(!h.busy()&&!uncertain)h.save({kind:'scheduler',op:'toggle',id:task.id,enabled:!task.enabled},(task.enabled?'暂停':'启用')+'任务“'+task.name+'”？');}));actions.appendChild(button('删除',()=>{if(!h.busy()&&!uncertain)h.save({kind:'scheduler',op:'delete',id:task.id},'删除任务“'+task.name+'”？');}));card.appendChild(actions);box.appendChild(card);}
    }
    function renderFailover(){
      if(!failover)return;const phases={idle:'等待下一次锁定',settling:'等待重连',watching:'网络正常',suspect:'断网倒计时',released:'已解除锁定',disabled:'已关闭',error:'解除失败',unknown:'联网状态未知',releasing:'正在解除锁定'};
      for(const key of ['band','pci']){const state=failover.kinds?.[key];if(!state){el('air6FailoverState_'+key).textContent='读取失败';el('air6FailoverSave_'+key).disabled=true;continue;}const draft=failoverDraft.get(key);el('air6FailoverEnabled_'+key).checked=draft?draft.enabled:!!state.enabled;el('air6FailoverTimeout_'+key).value=String(draft?draft.timeout:state.timeout);el('air6FailoverState_'+key).textContent=(!failover.service_running?'服务未运行':phases[state.phase]||state.phase)+(state.remaining!=null?' · 剩余 '+state.remaining+' 秒':'')+(state.message?'\n'+state.message:'');}
    }
    function saveFailover(target){
      if(h.busy()||uncertain)return;h.save({kind:'failover',target,enabled:el('air6FailoverEnabled_'+target).checked,timeout:Number(el('air6FailoverTimeout_'+target).value)},'保存'+(target==='band'?'锁频':'小区')+'自动回退设置？');
    }
    el('air6TaskAdd').onclick=()=>edit(null);el('air6TaskCancel').onclick=()=>{if(!h.busy())closeEditor();};el('air6TaskSave').onclick=saveTask;
    for(const id of ['air6TaskTiming','air6TaskAction','air6TaskCellRat'])el(id).onchange=fields;
    for(const id of ['air6TaskTime','air6TaskCron'])el(id).oninput=preview;el('air6TaskDays').onchange=preview;
    return {
      withOptions:()=>!bands,
      open(kind){closeEditor();failoverDraft.clear();uncertain=false;h.editing(false);if(kind==='scheduler')renderTasks();else if(kind==='failover')renderFailover();},
      close(){closeEditor();failoverDraft.clear();uncertain=false;},
      reset(){this.close();scheduler=failover=bands=null;el('air6TaskList').textContent='';},
      render(result){
        if(result.bands&&Object.keys(result.bands).length)bands=result.bands;
        if(result.scheduler)scheduler=result.scheduler;if(result.failover)failover=result.failover;
        if(uncertain&&result.ok&&result.kind==='scheduler'&&editing){try{const draft=taskPayload();if(result.scheduler?.tasks?.some(t=>(!draft.id||String(t.id)===String(draft.id))&&t.name===draft.name&&t.cron===draft.cron&&t.action===draft.action&&!!t.enabled===draft.enabled&&Object.entries(draft.params).every(([k,v])=>String(t.params?.[k]??'')===String(v))))closeEditor();}catch(_){};}
        if(result.pending)uncertain=true;else if(result.ok)uncertain=false;
        if(result.operation&&result.ok){if(result.kind==='scheduler')closeEditor();else{failoverDraft.delete(result.target);h.editing(failoverDraft.size>0);}}
        if(result.kind==='scheduler'){if(!result.ok&&editing)el('air6TaskError').textContent=result.message||'保存失败';renderTasks();}
        else renderFailover();
        if(uncertain)h.message(result.message+'；请先刷新任务或设置列表');
      },
      preview(result){if(!editing||result.requestId!==previewId)return;el('air6TaskPreview').textContent=result.ok?'下次执行：'+deviceTime(result.data.next_run,result.data.utc_offset)+' '+(result.data.timezone||''):result.message||'时间规则无效';}
    };
  }
  root.Air6AutomationUI={create,expression,deviceTime,summary};
  if(typeof module!=='undefined')module.exports=root.Air6AutomationUI;
})(globalThis);
