import { useState, useEffect } from "react";
import { PriceChart } from "./PriceChart";
import { Col, Row, Form } from "react-bootstrap";

function App() {
  const [symbols, setSymbols] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/v1/stocks?function=GET_SYMBOLS")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const symbol_component = data.map(symbol => {
          return <option value={symbol['symbol']} key={symbol['symbol']}>{symbol['symbol']}</option>
        });
        setSymbols(symbol_component);
      });
  }, []);

  return (
    <Row>
      <Col>
        <Form.Group className="mx-0 border-0 shadow" controlId="formGroupSymbol">
          <Form.Select aria-label="Stock symbol chooser">
            {symbols}
          </Form.Select>
        </Form.Group>
      </Col>
      <div style={{ height: "90vh" }}>
        <div style={{ backgroundColor: "#191c27", minHeight: "90vh" }}>
          <PriceChart />
        </div>
      </div>
    </Row>
  );
}

export default App;
