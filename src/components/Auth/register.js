/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../providers/app.provider";
import Input from "../form/Input";
import Password from "../form/Password";
import { register } from "../../services/auth";
import { LOGGED_IN } from "../../contants/app.constant";

const REGISTER_FORM = {
  formData: { userName: "", password: "" },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .required("Email ID is required")
      .email("Invalid Email ID"),
    password: Yup.string()
      .min(8, "Password should be 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Password does not match"),
    accessCode: Yup.string().required("Access code is required"),
  }),
};

const Register = () => {
  const [, dispatch] = useContext(AppStateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(REGISTER_FORM);
  let history = useHistory();

  const processRegister = () => {
    register({
      email: form.formData.email,
      password: form.formData.password,
      fullname: form.formData.name,
      accesscode: form.formData.accessCode,
      organizationid: "600131e4c247a66770428a74",
      role: ["University Administrator"],
    })
      .then(({ status, data }) => {
        setIsSubmitting(false);
        dispatch({ type: LOGGED_IN, payload: data });
        history.push("/");
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (isSubmitting) processRegister();
  }, [form.formData, isSubmitting]);

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
                placeholder="Enter your Full Name"
                type="text"
                name={`name`}
              />
              <Input
                placeholder="Enter registered Email ID"
                type="email"
                name={`email`}
              />
              <Password placeholder="Set your password" name={`password`} />
              <Password
                placeholder="Confirm your password"
                name={`confirmPassword`}
              />
              <Input
                placeholder="Access code"
                type="password"
                name={`accessCode`}
              />
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  Register
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/login">
                  <span className="new-user font-14">
                    Are you a registered user ? Click here to <b>Login</b>
                  </span>
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
