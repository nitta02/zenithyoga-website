const contactForm=document.querySelector('#contact-form');
contactForm?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!contactForm.reportValidity())return;
  const button=contactForm.querySelector('button[type="submit"]');
  const status=contactForm.querySelector('.form-status');
  button.disabled=true;
  status.textContent='Thanks for reaching out — your message is ready for our team.';
  contactForm.reset();
  window.setTimeout(()=>{button.disabled=false;},1000);
});
