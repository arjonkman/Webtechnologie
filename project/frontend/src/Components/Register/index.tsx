import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { sha256 } from "js-sha256";

const schema = yup.object({
  fname: yup.string().required(),
  lname: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required(),
});

function Register() {
  return (
    <Row className="justify-content-center mt-3">
      <Col lg={6} md={8} xs={10}>
        <Formik
          validationSchema={schema}
          onSubmit={
            (values, { setSubmitting }) => {
              values.password = sha256(values.password);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }
          }
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            isValid,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={6} sm={6} xs={12}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="fname"
                      name="fname"
                      type="text"
                      placeholder="First name"
                      onChange={handleChange}
                      isInvalid={!!errors.fname}
                    />
                    <label htmlFor="fname">First name</label>
                  </Form.Floating>
                </Col>
                <Col md={6} sm={6} xs={12}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="lname"
                      name="lname"
                      type="text"
                      placeholder="Last name"
                      onChange={handleChange}
                      isInvalid={!!errors.lname}
                    />
                    <label htmlFor="lname">Last name</label>
                  </Form.Floating>
                </Col>
                <Col md={12}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <label htmlFor="email">Email</label>
                  </Form.Floating>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <label htmlFor="password">Password</label>
                  </Form.Floating>
                </Col>
                <Col md={6}>
                  <Button
                    disabled={!isValid || isSubmitting}
                    variant="primary"
                    type="submit"
                    value="submit"
                    className="w-100"
                  >
                    Register
                  </Button>
                </Col>
                <Col md={12} className="text-center mt-3">
                  <Link to="/login">or Login</Link>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default Register;
