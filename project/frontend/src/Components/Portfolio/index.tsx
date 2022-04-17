import { Row, Col, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";

import "./portfolio.css";

function Portfolio() {
  const [balance, setBalance] = useState('$0.00');
  const [cookies, setCookie] = useCookies(['session_id']);

  if (cookies.session_id == undefined) {
    window.location.href = "/";
    return (<></>);
  }

  fetch(`http://localhost:5000/api/v1/account?function=BALANCE&session_id=${cookies.session_id}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.status == "success") {
        setBalance(json.message);
      } else {
        setBalance("ERROR");
      }
    });


  return (
    <Row className="mt-5 mx-3">
      <Row className="justify-content-center">
        <Col className="text-center" xl={6} md={8} sm={12}>
          <h1 className="text-center">Portfolio</h1>
          <p className="text-center">
            Balance: ${balance}
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center" xl={6} md={8} sm={12}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <h3>
                  <a href="/portfolio/stocks">Stocks</a>
                </h3>
              </Card.Title>
              <Card.Text>
                View your current stock holdings.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default Portfolio;
