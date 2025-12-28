import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [githubStats, setGithubStats] = useState(null);
  const [mousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.github.com/users/KamyarKazemi", {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setGithubStats({
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        });
      })
      .catch(() => {
        setGithubStats({
          public_repos: 12,
          followers: 8,
          following: 15,
        });
      });

    return () => controller.abort();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const skills = [
    { name: "React", level: 100, icon: "⚛️" },
    { name: "JavaScript", level: 100, icon: "📜" },
    { name: "CSS/Tailwind", level: 100, icon: "🎨" },
    { name: "Git", level: 75, icon: "🔧" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-zinc-950 text-zinc-100"
          : "bg-white text-zinc-900"
      }`}
      dir="rtl"
    >
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full blur-3xl opacity-20"
        style={{
          width: 400,
          height: 400,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          background: theme === "dark" ? "rgb(59 130 246)" : "rgb(37 99 235)",
        }}
      />

      <nav
        className={`fixed top-0 w-full backdrop-blur-lg border-b z-50 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-zinc-900/80 border-zinc-800"
            : "bg-white/80 border-zinc-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-blue-500"
          >
            کامیار
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex gap-8"
          >
            {["خانه", "درباره", "مهارت‌ها", "گیت‌هاب"].map((item, idx) => (
              <button
                key={idx}
                onClick={() =>
                  scrollToSection(["home", "about", "skills", "github"][idx])
                }
                className={`transition-colors relative bg-transparent border-none cursor-pointer ${
                  theme === "dark"
                    ? "text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {item}
                {activeSection ===
                  ["home", "about", "skills", "github"][idx] && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 right-0 left-0 h-0.5 bg-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-colors ${
              theme === "dark"
                ? "bg-zinc-800 border-zinc-700"
                : "bg-zinc-100 border-zinc-300"
            }`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>
        </div>
      </nav>

      <motion.section
        id="home"
        style={{ opacity, scale }}
        className="relative pt-32 pb-20 px-6 z-10"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className={`inline-block px-4 py-2 border rounded-full text-sm transition-colors ${
                theme === "dark"
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-zinc-100 border-zinc-300"
              }`}
            >
              توسعه‌دهنده فرانت‌اند
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              سلام، من <span className="text-blue-500">کامیار</span> هستم
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-400 leading-relaxed"
            >
              ۱۷ ساله، علاقه‌مند به ساخت تجربه‌های کاربری جذاب و تعاملی با React
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {["React Developer", "کارخانه نوآوری شیراز", "Junior Dev"].map(
                (tag, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-800"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("github")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors cursor-pointer border-none"
              >
                مشاهده پروژه‌ها
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/KamyarKazemi"
                target="_blank"
                className={`px-8 py-3 border rounded-lg font-semibold transition-colors ${
                  theme === "dark"
                    ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                    : "bg-zinc-100 hover:bg-zinc-200 border-zinc-300"
                }`}
              >
                GitHub
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-blue-500 rounded-full blur-3xl"
            />
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kamyar&backgroundColor=b6e3f4"
                alt="کامیار"
                className={`w-full max-w-md mx-auto rounded-2xl border-2 transition-colors ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`absolute bottom-6 left-6 px-4 py-2 backdrop-blur-sm border rounded-full flex items-center gap-2 transition-colors ${
                  theme === "dark"
                    ? "bg-zinc-900/90 border-zinc-700"
                    : "bg-white/90 border-zinc-300"
                }`}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-sm">در دسترس برای پروژه</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            درباره من
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "💻",
                title: "تخصص من",
                desc: "تمرکز روی ساخت رابط‌های کاربری سریع، زیبا و قابل استفاده با React و تکنولوژی‌های مدرن",
              },
              {
                icon: "🎯",
                title: "هدف من",
                desc: "یادگیری مستمر و عمیق، نه سطحی. ساختن پروژه‌هایی که واقعاً مفید باشند",
              },
              {
                icon: "🚀",
                title: "محیط کاری",
                desc: "فعال در کارخانه نوآوری شیراز و همکاری در پروژه‌های استارتاپی",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`p-8 border rounded-2xl transition-all ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800 hover:border-blue-500"
                    : "bg-white border-zinc-200 hover:border-blue-400"
                }`}
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            مهارت‌های من
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {skills.map((skill, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <span className="text-blue-500 font-semibold">
                    {skill.level}%
                  </span>
                </div>
                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="github" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            آمار گیت‌هاب
          </motion.h2>

          <AnimatePresence mode="wait">
            {githubStats ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  {
                    icon: "📦",
                    value: githubStats.public_repos,
                    label: "مخزن عمومی",
                  },
                  { icon: "👥", value: githubStats.followers, label: "فالوور" },
                  {
                    icon: "💫",
                    value: githubStats.following,
                    label: "فالوینگ",
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className={`p-8 border rounded-2xl text-center transition-all ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-800 hover:border-blue-500"
                        : "bg-white border-zinc-200 hover:border-blue-400"
                    }`}
                  >
                    <div className="text-5xl mb-4">{stat.icon}</div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        duration: 0.6,
                        delay: idx * 0.1,
                      }}
                      className="text-4xl font-bold text-blue-500 mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <div
                      className={
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-zinc-400 py-12"
              >
                در حال بارگذاری...
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/KamyarKazemi"
              target="_blank"
              className={`inline-flex items-center gap-3 px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 hover:border-blue-500"
                  : "bg-white hover:bg-zinc-50 border-zinc-300 hover:border-blue-400"
              }`}
            >
              <span>مشاهده پروفایل گیت‌هاب</span>
              <motion.span
                animate={{ x: [-5, 0, -5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ←
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer
        className={`border-t backdrop-blur-sm py-8 text-center relative z-10 transition-colors ${
          theme === "dark"
            ? "border-zinc-800 bg-zinc-900/50"
            : "border-zinc-200 bg-zinc-50/50"
        }`}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}
        >
          ساخته شده با ❤️ توسط کامیار
        </motion.p>
        <p
          className={`text-sm mt-2 ${
            theme === "dark" ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          2024
        </p>
      </footer>
    </div>
  );
}
