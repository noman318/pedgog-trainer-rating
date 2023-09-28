/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import "./AdvanceTable.scss";
import DataTable from "react-data-table-component";
import { ReportDataTableColumn } from "../../utils/Data";
import { useEffect, useState } from "react";
import AdvanceTable1 from "./AdvanceTable1";
import { fetchUsers } from "../../services/auth";
import { TablePagination } from "@material-ui/core";

const AdvanceTable = () => {
  const [reportData, setReportData] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const [filteredItems, setFilteredItems] = useState(reportData);
  const [zone, setZone] = useState("All");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageCount, setPageCount] = useState(1);
  const getZones = () => {
    let uniqueZones = [];
    reportData?.map((data) => {
      if (data.zone && uniqueZones.indexOf(data.zone) === -1) {
        uniqueZones.push(data.zone);
      }
    });
    return uniqueZones;
  };

  const getGrades = () => {
    let allGrades = [];
    reportData?.map((data) => {
      if (data.score && allGrades.indexOf(data.score) === -1) {
        allGrades.push(data.score);
      }
    });
    console.log("allGrades", allGrades);
    return allGrades;
  };
  // console.log("filteredItems", filteredItems);

  const getBatches = () => {
    let allBatches = [];
    reportData?.map((data) => {
      if (data.batches && allBatches.indexOf(data.batches) === -1) {
        allBatches.push(data.batches);
      }
    });
    console.log("allBatches", allBatches);
    return allBatches;
  };
  // getBatches();
  const handleChangePage = (event, newPage) => {
    // console.log("newPage", newPage);
    setPage(newPage);
  };
  // console.log("page", page);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  // console.log("rowsPerPage", rowsPerPage);
  const get = () => {
    fetchUsers(page, rowsPerPage).then(
      (response) => {
        let result = response?.data?.out_users;
        // console.log("response", response);
        // console.log("result", result);
        setPageCount(response?.data?.totalPages);
        setReportData(result);
        let modifiedResults = [];
        for (let i = 0; i < result.length; i++) {
          let data = {};
          data.fullname = result[i].fullname;
          data.zone = result[i].zone;
          data.batches = result[i].batches;
          data.division = result[i].division;
          data.programName = result[i].programName;
          data.user_score = result[i].user_score;
          data.isAbsent = result[i].isAbsent;
          data.isIncomplete = result[i].isIncomplete;
          data.score = result[i].score;
          data.index = `${i + 1}`.padStart(2, "0");
          data.userId = result[i].userId;
          data.isSuperTrainer = result[i].isSuperTrainer;
          data.comment = result[i].comment;
          modifiedResults.push(data);
        }
        setFilteredItems(modifiedResults);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      }
    );
  };
  useEffect(() => {
    get();
  }, [page, rowsPerPage]);
  const getDivisions = () => {
    let uniqueDivisions = [];
    reportData.map((data) => {
      if (data.division && uniqueDivisions.indexOf(data.division) === -1) {
        uniqueDivisions.push(data.division);
      }
    });
    // console.log("uniqueDivisions", uniqueDivisions);
    return uniqueDivisions;
  };
  // console.log("pageCount", pageCount);

  const [division, setDivision] = useState("All");

  const [score, setScore] = useState("All");
  const [batches, setBatches] = useState("All");

  const _onZoneChange = (e) => {
    if (e.target.value === "All" && division === "All") {
      setFilteredItems(reportData);
      return;
    } else if (e.target.value === "All") {
      setFilteredItems(reportData.filter((x) => x.division === division));
      return;
    } else if (division === "All") {
      setFilteredItems(reportData.filter((x) => x.zone === e.target.value));
      return;
    }
    setFilteredItems(
      reportData.filter(
        (x) => x.zone === e.target.value && x.division === division
      )
    );
  };

  const _onDivisionChange = (e) => {
    if (e.target.value === "All" && zone === "All") {
      setFilteredItems(reportData);
      return;
    } else if (e.target.value === "All") {
      setFilteredItems(reportData.filter((x) => x.zone === zone));
      return;
    } else if (zone === "All") {
      setFilteredItems(reportData.filter((x) => x.division === e.target.value));
      return;
    }
    setFilteredItems(
      reportData.filter((x) => x.division === e.target.value && x.zone === zone)
    );
  };

  console.log("reportData", reportData);

  const _onGradeChange = (e) => {
    const selectedGrade = e.target.value;
    if (selectedGrade === "All") {
      setFilteredItems(reportData);
      return;
    }
    const filteredData = reportData.filter(
      (item) => item.score === selectedGrade
    );
    setFilteredItems(filteredData);
  };

  const _onBatchChange = (e) => {
    const selectedGrade = e.target.value;
    if (selectedGrade === "All") {
      setFilteredItems(reportData);
      return;
    }
    const filteredData = reportData.filter(
      (item) => item.batches === selectedGrade
    );
    setFilteredItems(filteredData);
  };

  return isloading ? (
    "Loading"
  ) : (
    <div className="advance_table_cntr">
      <div className="table_hdr">
        Master Trainers quality report | Zone-wise, Division-wise
      </div>

      <div className="table_cnt">
        <div className="table_fltrs">
          <div className="filter_section">
            <div className="filter-text">Zone</div>
            <div className="px-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setZone(e.target.value);
                  _onZoneChange(e);
                }}
              >
                <option defaultValue={"All"}>All</option>$
                {getZones().map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter_section">
            <div className="filter-text">Division</div>
            <div className="px-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setDivision(e.target.value);
                  _onDivisionChange(e);
                }}
              >
                <option defaultValue={"All"}>All</option>$
                {getDivisions().map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter_section">
            <div className="filter-text">Batches</div>
            <div className="px-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setBatches(e.target.value);
                  _onBatchChange(e);
                }}
              >
                <option defaultValue={"All"}>All</option>$
                {getBatches().map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter_section">
            <div className="filter-text">Grades</div>
            <div className="px-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setScore(e.target.value);
                  _onGradeChange(e);
                }}
              >
                <option defaultValue={"All"}>All</option>$
                {getGrades().map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 75, 100]}
            component="div"
            count={pageCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <div className="adv_dtable">
          {/* <DataTable
            columns={ReportDataTableColumn}
            data={filteredItems}
            fixedHeader={true}
            responsive={true}
          /> */}
          <AdvanceTable1 data={filteredItems} callback={get}></AdvanceTable1>
        </div>
      </div>
    </div>
  );
};

export default AdvanceTable;
