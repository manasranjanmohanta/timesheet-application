// import React from "react";
import TimesheetCSS from "./Timesheet.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";

function Timesheet() {
  const [timesheetInfoList, setTimesheetInfoList] = useState([]);
  const [employeeName, setEmpName] = useState("");
  const [employeeId, setEmpId] = useState("");
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [logDate, setLogDate] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state);
  console.log(location.state.id);

  const pagination = {
    pageSize: 3,
    showQuickJumper: true,
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
    },
    // {
    //   title: "Project Type",
    //   dataIndex: "projectType",
    //   key: "projectType",
    //   align: 'center',
    // },
    {
      title: "Activity",
      dataIndex: "activityType",
      key: "activityType",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      align: "center",
      render: (text, record, index) => (
        <input
          type="text"
          value={timesheetInfoList[index].remark}
          onChange={(e) => {
            const newTimesheetInfoList = [...timesheetInfoList];
            newTimesheetInfoList[index].remark = e.target.value;
            setTimesheetInfoList(newTimesheetInfoList);
          }}
          style={{
            padding: "7px",
          }}
        />
      ),
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSearchid = () => {
    if (
      location.state.id.trim() !== "" ||
      location.state.logDate.trim() !== ""
    ) {
      const token = localStorage.getItem("token");
      fetch(
        `http://localhost:8080/api/v1/validate/${location.state.id}/${location.state.logDate}`
        , {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },  
          }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmpName(data.employeeName);

          setEmpId(data.employeeId);
          setLogDate(data.logDate);
          setLoginTime(data.loginTime);
          setLogoutTime(data.logoutTime);
          setApprovalStatus(data.approvalStatus);
          setProjectData(data.project);
          const newTimesheetInfoList = data.project.map((project) => ({
            startTime: project.startTime,
            remark: "",
          }));
          setTimesheetInfoList(newTimesheetInfoList);
        })

        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      console.error("Employee ID cannot be empty");
    }
  };

  useEffect(() => {
    handleSearchid();
  }, []);

  const handleApprove = () => {
    const payload = {
      employeeId: location.state.id,
      logDate: location.state.logDate,
      timesheetInfoList,
      approvalStatus: "Accepted",
    };
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/validate/timesheet", {
      method: "PUT",
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

        console.log("Timesheet approved successfully");
        alert("Timesheet approved successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was a problem approving the timesheet: ", error);
      });
  };

  const handleReject = () => {
    const payload = {
      employeeId: location.state.id,
      logDate: location.state.logDate,
      timesheetInfoList,
      approvalStatus: "Rejected",
    };
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/validate/timesheet", {
      method: "PUT",
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

        console.log("Timesheet rejected successfully");
        alert("Timesheet rejected");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was a problem approving the timesheet: ", error);
      });
  };

  useEffect(() => {
    const currentDate = new Date();

    const currentDayOfWeek = currentDate.getDay();
    const diff =
      currentDate.getDate() -
      currentDayOfWeek +
      (currentDayOfWeek === 0 ? -6 : 1);
    const monday = new Date(currentDate.setDate(diff));
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    setWeekStartDate(formatDate(monday));
    setWeekEndDate(formatDate(friday));
  }, []);

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const wendDate = new Date(date);
    wendDate.setDate(wendDate.getDate() + 4);
    const formattedEndDate = wendDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

  const calculateGrossHours = () => {
    if (loginTime && logoutTime) {
      const [loginHour, loginMinute] = loginTime.split(":").map(Number);
      const [logoutHour, logoutMinute] = logoutTime.split(":").map(Number);

      const login = new Date(2000, 0, 1, loginHour, loginMinute);
      const logout = new Date(2000, 0, 1, logoutHour, logoutMinute);

      const diff = (logout - login) / (1000 * 60 * 60);
      return diff.toFixed(2);
    }
    return "";
  };

  const modifiedProjectData = projectData.map((item, index) => ({
    ...item,
    key: index.toString(),
  }));

  const calculateActivityHours = () => {
    let totalHours = 0;

    projectData.forEach((project) => {
      if (project.startTime && project.endTime) {
        const [startHour, startMinute] = project.startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = project.endTime.split(":").map(Number);

        const start = new Date(2000, 0, 1, startHour, startMinute);
        const end = new Date(2000, 0, 1, endHour, endMinute);

        const diff = (end - start) / (1000 * 60 * 60);
        totalHours += diff;
      }
    });

    return totalHours.toFixed(2);
  };

  return (
    <>
      <NavigationBar />

      <div className={TimesheetCSS["timesheet-container"]}>
        {/* <div className={TimesheetCSS["timesheet-form"]}>
          <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
          <input
            type="text"
            placeholder="Enter Employee Id"
            name="employeeId"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmpId(e.target.value)}
          />
          
          <label style={{ fontSize: "15px", marginLeft: "857px" }}>
            Week Start Date:&nbsp;
          </label>
          <input
            type="date"
            name="weekstartdate"
            id="weekstartdate"
            value={weekStartDate}
            onChange={(e) => handleWeekStartDateChange(e.target.value)}
          />
        </div> */}

        <div
          className={TimesheetCSS["timesheet-form"]}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}
            >
              Employee Id :&nbsp;
            </label>
            <input
              type="text"
              placeholder="Search By Employee Id"
              name="employeeId"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmpId(e.target.value)}
              style={{ width: "170px", padding: "5px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label
              style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}
            >
              Employee Name :&nbsp;
            </label>
            <input
              type="text"
              placeholder="Search By Employee Name"
              name="employeeName"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmpName(e.target.value)}
              style={{ width: "170px", padding: "5px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label
              style={{ fontSize: "15px", width: "152px", marginRight: "1px" }}
            >
              Reporting Manager :&nbsp;
            </label>

            {/* <p style={{ fontSize: "15px", width: "150px", marginRight: "8px"}}>SK &nbsp;</p> */}
            <input
              type="text"
              placeholder="Sajjan Kumar Agrawalla"
              style={{
                width: "170px",
                padding: "5px",
                textAlign: "center",
                border: "none",
                fontWeight: "bold",
                color: "black",
              }}
              readOnly
            />
          </div>
        </div>

        {/* 
        <div className={TimesheetCSS["timesheet-form2"]}>
          <label style={{ fontSize: "15px" }}>Employee Name:&nbsp;</label>
          <input
            type="text"
            placeholder="Enter Employee Name"
            name="employeeName"
            id="employeeName"
            readOnly
            value={employeeName}
            onChange={(e) => setEmpName(e.target.value)}
          />
          <label
            style={{ fontSize: "15px", marginLeft: "800px", paddingLeft: "29px" }}
          >
            Week End Date:&nbsp;
          </label>
          <input
            type="date"
            name="weekenddate"
            id="weekenddate"
            onChange={(e) => setWeekEndDate(e.target.value)}
            value={weekEndDate}
            readOnly
            style={{ paddingLeft: "4px", marginLeft: "2px" }}
          />
        </div>
        <div className={TimesheetCSS["timesheet-form3"]}>
          {/* <p>Role: Developer</p> */}
        {/* <p>Reporting Manager: SK</p>
        </div> */}

        <div
          className={TimesheetCSS["timesheet-form2"]}
          style={{
            marginLeft: "400px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}
            >
              Week Start Date :&nbsp;
            </label>
            <input
              type="date"
              name="weekstartdate"
              id="weekstartdate"
              value={weekStartDate}
              onChange={(e) => handleWeekStartDateChange(e.target.value)}
              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}
            >
              Week End Date :&nbsp;
            </label>
            <input
              type="date"
              name="weekenddate"
              id="weekenddate"
              value={weekEndDate}
              readOnly
              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* <div
          className={TimesheetCSS["timesheet-table1"]}
          style={{
            fontSize: "15px",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Log Date</th>
                <th>Log In</th>
                <th>Log Out</th>
                <th>Gross Hours</th>
                <th>Activity Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{logDate}</td>
                <td>{loginTime}</td>
                <td>{logoutTime}</td>
                <td>{calculateGrossHours()}</td>
                <td>{calculateActivityHours()}</td>
              </tr>
            </tbody>
          </table>
        </div> */}

        <div
          className={TimesheetCSS["timesheet-table1"]}
          style={{
            fontSize: "13px",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Log Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="date"
                    name="logDate"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    style={{
                      width: "145px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 
        <div
          className={TimesheetCSS["timesheet-table2"]}
          style={{ fontSize: "15px" }}
        >
          <Table
            columns={columns}
            dataSource={modifiedProjectData}
            pagination={pagination}
            size="middle"
            style={{ width: "100%" }}
          />
        </div> */}

        <div
          className={TimesheetCSS["timesheet-table2"]}
          style={{ fontSize: "15px" }}
        >
          <Table
            columns={columns}
            // dataSource={data}
            dataSource={modifiedProjectData}
            pagination={pagination}
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              position: "relative",
              bottom: "25px",
              left: "110px",
              paddingLeft: "140px",
              width: "1350px",
            }}
          />
        </div>

        <div className={TimesheetCSS["timesheet-approval"]}>
          <label
            style={{ fontSize: "15px", width: "130px", marginRight: "20px" }}
          >
            Approval :&nbsp;
          </label>
          <input
            type="text"
            name="approval"
            id="approval"
            style={{
              marginRight: "21px",
              padding: "5px",
              backgroundColor: "grey",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              borderRadius: "4px",
            }}
            value={approvalStatus}
            readOnly
            onChange={(e) => setApprovalStatus(e.target.value)}
          ></input>
        </div>

        {/* <div

          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "720px",
            border: "none",
            borderRadius: "5px",
            gap: "10px",
          }}
        >
          <button
            style={{ cursor: "pointer" }}
            className={TimesheetCSS["approve-button"]}
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            style={{ cursor: "pointer" }}
            className={TimesheetCSS["reject-button"]}
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            style={{ cursor: "pointer" }}
            onClick={handleBack}
            className={TimesheetCSS["back-button"]}
          >
            Back
          </button>
        </div> */}

        <div
          className={TimesheetCSS["timesheet-buttons"]}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "650px",
            marginLeft: "290px",
            border: "none",
            borderRadius: "5px",
            gap: "15px",
          }}
        >
          <button
            onClick={handleApprove}
            className={TimesheetCSS["approve-button"]}
          >
            Accept
          </button>

          <button
            onClick={handleReject}
            className={TimesheetCSS["reject-button"]}
          >
            Reject
          </button>
          <button
            onClick={handleBack}
            className={TimesheetCSS["cancel-button"]}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Timesheet;
