const theme = {
    DARK: "dark",
    LIGHT: "light",
};
function calculateCurrentTheme(localStorageTheme, systemSettingDark) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return theme.DARK;
    }

    return theme.LIGHT;
}

const htmlElement = document.querySelector("html");
const themeTogglerCheckbox = document.querySelector("#theme-toggler-checkbox");

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateCurrentTheme(
    localStorageTheme,
    systemSettingDark
);

htmlElement.className = currentThemeSetting;
themeTogglerCheckbox.checked = currentThemeSetting === theme.DARK;

themeTogglerCheckbox.addEventListener("click", () => {
    const newTheme =
        currentThemeSetting === theme.DARK ? theme.LIGHT : theme.DARK;

    htmlElement.className = newTheme;

    localStorage.setItem("theme", newTheme);

    currentThemeSetting = newTheme;
});
