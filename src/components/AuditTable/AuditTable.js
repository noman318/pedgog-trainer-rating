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
    initialValues: {
      rate: questions,
      comment: "",
      isAbsent: false,
      draft: false,
    },
    onSubmit: (values) => {
      console.log("submitted", values);
    },
  });

  const search = useLocation().search;
  const [userId, setUserId] = useState(
    new URLSearchParams(search).get("userId")
  );
  const [comment, setComment] = useState("");
  const [isAbsent, setIsAbsent] = useState(false);
  const [draft, setDraft] = useState(false);

  const [id, setId] = useState(new URLSearchParams(search).get("id"));
  const [user, setUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const handleIsAbsent = () => {
    setIsAbsent(true);
    saveAudit(
      userId,
      { score: formik.values.rate, comment, isAbsent: true },
      isEdit
    ).then(
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
        console.log("error", error);
        notifyError();
        setError(true);
      }
    );
  };
  // console.log("isAbsent", isAbsent);
  const submitAction = () => {
    // console.log("formik.values?.rate", formik.values?.rate);
    console.log("commentsInSubmit", comment);
    console.log("isEditInSubmit", isEdit);
    saveAudit(
      userId,
      { score: formik.values.rate, comment, isIncomplete: false },
      isEdit
    ).then(
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
        console.log("error", error);
        notifyError();
        setError(true);
      }
    );
  };
  // console.log("draft", draft);
  const draftAction = () => {
    // console.log("formik.values?.rate", formik.values?.rate);
    // console.log("commentsInDraft", comment);
    setDraft((draftState) => !draftState);
    saveAudit(
      userId,
      { score: formik.values.rate, comment, isIncomplete: true },
      isEdit
    ).then(
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
        console.log("error", error);
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
            setComment(result?.audit?.comment);
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
          <button className="back" onClick={() => history.push("/report")}>
            <img src={backButtonImg} className="back-btn-img" alt="back"></img>
            <span className="back-btn-text">BACK</span>
          </button>
          <div className="table-title">Participant Scorecard</div>
          <div className="audit_table_cntr">
            <AuditTableHeader user={user} id={id} />
            <form>
              <div className="audit_rows">
                <div className="audit_row_cntr">
                  <Button onClick={handleIsAbsent}>Mark Absent</Button>
                  {Object.keys(formik.values.rate).map((question, index) => {
                    return (
                      <AuditRow
                        key={question}
                        question={question}
                        index={index}
                        values={formik.values}
                        setFieldValue={formik.setFieldValue}
                        handleChange={formik.handleChange}
                      />
                    );
                  })}
                  <div className="comment_section" aria-label="comment-section">
                    <FormControl className="comment_form_control">
                      <FormLabel className="comment_label">Comment</FormLabel>
                      <TextareaAutosize
                        minRows={3}
                        aria-describedby="text-area"
                        name="comment"
                        value={comment}
                        className="comment_textbox"
                        onChange={(e) => setComment(e.target.value)}
                        style={{ padding: "0.5rem", marginLeft: "-8px" }}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <AuditTableFooter values={formik.values}></AuditTableFooter>
              <div className="save_cntr">
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  {/* {success && <div style={{ color: "green" }}>Score Saved</div>}
                  {error && (
                    <div style={{ color: "red" }}>Score Save Error</div>
                  )} */}
                  <Button
                    className="save_btn"
                    onClick={submitAction}
                    disabled={success || error}
                  >
                    {isEdit ? "Update Score" : "Save Score"}
                  </Button>
                  <Button
                    className="save_btn"
                    onClick={draftAction}
                    disabled={success || error}
                  >
                    Save As Draft
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
