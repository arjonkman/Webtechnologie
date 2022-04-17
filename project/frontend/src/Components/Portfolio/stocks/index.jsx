import React from 'react';	
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { tsvParse } from "d3-dsv";
import { Button } from 'react-bootstrap';

//  (stock['stock'], amount{stock['amount'])
//fetch(`http://localhost:5000/api/v1/stocks?function=SELL&session_id=${cookies.session_id}&symbol=${stock}&amount=${amount}`)	


export default function Stocks() {
    const [cookies, setCookie] = useCookies(['session_id']);
    const [stocks, setStocks] = useState([]);
    
    
    function handleSubmit (event) {
        console.log(event.target.id + " " + event.target.value + " " + event.target.name);
        fetch(`http://localhost:5000/api/v1/stocks?function=SELL&id=${event.target.id}&stock=${event.target.name}&amount=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            UpdateData(cookies, setStocks);
        });
    }

    useEffect(() => {
        UpdateData(cookies, setStocks);
    }, []);
    return (
        <div>
            <h1>Stocks</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Shares</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock['id']}>
                            <td>{stock['stock']}</td>
                            <td>{stock['amount']}</td>
                            <td>${stock['buy']}</td>
                            <td>${stock['sell']}</td>
                            <td><Button variant="danger" id={stock['id']} name={stock['stock']} value={stock['amount']} onClick={handleSubmit}>Sell</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UpdateData(cookies, setStocks) {
    fetch(`http://localhost:5000/api/v1/account?function=STOCKS&session_id=${cookies.session_id}`)
        .then((res) => res.text())
        .then((text) => tsvParse(text))
        .then((text) => setStocks(text));
}
