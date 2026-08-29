const defaults={service:'Restorative Vinyasa Flow',date:'Thursday, Oct 24, 2024',time:'10:00 AM - 11:15 AM',instructor:'Elena Rodriguez',location:'Zenith Downtown Studio - Room B'};
let booking=defaults;
try{booking={...defaults,...JSON.parse(sessionStorage.getItem('zenithBooking')||'{}')};}catch{}
document.querySelectorAll('[data-booking]').forEach(element=>{element.textContent=booking[element.dataset.booking]||defaults[element.dataset.booking];});
document.querySelector('#add-calendar')?.addEventListener('click',()=>{
  const selectedDate=booking.rawDate||'2024-10-24';
  const selectedTime=booking.rawTime||'10:00 AM';
  const start=new Date(`${selectedDate} ${selectedTime}`);
  if(Number.isNaN(start.getTime()))return;
  const end=new Date(start.getTime()+75*60*1000);
  const stamp=date=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const calendar=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Zenith Wellness//Booking//EN','BEGIN:VEVENT',`DTSTART:${stamp(start)}`,`DTEND:${stamp(end)}`,`SUMMARY:${booking.service}`,`LOCATION:${booking.location}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([calendar],{type:'text/calendar'}));link.download='zenith-yoga-session.ics';link.click();URL.revokeObjectURL(link.href);
});
