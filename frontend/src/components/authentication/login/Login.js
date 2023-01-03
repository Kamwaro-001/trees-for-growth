import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { clearMessage } from "../../../slices/message";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../../slices/auth";
import "./Login.css";
import logo from "../../images/bw_logo.svg";


const Login = () => {

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = (formValue) => {
    setLoading(true);
    const redirectTo = '/dashboard'
    dispatch(login({ formValue, redirectTo }))
      .unwrap()
      .catch((e) => {
        setLoading(false);
        console.log(e)
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-body text-center">
      <div className="form-signin m-auto">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
          <Form className="auth-form">
            <img className="mb-4" src={logo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>

            <div className="form-floating">
              <Field name='email' type="email" className="for-mail form-control" id="floatingInput" placeholder="name@example.com" required />
              <label htmlFor="floatingInput">Email address</label>
              <ErrorMessage name="email" component="div" className="alert alert-danger" />
            </div>
            <div className="form-floating">
              <Field name='password' type="password" className="for-pass form-control" id="floatingPassword" placeholder="Password" required />
              <label htmlFor="floatingPassword">Password</label>
              <ErrorMessage name="password" component="div" className="alert alert-danger" />
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-success" type="submit" disabled={loading}>{loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
              <span>Sign in</span></button>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <div className="auth-extras">
              <p className=""> <Link className="text-muted small" to="#!">Forgot password?</Link> <br /> Don't have an account? <Link to="/register" className="link-to">Register here</Link></p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )

}

export default Login