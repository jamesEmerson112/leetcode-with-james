import React from "react";

// ========== Class Component Demo ==========
// This demonstrates the same functionality as Main.js using class syntax
// Class components were the primary way to write React before hooks (React 16.8)

// ========== Class vs Functional Comparison ==========
/*
| Feature          | Class Component        | Functional + Hooks        |
|------------------|------------------------|---------------------------|
| State            | this.state, setState   | useState                  |
| Lifecycle        | componentDidMount etc  | useEffect                 |
| Refs             | createRef              | useRef                    |
| Context          | contextType, Consumer  | useContext                |
| Performance      | shouldComponentUpdate  | React.memo, useMemo       |
| Code             | More verbose           | More concise              |
| this binding     | Required               | Not needed                |
*/

class ClassMain extends React.Component {
    // ========== Constructor ==========
    // Initialize state and bind methods
    constructor(props) {
        super(props);

        // State initialization (equivalent to useState)
        this.state = {
            exchangeAmount: "",
            touched: false,
            lastFetchTime: null,
        };

        // Create ref (equivalent to useRef)
        this.inputRef = React.createRef();
        this.renderCount = 0;

        // Bind methods to this (not needed with arrow functions)
        // this.handleChange = this.handleChange.bind(this);
    }

    // ========== Lifecycle Methods ==========

    // componentDidMount: Runs once after first render (like useEffect with [])
    componentDidMount() {
        console.log("Class: componentDidMount - fetching rates...");

        // Simulate API fetch
        this.fetchRates();

        // Auto-focus input
        if (this.inputRef.current) {
            this.inputRef.current.focus();
            console.log("Class: Input auto-focused");
        }
    }

    // componentDidUpdate: Runs after every update (like useEffect with deps)
    componentDidUpdate(prevProps, prevState) {
        this.renderCount++;
        console.log(`Class: componentDidUpdate - render count = ${this.renderCount}`);

        // Check if specific state changed (like useEffect dependency)
        if (prevState.exchangeAmount !== this.state.exchangeAmount) {
            console.log(
                `Class: Amount changed from "${prevState.exchangeAmount}" to "${this.state.exchangeAmount}"`
            );
        }
    }

    // componentWillUnmount: Cleanup (like useEffect return function)
    componentWillUnmount() {
        console.log("Class: componentWillUnmount - cleanup");
    }

    // shouldComponentUpdate: Performance optimization (like React.memo)
    // Return false to prevent re-render
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.exchangeAmount !== this.state.exchangeAmount;
    // }

    // ========== Methods ==========

    fetchRates = async () => {
        // Simulate API call
        this.setState({ lastFetchTime: new Date().toLocaleTimeString() });
        console.log("Class: Rates fetched successfully");
    };

    // Arrow function = auto-bound to this
    handleChange = (e) => {
        console.log("Class: handleChange called");
        this.setState({
            touched: true,
            exchangeAmount: e.target.value,
        });
    };

    handleReset = () => {
        console.log("Class: Resetting form");
        this.setState({
            exchangeAmount: "",
            touched: false,
        });
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    };

    // Calculate error (derived state)
    getError() {
        const { exchangeAmount } = this.state;
        if (exchangeAmount === "") {
            return "Amount cannot be empty";
        } else if (Number(exchangeAmount) < 0.01) {
            return "Amount cannot be less than $0.01";
        } else if (Number(exchangeAmount) > 17042.67) {
            return "Amount cannot exceed the available balance";
        }
        return "";
    }

    // ========== Render ==========
    render() {
        const { exchangeAmount, touched, lastFetchTime } = this.state;
        const error = this.getError();

        return (
            <div className="layout-column align-items-center mx-auto">
                <h1>CryptoRank Exchange (Class Component)</h1>
                {lastFetchTime && (
                    <p className="text-sm">Rates last updated: {lastFetchTime}</p>
                )}
                <section>
                    <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
                        <label>
                            I want to exchange $
                            <input
                                ref={this.inputRef}
                                className="w-10"
                                data-testid="amount-input"
                                required
                                type="number"
                                placeholder="USD"
                                value={exchangeAmount}
                                onChange={this.handleChange}
                            />{" "}
                            of my $<span>17042.67</span>:
                        </label>

                        {touched && error && (
                            <p
                                data-testid="error"
                                className="form-hint error-text mt-3 pl-0 ml-0"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            onClick={this.handleReset}
                            className="mt-10"
                            style={{ padding: "5px 10px" }}
                        >
                            Reset
                        </button>
                    </div>
                </section>

                <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}>
                    <h3>Class Component Notes:</h3>
                    <ul style={{ textAlign: "left", fontSize: "12px" }}>
                        <li>State is an object: this.state = {"{...}"}</li>
                        <li>Update with this.setState({"{...}"})</li>
                        <li>Lifecycle methods instead of useEffect</li>
                        <li>createRef instead of useRef</li>
                        <li>Methods need binding or arrow functions</li>
                        <li>Can't use hooks in class components</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ClassMain;

// ========== Migration Guide ==========
/*
To convert class to functional:

1. Change class declaration:
   class Foo extends React.Component → function Foo(props)

2. Remove constructor, use hooks:
   this.state = {...} → const [state, setState] = useState(...)
   this.ref = createRef() → const ref = useRef()

3. Convert lifecycle methods:
   componentDidMount → useEffect(() => {...}, [])
   componentDidUpdate → useEffect(() => {...}, [deps])
   componentWillUnmount → useEffect(() => { return () => {...} }, [])

4. Remove this:
   this.state.foo → foo (from useState)
   this.props.bar → props.bar or just bar (destructure)
   this.handleClick → handleClick

5. Convert methods to functions:
   handleClick = () => {...} → const handleClick = () => {...}
   or const handleClick = useCallback(() => {...}, [])
*/
