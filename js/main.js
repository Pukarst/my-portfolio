const pageLoader = document.querySelector(".page-loader");

const hidePageLoader = () => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    document.body.setAttribute("aria-busy", "false");
};

window.addEventListener("load", hidePageLoader, { once: true });
window.setTimeout(hidePageLoader, 3500);

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section, .hero");
const revealItems = document.querySelectorAll(
    ".section-heading, .about-card, .objective-card, .card, .project-card, .timeline-item, .experience-card, .contact-card"
);
const footerYear = document.querySelector("#footer-year");
const currentTime = document.querySelector("#current-time");
const currentClock = document.querySelector("#current-clock");
const currentDate = document.querySelector("#current-date");
const themeToggle = document.querySelector(".theme-toggle");
const clockToggle = document.querySelector("#clock-toggle");
const backToTop = document.querySelector("#back-to-top");

const setTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

    if (themeToggle) {
        const nextTheme = isDark ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.innerHTML = `<i class="fa-solid fa-${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;
    }
};

setTheme(document.documentElement.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

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

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

if (currentTime) {
    const updateCurrentTime = () => {
        const now = new Date();
        currentClock.textContent = new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        }).format(now);
        currentDate.textContent = new Intl.DateTimeFormat(undefined, {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(now);
        currentTime.dateTime = now.toISOString();
    };

    updateCurrentTime();
    window.setInterval(updateCurrentTime, 1000);
}

if (clockToggle && currentTime) {
    const setClockVisibility = (isOpen) => {
        currentTime.hidden = !isOpen;
        clockToggle.setAttribute("aria-expanded", String(isOpen));
    };

    clockToggle.addEventListener("click", () => {
        setClockVisibility(currentTime.hidden);
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".clock-control")) {
            setClockVisibility(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setClockVisibility(false);
            clockToggle.focus();
        }
    });
}

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
