import { language } from "./language.js";
import { projects } from "./projects.js";

//Menu button

const menuButton = document.querySelector(".menu__button");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".menu__link");

menuButton.addEventListener("click", (e) => {
  menuButton.classList.toggle("active");
  menu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!menuButton.contains(e.target) && !menu.contains(e.target)) {
    menuButton.classList.remove("active");
    menu.classList.remove("active");
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("active");
    menu.classList.remove("active");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menuButton.classList.remove("active");
    menu.classList.remove("active");
  }
});

//Lazy loading

const lazyImages = document.querySelectorAll("img.lazy");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      obs.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => observer.observe(img));

//Animation

document.addEventListener("DOMContentLoaded", () => {
  const animationItems = document.querySelectorAll(".animation");

  const observerAnimation = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  animationItems.forEach((item) => observerAnimation.observe(item));
});

//Projects

const items = document.querySelector(".myProjects__items");

function renderProjects(lang) {
  items.innerHTML = "";

  projects.forEach((project) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const image = document.createElement("div");
    const img = document.createElement("img");
    const text = document.createElement("div");
    const buttonMore = document.createElement("button");

    div.classList.add("myProjects__item", "animation");
    h3.classList.add("myProjects__top-title");
    image.classList.add("myProjects__image");
    text.classList.add("myProjects__text");
    buttonMore.classList.add("myProjects__button");

    h3.textContent = project.title[lang];
    img.src = project.image;
    img.alt = project.title[lang];
    text.textContent = project.text[lang];
    buttonMore.textContent = project.button[lang];

    div.appendChild(h3);
    image.appendChild(img);
    div.appendChild(image);
    div.appendChild(text);
    div.appendChild(buttonMore);
    items.appendChild(div);

    buttonMore.addEventListener("click", () => createModal(project, lang));
  });

  const animationProjects = document.querySelectorAll(".animation");

  const observerAnimationProjects = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  animationProjects.forEach((item) => observerAnimationProjects.observe(item));
}

//Modal

function createModal(project, lang) {
  const modal = document.createElement("div");
  const overlay = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeButton = document.createElement("button");

  modal.classList.add("modal");
  overlay.classList.add("modal__overlay");
  modalContent.classList.add("modal__content");
  closeButton.classList.add("modal__close");

  closeButton.textContent = "✖";

  const title = document.createElement("h2");
  title.classList.add("modal__title");
  title.textContent = project.title[lang];

  const img = document.createElement("img");
  img.src = project.image;
  img.alt = project.title[lang];
  img.style.maxWidth = "100%";
  img.style.margin = "1rem 0";

  const time = document.createElement("div");
  time.classList.add("modal__time");
  time.textContent = project.timeToDo[lang];

  const date = document.createElement("div");
  date.classList.add("modal__date");
  date.textContent = project.creationDate[lang];

  const text = document.createElement("p");
  text.classList.add("modal__text");
  text.textContent = project.textModal[lang];

  modalContent.append(closeButton, title, img, time, date, text);
  modal.appendChild(modalContent);
  modal.appendChild(overlay);
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("show"), 10);
  document.body.classList.add("no-scroll");

  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

//Change the language

const defaultLang = "en";
let currentLang = localStorage.getItem("lang") || defaultLang;

const langButton = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");

function updateText(lang) {
  const dataI18 = document.querySelectorAll("[data-i18n]");
  dataI18.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (language[lang] && language[lang][key]) {
      el.textContent = language[lang][key];
    }
  });
}

function updateButton(lang) {
  langButton.textContent = language[lang].name;
}

langButton.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});
renderProjects(currentLang);
updateText(currentLang);
updateButton(currentLang);

langMenu.addEventListener("click", (e) => {
  const selectedLang = e.target.getAttribute("data-lang");
  if (selectedLang && language[selectedLang]) {
    currentLang = selectedLang;
    localStorage.setItem("lang", currentLang);

    renderProjects(currentLang);
    updateText(currentLang);
    updateButton(currentLang);

    langMenu.classList.add("hidden");
  }
});
document.addEventListener("click", (e) => {
  if (!langMenu.contains(e.target) && e.target !== langButton) {
    langMenu.classList.add("hidden");
  }
});
