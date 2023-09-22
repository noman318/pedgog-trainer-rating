/* eslint-disable no-unused-vars, array-callback-return */

import React, { useState, useContext, useEffect, memo } from "react";
import { Power } from "react-feather";
import equal from "fast-deep-equal";

import { AppStateContext } from "../../providers/app.provider";
import { fetchOrganizationInfo, fetchUserInfo } from "../../services/auth";
import logo from "../../images/pedgog_logo.svg";
import "./header.scss";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const [, dispatch] = useContext(AppStateContext);
  const [user, setUser] = useState({});
  const [org, setOrg] = useState({});

  const logout = (props) => {
    dispatch({ type: "loggedOut" });
  };

  useEffect(() => {
    fetchUserInfo()
      .then(({ data }) => {
        setUser(data);
        fetchOrganizationInfo(data.organizationid)
          .then(({ data }) => {
            setOrg(data);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="header container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 left">
            <a className="d-flex me-3 br-1" href="/">
              <img className="header-logo me-2" src={logo} alt="logo" />
              <h3 className="mb-0 pt-1 mt-auto mb-auto">Analytics Dashboard</h3>
            </a>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <h4 className="mb-0" style={{ fontSize: "1rem" }}>
                {org?.organizationname}
              </h4>
              <h4 className="mb-0" style={{ fontSize: "0.8rem" }}>
                {`${user?.role && user.role[0]?.rolename.toUpperCase()}`}
              </h4>
            </div>
          </div>
          <div
            className="col-12 col-md-2"
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            <span>{user.fullname}</span>
            {/* <span
            className="material-icons material-icons-outlined user-name font-20"
            onClick={logout}
          >
            
          </span> */}
            <div className="log_out_icon float-end">
              <Power
                className="icon_logout"
                width={20}
                height={20}
                onClick={logout}
              ></Power>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const isEqual = (prevProps, currProps) => {
  if (prevProps.user.id !== currProps.user.id) return false;
  return true;
};

export default Header;
