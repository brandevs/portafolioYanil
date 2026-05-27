/**
 * scroll-animations.js
 * Agrega clases de animación a los elementos del portfolio
 * y activa el IntersectionObserver para revelarlos al hacer scroll.
 *
 * Uso: <script src="scroll-animations.js"></script> antes de </body>
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. ASIGNAR CLASES DE ANIMACIÓN
  ───────────────────────────────────────── */

  const assign = (selector, classes) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      classes.forEach(c => el.classList.add(c));
      // delay escalonado automático dentro de grupos
      const delay = `anim-delay-${Math.min(i + 1, 6)}`;
      el.classList.add(delay);
    });
  };

  // Títulos de sección
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('anim-fade-up');
  });
  document.querySelectorAll('.section-subtitle').forEach(el => {
    el.classList.add('anim-fade-up', 'anim-delay-1');
  });

  // Sobre mí — texto y cards
  document.querySelectorAll('.about-text p').forEach((el, i) => {
    el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
  });
  assign('.about-card', ['anim-scale-in']);

  // Habilidades — cada skill-card
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.classList.add('anim-scale-in', `anim-delay-${Math.min(i + 1, 6)}`);

    // Guardar el offset final en la variable CSS para animar el círculo
    const ring = card.querySelector('circle:last-of-type');
    if (ring) {
      const targetOffset = ring.getAttribute('stroke-dashoffset');
      ring.classList.add('progress-ring');
      ring.style.setProperty('--target-offset', targetOffset);
      ring.setAttribute('stroke-dashoffset', '351.86'); // empieza vacío
    }
  });

  // Experiencia
  document.querySelectorAll('.exp-card').forEach((el, i) => {
    const cls = i % 2 === 0 ? 'anim-fade-left' : 'anim-fade-right';
    el.classList.add(cls, `anim-delay-${Math.min(i + 1, 4)}`);
  });
  document.querySelectorAll('.exp-title').forEach(el => {
    el.classList.add('anim-fade-up');
  });

  // Proyectos
  document.querySelectorAll('.project-card').forEach((el, i) => {
    const cls = i % 2 === 0 ? 'anim-fade-left' : 'anim-fade-right';
    el.classList.add(cls, `anim-delay-${Math.min(i + 1, 4)}`);
  });

  // Servicios
  assign('.service-card', ['anim-scale-in']);

  // Contacto
  document.querySelectorAll('.contact-card').forEach((el, i) => {
    el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
  });
  document.querySelectorAll('.contact-inner .section-title, .contact-desc').forEach((el, i) => {
    el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
  });


  /* ─────────────────────────────────────────
     2. INTERSECTION OBSERVER — activa .in-view
  ───────────────────────────────────────── */

  const animClasses = [
    '.anim-fade-up',
    '.anim-fade-left',
    '.anim-fade-right',
    '.anim-scale-in',
    '.anim-line-in',
  ];

  const targets = document.querySelectorAll(animClasses.join(', '));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Una vez visible, dejar de observar (la animación no se repite)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      // se activa cuando el 12 % del elemento es visible
      rootMargin: '0px 0px -40px 0px', // un poco antes del borde inferior
    }
  );

  targets.forEach(el => observer.observe(el));

});
