import classnames from "classnames";
import "./Audit.scss";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const AuditTableHeader = ({ user, id }) => {
  // console.log("user", user);
  // console.log("id", id);
  return (
    <>
      {/* <div className="audit_hdr_sec">
        <div className="row">
          <div className="col-md-1 col-sm-12 hdr_cnt id d-flex align-items-center">
            {" "}
            {id}{" "}
          </div>
          <div className="col-md-3 hdr_cnt name d-flex align-items-center">
            {user.fullname}
          </div>
          <div className="col-md-2 col-sm-12 hdr_cnt border_left">
            <span className="">{user.batches}</span>
          </div>
          <div className="col-md-2 col-sm-12 hdr_cnt border_left">
            {user.division}Division
          </div>
          <div className="col-md-2 col-sm-12 hdr_cnt border_left">
            {user.programName}
          </div>
          {user.score ? (
            <div
              className={`${classnames(
                "col-md-2 col-sm-12 score",
                user.score,
                ""
              )}`}
            >
              <div className={user.score}>{user.score}</div>
            </div>
          ) : (
            <div className="px-2">No score</div>
          )}
        </div>
      </div> */}
      <div
        aria-label="header_table"
        style={{ padding: "0 2rem", marginBottom: "3rem" }}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Batches</Th>
              <Th>Division</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="table_data">{id}</Td>
              <Td className="table_data">{user?.fullname}</Td>
              <Td className="table_data">{user?.batches}</Td>
              <Td className="table_data">
                {user?.division ? user?.division : "No Division"}
              </Td>
              <Td className="table_data" aria-label="score_column">
                {user.score ? (
                  <div aria-label="score_block">
                    <div className={`score ${user?.score}`}>
                      <div className={user?.score}>{user?.score}</div>
                    </div>
                  </div>
                ) : (
                  <div className="px-2">No score</div>
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default AuditTableHeader;
