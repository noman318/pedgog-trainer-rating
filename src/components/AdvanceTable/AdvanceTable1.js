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
  // console.log("dataInAdvanceTable", data);
  const [loading, setLoading] = useState([""]);
  const [tableData, setTableData] = useState(data);
  const [dataChanged, setDataChanged] = useState(false);

  // console.log("tableData", tableData);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [sortedField, setSortedField] = React.useState(null);
  const { items, requestSort, sortConfig } = useSortableData(data);
  // console.log("items", items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  // console.log("data", data);
  const get = (userId) => {
    fetchUsers().then(
      (response) => {
        let result = response.data;
        // console.log("result", result);
        let modifiedResults = [];
        for (let i = 0; i < result.length; i++) {
          let data = {};
          data.fullname = result[i].fullname;
          // data.zone = result[i].zone;
          data.batches = result[i].batches;
          data.division = result[i].division;
          // data.programName = result[i].programName;
          data.user_score = result[i].user_score;
          data.isAbsent = result[i].isAbsent;
          data.isIncomplete = result[i].isIncomplete;
          data.score = result[i].score;
          data.index = `${i + 1}`.padStart(2, "0");
          data.userId = result[i].userId;
          data.isSuperTrainer = result[i].isSuperTrainer;
          modifiedResults.push(data);
        }
        setTableData(modifiedResults);
        setTableData(modifiedResults);
        let values = loading.filter((x) => x !== userId);
        setLoading(values);

        // setFilteredItems(modifiedResults);
        // setIsLoading(false);
      },
      (error) => {
        console.log("error", error);
        // setIsLoading(false);
      }
    );
  };
  // console.log("(data[0])", data[0]);
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
  // console.log("dataAboveJsontoCSVfunc", data);

  function rearrangedData() {
    return data?.map((item) => ({
      "Full name": item.fullname,
      Batches: item.batches,
      Division: item.division,
      isincomplete: item.isIncomplete,
      "User Score": item.user_score,
      Grade: item.score,
      Comments: item.comment,
      IsSupertrainer: item.isSuperTrainer,
    }));
  }

  const newArrangedData = rearrangedData(data);
  // console.log("newArrangedData", newArrangedData);

  // const filteredData = data.map((item) => {
  //   const {
  //     fullname,
  //     batches,
  //     division,
  //     isIncomplete,
  //     score,
  //     user_score,
  //     comment,
  //     isSuperTrainer,
  //   } = item;
  //   return {
  //     fullname,
  //     batches,
  //     comment,
  //     division,
  //     isIncomplete,
  //     isSuperTrainer,
  //     score,
  //     user_score,
  //   };
  // });
  // console.log("datafilteredDataAboveJsonFunc", filteredData);
  function jsonToCsv(jsonData, fileName) {
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }

    const headers = Object.keys(jsonData[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of jsonData) {
      const values = headers.map((header) => {
        let value = row[header];
        if (typeof value === "string" && value.includes(",")) {
          value = `"${value}"`;
        }
        return value;
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const csvBlob = new Blob([csvString], { type: "text/csv" });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", fileName || "data.csv");
    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(csvUrl);
    document.body.removeChild(link);
  }

  // Trigger the conversion and download
  const handleExport = () => {
    jsonToCsv(newArrangedData, `Master trainer`);
  };

  const handlePublish = () => {
    // console.log("Published");
    setDataChanged(false);
  };

  useEffect(() => {
    setDataChanged(true);
  }, [data]);

  return (
    <>
      <div className="download_csv_btn">
        <button onClick={handlePublish} disabled={!dataChanged}>
          Publish Data
        </button>
        <button onClick={handleExport}>Export to Excel</button>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th
              onClick={() => requestSort("fullname")}
              className={getClassNamesFor("fullname")}
            >
              Master Trainer Name
            </Th>
            <Th
              onClick={() => requestSort("batches")}
              className={getClassNamesFor("batches")}
            >
              Batches
            </Th>
            {/* <Th
              onClick={() => requestSort("zone")}
              className={getClassNamesFor("zone")}
            >
              Zone
            </Th> */}
            <Th
              onClick={() => requestSort("division")}
              className={getClassNamesFor("division")}
            >
              Divison
            </Th>
            {/* <Th
              onClick={() => requestSort("programName")}
              className={getClassNamesFor("programName")}
            >
              Program Covered
            </Th> */}
            <Th
              onClick={() => requestSort("user_score")}
              className={getClassNamesFor("user_score")}
            >
              Assesment Score
            </Th>
            <Th
              // className="role"
              onClick={() => requestSort("score")}
              className={getClassNamesFor("score")}
            >
              Grade
            </Th>
            <Th className="role">Role</Th>
            <Th>Comment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((d, index) => {
            return (
              <Tr key={index}>
                <Td className="no">{index + 1}</Td>
                <Td className="name">{d.fullname}</Td>
                {d.batches ? <Td className="name">{d.batches}</Td> : <Td>-</Td>}
                {/* {d.zone ? <Td>{d.zone}</Td> : <Td>-</Td>} */}
                {d.division ? <Td>{d.division}</Td> : <Td>-</Td>}
                {/* <Td>{d.programName}</Td> */}
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
                    <div style={{ display: "flex" }}>
                      <p>Absent</p>
                      <div className="action_score d-inline-block">
                        <Link to={`/home?userId=${d.userId}&id=${index + 1}`}>
                          <Edit3 color="#d06752" width={16} height={16}></Edit3>
                        </Link>
                      </div>
                    </div>
                  ) : d.score ? (
                    <>
                      <div
                        className={classnames(
                          "score",
                          d.score,
                          "d-inline-block"
                        )}
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
                        {/* Assess Trainer */}
                        {d.isIncomplete ? "Complete" : "Assess Trainer"}
                        <br />
                      </Link>
                      <p>{d.isIncomplete ? "Draft Saved" : ""}</p>
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
    </>
  );
};

export default AdvanceTable1;
