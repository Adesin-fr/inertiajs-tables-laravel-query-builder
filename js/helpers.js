import { twMerge } from "tailwind-merge";

export function get_theme_part(keys, fallbackTheme, themeVariables, ui) {
    let currentFallbackTheme = fallbackTheme ? { ...fallbackTheme } : {};
    let fallbackThemeClasses = null;
    let currentThemeVariables = themeVariables ? { ...themeVariables } : {};
    let themeVariableClasses = null;
    let currentUi = ui ? { ...ui } : {};
    let uiClasses = null;
    for (const key of keys) {
        if (fallbackThemeClasses === null) {
            if (key in currentFallbackTheme) {
                currentFallbackTheme = currentFallbackTheme[key];
                if (typeof currentFallbackTheme === "string") {
                    fallbackThemeClasses = currentFallbackTheme;
                }
            }
        }
        if (themeVariableClasses === null) {
            if (key in currentThemeVariables) {
                currentThemeVariables = currentThemeVariables[key];
                if (typeof currentThemeVariables === "string") {
                    themeVariableClasses = currentThemeVariables;
                }
            }
        }
        if (uiClasses === null) {
            if (key in currentUi) {
                currentUi = currentUi[key];
                if (typeof currentUi === "string") {
                    uiClasses = currentUi;
                }
            }
        }
    }
    return twMerge(fallbackThemeClasses, themeVariableClasses, uiClasses);
}