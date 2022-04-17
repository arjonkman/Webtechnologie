import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function PriceChartSelection() {
    return (
        <Row className="mt-5 mx-3">
          <Row className="justify-content-center">
            <Col className="text-center" xl={6} md={8} sm={12}>
              <h1 className="text-center">Chart</h1>
              <p className="text-center">
                Select a stock chart to view.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="text-center" xl={6} md={8} sm={12}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>
                    <h3>
                      <a href="/chart/AAPL">AAPL</a>
                    </h3>
                  </Card.Title>
                  <Card.Text>
                    View Apple stock prices.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
                <Card className="text-center" xl={6} md={8} sm={12}>
                    <Card.Body>
                        <Card.Title>
                            <h3>
                                <a href="/chart/MSFT">MSFT</a>
                            </h3>
                        </Card.Title>
                        <Card.Text>
                            View Microsoft stock prices.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="text-center" xl={6} md={8} sm={12}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>
                    <h3>
                      <a href="/chart/AMZN">AMZN</a>
                    </h3>
                  </Card.Title>
                  <Card.Text>
                    View Amazon stock prices.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
                <Card className="text-center" xl={6} md={8} sm={12}>
                    <Card.Body>
                        <Card.Title>
                            <h3>
                                <a href="/chart/GOOG">GOOG</a>
                            </h3>
                        </Card.Title>
                        <Card.Text>
                            View Google stock prices.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Row>
    );
    }