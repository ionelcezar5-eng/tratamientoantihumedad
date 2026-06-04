// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Sticky header shadow ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,.14)'
    : '0 2px 16px rgba(0,0,0,.10)';
});

// ── Smooth active nav link ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Contact form ─────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre    = document.getElementById('nombre').value.trim();
  const telefono  = document.getElementById('telefono').value.trim();
  const privacidad = document.getElementById('privacidad').checked;

  if (!nombre || !telefono || !privacidad) {
    alert('Por favor, rellena los campos obligatorios y acepta la política de privacidad.');
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  const tipo   = document.getElementById('tipo').value;
  const mensaje = document.getElementById('mensaje').value;
  const email  = document.getElementById('email').value;
  const subject = encodeURIComponent('Solicitud de presupuesto antihumedad - ' + nombre);
  const body = encodeURIComponent(
    'Nombre: ' + nombre + '\n' +
    'Teléfono: ' + telefono + '\n' +
    'Email: ' + (email || 'No indicado') + '\n' +
    'Tipo de humedad: ' + (tipo || 'No indicado') + '\n\n' +
    'Descripción:\n' + (mensaje || 'Sin descripción')
  );
  window.location.href = 'mailto:ionelcezar5@gmail.com?subject=' + subject + '&body=' + body;

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    btn.style.display = 'none';
    this.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
  }, 1000);
});

// ── Galería filtros ──────────────────────────────────────────
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.galeria-item').forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── Lightbox ─────────────────────────────────────────────────
function openLightbox(el) {
  const img = el.querySelector('img');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── Animate elements on scroll ───────────────────────────────
const animEls = document.querySelectorAll(
  '.service-card, .step, .testimonio-card, .why-list li, .galeria-item, .problema-card'
);

const fadeIn = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeIn.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeIn.observe(el);
});
