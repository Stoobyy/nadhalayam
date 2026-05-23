// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ===== Nav Scroll Effect =====
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ===== Hero Slideshow (homepage only) =====
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

if (slides.length > 0 && dots.length > 0) {
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(parseInt(dot.dataset.index));
      startSlideshow();
    });
  });

  function startSlideshow() {
    slideInterval = setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 5000);
  }

  startSlideshow();
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Lazy Load Images =====
const lazyImages = document.querySelectorAll('.lazy-img');

const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.add('loaded');

      // Generate a placeholder gradient based on data-src
      const category = img.dataset.src;
      if (category) {
        generatePlaceholder(img, category);
      }

      lazyObserver.unobserve(img);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '100px'
});

lazyImages.forEach(img => lazyObserver.observe(img));

function generatePlaceholder(container, category) {
  // Generate warm, culturally-appropriate gradient backgrounds
  const palettes = {
    'bharatanatyam': { from: '#6d0004', to: '#8a1a1f', icon: '🪷' },
    'carnatic': { from: '#4a0002', to: '#6d0004', icon: '🎵' },
    'mohiniyattam': { from: '#5a1012', to: '#8a1a1f', icon: '🌊' },
    'veena': { from: '#3d0002', to: '#5a1012', icon: '🎼' },
    'violin': { from: '#4a0002', to: '#3d0002', icon: '🎻' },
    'keyboard': { from: '#6d0004', to: '#4a0002', icon: '🎹' },
    'guitar': { from: '#5a1012', to: '#6d0004', icon: '🎸' },
    'tabla': { from: '#3d0002', to: '#4a0002', icon: '🥁' },
    'mridangam': { from: '#4a0002', to: '#5a1012', icon: '🪘' },
    'flute': { from: '#6d0004', to: '#3d0002', icon: '🎶' },
    'painting': { from: '#5a1012', to: '#8a1a1f', icon: '🎨' },
    'dance-stage': { from: '#3d0002', to: '#6d0004', icon: '🪷' },
    'music-class': { from: '#4a0002', to: '#5a1012', icon: '🎵' },
    'mohiniyattam-stage': { from: '#5a1012', to: '#3d0002', icon: '🌊' },
    'veena-close': { from: '#6d0004', to: '#4a0002', icon: '🎼' },
    'violin-group': { from: '#3d0002', to: '#5a1012', icon: '🎻' },
    'annual-day': { from: '#8a1a1f', to: '#6d0004', icon: '🏆' },
    'keyboard-kid': { from: '#4a0002', to: '#6d0004', icon: '🎹' },
    'mridangam-class': { from: '#5a1012', to: '#4a0002', icon: '🪘' },
    'flute-recital': { from: '#6d0004', to: '#5a1012', icon: '🎶' },
    'painting-workshop': { from: '#3d0002', to: '#8a1a1f', icon: '🎨' },
    'tabla-session': { from: '#4a0002', to: '#3d0002', icon: '🥁' },
    'guitar-class': { from: '#5a1012', to: '#6d0004', icon: '🎸' }
  };

  const palette = palettes[category] || { from: '#4a0002', to: '#6d0004', icon: '✦' };

  container.style.background = `linear-gradient(135deg, ${palette.from}, ${palette.to})`;

  // Update the icon inside if there's a span
  const iconSpan = container.querySelector('span');
  if (iconSpan) {
    iconSpan.textContent = palette.icon;
  }
}

// ===== Gallery Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

if (lightbox && galleryItems.length > 0) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const placeholder = item.querySelector('.gallery-placeholder');
      const captionText = item.querySelector('.gallery-item-overlay span')?.textContent || '';

      // Clone the placeholder look
      if (placeholder) {
        const style = getComputedStyle(placeholder);
        lightboxPlaceholder.style.background = style.background;
        lightboxPlaceholder.style.minHeight = '400px';

        const icon = placeholder.querySelector('span')?.textContent || '✦';
        const existingIcon = lightboxPlaceholder.querySelector('span');
        if (existingIcon) existingIcon.textContent = icon;
      }

      lightboxCaption.textContent = captionText;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
