/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import makeData from "../../fakeData";
import Table1 from "./Table";
import useSortableData from "../../hooks/useSortable";
import "./advancetable1.scss";
import { Edit3, PlusCircle } from "react-feather";
import classnames from "classnames";
import Role_Icon from "../../images/role.svg";
import Role_Red from "../../images/role_red.svg";
import loader from "../../images/loader.gif";
import { getItem, setItem } from "../../utils/storage";
import { fetchUsers, setPersonalTrainer } from "../../services/auth";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

const AdvanceTable1 = ({ data, callback }) => {
  console.log("data", data);
  const [loading, setLoading] = useState([""]);
  const [tableData, setData] = useState(data);
  // console.log("tableData", tableData);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [sortedField, setSortedField] = React.useState(null);
  const { items, requestSort, sortConfig } = useSortableData(tableData);
  // console.log("items", items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const get = (userId) => {
    fetchUsers().then(
      (response) => {
        let result = response.data;
        let modifiedResults = [];
        for (let i = 0; i < result.length; i++) {
          let data = {};
          data.fullname = result[i].fullname;
          data.zone = result[i].zone;
          data.division = result[i].division;
          data.programName = result[i].programName;
          data.user_score = result[i].user_score;
          data.isAbsent = result[i].isAbsent;
          data.isIncomplete = result[i].isIncomplete;
          data.score = result[i].score;
          data.index = `${i + 1}`.padStart(2, "0");
          data.userId = result[i].userId;
          data.isSuperTrainer = result[i].isSuperTrainer;
          modifiedResults.push(data);
        }
        setData(modifiedResults);
        setData(modifiedResults);
        let values = loading.filter((x) => x !== userId);
        setLoading(values);

        // setFilteredItems(modifiedResults);
        // setIsLoading(false);
      },
      (error) => {
        // setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    let values = getItem("trainersWithRole");
    if (values) {
      setSelectedTrainers(JSON.parse(values));
    }
  }, [data]);

  const onRoleClick = (userId, value, onCallback) => {
    setLoading([...loading, userId]);

    setPersonalTrainer(userId, { isSuperTrainer: !value }).then((response) => {
      get(userId);
    });
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>S.No</Th>
          <Th
            onClick={() => requestSort("fullname")}
            className={getClassNamesFor("fullname")}
          >
            Trainer Name
          </Th>
          <Th
            onClick={() => requestSort("zone")}
            className={getClassNamesFor("zone")}
          >
            Zone
          </Th>
          <Th
            onClick={() => requestSort("division")}
            className={getClassNamesFor("division")}
          >
            Divison
          </Th>
          <Th
            onClick={() => requestSort("programName")}
            className={getClassNamesFor("programName")}
          >
            Program Covered
          </Th>
          <Th>Score</Th>
          <Th className="role">Grade</Th>
          <Th className="role">Role</Th>
          <Th>Comment</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((d, index) => {
          return (
            <Tr key={index}>
              <Td className="no">{index + 1}</Td>
              <Td className="name">{d.fullname}</Td>
              {d.zone ? <Td>{d.zone}</Td> : <Td>-</Td>}
              {d.division ? <Td>{d.division}</Td> : <Td>-</Td>}
              <Td>{d.programName}</Td>
              {d.isAbsent ? (
                <Td>
                  <p>Absent</p>
                </Td>
              ) : (
                <Td>{d.user_score}</Td>
              )}
              {/* <Td>{d.user_score}</Td> */}
              <Td className="role">
                {d.isAbsent ? (
                  <p>Absent</p>
                ) : d.score ? (
                  <>
                    <div
                      className={classnames("score", d.score, "d-inline-block")}
                    >
                      <div className={d.score}>{d.score}</div>
                    </div>
                    <div className="action_score d-inline-block">
                      <Link to={`/home?userId=${d.userId}&id=${index + 1}`}>
                        <Edit3 color="#d06752" width={16} height={16}></Edit3>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="acc_tran role"
                      to={`/home?userId=${d.userId}&id=${`${
                        index + 1
                      }`.padStart(2, "0")}`}
                    >
                      Assess Trainer
                      <br />
                    </Link>
                    <p>{d.isIncomplete ? "Incomplete" : ""}</p>
                  </>
                )}
              </Td>
              <Td
                className="role"
                onClick={() => onRoleClick(d.userId, d.isSuperTrainer)}
                style={{ cursor: "Pointer !important" }}
              >
                <Link
                  className="access_tran"
                  title="click to switch"
                  style={{ cursor: "Pointer !important" }}
                  to="/"
                >
                  {loading?.find((c) => c === d.userId) ? (
                    <img className="btn-gif" src={loader}></img>
                  ) : d.isSuperTrainer ? (
                    <img src={Role_Red}></img>
                  ) : (
                    <img src={Role_Icon}></img>
                  )}
                  {}
                </Link>
              </Td>
              {d?.comment ? (
                <Td className="comment">{d?.comment} </Td>
              ) : (
                <Td>-</Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default AdvanceTable1;
