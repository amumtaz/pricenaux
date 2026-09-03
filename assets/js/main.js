(function(){
  const header=document.querySelector('.header');
  const toggle=document.querySelector('.mobile-toggle');
  const menu=document.querySelector('.mobile-menu');
  if(header){window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>8));}

  // Keep desktop dropdown accessibility state in sync with the visible hover/focus menu.
  document.querySelectorAll('.dropdown').forEach(dropdown=>{
    const btn=dropdown.querySelector('.dropdown-btn');
    const panel=dropdown.querySelector('.dropdown-menu');
    if(!btn||!panel)return;
    const setExpanded=open=>btn.setAttribute('aria-expanded',String(open));
    dropdown.addEventListener('mouseenter',()=>setExpanded(true));
    dropdown.addEventListener('mouseleave',()=>{if(!dropdown.contains(document.activeElement))setExpanded(false);});
    dropdown.addEventListener('focusin',()=>setExpanded(true));
    dropdown.addEventListener('focusout',e=>{if(!dropdown.contains(e.relatedTarget))setExpanded(false);});
  });

  if(toggle&&menu){
    const setMobileMenu=open=>{
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
      menu.classList.toggle('open',open);
      document.body.classList.toggle('menu-open',open);
    };
    toggle.addEventListener('click',()=>setMobileMenu(toggle.getAttribute('aria-expanded')!=='true'));
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMobileMenu(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMobileMenu(false);toggle.focus();}});
  }
  document.querySelectorAll('.faq-question').forEach(btn=>{btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});});
  document.querySelectorAll('[data-pricing-card]').forEach(card=>{const tabs=card.querySelectorAll('.billing-tab');const priceEl=card.querySelector('[data-price]');const noteEl=card.querySelector('[data-note]');const badgeEl=card.querySelector('[data-annual-badge]');tabs.forEach(tab=>{tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');priceEl.textContent=tab.dataset.price;noteEl.textContent=tab.dataset.note||'';if(badgeEl){badgeEl.classList.toggle('is-active',tab.dataset.cycle==='annual');}});});});
})();
function nlSubmit(formIdSuffix=''){
  var emailEl=document.getElementById('nl-email'+formIdSuffix);
  var errEl=document.getElementById('nl-error'+formIdSuffix);
  var btn=document.getElementById('nl-btn'+formIdSuffix);
  var defaultEl=document.getElementById('nl-default'+formIdSuffix);
  var successEl=document.getElementById('nl-success'+formIdSuffix);
  if(!emailEl)return;
  var email=emailEl.value.trim();
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    if(errEl){errEl.textContent='Please enter a valid email address.';errEl.style.display='block';}
    return;
  }
  if(errEl)errEl.style.display='none';
  if(btn){btn.disabled=true;btn.textContent='Subscribing…';btn.style.opacity='.72';}
  var formId='1FAIpQLSfJXq-mf2dQQdDVY3w6bJyuygbj1dwBEHmfePm0xkedJScnvw';
  var entryId='entry.1259259763';
  var formUrl='https://docs.google.com/forms/d/e/'+formId+'/formResponse';
  var body=new URLSearchParams();body.append(entryId,email);
  fetch(formUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()})
    .then(function(){
      if(defaultEl)defaultEl.style.display='none';
      if(successEl)successEl.style.display='block';
      emailEl.value='';
    })
    .catch(function(){
      if(errEl){errEl.textContent="We couldn't submit your signup. Please try again.";errEl.style.display='block';}
      if(btn){btn.disabled=false;btn.textContent='Subscribe';btn.style.opacity='1';}
    });
}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-newsletter-input]').forEach(input=>{input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();nlSubmit(input.dataset.newsletterInput||'');}});});});
