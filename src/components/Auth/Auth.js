/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable jsx-a11y/alt-text */

import "./auth.scss";

import React from "react";
import { Route, Routes, Switch, Redirect } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import ForgotPassword from "./forgot-password";
import ResetPassword from "./reset-password";
import { isAP } from "../../utils/common";
import AP_Starmaker from "../../images/AP_Starmaker.svg";
import pedgog_text_logo from "../../images/pedgog_text.svg";
import illumine_logo from "../../images/illumine.svg";

const BPUT = () => {
  return (
    <>
      <hr />
      <span className="d-block bold mt-3">
        Pedgog Analytics Dashboard provides real-time insights to track the
        intervention outcomes during deployment.
      </span>
      <span className="d-block bold mt-3">
        Pedgog is a Digital Coaching Platform by Illumine.
      </span>
    </>
  );
};

const AP = () => {
  return (
    <>
      <h3 className="d-block bold mt-3 text-center">The Starmaker Program</h3>
      <img
        src={AP_Starmaker}
        style={{ width: "60%" }}
        className="d-flex w-60 ml-auto mr-auto"
      />
      <span className="d-block bold mt-3 text-center">
        The Analytics Dashboard provides real-time updates of progress of the
        program.
      </span>
    </>
  );
};

const Auth = () => {
  const pages = [
    {
      pageLink: "/",
      view: Login,
      displayName: "Login",
      showInNavbar: true,
    },
    {
      pageLink: "/login",
      view: Login,
      displayName: "Login",
      showInNavbar: true,
    },
    {
      pageLink: "/forgot-password",
      view: ForgotPassword,
      displayName: "ForgotPassword",
      showInNavbar: true,
    },
    {
      pageLink: "/reset-password/:token",
      view: ResetPassword,
      displayName: "ResetPassword",
      showInNavbar: true,
    },
    {
      pageLink: "/register",
      view: Register,
      displayName: "Register",
      showInNavbar: true,
    },
  ];

  return (
    <div className="container vh-100">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <div className="w-100 pe-5">
            <div className="w-100 d-flex align-items-center">
              <img
                className="logo me-2 img-responsive"
                src={pedgog_text_logo}
                alt="logo"
              />
            </div>
            {BPUT()}
          </div>
        </div>
        <div className="col-12 col-md-4">
          {
            //   <Routes>
            //   {pages.map((page) => {
            //     return (
            //       <Route
            //         key={page.pageLink}
            //         path={page.pageLink}
            //         element={<page.view />}
            //       />
            //     );
            //   })}
            // </Routes>
            <Switch>
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          }
        </div>
      </div>
      <img src={illumine_logo} alt="Illumine" className="illumin-logo" />
      <div className="copyright">
        Copyright 2019-22; Illumine. All rights reserved.
      </div>
    </div>
  );
};

export default Auth;
