import React from "react";
import { PriceChart } from "./PriceChart";
import { Col, Row, Form } from "react-bootstrap";

const App = () => (
    <Row>
    <Form>
      <Form.Group className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow" controlId="formGroupSymbol">
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>
    </Form>
    <div style={{ height: "90vh" }}>
      <div style={{ backgroundColor: "#191c27", minHeight: "90vh" }}>
        <PriceChart />
      </div>
    </div>
    </Row>  
    
);

export default App;
