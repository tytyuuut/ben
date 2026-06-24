const menuLinks = document.querySelectorAll(".menu-link");
const sections = document.querySelectorAll(".section");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const typingText = document.querySelector("#typing-text");

if (window.AOS) {
  AOS.init();
}

if (window.Swiper) {
  new Swiper(".tool-swiper", {
    loop: true,
    speed: 650,
    spaceBetween: 18,
    autoplay: {
      delay: 2200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".tool-swiper-next",
      prevEl: ".tool-swiper-prev",
    },
    pagination: {
      el: ".tool-swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      680: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 4,
      },
    },
  });
}

if (window.Fancybox) {
  Fancybox.bind("[data-fancybox]", {});
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      menuLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-38% 0px -48% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === `${target}-panel`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

if (typingText) {
  const typingLines = ["大家好我是Andy", "是一位設計師", "也是一位工程師"];
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const runTypewriter = () => {
    const currentLine = typingLines[lineIndex];
    typingText.textContent = currentLine.slice(0, charIndex);

    if (!isDeleting && charIndex < currentLine.length) {
      charIndex += 1;
      window.setTimeout(runTypewriter, 120);
      return;
    }

    if (!isDeleting && charIndex === currentLine.length) {
      isDeleting = true;
      window.setTimeout(runTypewriter, 1200);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(runTypewriter, 58);
      return;
    }

    isDeleting = false;
    lineIndex = (lineIndex + 1) % typingLines.length;
    window.setTimeout(runTypewriter, 320);
  };

  runTypewriter();
}
