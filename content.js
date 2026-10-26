(()=>{
  if(window.__arunaJobHelperV3)return;window.__arunaJobHelperV3=true;
  const txt=e=>e&&e.innerText?e.innerText.trim():"";
  const first=(root,selectors)=>{for(const s of selectors){const e=root.querySelector(s);const t=txt(e);if(t)return t}return ""};
  function extract(){
    const title=first(document,["h1",".job-details-jobs-unified-top-card__job-title","#jobsearch-JobInfoHeader-title","[data-testid='jobTitle']"]);
    const company=first(document,[".job-details-jobs-unified-top-card__company-name",".jobsearch-InlineCompanyRating","[data-testid='company-name']"]);
    let description=first(document,[".jobs-description__content","#jobDescriptionText","[data-testid='jobDescription']",".job-desc-container",".job-description"]);
    const body=(document.body?.innerText||"").slice(0,30000);if(body.length>description.length)description=body;
    return {title,company,description,url:location.href,pageTitle:document.title,source:location.hostname.includes('naukri')?'Naukri':'LinkedIn',capturedAt:new Date().toISOString()};
  }
  function listingCards(){
    const isN=location.hostname.includes('naukri');
    const candidates=isN?[
      "article.jobTuple",".cust-job-tuple",".srp-jobtuple-wrapper",".list div[data-job-id]","[data-job-id]",".jobTuple",".jobTupleHeader","article"
    ]:[".jobs-search-results__list-item",".job-card-container","li.jobs-search-results__list-item"];
    let nodes=[];for(const sel of candidates){document.querySelectorAll(sel).forEach(n=>{if(nodes.length<300&&!nodes.some(x=>x===n||x.contains(n)||n.contains(x)))nodes.push(n)})}
    const out=[];const seen=new Set();
    for(const n of nodes){
      const links=[...n.querySelectorAll('a[href]')].filter(a=>{const h=a.href||'';return isN?(/job-listings|job-listing|jobs\//i.test(h)&&!/(login|register|company|browse)/i.test(h)):h.includes('/jobs/view/')});
      const a=links.sort((x,y)=>(txt(y).length-txt(x).length))[0];if(!a)continue;
      let title=txt(a)||first(n,[".title",".jobTitle",".job-title",".job-card-list__title",".job-card-container__link"]);
      if(!title||title.length>180)continue;
      const url=a.href.split('?')[0];if(seen.has(url))continue;seen.add(url);
      const company=first(n,[".companyInfo .comp-name",".comp-name",".company-name",".job-card-container__primary-description",".job-card-container__company-name",".job-card-container__subtitle"]);
      const details=txt(n).slice(0,7000);
      out.push({title,company:company||"Company not detected",description:details,url,pageTitle:document.title,source:isN?'Naukri':'LinkedIn',capturedAt:new Date().toISOString(),listingCard:true});
    }
    // Fallback: on pages where card wrappers vary, gather unique job links and use their closest compact container.
    if(!out.length){
      const links=[...document.querySelectorAll('a[href]')].filter(a=>isN?/job-listings|job-listing/i.test(a.href):a.href.includes('/jobs/view/'));
      for(const a of links){const title=txt(a);if(!title||title.length>180)continue;const url=a.href.split('?')[0];if(seen.has(url))continue;seen.add(url);const n=a.closest('article,li,[data-job-id],.jobTuple,.cust-job-tuple')||a.parentElement?.parentElement||a.parentElement;out.push({title,company:first(n,[".comp-name",".company-name",".job-card-container__primary-description"] )||"Company not detected",description:txt(n).slice(0,7000),url,pageTitle:document.title,source:isN?'Naukri':'LinkedIn',capturedAt:new Date().toISOString(),listingCard:true});}
    }
    return out.slice(0,100);
  }
  chrome.runtime.onMessage.addListener((m,s,reply)=>{if(m?.type==="SCAN_JOB")reply(extract());if(m?.type==="SCAN_LISTINGS")reply({jobs:listingCards(),pageUrl:location.href,source:location.hostname.includes('naukri')?'Naukri':'LinkedIn'});return true;});
})();
