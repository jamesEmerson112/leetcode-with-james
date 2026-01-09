import React from "react";
import Table from "./Table";

function Main() {
    const [exchangeAmount, setExchangeAmount] = React.useState("");
    const [touched, setTouched] = React.useState(false);

    // if exchangeAmount is empty, less than 0.01 or exceeds 17042.67, show the appropriate error message
    let error = "";
    if (exchangeAmount === "" ) {
        error = "Amount cannot be empty";
    } else if (Number(exchangeAmount) < 0.01) {
        error = "Amount cannot be less than $0.01";
    } else if (Number(exchangeAmount) > 17042.67) {
        error = "Amount cannot exceed the available balance";
    }

    const handleChange = (e) => {
        setTouched(true);
        setExchangeAmount(e.target.value);
    }

    return (
        <div className="layout-column align-items-center mx-auto">
        <h1>CryptoRank Exchange</h1>
        <section>
            <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
            <label>
                I want to exchange $ <input className="w-10" data-testid="amount-input" required type="number" placeholder="USD" value={exchangeAmount} 
                onChange={handleChange}/> of my $
                <span>17042.67</span>:
            </label>
            <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0" style={{visibility: touched && error ? 'visible' : 'hidden'}}>
                {error}
            </p>
            {/* The errors can be Amount cannot be empty /be less than $0.01/exceed the available balance */}
            </div>
        </section>
        <Table exchangeAmount={exchangeAmount}/>
        </div>
    );
}

export default Main;
