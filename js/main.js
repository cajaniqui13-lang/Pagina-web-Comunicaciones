/* ═══════════════════════════════════════
   Gesencro IPS — main.js
   Bootstrap 5 compatible
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. NAVBAR: clase scrolled al bajar ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. OFFCANVAS: cerrar al navegar a anchor interno ── */
  const offcanvasEl = document.getElementById('mobileNav');
  if (offcanvasEl) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    offcanvasEl.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () { offcanvas.hide(); });
    });
  }

  /* ── 3. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const topbarH = document.querySelector('.topbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - topbarH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 4. NAVBAR: link activo según sección visible ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbarLinks .nav-link');
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ── 5. FORMULARIO: construir mensaje WhatsApp ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

      const nombre = (document.getElementById('nombre')?.value || '').trim();
      const telefono = (document.getElementById('telefono')?.value || '').trim();
      const chequeoEl = document.getElementById('chequeo');
      const chequeo = chequeoEl?.options[chequeoEl.selectedIndex]?.text || '';
      const mensaje = (document.getElementById('mensaje')?.value || '').trim();

      const texto = [
        'Hola, me contacto desde gesencro.co',
        nombre ? 'Nombre: ' + nombre : '',
        telefono ? 'WhatsApp: ' + telefono : '',
        chequeo ? 'Me interesa: ' + chequeo : '',
        mensaje ? 'Comentario: ' + mensaje : '',
      ].filter(Boolean).join('\n');

      window.open('https://wa.me/573336026222?text=' + encodeURIComponent(texto), '_blank');
      form.reset();
      form.classList.remove('was-validated');
    });
  }

  /* ── 6. ANIMACIÓN fade-in al entrar en viewport ── */
  const animEls = document.querySelectorAll(
    '.accion-card, .chequeo-card, .metric-card, .noticia-card, .sede-card'
  );
  if ('IntersectionObserver' in window && animEls.length) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      fadeObserver.observe(el);
    });
  }

});

// Mostrar mensaje después de 2 segundos ── */

window.addEventListener("load", () => {

  // Solo mostrar una vez por sesión ── */
  if (!sessionStorage.getItem("waBienvenida")) {

    setTimeout(() => {

      document
        .getElementById("waMessage")
        .classList.add("show");

      sessionStorage.setItem("waBienvenida", "1");

    }, 2000);

  }

});


// Cerrar mensaje ── */

function cerrarMensaje() {

  document
    .getElementById("waMessage")
    .classList.remove("show");

}

// Animaciones letras── */

document.addEventListener("DOMContentLoaded", () => {

  const titulo = document.querySelector(".hero h1");

  if (titulo) {

    titulo.addEventListener("mouseenter", () => {
      titulo.style.transform = "translateY(-2px)";
    });

    titulo.addEventListener("mouseleave", () => {
      titulo.style.transform = "translateY(0)";
    });

  }

});