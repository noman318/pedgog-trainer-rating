/* eslint-disable no-unused-vars, array-callback-return */

import Slider from "../Range/Slider";
import Slider1 from "../Range/Slider1";
import "./Audit.scss";

const AuditRow = ({ index, question, values, setFieldValue }) => {
  // console.log("questionInRow", question);
  return (
    <div className="row py-3 audit-row" key={index}>
      <div className="col-md-6 col-sm-12 row_cntnt question px-4">
        {question}
      </div>
      <div className="col-md-5 col-sm-12 row_cntnt px-4 position-relative range_cell">
        <Slider1
          selectedValue={values.rate[question]}
          onChange={(value) => {
            setFieldValue(`rate[${question}]`, parseInt(value));
          }}
        ></Slider1>
      </div>
      <div className="col-md-1 col-sm-12 row_cntnt  px-4 scoreField">
        <input
          type="number"
          min={0}
          max={5}
          value={values.rate[question]}
          onKeyDown={(event) => {
            if (event.key === ".") {
              event.preventDefault();
            }
          }}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.value = 0;
              setFieldValue(`rate[${question}]`, parseInt(e.target.value));
            }
          }}
          className="form-control score_field_input"
          name={`rate[${question}]`}
          onChange={(e) => {
            if (!new RegExp("^[0-5]{0,1}$").test(e.target.value)) {
              e.preventDefault();
              return;
            }
            setFieldValue(`rate[${question}]`, parseInt(e.target.value));
          }}
        ></input>
      </div>
    </div>
  );
};

export default AuditRow;
