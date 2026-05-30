const fs = require('fs');
const path = require('path');

const contactHtml = fs.readFileSync(path.join(__dirname, 'contact.html'), 'utf8');

// Find the Call Now / WhatsApp button block and add social links after it
const buttonsBlock = '      <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">\r\n        <a href="tel:+919497296163" class="btn btn-primary" style="font-size:0.8rem; padding:0.7rem 1.5rem;">📞 Call Now</a>\r\n        <a href="https://wa.me/919497296163" class="btn btn-outline" target="_blank" rel="noopener" style="font-size:0.8rem; padding:0.7rem 1.5rem;">💬 WhatsApp</a>\r\n      </div>';

const socialBlock = `      <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
        <a href="tel:+919497296163" class="btn btn-primary" style="font-size:0.8rem; padding:0.7rem 1.5rem;">📞 Call Now</a>
        <a href="https://wa.me/919497296163" class="btn btn-outline" target="_blank" rel="noopener" style="font-size:0.8rem; padding:0.7rem 1.5rem;">💬 WhatsApp</a>
      </div>

      <div class="social-links">
        <a href="https://www.facebook.com/share/1NbCLS1rBk/" class="social-link" target="_blank" rel="noopener">📘 Facebook</a>
        <a href="https://www.instagram.com/sunilanitha.nadham?utm_source=qr&igsh=MXIwMXR6d2o5Y3d2cg==" class="social-link" target="_blank" rel="noopener">📷 Instagram</a>
        <a href="https://youtube.com/@nadhalayamofficial?si=5vMBy7ZGA8YhbLXn" class="social-link" target="_blank" rel="noopener">▶️ YouTube</a>
      </div>`;

if (contactHtml.includes(buttonsBlock)) {
  const updated = contactHtml.replace(buttonsBlock, socialBlock);
  fs.writeFileSync(path.join(__dirname, 'contact.html'), updated, 'utf8');
  console.log('Social links added!');
} else {
  console.log('Buttons block not found - check format');
}
