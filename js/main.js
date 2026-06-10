// Smooth interaction message
console.log("Portfolio loaded successfully");

// Highlight active section (basic upgrade)
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navigating to:", link.textContent);
    });
});