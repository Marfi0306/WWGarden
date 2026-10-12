const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 document.querySelector('#navigation').classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
 if(event.key === 'Escape') {menu?.setAttribute('aria-expanded','false');document.querySelector('#navigation')?.classList.remove('open');}
});
const form = document.querySelector('#quote-form');
form?.addEventListener('submit', event => {
 const status = document.querySelector('#form-status');
 if(form.elements.phone.value.replace(/\D/g,'').length < 9) {event.preventDefault();status.textContent='Podaj poprawny numer telefonu (co najmniej 9 cyfr).';return;}
 const photos = [...form.elements.photos.files];
 if(photos.length > 5 || photos.some(p => p.size > 10*1024*1024 || !['image/jpeg','image/png','image/webp'].includes(p.type))) {
  event.preventDefault(); status.textContent = 'Wybierz maksymalnie 5 zdjęć JPG, PNG lub WebP, każde do 10 MB.'; return;
 }
 if(form.dataset.mode !== 'draft') return;
 event.preventDefault();
 const fields = [['name','Imię'],['phone','Telefon'],['town','Miejscowość'],['service','Usługa'],['email','E-mail'],['area','Powierzchnia / zakres'],['description','Opis'],['date','Preferowany termin']];
 const content = 'WW Garden Service — opis zapytania\nNIE WYSŁANO — plik przygotowany lokalnie\n\n' + fields.map(([key,label]) => `${label}: ${form.elements[key].value}`).join('\n') + '\n\nZdjęcia do dołączenia osobno: ' + (photos.map(p=>p.name).join(', ') || 'brak');
 const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download='ww-garden-zapytanie.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 status.textContent='Opis zapytania został przygotowany do pobrania. Nie wysłano danych ani zdjęć.';
});
