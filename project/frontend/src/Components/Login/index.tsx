import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { sha256 } from "js-sha256";
import { useCookies } from "react-cookie";

import "./login.css";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(10).max(100).required("Password is required"),
});

function Login() {
  const [cookies, setCookie] = useCookies(['session_id']);

  if (cookies.session_id != undefined) {
    window.location.href = "/";
    return (<></>);
  }

  return (
    <Row className="justify-content-center mt-3">
      <Col lg={4} md={6} xs={12}>
        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            let password_sha256 = sha256(values.password);
            fetch(`http://localhost:5000/api/v1/account?function=LOGIN&email=${values.email}&password=${password_sha256}`)
              .then((res) => res.json())
              .then((json) => {
                if (json.status == "success") {
                  setCookie('session_id', json.session_id, { path: '/' });
                } else {
                  alert("Failed to Log in!");
                }
                setSubmitting(false);
              });
          }}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            values,
            errors,
            isValid,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col xs={10} md={12}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? "error" : undefined}
                    />
                    <label htmlFor="email">Email</label>
                    {touched.email && errors.email ? (
                      <div className="error-message text-center pb-2">{errors.email}</div>
                      ): null
                    }
                  </Form.Floating>
                </Col>
                <Col xs={10} md={12}>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.password && errors.password ? "error" : undefined}
                    />
                    <label htmlFor="password">Password</label>
                    {touched.password && errors.password ? (
                      <div className="error-message text-center pb-2">{errors.password}</div>
                      ): null
                    }
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
                    Login
                  </Button>
                </Col>
                <Col md={12} className="text-center mt-3">
                  <Link to="/register">or Register</Link>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default Login;
