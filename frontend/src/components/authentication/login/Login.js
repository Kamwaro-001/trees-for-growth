import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { clearMessage } from "../../../slices/message";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../../slices/auth";
import "./Login.css";
import tree_bark from "../../images/tree_bark.jpg";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    // username: "",
    email: "",
    password: "",
  };

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    // username: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className='authpage'>
      <section className="auth vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">

              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" ></i>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  <Form>

                    <h3 className="fw-normal mb-3 pb-3">Sign in</h3>

                    <div className="form-outline mb-4">
                      <Field name="email" type="text" className="form-control" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="alert alert-danger" />

                    </div>

                    <div className="form-outline mb-4">
                      <Field name="password" type="password" className="form-control" placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="alert alert-danger" />
                    </div>

                    <div className="pt-1 mb-4">
                      <button type="submit" className="auth-btn btn-info btn-lg btn-block" disabled={loading}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                      </button>
                    </div>

                    <p className="small mb-5 pb-lg-2"><Link className="text-muted" to="#!">Forgot password?</Link></p>
                    <p>Don't have an account? <Link to="/register" className="link-info">Register here</Link></p>

                  </Form>
                </Formik>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src={tree_bark}
                alt="Login" className="w-100 vh-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login