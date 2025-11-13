// js/app.js
console.log("My Website loaded");

 // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Scroll animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
      const target = counter.textContent.replace(/\D/g, '');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
        }
      };
      updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector('.stat-number');
          if (counter && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => statsObserver.observe(item));