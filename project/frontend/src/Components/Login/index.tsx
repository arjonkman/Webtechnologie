import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//`https://hackernoon.com/building-react-forms-with-formik-yup-and-react-bootstrap-with-a-minimal-amount-of-pain-and-suffering-1sfk3xv8

function Login() {
  return (
    <Row className="justify-content-center mt-3">
      <Col lg={4} md={6} xs={12}>
        <Form>
          <Row className="justify-content-center">
            <Col xs={10} md={12}>
              <Form.Floating className="mb-2">
                <Form.Control id="email" type="email" placeholder="Email" />
                <label htmlFor="email">Email</label>
              </Form.Floating>
            </Col>
            <Col xs={10} md={12}>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </Form.Floating>
            </Col>
            <Col md={6}>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Col>
            <Col md={12} className="text-center mt-3">
              <Link to="/register">or Register</Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
