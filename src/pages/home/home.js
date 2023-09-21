/* eslint-disable no-unused-vars, array-callback-return */
import "./home.scss";
import { Container, Row } from "react-bootstrap";
import { retry } from "../../utils/commonFunctions";
import { lazy } from "react";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";

const AuditTable = lazy(() =>
  retry(() => import("../../components/AuditTable/AuditTable"))
);

const Home = () => {
  return (
    <>
      <Container fluid className="w-100 h-100 page_str">
        <Row className="mx-0 w-100 h-100">
          <div className="display-table page_centr">
            <div className="display-tablecell">
              <div className="position-relative mt-4">
                <div className="page_hdr">Master Trainer Audit</div>
                <AuditTable></AuditTable>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default Home;
