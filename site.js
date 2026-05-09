const menuBtn = document.getElementById('menuBtn') || document.querySelector('[data-menu]');
const navLinks = document.getElementById('navLinks') || document.querySelector('[data-nav]');
const legacyReviewRedirects = {'#deep-review':'/reviews/emergent-sh.html','#review-beehiiv':'/reviews/beehiiv.html','#review-surfer':'/reviews/surfer-seo.html','#review-taplio':'/reviews/taplio.html','#review-writesonic':'/reviews/writesonic.html','#compare':'/comparisons/ai-app-builders.html'};
if ((location.pathname === '/' || location.pathname.endsWith('/index.html')) && legacyReviewRedirects[location.hash]) location.replace(legacyReviewRedirects[location.hash]);
if (menuBtn && navLinks) { menuBtn.addEventListener('click', () => { const isOpen = navLinks.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(isOpen)); }); navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); })); }
const todayDate = document.getElementById('todayDate') || document.querySelector('[data-today]');
if (todayDate) { const today = new Date(); const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']; todayDate.textContent = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear(); }
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
const newsForm = document.getElementById('newsForm') || document.querySelector('[data-newsletter]');
if (newsForm) { newsForm.addEventListener('submit', (e) => { e.preventDefault(); const formData = new FormData(newsForm); newsForm.dataset.lastSubmission = JSON.stringify({ email: formData.get('email') || '', insider_interest: formData.get('insider_interest') === 'true' }); const success = document.getElementById('newsSuccess') || newsForm.parentElement.querySelector('[data-success]'); if (success) success.classList ? success.classList.add('show') : success.hidden = false; newsForm.style.display = 'none'; }); }
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => document.body.classList.add('fonts-ready'));
