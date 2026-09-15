// Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  mobileBtn?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    mobileBtn.innerHTML = menuOpen 
      ? '<i class="ri-close-line text-[20px]"></i>' 
      : '<i class="ri-menu-3-line text-[20px]"></i>';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('hidden');
      mobileBtn.innerHTML = '<i class="ri-menu-3-line text-[20px]"></i>';
    });
  });

  // Typing effect
  const typedText = document.getElementById('typed-text');
  const phrases = [
    ' crafting fast UIs.',
    ' shipping in public.',
    ' obsessed with UX.',
    ' building with AI.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    if (!typedText) return;
    
    const current = phrases[phraseIndex];
    
    if (isDeleting) {
      typedText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);

  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Add reveal class to sections
  document.querySelectorAll('section h2, section h3, .group').forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.3)}s`;
      observer.observe(el);
    }
  });

  // Smooth scroll for nav links + active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObserver.observe(section));

  // Contact form
  const contactForm = document.getElementById('contact-form');
  
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
    btn.disabled = true;
    
    // Simulate sending
    setTimeout(() => {
      btn.innerHTML = '<i class="ri-check-line"></i> Message sent!';
      btn.classList.add('!bg-emerald-600', '!text-white', 'dark:!bg-emerald-600');
      
      // Create toast
      showToast('Message sent! I\'ll reply within 24 hours. 🚀', 'success');
      
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        btn.classList.remove('!bg-emerald-600', '!text-white', 'dark:!bg-emerald-600');
        contactForm.reset();
      }, 2500);
    }, 1500);
  });

  // Toast system
  function showToast(message, type = 'default') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-medium shadow-[0_16px_40px_-8px_rgba(0,0,0,0.3)] flex items-center gap-2 animate-[slideUp_0.4s_ease-out]`;
    toast.innerHTML = `<span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Command palette hint (⌘K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      showToast('⌘K — Quick navigation coming soon! Try scrolling for now ✨');
    }
  });

  // Easter egg: Konami code
  let konamiIndex = 0;
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konami.length) {
        document.body.style.transform = 'rotate(1deg)';
        setTimeout(() => document.body.style.transform = '', 300);
        showToast('🎉 You found the easter egg! You\'re a real developer.');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Performance: lazy load images if any
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

  console.log('%c👋 Hey fellow dev! Thanks for checking the console.', 'font-size: 14px; font-weight: bold;');
  console.log('%cBuilt with Tailwind, vanilla JS, and a lot of love. Source: https://github.com/rudraxrd/portfolio', 'font-size: 12px; color: #71717a;');
});

// Handle page visibility for title trick
let originalTitle = document.title;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👀 Come back! — Rudra';
  } else {
    document.title = originalTitle;
  }
});
