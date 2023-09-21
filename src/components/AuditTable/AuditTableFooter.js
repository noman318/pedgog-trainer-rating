const AuditTableFooter = ({values}) => {
  return (
    <div className="audit_footr_cntr">
      <div className="footr_cntr">
        <div className="float-end total_cntr">
          <div className="d-inline-block">
            <div className="d-inline-block tota_scr">Total Score</div>
            <div className="d-inline-block scr">{Object.values(values.rate).reduce((previousValue, currentValue) =>
               ((previousValue || 0) + (currentValue || 0)), 0)
          }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTableFooter;
