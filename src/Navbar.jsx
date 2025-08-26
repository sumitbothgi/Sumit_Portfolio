import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from local storage
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main className="p-6">
        <p>This is my portfolio content 🚀</p>
      </main>
    </div>
  );
}

export default App;
