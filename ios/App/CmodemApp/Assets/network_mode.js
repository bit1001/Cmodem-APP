/* Home header network label shared by the FiberHome and Air6 adapters.
 * Carrier rule for the "5GA" icon as described in public reporting of the
 * Chinese operators' 5G-A display rules: 5G carrier aggregation with three
 * NR carriers, or two NR carriers whose combined downlink bandwidth is at
 * least 200 MHz. LTE anchors (NSA) never count. Missing bandwidth never
 * satisfies the 2CC branch. */
(function(root){
  'use strict';
  const MIN_2CC_MHZ=200;
  // Returns '5G SA' | '5G NSA' | '4G' | '3G' | '2G' | '' (unknown).
  function baseMode(value){
    if(value===null||value===undefined)return '';
    const s=String(value).trim().toUpperCase();
    if(!s||s==='--'||s==='-')return '';
    if(/NSA|EN-?DC/.test(s))return '5G NSA';
    if(/(^|[^N])SA\b|NR-?SA|NR5G|^NR$|^5G$|^5$/.test(s))return '5G SA';
    if(/LTE|4G/.test(s))return '4G';
    if(/WCDMA|UMTS|HSPA|TD-?SCDMA|3G/.test(s))return '3G';
    if(/GSM|EDGE|GPRS|2G/.test(s))return '2G';
    return '';
  }
  const mhz=value=>{const m=/(\d+(?:\.\d+)?)/.exec(String(value??''));return m?Number(m[1]):NaN;};
  // carriers: [{rat:'nr'|'lte', dlMHz:number}]
  function isAdvanced(carriers){
    const nr=(carriers||[]).filter(c=>c&&c.rat==='nr');
    if(nr.length>=3)return true;
    if(nr.length===2){const total=nr.reduce((sum,c)=>sum+mhz(c.dlMHz),0);return Number.isFinite(total)&&total>=MIN_2CC_MHZ;}
    return false;
  }
  function label(rawMode,carriers){
    const base=baseMode(rawMode);
    if(!base)return '--';
    if(base.startsWith('5G')&&isAdvanced(carriers))return '5GA';
    return base;
  }
  root.NetworkMode={baseMode,isAdvanced,label,MIN_2CC_MHZ};
  if(typeof module!=='undefined')module.exports=root.NetworkMode;
})(globalThis);
