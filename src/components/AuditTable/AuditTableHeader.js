import classnames from "classnames";
import "./Audit.scss";

const AuditTableHeader = ({ user, id }) => {
  return (
    <>
      <div className="audit_hdr_sec">
        <div className="row">
          <div className="col-md-1 col-sm-12 hdr_cnt id d-flex align-items-center">
            {" "}
            {id}{" "}
          </div>
          <div className="col-md-3 hdr_cnt name d-flex align-items-center">
            {user.fullname}
          </div>
          <div className="col-md-2 col-sm-12 hdr_cnt border_left">
            <span className="">{user.zone}</span>
          </div>
          <div className="col-md-2 col-sm-12 hdr_cnt border_left">
            {user.division}
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
      </div>
    </>
  );
};

export default AuditTableHeader;
