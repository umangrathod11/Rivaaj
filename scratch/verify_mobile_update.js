const fs = require('fs');

const html = fs.readFileSync('shop.html', 'utf8');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

console.log('Mobile app header present in HTML:', html.includes('mobile-app-header-bar'));
console.log('Shop on WhatsApp present in HTML:', html.includes('Shop on WhatsApp'));
console.log('orderProductOnWhatsApp present in HTML:', html.includes('orderProductOnWhatsApp'));
console.log('Mobile app header styled in CSS:', css.includes('.mobile-app-header-bar'));
console.log('btn-card-wa styled in CSS:', css.includes('.btn-card-action.btn-card-wa'));
console.log('quick-pills-bar styled in CSS:', css.includes('.quick-pills-bar'));
