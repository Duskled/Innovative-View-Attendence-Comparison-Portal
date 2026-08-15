const THEME_KEY = "innovative-view-theme";

function activeTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function initThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  let theme = activeTheme();

  const render = () => {
    document.documentElement.dataset.theme = theme;
    const targetTheme = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${targetTheme} theme`);
    button.setAttribute("title", `Switch to ${targetTheme} theme`);
    button.setAttribute("aria-pressed", String(theme === "light"));
  };

  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The theme still changes for this page when storage is unavailable.
    }
    render();
  });

  render();
}
