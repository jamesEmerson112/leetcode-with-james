import React from "react";
import Table from "./Table";

function Main() {
    // ========== useState Demo ==========
    // Basic state management for form input and validation
    const [exchangeAmount, setExchangeAmount] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const [lastFetchTime, setLastFetchTime] = React.useState(null);

    // ========== useRef Demo ==========
    // 1. DOM reference - for auto-focusing input
    const inputRef = React.useRef(null);
    // 2. Mutable value that persists across renders (doesn't cause re-render)
    const renderCount = React.useRef(0);
    const prevAmountRef = React.useRef("");

    // ========== useEffect Demo ==========
    // Effect 1: Runs once on mount (empty dependency array)
    // Simulates fetching crypto rates from an API
    React.useEffect(() => {
        console.log("useEffect: Component mounted - fetching rates...");
        // Simulate API fetch
        const fetchRates = async () => {
            // In real app: const response = await fetch('https://api.example.com/rates');
            setLastFetchTime(new Date().toLocaleTimeString());
            console.log("useEffect: Rates fetched successfully");
        };
        fetchRates();

        // Auto-focus the input on mount
        if (inputRef.current) {
            inputRef.current.focus();
            console.log("useRef: Input auto-focused");
        }

        // Cleanup function (runs on unmount)
        return () => {
            console.log("useEffect: Component unmounting - cleanup");
        };
    }, []); // Empty array = run once on mount

    // Effect 2: Runs when exchangeAmount changes
    React.useEffect(() => {
        // Track render count (useRef - doesn't trigger re-render)
        renderCount.current += 1;
        console.log(`useRef: Render count = ${renderCount.current}`);

        // Track previous value
        console.log(`useRef: Previous amount was "${prevAmountRef.current}", now "${exchangeAmount}"`);
        prevAmountRef.current = exchangeAmount;
    }, [exchangeAmount]);

    // if exchangeAmount is empty, less than 0.01 or exceeds 17042.67, show the appropriate error message
    let error = "";
    if (exchangeAmount === "" ) {
        error = "Amount cannot be empty";
    } else if (Number(exchangeAmount) < 0.01) {
        error = "Amount cannot be less than $0.01";
    } else if (Number(exchangeAmount) > 17042.67) {
        error = "Amount cannot exceed the available balance";
    }

    // ========== useCallback Demo ==========
    // useCallback memoizes functions to prevent recreation on every render
    // Important when passing callbacks to memoized child components
    // Without useCallback, a new function is created each render,
    // causing memo'd children to re-render unnecessarily
    const handleChange = React.useCallback((e) => {
        console.log("useCallback: handleChange called");
        setTouched(true);
        setExchangeAmount(e.target.value);
    }, []); // Empty deps = function never changes

    // Example with dependencies - function updates when deps change
    const handleReset = React.useCallback(() => {
        console.log("useCallback: Resetting form");
        setExchangeAmount("");
        setTouched(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []); // inputRef is a ref, doesn't need to be in deps

    return (
        <div className="layout-column align-items-center mx-auto">
        <h1>CryptoRank Exchange</h1>
        {lastFetchTime && <p className="text-sm">Rates last updated: {lastFetchTime}</p>}
        <section>
            <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
            <label>
                I want to exchange $ 
                <input ref={inputRef} className="w-10" data-testid="amount-input" required type="number" placeholder="USD" value={exchangeAmount}
                onChange={handleChange}/> of my $
                <span>17042.67</span>:
            </label>
            {/* <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0" style={{visibility: touched && error ? 'visible' : 'hidden'}}>
                {error}
            </p> */}

            {touched && error && (
                <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
                    {error}
                </p>
            )}
            <button onClick={handleReset} className="mt-10" style={{ padding: "5px 10px" }}>
                Reset
            </button>
            {/* The errors can be Amount cannot be empty /be less than $0.01/exceed the available balance */}
            </div>
        </section>
        <Table exchangeAmount={exchangeAmount} error={error}/>
        </div>
    );
}

export default Main;
