/* ============================================================
   عظمة وجلال مصر — Bootstrap version
   ============================================================ */

const translations = {
  ar: {
    "brand": "مصر",
    "nav.home": "الرئيسية",
    "nav.ancient": "الحضارة",
    "nav.nile": "النيل",
    "nav.modern": "النهضة",
    "nav.people": "الشعب",
    "hero.title": "عظمة وجلال مصر",
    "hero.subtitle": "إرث سبعة آلاف عام يضيء المستقبل",
    "hero.cta": "اكتشف الخلود",
    "ancient.title": "فجر التاريخ",
    "ancient.desc":
      "حيث بدأ الزمن، ترك أجدادنا معجزات محفورة في الحجر، تتحدى الفناء وتروي قصة أمة علمت البشرية معنى الخلود.",
    "nile.title": "شريان الحياة",
    "nile.desc":
      "هبة السماء، يجري في عروقنا قبل أن يجري في أرضنا. النيل ليس مجرد نهر، بل هو شاهد على حضارتنا ورفيق دربنا إلى الأبد.",
    "modern.title": "نهضة تتجدد",
    "modern.desc":
      "كما بنينا الأهرامات بالأمس، نبني اليوم ناطحات السحاب والمتاحف العظيمة. روح مصر لا تشيخ، بل تتجدد مع كل جيل.",
    "people.title": "روح مصر",
    "people.desc":
      "في ابتسامة فلاح، وإصرار عالم، وعزيمة رياضي. أعظم ثروات مصر هي شعبها الأصيل، صانع المعجزات في كل زمان ومكان.",
    "gallery.title": "لمحات من الخلود",
    "footer.text": "صنع بكل فخر من أجل مصر",
    "by.text": "صنع الطالب معاذ محسن عبدالله",
    "j6.text": "طالب في الصف السادس الابتدائي",
    "school.text": "مدرسة الرحمن الخاصة",
    "leader_school.text": "مديرة المدرسة شيرين عبد الجواد الديب",
    "lang.toggle": "EN",
  },
  en: {
    "brand": "EGYPT",
    "nav.home": "Home",
    "nav.ancient": "Civilization",
    "nav.nile": "The Nile",
    "nav.modern": "Renaissance",
    "nav.people": "The People",
    "hero.title": "The Glory and Majesty of Egypt",
    "hero.subtitle": "A 7,000-year legacy illuminating the future",
    "hero.cta": "Discover Eternity",
    "ancient.title": "Dawn of History",
    "ancient.desc":
      "Where time began, our ancestors left miracles carved in stone, defying mortality and telling the story of a nation that taught humanity the meaning of eternity.",
    "nile.title": "The River of Life",
    "nile.desc":
      "A gift from heaven, it flows in our veins before flowing through our lands. The Nile is not just a river; it is a witness to our civilization and our eternal companion.",
    "modern.title": "A Renewed Renaissance",
    "modern.desc":
      "Just as we built the pyramids yesterday, today we build skyscrapers and grand museums. The spirit of Egypt does not age; it renews with every generation.",
    "people.title": "The Soul of Egypt",
    "people.desc":
      "In the smile of a farmer, the persistence of a scientist, and the determination of an athlete. Egypt's greatest wealth is its authentic people, the miracle-makers in every era.",
    "gallery.title": "Glimpses of Eternity",
    "footer.text": "Made With Pride For Egypt",
    "by.text": "By Student Moaaz Mohsen Abdallah",
    "j6.text": "Six'Th Grade Student",
    "school.text": "Al Rahman Private School",
    "leader_school.text": "School principal Sherine Abdel Gawad El Deeb",
    "lang.toggle": "عربي",
  },
};

const STORAGE_KEY = "app-lang";
const BOOTSTRAP_RTL =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";
const BOOTSTRAP_LTR =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

/* ---------- Language ---------- */
function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "ar" || saved === "en" ? saved : "ar";
}

function applyLanguage(lang) {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Swap Bootstrap stylesheet (RTL ↔ LTR)
  const bsLink = document.getElementById("bootstrap-css");
  if (bsLink) {
    bsLink.setAttribute("href", lang === "ar" ? BOOTSTRAP_RTL : BOOTSTRAP_LTR);
  }

  // Translate all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  // Toggle button label
  const toggle = document.getElementById("lang-toggle");
  if (toggle) toggle.textContent = translations[lang]["lang.toggle"];

  document.title = `${translations[lang]["hero.title"]} | Egypt`;
  localStorage.setItem(STORAGE_KEY, lang);
}

function toggleLanguage() {
  const current = document.documentElement.getAttribute("lang") || "ar";
  applyLanguage(current === "ar" ? "en" : "ar");
}

/* ---------- Sticky navbar on scroll ---------- */
function setupNavbarScroll() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Hero parallax + fade ---------- */
function setupHeroParallax() {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  const onScroll = () => {
    const y = window.scrollY;
    const translate = Math.min(y * 0.35, 300);
    const opacity = Math.max(1 - y / 600, 0);
    heroBg.style.transform = `translate3d(0, ${translate}px, 0) scale(1.05)`;
    heroBg.style.opacity = opacity.toString();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Reveal-on-scroll ---------- */
function setupReveals() {
  // Add the .reveal class to content blocks for animation
  const targets = document.querySelectorAll(
    ".content-section .row > [class*='col-'], .content-section .text-center"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Auto-close mobile navbar on link click ---------- */
function setupNavbarAutoClose() {
  const collapseEl = document.getElementById("mainNav");
  if (!collapseEl) return;

  collapseEl.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (collapseEl.classList.contains("show")) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(collapseEl) ||
          new bootstrap.Collapse(collapseEl, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
}

/* ---------- Init ---------- */
function init() {
  applyLanguage(getInitialLang());

  const toggle = document.getElementById("lang-toggle");
  if (toggle) toggle.addEventListener("click", toggleLanguage);

  setupNavbarScroll();
  setupHeroParallax();
  setupReveals();
  setupNavbarAutoClose();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
