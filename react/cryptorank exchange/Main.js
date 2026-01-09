import React from "react";
import Table from "./Table";

function Main() {
    return (
        <div className="layout-column align-items-center mx-auto">
        <h1>CryptoRank Exchange</h1>
        <section>
            <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
            <label>
                I want to exchange $ <input className="w-10" data-testid="amount-input" required type="number" placeholder="USD" value={0} /> of my $
                <span>17042.67</span>:
            </label>
            <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
                {"Amount cannot be empty"}
            </p>
            {/* The errors can be Amount cannot be empty /be less than $0.01/exceed the available balance */}
            </div>
        </section>
        <Table />
        </div>
    );
}

export default Main;
