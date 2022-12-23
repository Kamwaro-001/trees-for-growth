import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../../slices/auth";
import { clearMessage } from "../../../slices/message";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../../images/bw_logo.svg';
import './Register.css';

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  if (isLoggedIn) {
    return <Navigate to="/Dashboard" />;
  }


  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;
    setLoading(true)
    setSuccessful(false);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate('/login');
      })
      .catch(() => {
        setLoading(false) && setSuccessful(false);
      });
  };
  return (
    <div>
      <div className="auth-body text-center">
        <div className="form-signin m-auto">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
            <Form className="auth-form">
              {!successful && (
                <>
                  <img className="mb-4" src={logo} alt="" width="72" height="57" />
                  <h1 className="h3 mb-3 fw-normal">Register</h1>

                  <div className="form-floating">
                    <Field name='username' type="text" className="for-mail form-control" id="floatingInput" placeholder="username" required />
                    <label htmlFor="floatingInput">Username</label>
                    <ErrorMessage name="username" component="div" className="alert alert-danger" />
                  </div>

                  <div className="form-floating">
                    <Field name='email' type="email" className="for-rmail form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label htmlFor="floatingInput">Email address</label>
                    <ErrorMessage name="email" component="div" className="alert alert-danger" />
                  </div>
                  <div className="form-floating">
                    <Field name='password' type="password" className="for-pass form-control" id="floatingPassword" placeholder="Password" required />
                    <label htmlFor="floatingPassword">Password</label>
                    <ErrorMessage name="password" component="div" className="alert alert-danger" />
                  </div>
                  <button className="w-100 btn btn-lg btn-success" type="submit" disabled={loading}>{loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                    <span>Create Account</span></button>

                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <div className="auth-extras pt-2">
                    <p className="">Already have an account? <Link to="/login" className="link-to">Sign in</Link></p>
                  </div>
                </>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Register