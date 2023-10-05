/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Edit3, PlusCircle } from "react-feather";
import classnames from "classnames";
import Role_Icon from "../images/role.svg";
import { Link } from "react-router-dom";

export const ReportDataTableColumn = [
  {
    name: "S.No.",
    selector: (row, index) => {
      return `${index + 1}`.padStart(2, "0");
    },
    sortable: false,
    width: "8%",
    style: { color: "#878787" },
  },
  {
    name: "Master Trainer Name",
    selector: (row) => row.fullname,
    sortable: true,
    width: "20%",
    style: { "font-family": "Tisa Sans Pro Medium" },
  },
  {
    name: "Zone",
    selector: (row) => row.zone,
    sortable: true,
    width: "15%",
    style: { color: "#3F3F3F" },
  },
  {
    name: "Divison",
    selector: (row) => row.division,
    sortable: true,
    width: "15%",
    style: { color: "#3F3F3F" },
  },
  {
    name: "Program Covered",
    selector: (row) => row.programName,
    sortable: true,
    width: "20%",
    style: { color: "#3F3F3F" },
  },
  {
    name: "Score",
    cell: (row, index) => {
      if (row.score) {
        return (
          <>
            <div className={classnames("user_score", row.user_score)}>
              <div className={row.user_score}>{row.user_score}</div>
            </div>
            <div className="action_score">
              <Link to={`/home?userId=${row.userId}&id=${index + 1}`}>
                <Edit3 color="#d06752" width={16} height={16}></Edit3>
              </Link>
            </div>
          </>
        );
      } else {
        return (
          <Link
            className="acc_tran"
            to={`/home?userId=${row.userId}&id=${`${index + 1}`.padStart(
              2,
              "0"
            )}`}
          >
            Assess Trainer
          </Link>
        );
      }
    },
    sortable: true,
    width: "10%",
    style: { "justify-content": "center", color: "#3F3F3F", padding: "0" },
  },
  {
    name: "Role",
    cell: (row, index) => {
      return (
        <a>
          <img src={Role_Icon}></img>
        </a>
      );
    },

    style: { "justify-content": "center" },
  },
];
