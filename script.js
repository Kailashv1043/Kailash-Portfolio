// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in effect for sections on scroll
const sections = document.querySelectorAll('main section');
const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    } else {
      section.style.opacity = 0;
      section.style.transform = 'translateY(40px)';
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);
sections.forEach(section => {
  section.style.transition = 'opacity 0.8s, transform 0.8s';
  section.style.opacity = 0;
  section.style.transform = 'translateY(40px)';
});

// Animated background with floating particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function createParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: ['#FFD700', '#64FFDA', '#8892B0'][Math.floor(Math.random() * 3)]
    });
  }
}
createParticles(80);
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Interactive card hover effects (for project cards, etc.)
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('section#projects div')) {
    e.target.closest('section#projects div').style.boxShadow = '0 8px 32px #64FFDA99';
    e.target.closest('section#projects div').style.transform = 'scale(1.03)';
  }
});
document.addEventListener('mouseout', function(e) {
  if (e.target.closest('section#projects div')) {
    e.target.closest('section#projects div').style.boxShadow = '';
    e.target.closest('section#projects div').style.transform = '';
  }
}); 