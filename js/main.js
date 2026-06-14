const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section, .hero");
const revealItems = document.querySelectorAll(
    ".section-heading, .about-card, .objective-card, .card, .project-card, .timeline-item, .experience-card, .contact-card"
);

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navItems.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    }
);

sections.forEach((section) => {
    observer.observe(section);
});

revealItems.forEach((item, index) => {
    item.classList.add("reveal", `reveal-delay-${(index % 3) + 1}`);
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});
