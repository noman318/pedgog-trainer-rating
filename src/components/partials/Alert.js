/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from "react";
import Modal from "@material-ui/core/Modal";
import { AppStateContext } from "../../providers/app.provider";
import { CLOSE_ALERT } from "../../contants/app.constant";

import "./alert.scss";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const Alert = () => {
  const [state, dispatch] = useContext(AppStateContext);

  const handleClose = () => {
    dispatch({ type: CLOSE_ALERT });
  };

  const renderModal = () => {
    if (state.alert.canShow)
      return (
        <Modal
          open={state.alert.canShow}
          onClose={handleClose}
          aria-labelledby={state.alert.title}
          aria-describedby={state.alert.message}
        >
          <div className="modal card p-3 text-center">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <div class="modal-header">
              <h4>{state.alert.title}</h4>
            </div>
            <div class="modal-body mt-3">
              <p>{state.alert.message}</p>
            </div>
          </div>
        </Modal>
      );
    return <></>;
  };

  return useMemo(() => renderModal(), [state.alert]);
};

export default Alert;
