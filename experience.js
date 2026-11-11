(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  const invitation = document.createElement('a');
  invitation.className = 'scroll-invitation';
  invitation.href = '#recuerdos';
  invitation.innerHTML = '<span aria-hidden="true">↓</span> HAY UNA HISTORIA AQUÍ. DESCÚBRELA.';
  hero.append(invitation);
  const ribbon = document.createElement('div');
  ribbon.className = 'chapter-ribbon';
  ribbon.innerHTML = 'Lo que vivimos <b>✧</b> Lo que aprendimos <b>✧</b> Lo que permanece';
  hero.after(ribbon);
  const labels = [];
  document.querySelectorAll('.polaroid').forEach((card, i) => {
    const caption = document.createElement('span');
    caption.textContent = labels[i];
    card.append(caption);
    const img = card.querySelector('img');
    img.alt = labels[i];
    img.setAttribute('aria-label', 'Ampliar recuerdo ' + (i + 1) + ': ' + labels[i]);
  });
  document.querySelector('.memory-intro .eyebrow').textContent = '02 / NUESTROS RECUERDOS';
  const intro = document.createElement('p');
  intro.textContent = 'Pequeños instantes. Un mundo de cosas que significaron. Toca una foto y quédate un ratito.';
  document.querySelector('.memory-intro').append(intro);
  document.querySelector('.letter-content .eyebrow').textContent = '03 / LO QUE QUERÍA DECIRTE';
  const title = document.createElement('h2');
  title.innerHTML = 'Hay palabras que<br>merecen quedarse.';
  document.querySelector('#envelope').before(title);
  document.querySelector('#playlist .eyebrow').textContent = '05 / ASÍ SUENAN LOS RECUERDOS';
  document.querySelector('.music-note').textContent = 'Un fondo de notas suaves para acompañar la lectura. La playlist se abre en Spotify.';
  document.querySelector('#final .eyebrow').textContent = '06 / SIEMPRE, CON CARIÑO';
  const mark = document.createElement('div');
  mark.className = 'final-mark'; mark.textContent = '♡'; mark.setAttribute('aria-hidden', 'true');
  document.querySelector('#final').prepend(mark);
  const wishes = ['Que nunca te falten motivos para sonreír.', 'Que encuentres belleza en los días más sencillos.', 'Que la vida te lleve a lugares que te hagan feliz.', 'Que siempre tengas cerca a quien te cuide el corazón.', 'Que todos esos sueños encuentren su momento.'];
  let wishIndex = -1;
  const wishButton = document.createElement('button');
  wishButton.className = 'wish-button'; wishButton.textContent = 'Un pequeño deseo para ti ✧';
  const wish = document.createElement('p');
  wish.className = 'wish-card'; wish.hidden = true; wish.id = 'wishCard'; wish.setAttribute('role', 'status');
  wishButton.setAttribute('aria-controls', wish.id);
  wishButton.addEventListener('click', () => {
    wishIndex = (wishIndex + 1) % wishes.length;
    wish.hidden = false; wish.textContent = wishes[wishIndex];
    wishButton.textContent = 'Descubrir otro deseo ✧';
  });
  document.querySelector('#final').append(wishButton, wish);
  const confession = document.querySelector('.confession').closest('section');
  confession.id = 'conversacion';
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.memory-intro,.polaroid,.letter>div,.confession>div,.playlist>div,.final h2,.final-grid p').forEach((el, i) => {
      el.classList.add('reveal-ready');
      el.style.setProperty('--reveal-delay', `${(i % 3) * 85}ms`);
      observer.observe(el);
    });
  }
  const motes = document.createElement('div');
  motes.className = 'ambient-motes'; motes.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 16; i++) {
    const dot = document.createElement('i'); dot.className = 'mote';
    dot.style.cssText = `left:${Math.random() * 100}%;top:${20 + Math.random() * 80}%;--duration:${6 + Math.random() * 8}s;--delay:-${Math.random() * 12}s`;
    motes.append(dot);
  }
  hero.prepend(motes);
  const art = document.querySelector('.hero-art');
  const photo = document.querySelector('.hero-photo');
  art.addEventListener('pointermove', e => {
    if (reduced.matches || e.pointerType !== 'mouse') return;
    const box = art.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - .5;
    const y = (e.clientY - box.top) / box.height - .5;
    photo.style.transform = `rotate(3deg) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-5px)`;
  });
  art.addEventListener('pointerleave', () => { photo.style.transform = ''; });
  new MutationObserver(() => {
    document.querySelector('.playlist').classList.toggle('is-playing', document.querySelector('#ambience').getAttribute('aria-pressed') === 'true');
  }).observe(document.querySelector('#ambience'), { attributes: true, attributeFilter: ['aria-pressed'] });
})();