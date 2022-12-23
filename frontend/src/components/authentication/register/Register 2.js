import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../../slices/auth";
import { clearMessage } from "../../../slices/message";
import dry_tree from "../../images/dry_tree.jpg";
import { Link } from "react-router-dom";

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

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

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
                  onSubmit={handleRegister}
                >
                  <Form>
                  {!successful && (
                    <>
                    <h3 className="fw-normal mb-3 pb-3">Sign up</h3>

                    <div className="form-outline mb-4">
                      <Field name="username" type="text" className="form-control" placeholder="Username" />
                      <ErrorMessage name="username" component="div" className="alert alert-danger" />
                    </div>

                    <div className="form-outline mb-4">
                      <Field name="email" type="text" className="form-control" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="alert alert-danger" />
                    </div>

                    <div className="form-outline mb-4">
                      <Field name="password" type="password" className="form-control" placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="alert alert-danger" />
                    </div>

                    <div className="pt-1 mb-4">
                      <button type="submit" className="auth-btn btn-info btn-lg btn-block">Register
                      </button>
                    </div>
                    
                    <p>Already have an account? <Link to="/login" className="link-info">Sign in here</Link></p>
                    </>
                    )}
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
              <img src={dry_tree}
                alt="Login" className="w-100 vh-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Register;