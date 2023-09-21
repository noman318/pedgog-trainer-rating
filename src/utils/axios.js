/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from "react";
import axios from "axios";

import { getItem, clearAll } from "./storage";
import { AppStateContext } from "../providers/app.provider";
import { LOGGED_OUT } from "../contants/app.constant";

const AxiosClient = () => {
  // const [, dispatch] = useContext(NetworkContext);
  const [, appDispatch] = useContext(AppStateContext);

  useEffect(() => {
    const requestInterceptors = axios.interceptors.request.use(
      (request) => {
        request.headers["X-Requested-With"] = "XMLHttpRequest";
        if (getItem("access_token")) {
          request.headers["Authorization"] = `Bearer ${getItem(
            "access_token"
          )}`;
        }
        const user = getItem("user", true);
        if (request?.data?.params?.isSuperTrainer !== undefined) {
          request.params = { ...request.params };
          return request;
        }
        if (!!user?.organizationid) {
          request.params = {
            ...request.params,
            organizationid: user.organizationid,
          };
        }
        if (!request?.options?.skipLoader) {
          // dispatch({ type: INCREMENT_API_CALL_COUNT });
        }
        return request;
      },
      (err) => {
        if (!err?.request?.options?.skipLoader) {
          // dispatch({ type: NETWORK_ERROR });
        }
        return Promise.reject(err);
      }
    );

    const responseInterceptors = axios.interceptors.response.use(
      (response) => {
        if (!response?.config?.options?.skipLoader) {
          // dispatch({ type: DECREMENT_API_CALL_COUNT });
        }
        return response;
      },
      (err) => {
        if (err?.response?.status === 401) {
          clearAll();
          appDispatch({ type: LOGGED_OUT });
        }
        if (!err?.response?.config?.options?.skipLoader) {
          // dispatch({ type: NETWORK_ERROR });
        }
        return Promise.reject(err);
      }
    );

    const cleanUp = () => {
      axios.interceptors.request.eject(requestInterceptors);
      axios.interceptors.response.eject(responseInterceptors);
    };

    return cleanUp;
  }, []);

  return <></>;
};

export default AxiosClient;
