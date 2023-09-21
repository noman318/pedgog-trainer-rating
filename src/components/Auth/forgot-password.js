/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../providers/app.provider";
import Input from "../form/Input";
import { forgetPassword } from "../../services/auth";

const FORGOT_PASSWORD_FORM = {
  formData: { email: "" },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required"),
  }),
};

const ForgotPassword = () => {
  const [, dispatch] = useContext(AppStateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [form, setForm] = useState(FORGOT_PASSWORD_FORM);
  let history = useHistory();

  const sendMail = () => {
    setIsMailSent(false);
    forgetPassword({
      email: form.formData.email,
    })
      .then(({ status, data }) => {
        setIsMailSent(true);
        setTimeout(() => {
          setIsSubmitting(false);
        }, 60000);
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (isSubmitting) sendMail();
  }, [form.formData.email, isSubmitting]);

  return (
    <div className="login-sec card py-3 py-md-5 px-2 px-md-4">
      {isMailSent ? (
        <p>
          An email has been sent to you with steps on how to reset your
          password. Wait for a couple of minutes to receive the email. Do check
          spam.
        </p>
      ) : null}
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
                placeholder="Enter registered email iD"
                type="email"
                name={`email`}
              />
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  {isMailSent
                    ? "Resend Email to Reset Password"
                    : "Reset Password"}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
