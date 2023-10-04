/* eslint-disable no-unused-vars, array-callback-return */
import { lazy, useContext } from "react";
import { Switch } from "react-router-dom";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "../components/Header/Header";
import { AppStateContext } from "../providers/app.provider";
import { retry } from "../utils/commonFunctions";

const Home = lazy(() => retry(() => import("../pages/home/home")));
const Report = lazy(() => retry(() => import("../pages/report/report")));
const Auth = lazy(() => retry(() => import("../components/Auth/Auth")));

const RouterComponent = () => {
  const [state] = useContext(AppStateContext);
  const pages = [
    {
      pageLink: "/",
      view: Report,
      displayName: "Login",
      showInNavbar: true,
    },
    {
      pageLink: "/Home",
      view: Home,
      displayName: "Home",
      showInNavbar: true,
    },
    {
      pageLink: "/report",
      view: Report,
      displayName: "Report",
      showInNavbar: true,
    },
    {
      pageLink: "/login",
      view: Auth,
      displayName: "Login",
      showInNavbar: true,
    },
    {
      pageLink: "/forgot-password",
      view: Auth,
      displayName: "ForgotPassword",
      showInNavbar: true,
    },
    {
      pageLink: "/reset-password/:token",
      view: Auth,
      displayName: "ResetPassword",
      showInNavbar: true,
    },
  ];

  if (state.isLoggedIn) {
    return (
      <>
        <Header></Header>
        <Switch>
          <Redirect exact from="/login" to="/" />
          <Redirect exact from="/" to="/report" />
          <Route path="/Home" component={Home} />
          <Route path="/report" component={Report} />
        </Switch>
      </>
    );
  } else {
    return <Auth></Auth>;
  }
};

export default RouterComponent;
