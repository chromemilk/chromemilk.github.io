document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("show");
});
document.querySelectorAll(".glass").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Determine proximity to edges (top-left, top-right, etc.)
    const isLeft = x < rect.width / 2;
    const isTop = y < rect.height / 2;

    // Set glow position toward corner
    el.style.setProperty("--corner-x", isLeft ? "0%" : "100%");
    el.style.setProperty("--corner-y", isTop ? "0%" : "100%");
  });

  // Remove glow on hover
  el.addEventListener("mouseenter", () => {
    el.style.setProperty("--corner-x", "50%");
    el.style.setProperty("--corner-y", "50%");
  });

  el.addEventListener("mouseleave", () => {
    // Subtle reset after leaving
    el.style.setProperty("--corner-x", "50%");
    el.style.setProperty("--corner-y", "50%");
  });
});

const rotator = document.getElementById("name-rotator");
if (rotator) {
  const teamNames = [
    "Kaleb Wilcox – Co-Founder",
    "Koen Hicswa – Organizer",
    "Andrea Arellano – Member",
  ];
  const duration = 6;
  const step = duration / teamNames.length;
  teamNames.forEach((name, i) => {
    const span = document.createElement("span");
    span.textContent = name;
    span.style.animationDelay = `${i * step}s`;
    rotator.appendChild(span);
  });
}
