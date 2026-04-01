// 1. SAFETY REVEAL (In case GSAP fails)
setTimeout(() => {
    document.body.style.opacity = "1";
}, 3000);

// 2. MAIN ENTRANCE ANIMATION
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to("body", { opacity: 1, duration: 0.5 })
      .from(".reveal", { 
          y: 60, opacity: 0, duration: 1.2, ease: "power4.out", stagger: 0.2 
      })
      .from(".reveal-sub", { 
          y: 30, opacity: 0, duration: 1 
      }, "-=0.8")
      .from(".hero-actions", { 
          y: 20, opacity: 0, duration: 0.8 
      }, "-=0.6")
      .from(".orb", { 
          scale: 0.5, opacity: 0, duration: 2, ease: "elastic.out(1, 0.5)" 
      }, "-=1.5");
});

// 3. LIGHT FOLLOW EFFECT
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// 4. MOBILE MENU LOGIC
const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});

// 5. CHART ENGINE
const chartElement = document.getElementById('revenueChart');
if (chartElement) {
    const ctx = chartElement.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(188, 156, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(188, 156, 255, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [4200, 7800, 5100, 11500, 10200, 12840],
                borderColor: '#bc9cff',
                borderWidth: 4,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { grid: { display: false }, ticks: { color: '#555' } }
            }
        }
    });
}

// 6. SCROLL TRIGGERS
gsap.from(".bento-item", {
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 85%"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from(".pricing-card", {
    scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 85%"
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

gsap.from(".contact-info, .contact-form", {
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 70%",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power4.out"
});