import React from "react";
import { useExchangeReducer } from "./useExchangeReducer";

// ========== useReducer Demo ==========
// This component demonstrates useReducer for managing complex state
// useReducer is preferred over useState when:
// - State logic is complex
// - Next state depends on previous state
// - Multiple related state values

function ReducerDemo() {
    const { state, dispatch } = useExchangeReducer();

    return (
        <div style={{ padding: "20px" }}>
            <h2>useReducer Demo</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
                useReducer manages complex state with actions. Check console for action logs.
            </p>

            <div className="card" style={{ marginBottom: "20px" }}>
                <h3>Amount Input</h3>
                <label>
                    Amount: $
                    <input
                        type="number"
                        value={state.amount}
                        onChange={(e) =>
                            dispatch({ type: "SET_AMOUNT", payload: e.target.value })
                        }
                        style={{ marginLeft: "10px", padding: "8px", width: "150px" }}
                    />
                </label>
                <button
                    onClick={() => dispatch({ type: "SET_TOUCHED" })}
                    style={{ marginLeft: "10px" }}
                >
                    Mark Touched
                </button>
                <p style={{ fontSize: "12px", color: "#888" }}>
                    Touched: {state.touched ? "Yes" : "No"}
                </p>
            </div>

            <div className="card" style={{ marginBottom: "20px" }}>
                <h3>Favorites ({state.favorites.length})</h3>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <button onClick={() => dispatch({ type: "ADD_FAVORITE", payload: "BTC" })}>
                        + BTC
                    </button>
                    <button onClick={() => dispatch({ type: "ADD_FAVORITE", payload: "ETH" })}>
                        + ETH
                    </button>
                    <button onClick={() => dispatch({ type: "ADD_FAVORITE", payload: "SOL" })}>
                        + SOL
                    </button>
                    <button onClick={() => dispatch({ type: "ADD_FAVORITE", payload: "DOGE" })}>
                        + DOGE
                    </button>
                </div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {state.favorites.map((fav) => (
                        <span
                            key={fav}
                            style={{
                                background: "#e0e0e0",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            {fav}
                            <button
                                onClick={() => dispatch({ type: "REMOVE_FAVORITE", payload: fav })}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#666",
                                    padding: "0 4px",
                                }}
                            >
                                x
                            </button>
                        </span>
                    ))}
                    {state.favorites.length === 0 && (
                        <span style={{ color: "#888" }}>No favorites yet</span>
                    )}
                </div>
            </div>

            <div className="card" style={{ marginBottom: "20px" }}>
                <button
                    onClick={() => dispatch({ type: "RESET" })}
                    style={{ background: "#e74c3c" }}
                >
                    Reset All State
                </button>
            </div>

            <div className="card">
                <h3>Current State (Live)</h3>
                <pre
                    style={{
                        background: "#f5f5f5",
                        padding: "15px",
                        borderRadius: "4px",
                        overflow: "auto",
                    }}
                >
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>

            <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
                <h4>useReducer Pattern:</h4>
                <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "4px" }}>
{`const [state, dispatch] = useReducer(reducer, initialState);

// Dispatch actions:
dispatch({ type: "SET_AMOUNT", payload: "100" });
dispatch({ type: "ADD_FAVORITE", payload: "BTC" });
dispatch({ type: "RESET" });`}
                </pre>
            </div>
        </div>
    );
}

export default ReducerDemo;
