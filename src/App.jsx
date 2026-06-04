import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import photo from "../public/me.jpeg";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const isRTL = lang === "fa";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  useEffect(() => {
    if (theme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6 },
    },
  };

  const languageVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir === "rtl" ? -30 : 30,
      filter: "blur(10px)",
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35 },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir === "rtl" ? 30 : -30,
      filter: "blur(10px)",
      transition: { duration: 0.25 },
    }),
  };

  const t = {
    en: {
      name: "Kamyar",
      role: "Junior Front-End Developer",
      heroTitle: "Hi, I'm Kamyar",
      caption:
        "Junior front‑end developer focused on building modern and interactive web interfaces. I've been working with Shiraz Startup Company for over a year, collaborating on real projects and constantly improving my skills with React and modern web tools.",
      viewProjects: "View Projects",
      about: "About Me",
      skills: "Toolbox",
      projects: "Projects",
      github: "See more on GitHub",
      instagram: "Instagram",
      available: "Available for projects",
      aboutCards: [
        {
          title: "Experience",
          desc: "Working with Shiraz startup company for more than a year, contributing to real product interfaces.",
        },
        {
          title: "Focus",
          desc: "Building responsive, fast and maintainable UI with React and modern CSS tools.",
        },
        {
          title: "Purpose",
          desc: "My goal is to grow into a strong product engineer by building meaningful software and constantly learning.",
        },
      ],
      projectsList: [
        {
          title: "Personal Portfolio",
          desc: "A modern interactive portfolio built with React and motion.",
        },
        {
          title: "Startup UI Work",
          desc: "Front-end interfaces built for internal startup tools.",
        },
        {
          title: "Reusable Components",
          desc: "A small library of reusable UI components.",
        },
      ],
    },

    fa: {
      name: "کامیار",
      role: "توسعه‌دهنده فرانت‌اند",
      heroTitle: "سلام، من کامیار هستم",
      caption:
        "توسعه‌دهنده فرانت‌اند که روی ساخت رابط‌های کاربری مدرن و تعاملی تمرکز دارد. بیش از یک سال است که در کارخانه نوآوری و فناوری شیراز روی پروژه‌های واقعی کار می‌کنم و مهارت‌هایم را با React و ابزارهای مدرن وب توسعه می‌دهم.",
      viewProjects: "مشاهده پروژه‌ها",
      about: "درباره من",
      skills: "تکنولوژی‌ها",
      projects: "پروژه‌ها",
      github: "مشاهده در گیت‌هاب",
      instagram: "اینستاگرام",
      available: "در دسترس برای پروژه",
      aboutCards: [
        {
          title: "تجربه",
          desc: "بیش از یک سال همکاری با کارخانه نوآوری و فناوری شیراز.",
        },
        {
          title: "تمرکز",
          desc: "ساخت رابط‌های کاربری سریع، ریسپانسیو و تمیز با React.",
        },
        {
          title: "هدف",
          desc: "تبدیل شدن به یک مهندس محصول قوی با ساخت نرم‌افزارهای واقعی.",
        },
      ],
      projectsList: [
        {
          title: "پورتفولیو شخصی",
          desc: "یک وبسایت مدرن با React و motion.",
        },
        {
          title: "پروژه‌های استارتاپی",
          desc: "رابط‌های کاربری برای ابزارهای داخلی استارتاپ.",
        },
        {
          title: "کامپوننت‌های قابل استفاده مجدد",
          desc: "ساخت مجموعه‌ای از کامپوننت‌های React.",
        },
      ],
    },
  };

  const stack = [
    { name: "React", icon: "⚛️", desc: "Hooks, component architecture" },
    { name: "JavaScript", icon: "📜", desc: "Modern ES6+ patterns" },
    { name: "Tailwind / CSS", icon: "🎨", desc: "Responsive UI design" },
    { name: "Git", icon: "🔧", desc: "Version control workflow" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navSections = ["home", "about", "skills", "projects"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={loaded ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-zinc-950 text-zinc-100"
          : "bg-white text-zinc-900"
      }`}
    >
      {/* NAV */}
      <nav className="fixed top-0 w-full backdrop-blur-lg border-b border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-500">{t[lang].name}</div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-6 items-center">
            {navSections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`cursor-pointer opacity-70 hover:opacity-100 transition-opacity ${
                  activeSection === sec ? "opacity-100 text-blue-500" : ""
                }`}
              >
                {t[lang][sec] ?? sec}
              </button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang(lang === "en" ? "fa" : "en")}
              className="cursor-pointer px-3 py-1 border rounded-md"
            >
              {lang === "en" ? "FA" : "EN"}
            </motion.button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer text-xl"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang(lang === "en" ? "fa" : "en")}
              className="cursor-pointer px-2 py-1 border rounded-md text-sm"
            >
              {lang === "en" ? "FA" : "EN"}
            </motion.button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer text-xl"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="cursor-pointer flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-zinc-800"
            >
              <div
                className={`flex flex-col px-4 py-3 gap-1 ${
                  theme === "dark" ? "bg-zinc-900" : "bg-zinc-50"
                }`}
              >
                {navSections.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => scrollToSection(sec)}
                    className={`cursor-pointer text-left py-2 px-2 rounded-lg opacity-70 hover:opacity-100 transition ${
                      activeSection === sec
                        ? "opacity-100 text-blue-500 bg-blue-500/10"
                        : ""
                    }`}
                  >
                    {t[lang][sec] ?? sec}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait" custom={isRTL ? "rtl" : "ltr"}>
        <motion.div
          key={lang}
          variants={languageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={isRTL ? "rtl" : "ltr"}
        >
          {/* HERO */}
          <motion.section
            id="home"
            style={{ opacity: heroOpacity }}
            className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              {/* Text first on mobile */}
              <div className="space-y-5 sm:space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="text-blue-500 text-sm sm:text-base"
                >
                  {t[lang].role}
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                >
                  {t[lang].heroTitle}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-zinc-400 text-base sm:text-lg leading-relaxed"
                >
                  {t[lang].caption}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex gap-3 flex-wrap"
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                  >
                    {t[lang].viewProjects}
                  </button>

                  <a
                    href="https://github.com/KamyarKazemi"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 border rounded-lg hover:bg-zinc-800 transition text-sm sm:text-base"
                  >
                    GitHub
                  </a>

                  <a
                    href="https://instagram.com/kamyar__kazemi?igsh=MmM2MnFsYnRhNnR5"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 border rounded-lg hover:bg-zinc-800 transition text-sm sm:text-base"
                  >
                    {t[lang].instagram}
                  </a>
                </motion.div>
              </div>

              {/* Photo */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-sm mx-auto md:max-w-none"
              >
                <img
                  src={photo}
                  alt={t[lang].name}
                  className="rounded-2xl border border-zinc-800 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-xs sm:text-sm bg-zinc-900/80 px-3 py-1 rounded-full">
                  ● {t[lang].available}
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* ABOUT */}
          <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
                {t[lang].about}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {t[lang].aboutCards.map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="p-5 sm:p-6 border border-zinc-800 rounded-xl"
                  >
                    <h3 className="font-semibold mb-2 sm:mb-3">{c.title}</h3>
                    <p className="text-zinc-400 text-sm sm:text-base">
                      {c.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
                {t[lang].skills}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stack.map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className="p-5 sm:p-6 border border-zinc-800 rounded-xl hover:border-blue-500 transition-colors"
                  >
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                      {s.icon}
                    </div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      {s.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
                {t[lang].projects}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {t[lang].projectsList.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className="p-5 sm:p-6 border border-zinc-800 rounded-xl"
                  >
                    <h3 className="font-bold mb-2 text-sm sm:text-base">
                      {p.title}
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base">
                      {p.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10 sm:mt-12 flex justify-center gap-3 sm:gap-4 flex-wrap">
                <a
                  href="https://github.com/KamyarKazemi"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 border rounded-lg hover:bg-zinc-800 transition text-sm sm:text-base"
                >
                  {t[lang].github}
                </a>

                <a
                  href="https://instagram.com/kamyar__kazemi?igsh=MmM2MnFsYnRhNnR5"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 border rounded-lg hover:bg-zinc-800 transition text-sm sm:text-base"
                >
                  {t[lang].instagram}
                </a>
              </div>
            </div>
          </section>

          <footer className="py-8 sm:py-10 text-center border-t border-zinc-800">
            <p className="text-zinc-400 text-sm sm:text-base">
              Built by {t[lang].name}
            </p>
          </footer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
