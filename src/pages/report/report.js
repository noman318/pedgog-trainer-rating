/* eslint-disable no-unused-vars, array-callback-return */
import "./report.scss";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { retry } from "../../utils/commonFunctions";
import { Suspense, lazy, StrictMode } from "react";
import Header from "../../components/Header/Header";

const AdvanceTable = lazy(() =>
  retry(() => import("../../components/AdvanceTable/AdvanceTable"))
);

const Report = () => {
  return (
    <>
      <Container fluid className="w-100 h-100">
        <Row className="mx-0 w-100 h-100">
          <div className="display-table page_centr">
            <div className="display-tablecell">
              <div className="position-relative tbl_main_cntr">
                <div className="page_hdr">Master Trainer Audit</div>
                <AdvanceTable></AdvanceTable>
              </div>
            </div>
          </div>

          {/* <div class="flexbox-container">
          <div class="flexbox-item fixed">
            <div class="demo">
              <h2>Centered by Flexbox</h2>
              <AdvanceTable></AdvanceTable>
            </div>
          </div>
        </div> */}
        </Row>
      </Container>
    </>
  );
};

export default Report;
