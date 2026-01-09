import React from "react";

// Sample data for filtering demo
const sampleCryptos = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Crypto ${i}`,
    symbol: `CRY${i}`,
    price: Math.random() * 10000,
}));

// ========== useLayoutEffect Demo ==========
// useLayoutEffect runs synchronously AFTER DOM mutations but BEFORE browser paint
// Use for: measuring DOM, preventing visual flicker
// useEffect runs AFTER paint (asynchronously)

function TooltipWithMeasurement({ children, tooltipText }) {
    const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
    const [showTooltip, setShowTooltip] = React.useState(false);
    const elementRef = React.useRef(null);

    // useLayoutEffect: Measure element BEFORE browser paints
    // This prevents flicker - tooltip appears in correct position immediately
    React.useLayoutEffect(() => {
        if (showTooltip && elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            console.log("useLayoutEffect: Measuring element", rect);
            setTooltipPosition({
                top: rect.top - 30,
                left: rect.left + rect.width / 2,
            });
        }
    }, [showTooltip]);

    // Compare with useEffect - would cause flicker:
    // React.useEffect(() => { ... }, [showTooltip]);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <span
                ref={elementRef}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
            >
                {children}
            </span>
            {showTooltip && (
                <div
                    style={{
                        position: "fixed",
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        transform: "translateX(-50%)",
                        background: "#333",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        zIndex: 1000,
                    }}
                >
                    {tooltipText}
                </div>
            )}
        </div>
    );
}

// ========== useTransition Demo ==========
// useTransition marks state updates as non-urgent (can be interrupted)
// UI remains responsive during heavy computations
// Returns [isPending, startTransition]

function SearchWithTransition() {
    const [query, setQuery] = React.useState("");
    const [filteredList, setFilteredList] = React.useState(sampleCryptos);
    const [isPending, startTransition] = React.useTransition();

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value); // Urgent: update input immediately

        // Non-urgent: filter list can be interrupted if user keeps typing
        startTransition(() => {
            console.log("useTransition: Starting filter...");
            // Simulate expensive filtering
            const filtered = sampleCryptos.filter((crypto) =>
                crypto.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredList(filtered);
            console.log("useTransition: Filter complete, found", filtered.length);
        });
    };

    return (
        <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h3>useTransition Demo</h3>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search cryptos..."
                style={{ padding: "8px", width: "200px" }}
            />
            {isPending && <span style={{ marginLeft: "10px", color: "#888" }}>Filtering...</span>}
            <p>Found: {filteredList.length} results</p>
            <div style={{ maxHeight: "150px", overflow: "auto" }}>
                {filteredList.slice(0, 10).map((crypto) => (
                    <div key={crypto.id}>{crypto.name} - ${crypto.price.toFixed(2)}</div>
                ))}
                {filteredList.length > 10 && <div>... and {filteredList.length - 10} more</div>}
            </div>
        </div>
    );
}

// ========== useDeferredValue Demo ==========
// useDeferredValue defers updating a value until urgent updates complete
// Simpler API than useTransition - just wrap the value
// Good for: search inputs, expensive renders

function SearchWithDeferredValue() {
    const [query, setQuery] = React.useState("");
    // Deferred value lags behind actual query during rapid updates
    const deferredQuery = React.useDeferredValue(query);

    // This filtering uses the deferred (stale) value
    // So UI stays responsive while typing
    const filteredList = React.useMemo(() => {
        console.log("useDeferredValue: Filtering with query:", deferredQuery);
        return sampleCryptos.filter((crypto) =>
            crypto.name.toLowerCase().includes(deferredQuery.toLowerCase())
        );
    }, [deferredQuery]);

    // Visual indicator when deferred value is stale
    const isStale = query !== deferredQuery;

    return (
        <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h3>useDeferredValue Demo</h3>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cryptos..."
                style={{ padding: "8px", width: "200px" }}
            />
            {isStale && <span style={{ marginLeft: "10px", color: "#888" }}>Updating...</span>}
            <p>Query: "{query}" → Deferred: "{deferredQuery}"</p>
            <div style={{ opacity: isStale ? 0.7 : 1, maxHeight: "150px", overflow: "auto" }}>
                {filteredList.slice(0, 10).map((crypto) => (
                    <div key={crypto.id}>{crypto.name} - ${crypto.price.toFixed(2)}</div>
                ))}
                {filteredList.length > 10 && <div>... and {filteredList.length - 10} more</div>}
            </div>
        </div>
    );
}

// ========== Combined Demo Component ==========
export default function SearchFilter() {
    return (
        <div style={{ padding: "20px" }}>
            <h2>React 18 Concurrent Features Demo</h2>

            <div style={{ marginBottom: "20px" }}>
                <h3>useLayoutEffect Demo</h3>
                <p>
                    Hover over{" "}
                    <TooltipWithMeasurement tooltipText="Measured with useLayoutEffect!">
                        this text
                    </TooltipWithMeasurement>{" "}
                    to see a positioned tooltip.
                </p>
            </div>

            <SearchWithTransition />
            <SearchWithDeferredValue />

            <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
                <h4>When to use each:</h4>
                <ul>
                    <li><strong>useLayoutEffect:</strong> DOM measurements, prevent visual flicker</li>
                    <li><strong>useTransition:</strong> Wrap state setters, get isPending status</li>
                    <li><strong>useDeferredValue:</strong> Defer a value, simpler than useTransition</li>
                </ul>
            </div>
        </div>
    );
}

// Export individual components for separate use
export { TooltipWithMeasurement, SearchWithTransition, SearchWithDeferredValue };
