import React from "react";
import { cryptocurrencyList } from "./cryptocurrency-list";

// ========== React.memo Demo ==========
// memo is a Higher Order Component (HOC) that memoizes the component
// It only re-renders if props change (shallow comparison)
// Wrap the component at export for cleaner code

function Table({ exchangeAmount, sortOrder = "name" }) {
    // Track renders to demonstrate memo effectiveness
    console.log("Table: Rendering with amount =", exchangeAmount);

    // ========== useMemo Demo ==========
    // useMemo memoizes expensive calculations
    // Only recalculates when dependencies change
    const sortedCryptos = React.useMemo(() => {
        console.log("useMemo: Sorting crypto list...");

        // Simulate expensive operation
        const sorted = [...cryptocurrencyList].sort((a, b) => {
            if (sortOrder === "rate") {
                return b.rate - a.rate; // High to low
            }
            return a.name.localeCompare(b.name); // Alphabetical
        });

        return sorted;
    }, [sortOrder]); // Only re-sort when sortOrder changes

    // ========== useMemo for calculated values ==========
    // Memoize the calculated coin amounts
    const calculatedAmounts = React.useMemo(() => {
        console.log("useMemo: Calculating amounts...");

        const amount = Number(exchangeAmount);
        const isValid = exchangeAmount !== "" && amount >= 0.01 && amount <= 17042.67;

        return sortedCryptos.map((crypto) => ({
            ...crypto,
            coins: isValid
                ? (amount * crypto.rate).toFixed(8)
                : exchangeAmount === ""
                    ? (0).toFixed(8)
                    : "n/a",
        }));
    }, [exchangeAmount, sortedCryptos]);

    return (
        <div className="card card-text mt-10 mx-4">
        <table className="mb-0">
            <thead>
            <tr>
                <th>Cryptocurrency</th>
                <th>Exchange Rate</th>
                <th>Number of Coins</th>
            </tr>
            </thead>
            <tbody data-testid="exchange-data">
                {calculatedAmounts.map((crypto) => (
                    <tr key={crypto.code}>
                        <td>{crypto.name}</td>
                        <td>1 USD = {crypto.rate} {crypto.code}</td>
                        <td>{crypto.coins}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

// ========== React.memo Export ==========
// Wrapping with memo prevents re-renders when parent re-renders
// but props haven't changed
// You can also pass a custom comparison function as second argument:
// export default React.memo(Table, (prevProps, nextProps) => {
//     return prevProps.exchangeAmount === nextProps.exchangeAmount;
// });

export default React.memo(Table);
