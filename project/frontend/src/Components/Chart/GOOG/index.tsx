import React from "react";
import { PriceChart } from "./PriceChart";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useCookies } from "react-cookie";

function GOOG() {
  const [cookies, setCookie] = useCookies(['session_id']);

  return (
    <Row>
      <Col>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            fetch(`http://localhost:5000/api/v1/stocks?function=BUY&amount=${values.number}&stock=${values.stock}&session_id=${cookies.session_id}`)
              .then((res) => res.json())
              .then((json) => {
                if (json.status == 'success') {
                  alert("Successfully bought!");
                } else {
                  alert(json.error);
                }
              });

            setSubmitting(false);
          }}
          initialValues={{
            stock: "GOOG",
            number: "0",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="number"
                      name="number"
                      type="number"
                      placeholder="amount"
                      value={values.number}
                      onChange={handleChange}
                    />
                    <label htmlFor="fname">Amount</label>
                  </Form.Floating>
                </Col>
                <Col md={6}>
                  <Button
                    variant="primary"
                    type="submit"
                    value="submit"
                    className="w-50"
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
      <div style={{ height: "86.3vh" }}>
        <div style={{ backgroundColor: "#191c27", minHeight: "86.3vh" }}>
          <PriceChart />
        </div>
      </div>
    </Row>

  );
}
export default GOOG;
