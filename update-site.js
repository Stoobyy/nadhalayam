const fs = require('fs');
const path = require('path');

// 1. Add faculty CSS
const cssPath = path.join(__dirname, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css += `
/* ===== Faculty ===== */
.faculty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.faculty-card {
  background: var(--warm-white);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faculty-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.faculty-card-img {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--beige);
}

.faculty-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.faculty-card:hover .faculty-card-img img {
  transform: scale(1.05);
}

.faculty-card-body {
  padding: 1.25rem 1.25rem 1.5rem;
  text-align: center;
}

.faculty-card-body h3 {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.faculty-card-body p {
  color: var(--gold-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

/* ===== Social Links ===== */
.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--border-soft);
  border-radius: 4px;
  color: var(--text-body);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: var(--gold-muted);
  color: var(--gold-muted);
  background: var(--warm-white);
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS updated');

// 2. Update nav in all pages to add Faculty link
const pages = ['index.html', 'about.html', 'classes.html', 'gallery.html', 'contact.html'];

pages.forEach(page => {
  const filePath = path.join(__dirname, page);
  let html = fs.readFileSync(filePath, 'utf8');

  // Insert Faculty link after the Classes link
  const classesLink = '<li><a href="classes.html"';
  const classesEnd = html.indexOf('</li>', html.indexOf(classesLink)) + '</li>'.length;

  // Only insert if Faculty link doesn't already exist
  if (!html.includes('faculty.html')) {
    const before = html.substring(0, classesEnd);
    const after = html.substring(classesEnd);
    html = before + '\n      <li><a href="faculty.html">Faculty</a></li>' + after;
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Nav updated: ${page}`);
  } else {
    console.log(`Nav already has Faculty: ${page}`);
  }
});

// 3. Add social media links to contact page
const contactPath = path.join(__dirname, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

// Add social links after the Call Now / WhatsApp buttons
const buttonsEnd = '      </div>\n    </div>';
const targetIdx = contactHtml.indexOf(buttonsEnd, contactHtml.indexOf('WhatsApp'));
if (targetIdx !== -1) {
  const insertPoint = contactHtml.indexOf(buttonsEnd, contactHtml.indexOf('WhatsApp')) + buttonsEnd.length;
  const socialBlock = `

      <div class="social-links">
        <a href="https://www.facebook.com/share/1NbCLS1rBk/" class="social-link" target="_blank" rel="noopener">📘 Facebook</a>
        <a href="https://www.instagram.com/sunilanitha.nadham?utm_source=qr&igsh=MXIwMXR6d2o5Y3d2cg==" class="social-link" target="_blank" rel="noopener">📷 Instagram</a>
        <a href="https://youtube.com/@nadhalayamofficial?si=5vMBy7ZGA8YhbLXn" class="social-link" target="_blank" rel="noopener">▶️ YouTube</a>
      </div>`;

  const before = contactHtml.substring(0, insertPoint);
  const after = contactHtml.substring(insertPoint);
  contactHtml = before + socialBlock + after;
  fs.writeFileSync(contactPath, contactHtml, 'utf8');
  console.log('Social links added to contact page');
}
