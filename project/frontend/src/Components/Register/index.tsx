import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { sha256 } from "js-sha256";
import { useCookies } from "react-cookie";

import "./register.css";

const schema = yup.object({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(10).max(100).required("Password is required"),
});

function Register() {
  const [cookies, setCookie] = useCookies(['session_id']);
  if (cookies.session_id != undefined) {
    window.location.href = "/";
    return (<></>);
  }
  
  return (
    <Row className="justify-content-center mt-3">
      <Col lg={6} md={8} xs={10}>
        <Formik
          validationSchema={schema}
          onSubmit={
            (values, { setSubmitting }) => {
              let password_sha256 = sha256(values.password);
              fetch(`http://localhost:5000/api/v1/account?function=REGISTER&fname=${values.fname}&lname=${values.lname}&email=${values.email}&password=${password_sha256}`)
                .then((res) => res.json())
                .then((json) => {
                  if (json.status == "success") {
                    setCookie('session_id', json.session_id, { path: '/' });
                  } else {
                    alert("Failed to register!");
                  }
                  setSubmitting(false);
                });
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
            handleBlur,
            touched,
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
                      value={values.fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.fname && errors.fname ? "error" : undefined}
                    />
                    <label htmlFor="fname">First name</label>
                    {touched.fname && errors.fname ? (
                      <div className="error-message text-center pb-2">{errors.fname}</div>
                      ): null
                    }
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
                      value={values.lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.lname && errors.lname ? "error" : undefined}
                    />
                    <label htmlFor="lname">Last name</label>
                    {touched.lname && errors.lname ? (
                      <div className="error-message text-center pb-2">{errors.lname}</div>
                      ): null
                    }
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
                  <Form.Floating className="mb-2">
                    <Form.Control
                      required
                      id="password"
                      name="password"
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
