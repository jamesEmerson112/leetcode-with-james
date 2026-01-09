import React from "react";

// ========== createContext Demo ==========
// createContext creates a Context object that components can subscribe to
// Default value is used when no Provider is found above in the tree

export const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => {},
});

// ========== Context Provider Component ==========
// Wraps children and provides theme state to all descendants
export function ThemeProvider({ children }) {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
        console.log("ThemeContext: Theme toggled");
    };

    // The value prop passes data to consuming components
    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// ========== Custom Hook for useContext ==========
// Convenience hook that uses useContext internally
// Provides better error messages and cleaner consumer code
export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

// ========== Example Consumer Component ==========
// Demonstrates how to consume context with useContext
export function ThemeToggleButton() {
    // useContext subscribes to context changes and re-renders when value changes
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: "8px 16px",
                backgroundColor: theme === "light" ? "#fff" : "#333",
                color: theme === "light" ? "#333" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
            }}
        >
            Current: {theme} mode (click to toggle)
        </button>
    );
}
