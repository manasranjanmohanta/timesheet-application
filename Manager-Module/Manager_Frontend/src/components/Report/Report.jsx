//
import React from "react";
import ReportCSS from "./Report.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";


function Report() {
  const [empId, setEmpId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [toDate, setToDate] = useState("");
  const handleDownload = () => {
    const payload = {
      startDate: fromDate,
      endDate: toDate,
    };

    if (empId !== "") {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/v1/report/download/id/${empId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    }
    else if (empName !== "") {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/v1/report/download/name/${empName}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    } else {
      const token = localStorage.getItem("token");
      fetch("http://localhost:8080/api/v1/report/download", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);

    // Calculate end of the month for toDate
    const endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0); // Set to the last day of the month
    const formattedEndOfMonth = endOfMonth.toISOString().split("T")[0];
    setToDate(formattedEndOfMonth);
  };

  // Set default values for fromDate and toDate
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setFromDate(formattedDate);
    setToDate(formattedDate);
  }, []);

  const handleReset = () => {
    setEmpId("");
    setEmpName("");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setFromDate(formattedDate);
    setToDate(formattedDate);
  };

  return (
    <>
      <NavigationBar />


      <div className={ReportCSS["report-container"]}>

        <div className={ReportCSS["report-form"]}>

          <div className={ReportCSS["report-form"]} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Employee Id:&nbsp;</label>
              <input
                type="text"
                placeholder="Search By Employee Id"
                name="empid"
                id="empid"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                style={{ width: "170px", padding: "5px" }}
              />


            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Employee Name:&nbsp;</label>
              <input
                type="text"
                placeholder="Search By Employee Name"
                name="empname"
                id="empname"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                style={{ width: "170px", padding: "5px" }}
              />

            </div>

          </div>

        </div>

        <div className={ReportCSS["report-form2"]} style={{ marginLeft: "400px", display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>From Date :&nbsp;</label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>To Date :&nbsp;</label>
            <input
              type="date"
              name="toDate"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}

              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>
        </div>

        <div style={{ position: "relative", marginTop: "350px", marginLeft: "290px" }}>
          <button
            style={{
              backgroundColor: "burlywood",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleDownload}
          >
            <FaDownload style={{ fontSize: "24px" }} />
          </button>
          <div
            className="downloadInfo"
            style={{
              position: "absolute",
              top: "120%", 
              left: "50%", 
              transform: "translateX(-50%)", 
              textAlign: "center",
              width: "100%", 
              color: "gray", 
              fontSize: "15px"
            }}
          >
            Click the above icon to download!
          </div>
        </div>
    
        <div className={ReportCSS["report-buttons"]} style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "185px",
          marginLeft: "300px",
          border: "none",
          borderRadius: "5px",
          gap: "15px",
        }}>
          <button onClick={handleReset} className={ReportCSS["cancel-button"]}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Report;
