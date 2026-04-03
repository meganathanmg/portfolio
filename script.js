// Welcome Page Animation
const helloSection = document.querySelector("#welcome");
const tamilSection = document.querySelector("#welcomeTamil");
const helloText = document.getElementById("helloText");

function animateHello() {
    const hello = "Hello";

    for (let i = 0; i < hello.length; i++) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = hello[i];
        span.style.animationDelay = i * 0.1 + "s";
        helloText.appendChild(span);
    }

    const stayVisible = 1500;

    setTimeout(() => {
        helloSection.classList.add("hidden");
        setTimeout(() => {
            tamilSection.style.display = "flex";
        }, 100);
    }, stayVisible);

    const tamilStay = stayVisible + 800 + 1500;
    setTimeout(() => {
        tamilSection.classList.add("hidden");
    }, tamilStay);

    const totalTime = tamilStay + 800;
    setTimeout(() => {
        document.body.classList.add("welcome-complete");
        window.scrollTo(0, 0);
    }, totalTime);
}

if (helloText) {
    animateHello();
}

// Topnav + mobile dropdown
const topnavMenu = document.querySelector(".topnav-menu");
const topnavToggle = document.querySelector(".topnav-toggle");
const topnavBackdrop = document.querySelector(".topnav-backdrop");
const navLinks = document.querySelectorAll(".topnav-link");

function closeMenu() {
    topnavMenu?.classList.remove("open");
    topnavBackdrop?.classList.remove("visible");
    topnavToggle?.classList.remove("active");
    if (topnavToggle) topnavToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
    topnavMenu?.classList.add("open");
    topnavBackdrop?.classList.add("visible");
    topnavToggle?.classList.add("active");
    if (topnavToggle) topnavToggle.setAttribute("aria-expanded", "true");
}

if (topnavToggle) {
    topnavToggle.addEventListener("click", () => {
        if (topnavMenu?.classList.contains("open")) closeMenu();
        else openMenu();
    });
}

topnavBackdrop?.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) closeMenu();
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
});

// Active nav link on scroll (main sections only)
const sectionIds = ["home", "about", "experience", "skills", "contact"];

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 120;
    let current = "home";

    for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollPos >= top) {
            current = id;
        }
    }

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === "#" + current);
    });
});

// Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            const mailtoLink =
                "mailto:meganathan1226@email.com?subject=" +
                encodeURIComponent("Portfolio: message from " + name) +
                "&body=" +
                encodeURIComponent("From: " + email + "\n\n" + message);

            window.location.href = mailtoLink;
        }
    });
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// Scroll reveal
const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".highlight-card, .achievement-card, .experience-content, .skill-card, .contact-form").forEach((el) => {
    el.classList.add("scroll-reveal");
    revealObserver.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const id = this.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            // Fixed topnav height offset
            const offset = 88;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    });
});
