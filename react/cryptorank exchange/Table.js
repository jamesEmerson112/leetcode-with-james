import React from "react";
import { cryptocurrencyList } from "../cryptocurrency-list";

// export const cryptocurrencyList = [
//   {
//     code: "BNB",
//     name: "BNB",
//     rate: 0.00311839,
//   },
//   {
//     code: "BTC",
//     name: "Bitcoin",
//     rate: 0.00004066,
//   },
//   {
//     code: "DOGE",
//     name: "Dogecoin",
//     rate: 11.18558722,
//   },
//   {
//     code: "ETH",
//     name: "Ethereum",
//     rate: 0.00059237,
//   },
//   {
//     code: "XRP",
//     name: "XRP",
//     rate: 2.50682634,
//   },
// ];


function Table({exchangeAmount}) {

    // display the data from cryptocurrencyList here in the table
    // if exchangeAmount is empty or less than 0.01, show "n/a"

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
                {cryptocurrencyList.map((crypto) => (
                    <tr key={crypto.code}>
                        <td>{crypto.name}</td>
                        <td>1 USD = {crypto.rate} {crypto.code}</td>
                        <td>{exchangeAmount === "" ? (0).toFixed(8) : (Number(exchangeAmount) < 0.01 || Number(exchangeAmount) > 17042.67 ? "n/a" : (Number(exchangeAmount) * crypto.rate).toFixed(8))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default Table;
