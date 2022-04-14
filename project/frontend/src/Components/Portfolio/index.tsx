import { Row, Col } from 'react-bootstrap';

import "./portfolio.css";

function Portfolio() {
  return (
    <Row className="mt-5 mx-3">
      <Col md={4}>
        <div className="port-amount">
          <h1 className='port-amount-title'>$10.000</h1>
          <p className='port-amount-text'>Diversified over 8 stocks</p>
        </div>
      </Col>
      <Col md={6}>
    
      </Col>
    </Row>
  );
}

export default Portfolio;
