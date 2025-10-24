// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    startHeroTextAnimation();
  }, 2000);
});

// CHANGED: New function to handle sequential hero text animation
function startHeroTextAnimation() {
  const titleLines = document.querySelectorAll('.title-line');
  
  // Reset all lines to initial state
  titleLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(50px) rotateX(90deg) scale(0.8)';
  });
  
  // Trigger animations with proper delays
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.animation = 'none'; // Reset animation
      line.offsetHeight; // Trigger reflow
      
      if (line.classList.contains('highlight')) {
        line.style.animation = 'sequentialSlideInBounce 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      } else {
        line.style.animation = 'sequentialSlideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      }
    }, index * 700); // 700ms delay between each line
  });
}
// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.skill-item, .project-card, .stat-item');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-element');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Typing effect for hero title

// Remove the unused typing effect and simplify
window.addEventListener('load', () => {
  setTimeout(() => {
    // The CSS animations will handle everything automatically
    console.log('Title animations started');
  }, 3500); // Start after loading screen
});

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // Reset the title and start typing effect
      const titleLines = heroTitle.querySelectorAll('.title-line');
      titleLines.forEach((line, index) => {
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  }, 3500); // Start after loading screen
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
  .nav-link.active {
    color: #ffd700;
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(navStyle);


 document.getElementById('downloadResumeBtn').addEventListener('click', function() {
  const resumeContent = `
     <!DOCTYPE html>
    <html>
    <head>
      <title>Elegbede Stephen - Resume</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
          line-height: 1.4;
          padding: 15px;
          width: 700px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .header {
          text-align: center;
          margin-bottom: 15px;
        }
        .header h1 {
          font-size: 24px;
          margin: 5px 0;
        }
        .header h3 {
          font-size: 16px;
          color: #333;
          margin: 5px 0;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 15px;
          font-size: 12px;
          margin: 5px 0;
        }
        .section {
          margin-bottom: 15px;
        }
        .section h2 {
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #ffd700;
          padding-bottom: 3px;
          margin-bottom: 8px;
        }
        .section h4 {
          font-size: 14px;
          margin: 5px 0 3px;
        }
        .section p {
          font-size: 12px;
          margin: 3px 0;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
        }
        .experience-item, .project-item {
          margin-bottom: 8px;
        }
        a {
          color: #0066cc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        @media print {
          body {
            margin: 0;
            padding: 10px;
            width: 100%;
          }
        }
      </style>
    </head> 
    <body>
      <div class="header">
        <h1>Elegbede Stephen</h1>
        <h3>Frontend Engineer</h3>
        <div class="contact-info">
          <span>📧 elegbedestephen2@gmail.com</span>
          <span>📱 +234 8109528430</span>
          <span>📍 Abuja, Nigeria</span>
          <span>🌐 <a href="https://github.com/stevo1935/portfolio">Portfolio</a></span>
        </div>
      </div>
      
      <div class="section">
        <h2>About</h2>
        <p>Passionate frontend developer skilled in creating user-friendly digital experiences using React, TypeScript, and modern frameworks. Adept at collaborating with cross-functional teams to deliver intuitive solutions, with a strong focus on design, UX, and continuous learning.</p>
      </div>
      
      <div class="section">
        <h2>Experience</h2>
        <div class="experience-item">
          <h4>Frontend Engineer (Volunteer) | Visibuy</h4>
          <p><em>2025 - Present</em></p>
          <p>
            - Developed responsive seller and buyer interfaces using React, ensuring mobile-first design for 90%+ device compatibility.<br>
            - Integrated RESTful APIs for seamless verification workflows, reducing data fetch errors by 25%.<br>
            - Collaborated with backend and product teams in bi-weekly sprints to enhance UI/UX, boosting user satisfaction. References available upon request.
          </p>
        </div>
      </div>
      
      <div class="section">
        <h2>Skills</h2>
        <p><strong>Technical Proficiencies:</strong> Frontend Development, React, JavaScript, TypeScript, Vue.js, Next.js, Tailwind CSS, CSS (BEM), HTML, RESTful APIs, Git, GitHub</p>
        <p><strong>Soft Skills:</strong> Collaboration, Problem-Solving, Attention to Detail</p>
        <div class="skills">
          <span class="skill">React</span>
          <span class="skill">JavaScript</span>
          <span class="skill">TypeScript</span>
          <span class="skill">CSS</span>
          <span class="skill">Vue.js</span>
          <span class="skill">Next.js</span>
          <span class="skill">Tailwind CSS</span>
          <span class="skill">Git</span>
          <span class="skill">GitHub</span>
        </div>
      </div>
      
      <div class="section">
        <h2>Featured Projects</h2>
        <div class="project-item">
          <h4>Eazybin</h4>
          <p>Developed a mobile-first waste management platform enabling users to manage, schedule, and track pickups. Implemented bin creation, waste item tracking, and route optimization features using React and Tailwind CSS.</p>
          <p><strong>Technologies:</strong> React, Tailwind CSS, RESTful APIs</p>
          <p><a href="https://github.com/Horlanrewajucode/EazyBins">github.com/stevo1935/eazybin</a> | <a href="https://eazy-bins.vercel.app">Live Demo</a> </p>
        </div>
        <div class="project-item">
          <h4>Todo App</h4>
          <p>Developed a task manager with Vue.js, React.js, and Next.js, implementing local storage and dynamic filtering for enhanced user interaction.</p>
          <p><strong>Technologies:</strong> React, TypeScript, Next.js, CSS (BEM)</p>
          <p><a href="https://github.com/stevo1935/todo-app">github.com/stevo1935/todo-app</a></p>
        </div>
        <div class="project-item">
          <h4>E-Commerce Platform</h4>
          <p>Created a vehicle listing website with dynamic search and detailed views, improving user navigation for 50+ vehicle listings.</p>
          <p><strong>Technologies:</strong> JavaScript, HTML, CSS</p>
          <p><a href="https://github.com/stevo1935/autohub">github.com/stevo1935/autohub</a></p>
        </div>
      </div>
      
      <div class="section">
        <h2>Certifications</h2>
        <p><strong>FreeCodeCamp</strong> - Responsive Web Design, 2024</p>
        <p><strong>Udemy</strong> - The Complete Web Developer Course, 2024</p>
        <p><strong>Altschool Africa</strong> - Frontend Web Development, 2025</p>
      </div>
    </body>
    </html>
  `;


  
  const blob = new Blob([resumeContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Elegbede_Stephen_Resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  // Show success message
  const button = this;
  const originalText = button.innerHTML;
  button.innerHTML = '<span class="resume-icon">✅</span><span class="resume-text">Downloaded!</span>';
  button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
  
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
  }, 2000);
});

