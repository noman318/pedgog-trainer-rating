/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../providers/app.provider";
import Input from "../form/Input";
import Password from "../form/Password";
import { login, patchUserFirstTimeUser } from "../../services/auth";
import { LOGGED_IN, ALERT } from "../../contants/app.constant";

const LOGIN_FORM = {
  formData: { userName: "", password: "" },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
};

const Login = () => {
  const [, dispatch] = useContext(AppStateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(LOGIN_FORM);
  let history = useHistory();

  const processLogin = () => {
    login({
      email: form.formData.email,
      password: form.formData.password,
    })
      .then(({ status, data }) => {
        const user = data.user;
        if (user && user.firstTimeUser) {
          patchUserFirstTimeUser(user.id, { firstTimeUser: false }).then(
            (patchedUser) => {
              const _data = data;
              _data.user = patchedUser;
              dispatch({ type: LOGGED_IN, payload: _data });
            }
          );
        }

        setIsSubmitting(false);
        dispatch({ type: LOGGED_IN, payload: data });
        // history.push("/");
      })
      .catch(({ response }) => {
        dispatch({
          type: ALERT,
          payload: {
            title: "Error",
            message: response?.data?.message || "An error occured",
          },
        });
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (isSubmitting) processLogin();
  }, [form.formData.email, form.formData.password, isSubmitting]);

  return (
    <div className="login-sec card py-3 py-md-5 px-2 px-md-4">
      <Formik
        initialValues={form.formData}
        onSubmit={async (values) => {
          setForm({ ...form, formData: { ...values } });
          setIsSubmitting(true);
        }}
        validationSchema={form.validationSchema}
        enableReinitialize
      >
        {(props) => {
          const { handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Enter registered email id"
                type="email"
                name={`email`}
              />
              <Password placeholder="Enter Password" name={`password`} />
              {/* <div className="text-right mt-4">
                <Link className="forgot-password font-12" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div> */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </div>
              {/* <div className="text-center mt-4">
                <Link to="/register">
                  <span className="new-user font-14">
                    Are you a new user ? Click here to <b>Register</b>
                  </span>
                </Link>
              </div> */}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
