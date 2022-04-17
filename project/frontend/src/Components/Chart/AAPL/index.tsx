import React from "react";
import { PriceChart } from "./PriceChart";
import { Col, Row, Button } from "react-bootstrap";

const AAPL = () => (
    <Row>
      <Col>
        <Button>
          BUY
        </Button>
        <input type="number" />
      </Col>
    <div style={{ height: "90vh" }}>
      <div style={{ backgroundColor: "#191c27", minHeight: "90vh" }}>
        <PriceChart />
      </div>
    </div>
    </Row>  
    
);

export default AAPL;
