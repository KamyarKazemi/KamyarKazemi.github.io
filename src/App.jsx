import { useEffect, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app" dir="rtl">
      <header className="header fade-in">
        <button
          className={`theme-toggle ${theme}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="icon" />
        </button>
      </header>

      <main className="hero">
        <h1 className="slide-up">
          من کامیار هستم،
          <br />
          توسعه‌دهنده فرانت‌اند
        </h1>

        <p className="fade-delay">
          ۱۷ ساله، کار با React
          <br />
          در حال فعالیت در کارخانه نوآوری شیراز
        </p>

        <a
          className="github fade-delay-2"
          href="https://github.com/your-github-username"
          target="_blank"
        >
          GitHub →
        </a>
      </main>

      <section className="about fade-in">
        <h2>رویکرد من</h2>
        <p>
          تمرکز من روی رابط‌های کاربری ساده، سریع و قابل نگهداری است. علاقه‌مند
          به یادگیری عمیق، نه شلوغ‌کاری.
        </p>
      </section>
    </div>
  );
}
