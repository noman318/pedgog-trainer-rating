/* eslint-disable no-unused-vars, array-callback-return */

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Role_Icon from "../../images/role.svg";
import Role_Red from "../../images/role_red.svg";
import classnames from "classnames";
import { Edit3 } from "react-feather";
import { useEffect, useState } from "react";

const TableRow = ({ rowData, index, onRoleClickCallBack }) => {
  const [data, setData] = useState(rowData);

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  return (
    <div>
      <div className="d-inline-block">
        {data.isSuperTrainer ? "true" : "false"}
      </div>
      <button
        className="d-inline-block"
        onClick={() => onRoleClickCallBack(data.userId, data.isSuperTrainer)}
      >
        {" "}
        click here
      </button>
    </div>
    // <Tr key={index}>
    //   <Td className="no">{data.index}</Td>
    //   <Td className="name">{data.fullname}</Td>
    //   <Td>{data.zone}</Td>
    //   <Td>
    //     {data.division} {data.isSuperTrainer ? "true" : "false"}
    //   </Td>
    //   <Td>{data.programName} </Td>
    //   <Td className="role">
    //     {data.score ? (
    //       <>
    //         <div className={classnames("score", data.score, "d-inline-block")}>
    //           <div className={data.score}>{data.score}</div>
    //         </div>
    //         <div className="action_score d-inline-block">
    //           <a href={`/home?userId=${data.userId}&id=${index + 1}`}>
    //             <Edit3 color="#d06752" width={16} height={16}></Edit3>
    //           </a>
    //         </div>
    //       </>
    //     ) : (
    //       <a
    //         className="acc_tran role"
    //         href={`/home?userId=${data.userId}&id=${`${index + 1}`.padStart(
    //           2,
    //           "0"
    //         )}`}
    //       >
    //         Assess Trainer
    //       </a>
    //     )}
    //   </Td>
    //   <Td
    //     className="role"
    //     onClick={() => onRoleClickCallBack(data.userId, data.isSuperTrainer)}
    //     style={{ cursor: "Pointer !important" }}
    //   >
    //     <a
    //       className="access_tran"
    //       title="click to switch"
    //       style={{ cursor: "Pointer !important" }}
    //     >
    //       {data.isSuperTrainer ? (
    //         <img src={Role_Red}></img>
    //       ) : (
    //         <img src={Role_Icon}></img>
    //       )}
    //     </a>
    //   </Td>
    // </Tr>
  );
};

export default TableRow;
