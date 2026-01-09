import React from "react";
import Main from "./Main";
import ClassMain from "./ClassMain";
import SearchFilter from "./SearchFilter";
import ReducerDemo from "./ReducerDemo";
import { useTheme } from "./ThemeContext";
import "./App.css";

// ========== Tab Configuration ==========
const TABS = [
    {
        id: "exchange",
        label: "Exchange",
        subtitle: "useState, useEffect, useRef, useCallback",
        component: Main,
    },
    {
        id: "class",
        label: "Class Component",
        subtitle: "this.state, lifecycle methods",
        component: ClassMain,
    },
    {
        id: "search",
        label: "Concurrent Features",
        subtitle: "useLayoutEffect, useTransition, useDeferredValue",
        component: SearchFilter,
    },
    {
        id: "reducer",
        label: "useReducer",
        subtitle: "Complex state management",
        component: ReducerDemo,
    },
];

function App() {
    const [activeTab, setActiveTab] = React.useState("exchange");
    const { theme, toggleTheme } = useTheme();

    const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || Main;

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <div>
                    <h1>React API Educational Demos</h1>
                    <p className="subtitle">CryptoRank Exchange - Learn React Hooks</p>
                </div>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === "light" ? "Dark" : "Light"} Mode
                </button>
            </header>

            <nav className="tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-label">{tab.label}</span>
                        <span className="tab-subtitle">{tab.subtitle}</span>
                    </button>
                ))}
            </nav>

            <main className="main-content">
                <ActiveComponent />
            </main>

            <footer className="app-footer">
                <p>Open browser console to see hook logs</p>
                <p className="api-list">
                    APIs covered: useState, useEffect, useRef, useCallback, useMemo, React.memo,
                    useReducer, useContext, createContext, forwardRef, useImperativeHandle,
                    useLayoutEffect, useTransition, useDeferredValue, Class Components
                </p>
            </footer>
        </div>
    );
}

export default App;
