// === Navbar scroll effect ===
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const topButton = document.querySelector(".btn-top");

function updateNavbar() {
    if (!navbar) return;
    if (!navbar.classList.contains("solid")) {
        navbar.classList.toggle("scrolled", window.scrollY > window.innerHeight - 60);
    }
}

updateNavbar();
window.addEventListener("scroll", updateNavbar);

// === Hamburger menu ===
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars-staggered");
            icon.classList.toggle("fa-xmark");
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars-staggered");
                icon.classList.remove("fa-xmark");
            }
        });
    });
}

// === Scroll reveal animation ===
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-zoom").forEach((item) => revealObserver.observe(item));

// === Section cover animation ===
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                sectionObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".brands-wrapper, .section").forEach((section) => sectionObserver.observe(section));

// === Page load transition ===
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('loaded');
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('reveal');
    }, 3000);
});

// === Back to top button ===
if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// === Animated counter ===
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = +target.getAttribute('data-target');
                let count = 0;
                const speed = 100;
                const inc = targetValue / speed;

                const updateCount = () => {
                    if (count < targetValue) {
                        count += inc;
                        target.innerText = Math.ceil(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = targetValue.toLocaleString();
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// === Hero Reveal Slider ===
const heroBg = document.querySelector(".hero-bg");
const heroImages = [
    "./images/hero/1.png",
    "./images/hero/2.png",
    "./images/hero/3.png"
];
let currentHeroImage = 0;

function setHeroImage(index) {
    if (!heroBg) return;
    currentHeroImage = index % heroImages.length;
    heroBg.style.background = `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('${heroImages[currentHeroImage]}') center/cover no-repeat`;
}

function startHeroSlider() {
    setInterval(() => {
        setHeroImage(currentHeroImage + 1);
    }, 4000);
}

if (document.querySelector(".hero")) {
    setTimeout(() => {
        startHeroSlider();
    }, 4000);
}
