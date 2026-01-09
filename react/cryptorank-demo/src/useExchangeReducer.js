import React from "react";

// ========== useReducer Demo ==========
// useReducer is preferred over useState when:
// 1. State logic is complex (multiple sub-values)
// 2. Next state depends on previous state
// 3. You want to centralize state update logic

// Action types (constants prevent typos)
export const ACTIONS = {
    SET_AMOUNT: "SET_AMOUNT",
    SET_TOUCHED: "SET_TOUCHED",
    ADD_FAVORITE: "ADD_FAVORITE",
    REMOVE_FAVORITE: "REMOVE_FAVORITE",
    RESET: "RESET",
};

// Initial state object
const initialState = {
    amount: "",
    touched: false,
    favorites: [], // List of favorite crypto codes
    history: [],   // Transaction history
};

// ========== Reducer Function ==========
// Pure function: (state, action) => newState
// Must not mutate state directly - return new object
function exchangeReducer(state, action) {
    console.log("useReducer: Action dispatched", action.type, action.payload);

    switch (action.type) {
        case ACTIONS.SET_AMOUNT:
            return {
                ...state, // Spread existing state
                amount: action.payload,
                touched: true,
            };

        case ACTIONS.SET_TOUCHED:
            return {
                ...state,
                touched: action.payload,
            };

        case ACTIONS.ADD_FAVORITE:
            // Only add if not already in favorites
            if (state.favorites.includes(action.payload)) {
                return state;
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };

        case ACTIONS.REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((code) => code !== action.payload),
            };

        case ACTIONS.RESET:
            return {
                ...initialState,
                favorites: state.favorites, // Keep favorites on reset
            };

        default:
            // Throw error for unknown actions (helps catch bugs)
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

// ========== Custom Hook using useReducer ==========
// Encapsulates reducer logic and provides clean API
export function useExchangeReducer() {
    const [state, dispatch] = React.useReducer(exchangeReducer, initialState);

    // Helper functions that dispatch actions
    // These provide a cleaner API than raw dispatch calls
    const actions = {
        setAmount: (amount) => dispatch({ type: ACTIONS.SET_AMOUNT, payload: amount }),
        setTouched: (touched) => dispatch({ type: ACTIONS.SET_TOUCHED, payload: touched }),
        addFavorite: (code) => dispatch({ type: ACTIONS.ADD_FAVORITE, payload: code }),
        removeFavorite: (code) => dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: code }),
        reset: () => dispatch({ type: ACTIONS.RESET }),
    };

    // Calculate derived state (error message)
    let error = "";
    if (state.amount === "") {
        error = "Amount cannot be empty";
    } else if (Number(state.amount) < 0.01) {
        error = "Amount cannot be less than $0.01";
    } else if (Number(state.amount) > 17042.67) {
        error = "Amount cannot exceed the available balance";
    }

    return {
        state: { ...state, error },
        actions,
        dispatch, // Also expose raw dispatch if needed
    };
}

// ========== Example Usage ==========
/*
function ExampleComponent() {
    const { state, actions } = useExchangeReducer();

    return (
        <div>
            <input
                value={state.amount}
                onChange={(e) => actions.setAmount(e.target.value)}
            />
            {state.touched && state.error && <p>{state.error}</p>}

            <button onClick={() => actions.addFavorite("BTC")}>
                Add BTC to favorites
            </button>

            <button onClick={actions.reset}>Reset</button>

            <p>Favorites: {state.favorites.join(", ")}</p>
        </div>
    );
}
*/
