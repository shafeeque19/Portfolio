// Project data
const projects = [
  {
    title: "Resturant website",
    category: "UI/UX Design · Web Design",
    description: "A modern, conversion-focused landing page for a resturant. Increased sign-ups by 250% through strategic design and UX improvements.",
    technologies: ["Figma", "HTML/CSS", "JavaScript"],
    link: "https://github.com/shafeeque19/Culinary-tales-restaurant.git"
  },
  {
    title: "E-commerce Website",
    category: "UX · Conversion Optimization",
    description: "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization. Resulted in 40% increase in sales.",
    technologies: ["Figma", "React", "Shopify"],
    link: "https://github.com/shafeeque19/Essence-E-com-website"
  },
  {
    title: "Portfolio Website",
    category: "Branding · Web Design",
    description: "A stunning portfolio website for a creative agency, showcasing their work with an immersive, interactive experience.",
    technologies: ["Figma", "Next.js", "Framer Motion"],
    link: "https://github.com/shafeeque19"
  }
];

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu if open
      document.getElementById('navMenu').classList.remove('active');
    }
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// Reveal on scroll
const reveals = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(section => {
  section.classList.add("reveal");
  observer.observe(section);
});

// Skills animation
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 100);
      });
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
  skillObserver.observe(aboutSection);
}

// Project modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const workCards = document.querySelectorAll('.work-card');
const closeModal = document.querySelector('.modal-close');

workCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectIndex = parseInt(card.getAttribute('data-project'));
    const project = projects[projectIndex];

    modalBody.innerHTML = `
        <h3>${project.title}</h3>
        <p style="color: var(--accent); margin-bottom: 1.5rem;">${project.category}</p>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">${project.description}</p>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin-bottom: 0.8rem;">Technologies Used:</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${project.technologies.map(tech =>
      `<span style="padding: 0.5rem 1rem; background: rgba(99,102,241,0.2); border-radius: 20px; font-size: 0.9rem;">${tech}</span>`
    ).join('')}
          </div>
        </div>
        <a href="${project.link}" class="btn primary" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
      `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});


// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Contact form
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitButton.disabled = true;

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success message
      formMessage.textContent = 'Thank you! Your message has been sent. I\'ll get back to you soon.';
      formMessage.className = 'form-message success';

      // Reset form
      contactForm.reset();

      // Reset button
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
      submitButton.disabled = false;

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 1500);

    // For actual implementation, use a service like Formspree, EmailJS, or your backend:
    
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      formMessage.textContent = 'Sorry, there was an error. Please try again.';
      formMessage.className = 'form-message error';
    } finally {
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
      submitButton.disabled = false;
    }
    
  });
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.background = 'rgba(15,15,15,0.98)';
    nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = 'rgba(15,15,15,0.95)';
    nav.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});