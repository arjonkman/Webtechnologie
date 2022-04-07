import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Row className="justify-content-center mt-3">
      <Col lg={6} md={8} xs={10}>
        <Form>
          <Row className="justify-content-center">
            <Col md={6} sm={6} xs={12}>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="fname"
                  type="text"
                  placeholder="First name"
                />
                <label htmlFor="fname">First name</label>
              </Form.Floating>
            </Col>
            <Col md={6} sm={6} xs={12}>
              <Form.Floating className="mb-2">
                <Form.Control id="lname" type="text" placeholder="Last name" />
                <label htmlFor="lname">Last name</label>
              </Form.Floating>
            </Col>
            <Col md={12}>
              <Form.Floating className="mb-2">
                <Form.Control id="email" type="email" placeholder="Email" />
                <label htmlFor="email">Email</label>
              </Form.Floating>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </Form.Floating>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="password_repeat"
                  type="password"
                  placeholder="Repeat Password"
                />
                <label htmlFor="password_repeat">Repeat Password</label>
              </Form.Floating>
            </Col>
            <Col md={6}>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Col>
            <Col md={12} className="text-center mt-3">
              <Link to="/login">or Login</Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
