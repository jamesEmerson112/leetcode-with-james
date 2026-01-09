import React from "react";
import { cryptocurrencyList } from "../cryptocurrency-list";

function Table() {
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
            <tr>
                <td>Currency Name</td>
                <td>1 USD = Currency Rate Currency Code</td>
                <td>n/a</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Table;
