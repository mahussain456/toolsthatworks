const menuBtn = document.querySelector("[data-menu]");
const navLinks = document.querySelector("[data-nav]");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const dateEl = document.querySelector("[data-today]");
if (dateEl) {
  const d = new Date();
  dateEl.textContent = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).toUpperCase();
}

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-categories]");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filters.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const categories = card.getAttribute("data-categories") || "";
      const visible = filter === "all" || categories.split(" ").includes(filter);
      card.style.display = visible ? "" : "none";
    });
  });
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-newsletter]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.parentElement.querySelector("[data-success]");
    if (success) success.hidden = false;
    form.hidden = true;
  });
});
