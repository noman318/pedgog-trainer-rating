/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import "./Audit.scss";
import { lazy, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FormikProvider, useFormik } from "formik";
import { retry } from "../../utils/commonFunctions";
import { useLocation } from "react-router-dom";
import backButtonImg from "./img/arrow_back_black.svg";
import qs from "qs";
import { fetchAuditByUserId, saveAudit } from "../../services/auth";
import { notifyError, notifySuccessSave } from "../../utils/common";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import questions from "../AuditTable/Questions.json";
// import Textarea from "@mui/joy/Textarea";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  TextareaAutosize,
} from "@material-ui/core";
const AuditTableHeader = lazy(() => retry(() => import("./AuditTableHeader")));
const AuditRow = lazy(() => retry(() => import("./AuditRow")));
const AuditTableFooter = lazy(() => retry(() => import("./AuditTableFooter")));

const AuditTable = () => {
  const [isloading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  // console.log("history", history);
  // console.log("question", questions);

  const formik = useFormik({
    initialValues: { rate: questions },
    onSubmit: (values) => {
      console.log("submitted", values);
    },
  });
  // console.log("formik", formik.values.rate);

  const search = useLocation().search;
  const [userId, setUserId] = useState(
    new URLSearchParams(search).get("userId")
  );

  const [id, setId] = useState(new URLSearchParams(search).get("id"));
  const [user, setUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const submitAction = () => {
    saveAudit(userId, formik.values.rate, isEdit).then(
      (result) => {
        if (!result.code) {
          setSuccess(true);
          setUser(result.data);
          notifySuccessSave();
          history.push("/report");
        } else {
          notifyError();
          setError(true);
        }
      },
      (error) => {
        notifyError();
        setError(true);
      }
    );
  };

  useEffect(() => {
    if (userId) {
      fetchAuditByUserId(userId).then(
        (response) => {
          let result = response.data;
          // console.log("result", result);
          setUser(result);
          if (
            result?.audit?.score &&
            Object.keys(result?.audit?.score)?.length > 0
          ) {
            formik.values.rate = result.audit.score;
            setIsEdit(true);
          }

          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      );
    }
  }, []);
  return isloading ? (
    "Loading"
  ) : (
    <>
      <FormikProvider value={formik}>
        <div className="table-body aduit_table_cntr">
          <button
            className="back"
            onClick={() => (window.location.href = "\\report")}
          >
            <img src={backButtonImg} className="back-btn-img" alt="back"></img>
            <span className="back-btn-text">BACK</span>
          </button>
          <div className="table-title">Participant Scorecard</div>
          <div className="audit_table_cntr">
            <AuditTableHeader user={user} id={id}></AuditTableHeader>

            <form>
              <div className="audit_rows">
                <div className="audit_row_cntr">
                  {Object.keys(formik.values.rate).map((question, index) => {
                    return (
                      <AuditRow
                        key={question}
                        question={question}
                        index={index}
                        values={formik.values}
                        setFieldValue={formik.setFieldValue}
                        handleChange={formik.handleChange}
                      ></AuditRow>
                    );
                  })}
                </div>
                <div aria-label="comments-section">
                  <FormControl>
                    <FormLabel>Comments</FormLabel>
                    <TextareaAutosize
                      minRows={3}
                      aria-describedby="my-helper-text"
                    />
                    <FormHelperText id="my-helper-text">
                      Comments here
                    </FormHelperText>
                  </FormControl>
                </div>
              </div>
              <AuditTableFooter values={formik.values}></AuditTableFooter>
              <div className="save_cntr">
                <div className="d-flex justify-content-center">
                  {/* {success && <div style={{ color: "green" }}>Score Saved</div>}
                  {error && (
                    <div style={{ color: "red" }}>Score Save Error</div>
                  )} */}
                  <Button
                    className="save_btn"
                    onClick={submitAction}
                    disabled={success || error}
                  >
                    Save Score
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
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

export default AuditTable;
