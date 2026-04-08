/* Home Rotating Titles */
const { animate, stagger } = anime;

// Add or replace entries here to customize the hero text rotation.
const homeTitles = [
  { split: "Criativo",
    profession1: "Full Stack",
    profession2: "Web"
  },
  { split: "Focado em",
    profession1: "Front-end",
    profession2: "Moderno"
  },
  { split: "Atuando com",
    profession1: "Back-end",
    profession2: "e Login"
  },
  { split: "Criando",
    profession1: "Sites",
    profession2: "Responsivos"
  },
  {
    split: "C\u00F3digo",
    profession1: "Organizado",
    profession2: "e Escal\u00E1vel",
  },
  {
    split: "Projetos",
    profession1: "Sob Medida",
    profession2: "para Web",
  },
  { split: "Foco em",
    profession1: "UI/UX",
    profession2: "e React"
  },
  {
    split: "HTML",
    profession1: "CSS3",
    profession2: "JavaScript",
  },
  {
    split: "Layout",
    profession1: "Moderno",
    profession2: "Responsivo",
  },
  {
    split: "Navega\u00E7\u00E3o",
    profession1: "Simples",
    profession2: "e Intuitiva",
  },
  {
    split: "Detalhes",
    profession1: "Que",
    profession2: "Importam",
  },
];

const homeTextElements = {
  split: document.querySelector(".home__split"),
  profession1: document.querySelector(".home__profession-1"),
  profession2: document.querySelector(".home__profession-2"),
};

const homeAnimationSettings = {
  stagger: 60,
  enterDuration: 900,
  exitDuration: 700,
  visibleDelay: 2400,
  betweenDelay: 200,
};

const createAnimatedChars = (element, value) => {
  element.replaceChildren();

  const fragment = document.createDocumentFragment();

  [...value].forEach((char) => {
    const span = document.createElement("span");
    span.className = "home__char";
    span.textContent = char === " " ? "\u00A0" : char;
    fragment.appendChild(span);
  });

  element.appendChild(fragment);

  return [...element.querySelectorAll(".home__char")];
};

const animateHomeChars = (chars, direction = "in") => {
  if (!chars.length) return 0;

  const duration =
    direction === "in"
      ? homeAnimationSettings.enterDuration
      : homeAnimationSettings.exitDuration;

  animate(chars, {
    y: direction === "in" ? ["100%", "0%"] : ["0%", "-100%"],
    duration,
    ease: direction === "in" ? "out(3)" : "in(3)",
    delay: stagger(homeAnimationSettings.stagger),
  });

  return duration + (chars.length - 1) * homeAnimationSettings.stagger;
};

const renderHomeTitle = (title) => ({
  split: createAnimatedChars(homeTextElements.split, title.split),
  profession1: createAnimatedChars(
    homeTextElements.profession1,
    title.profession1
  ),
  profession2: createAnimatedChars(
    homeTextElements.profession2,
    title.profession2
  ),
});

if (Object.values(homeTextElements).every(Boolean)) {
  let homeTitleIndex = 0;

  const cycleHomeTitles = () => {
    const charGroups = Object.values(renderHomeTitle(homeTitles[homeTitleIndex]));
    const enterTime = Math.max(
      ...charGroups.map((chars) => animateHomeChars(chars, "in"))
    );

    setTimeout(() => {
      const exitTime = Math.max(
        ...charGroups.map((chars) => animateHomeChars(chars, "out"))
      );

      homeTitleIndex = (homeTitleIndex + 1) % homeTitles.length;

      setTimeout(cycleHomeTitles, exitTime + homeAnimationSettings.betweenDelay);
    }, enterTime + homeAnimationSettings.visibleDelay);
  };

  cycleHomeTitles();
}

/* Swiper Projects */
const swiperProjects = new Swiper(".projects__swiper", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,
  speed: 600,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/* Work Tabs */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetSelector = tab.dataset.target,
      targetContent = document.querySelector(targetSelector);

    if (!targetContent) return;

    // Disable all content and active tabs
    tabContents.forEach((content) => content.classList.remove("work-active"));
    tabs.forEach((t) => t.classList.remove("work-active"));

    // Active the tab and corresponding content
    tab.classList.add("work-active");
    targetContent.classList.add("work-active");
  });
});

/* Services */
const buttons = document.querySelectorAll(".services__button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const cards = document.querySelectorAll(".services__card");
    const card = button.closest(".services__card");
    const info = card.querySelector(".services__info");

    const isOpen = card.classList.contains("services__open");

    // Close all cards first
    cards.forEach((c) => {
      c.classList.remove("services__open");
      c.classList.add("services__close");

      const i = c.querySelector(".services__info");
      i.style.height = "0px";
    });

    // Open the clicked card
    if (!isOpen) {
      info.style.height = "auto";
      let height = info.scrollHeight + "px";

      card.classList.remove("services__close");
      card.classList.add("services__open");

      info.style.height = height;
    }
  });
});

/* Testimonials of Duplicate Cards */
// Duplicate images to make the animation work
const tracks = document.querySelectorAll(".testimonial__content");

tracks.forEach((track) => {
  if (track.dataset.duplicated === "true") return;

  const cards = [...track.children]; // spread to make a static copy
  const fragment = document.createDocumentFragment();

  // Duplicate cards only once
  for (const card of cards) {
    fragment.appendChild(card.cloneNode(true));
  }

  track.appendChild(fragment);
  track.dataset.duplicated = "true";
});

/* Copy Email In Contact */
const copyBtn = document.getElementById("contact-btn"),
  copyEmailElement = document.getElementById("contact-email");

if (copyBtn && copyEmailElement) {
  const copyEmail = copyEmailElement.textContent,
    copyBtnDefaultContent = copyBtn.innerHTML;

  copyBtn.addEventListener("click", () => {
    //use the clipboard Api to copy text
    navigator.clipboard.writeText(copyEmail).then(() => {
      copyBtn.innerHTML = 'Email copiado <i class="ri-check-line"></i>';

      // Restore the original text
      setTimeout(() => {
        copyBtn.innerHTML = copyBtnDefaultContent;
      }, 2000);
    });
  });
}

/* Current Year of Footer */
const textYear = document.getElementById("footer-year"),
  currentYear = new Date().getFullYear();

//Each year it is updated to the current year
textYear.textContent = currentYear;

/* Scroll Section Active Link */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id, //id of each section
      top = section.offsetTop - 50, // Distance from the top edge
      height = section.offsetHeight, //Element height
      link = document.querySelector(".nav__menu a[href*=" + id + "]"); //id nav link

    if (!link) return;
    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height
    );
  });
};
window.addEventListener("scroll", scrollActive);

/* Custom Cursor */
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0; // Store mouse position

const cursorMove = () => {
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  cursor.style.transform = "translate(-50%, -50%)";

  //update the cursor animation
  requestAnimationFrame(cursorMove);
};
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
cursorMove();

/* Hide custom cursor on links */
const a = document.querySelectorAll("a");

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hide-cursor");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hide-cursor");
  });
});

/* Scroll Reveal Animation */
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 300,
  reset: true, // Animation repeat
});

//home, project and work section animations
sr.reveal(
  `.home__image, .projects__container, .work__container, .testimonials__container, .contact__container`
);
sr.reveal(`.home__data`, { delay: 900, origin: "bottom" });
sr.reveal(`.home__info`, { delay: 1200, origin: "bottom" });
sr.reveal(`.home__social, .home__cv`, { delay: 1200 });
//About section animations
sr.reveal(`.about__data`, { origin: "left" });
sr.reveal(`.about__image`, { origin: "right" });
//services section animation
sr.reveal(`.services__card`, { intervarl: 100 });
