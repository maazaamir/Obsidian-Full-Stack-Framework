/**
 * MAAZ DEV STUDIO - PREMIUM UI ENGINE
 * Version: 2.0 (Obsidian OS)
 * Fixes: ScrollTrigger Refresh, Mobile Menu, Chart resize
 */

// 1. REGISTER GSAP PLUGINS (Critical for ScrollTrigger to work)
gsap.registerPlugin(ScrollTrigger);

// 2. EMERGENCY FAIL-SAFE 
// If the entrance animation hangs, show the site after 1.2s anyway
setTimeout(() => {
    const body = document.body;
    if (window.getComputedStyle(body).opacity === "0") {
        body.style.opacity = "1";
    }
}, 1200);

// 3. CORE ANIMATION ENGINE
window.addEventListener('load', () => {
    // Initial Body Fade
    gsap.to("body", { opacity: 1, duration: 0.5 });

    const tl = gsap.timeline();

    // HERO ENTRANCE
    if (document.querySelector(".reveal")) {
        tl.from(".reveal", { 
            y: 60, 
            opacity: 0, 
            duration: 1, 
            ease: "power4.out", 
            stagger: 0.2 
        })
        .from(".reveal-sub", { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, "-=0.6")
        .from(".hero-actions", { 
            y: 20, 
            opacity: 0, 
            duration: 0.6 
        }, "-=0.4")
        .from(".orb", { 
            scale: 0.5, 
            opacity: 0, 
            duration: 1.5, 
            ease: "power2.out" 
        }, "-=1");
    }

    // BENTO GRID REVEAL (Features Section)
    if (document.querySelector(".bento-grid")) {
        gsap.from(".bento-item", {
            scrollTrigger: {
                trigger: ".bento-grid",
                start: "top 90%", // Starts slightly before the user reaches the grid
                toggleActions: "play none none none",
                invalidateOnRefresh: true 
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }

    // PRICING GRID REVEAL
    // if (document.querySelector(".pricing-grid")) {
    //     gsap.from(".pricing-card", {
    //         scrollTrigger: {
    //             trigger: ".pricing-grid",
    //             start: "top 90%",
    //             toggleActions: "play none none none"
    //         },
    //         scale: 0.9,
    //         opacity: 0,
    //         duration: 0.8,
    //         stagger: 0.2,
    //         ease: "back.out(1.4)"
    //     });
    // }

    // CONTACT SECTION REVEAL
    if (document.querySelector(".contact-section")) {
        gsap.from(".contact-info, .contact-form", {
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // --- THE FIX FOR THE "RELOAD" ISSUE ---
    // Forces GSAP to re-calculate element positions once everything is rendered
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
});

// 4. INTERACTIVE: LIGHT FOLLOW EFFECT
// Using requestAnimationFrame for better performance
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    requestAnimationFrame(() => {
        document.body.style.setProperty('--mouse-x', `${mouseX}px`);
        document.body.style.setProperty('--mouse-y', `${mouseY}px`);
    });
});

// 5. MOBILE NAVIGATION LOGIC
const menuBtn = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });

    // Auto-close menu when a link is clicked (UX best practice)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('is-active');
            navLinks.classList.remove('active');
        });
    });
}

// 6. DASHBOARD: REVENUE CHART ENGINE
const chartCanvas = document.getElementById('revenueChart');
if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, 'rgba(188, 156, 255, 0.4)');
    grad.addColorStop(1, 'rgba(188, 156, 255, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [4500, 7200, 5800, 11000, 9500, 12840],
                borderColor: '#bc9cff',
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                backgroundColor: grad,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { 
                    grid: { display: false }, 
                    ticks: { color: '#444', font: { size: 10 } } 
                }
            }
        }
    });
}