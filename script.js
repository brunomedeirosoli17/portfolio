// ===================================================================
//  Portfólio - Bruno Medeiros
//  Funções básicas: menu mobile, scroll, animações e formulário.
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

  const nav        = document.getElementById('nav');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');

  // -----------------------------------------------------------------
  // 1) Menu mobile (abrir/fechar)
  // -----------------------------------------------------------------
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // -----------------------------------------------------------------
  // 2) Fundo da navbar muda ao rolar a página
  // -----------------------------------------------------------------
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // -----------------------------------------------------------------
  // 3) Animação de entrada ao rolar (IntersectionObserver)
  // -----------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  // -----------------------------------------------------------------
  // 4) Link ativo no menu conforme a seção visível (scrollspy)
  // -----------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = navLinks.querySelectorAll('a');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        menuLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => spyObserver.observe(sec));

  // -----------------------------------------------------------------
  // 5) Ano atual no rodapé
  // -----------------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------------------------------------------
  // 6) Formulário de contato (validação + envio via e-mail)
  // -----------------------------------------------------------------
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome  = form.nome.value.trim();
      const email = form.email.value.trim();
      const msg   = form.msg.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // marca campos inválidos
      form.nome.classList.toggle('invalid', !nome);
      form.email.classList.toggle('invalid', !emailOk);
      form.msg.classList.toggle('invalid', !msg);

      if (!nome || !emailOk || !msg) {
        feedback.textContent = 'Preencha todos os campos com um e-mail válido.';
        feedback.className = 'form-feedback error';
        return;
      }

      // Sem back-end: abre o app de e-mail já preenchido
      const assunto = encodeURIComponent(`Contato pelo portfólio - ${nome}`);
      const corpo   = encodeURIComponent(`${msg}\n\n- ${nome} (${email})`);
      window.location.href =
        `mailto:brunomedeirosoli17@gmail.com?subject=${assunto}&body=${corpo}`;

      feedback.textContent = 'Abrindo seu app de e-mail... obrigado pelo contato!';
      feedback.className = 'form-feedback success';
      form.reset();
    });
  }
});
