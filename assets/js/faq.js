const faqItems=[...document.querySelectorAll('.faq-accordion details')];
faqItems.forEach(item=>item.addEventListener('toggle',()=>{if(!item.open)return;faqItems.forEach(other=>{if(other!==item)other.open=false;});}));
