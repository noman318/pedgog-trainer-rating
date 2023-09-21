/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppStateContext } from "../../providers/app.provider";
import Password from "../form/Password";
import { resetPassword } from "../../services/auth";
import { ALERT } from "../../contants/app.constant";

const CHANGE_PASSWORD_FORM = {
  formData: { password: "", confirmPassword: "" },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, "Password should be 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Password does not match"),
  }),
};

const ResetPassword = () => {
  const [, dispatch] = useContext(AppStateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(CHANGE_PASSWORD_FORM);
  const history = useHistory();
  const { token } = useParams();

  const changePassword = () => {
    resetPassword({
      password: form.formData.password,
      token,
    })
      .then(({ status, data }) => {
        setIsSubmitting(false);
        dispatch({
          type: ALERT,
          payload: {
            message: "Password Changed. Please Login with new password",
            title: "Success",
          },
        });
        history.push("/login");
      })
      .catch(({ response }) => {
        dispatch({
          type: ALERT,
          payload: {
            message: response?.data?.message || "Cannot change Password",
            title: "Error",
          },
        });
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (isSubmitting) changePassword();
  }, [form.formData, form.formData, isSubmitting]);

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
              <Password placeholder="Enter Password" name={`password`} />
              <Password
                placeholder="Confirm your password"
                name={`confirmPassword`}
              />
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  Change Password
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ResetPassword;
