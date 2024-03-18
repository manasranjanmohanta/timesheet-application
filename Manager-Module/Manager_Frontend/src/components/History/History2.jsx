import { useEffect } from "react";
// import DashboardCSS from "./Dashboard.module.css";
import HistoryCSS from "./History2.module.css";
import { Table } from "antd";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";


// import DatePicker from "react-datepicker";

function History2() {
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  // const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    employeeName: "",
    employeeId: "",
    approvalStatus: "",
    client: "",
    department: "",
  });

  // useEffect(() => {
  //   // Calculate current week's start and end dates
  //   const currentDate = new Date();
  //   const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  //   const diff =
  //     currentDate.getDate() -
  //     currentDayOfWeek +
  //     (currentDayOfWeek === 0 ? -6 : 1); // Adjust when current day is Sunday
  //   const monday = new Date(currentDate.setDate(diff));
  //   const friday = new Date(monday);
  //   friday.setDate(monday.getDate() + 4);

  //   // Set the start and end dates in the state
  //   setWeekStartDate(formatDate(monday));
  //   setWeekEndDate(formatDate(friday));

  //   fetchData(); // Fetch data after setting the dates
  // }, []);

  // Helper function to format date as "YYYY-MM-DD"
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // useEffect(() => {
  //   // Function to fetch data from API
  //   const fetchData = async () => {
  //     try {
  //       // Perform API call here and set data state
  //       // Example:
  //       const response = await fetch("http://localhost:8080/api/dashboard");
  //       const jsonData = await response.json();
  //       console.log("jsonData", jsonData);
  //       setData(jsonData);
  //       // For demonstration purpose, I'm setting dummy data here
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/history", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  };

  const payload = {
    startDate: weekStartDate,
    endDate: weekEndDate,
  };

  console.log(filters.employeeName);
  function handlenameSearch() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/v1/history/name/${filters.employeeName}`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  }

  function handleidSearch() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/v1/history/id/${filters.employeeId}`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  }

  // function handleclientSearch() {
  //   fetch(`http://localhost:8080/api/dashboard/client/${filters.client}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Data fetched from API:", data);
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem fetching the data: ", error);
  //     });
  // }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    const endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    const formattedEndOfMonth = endOfMonth.toISOString().split("T")[0];
    setWeekEndDate(formattedEndOfMonth);

    const payload = {
        startDate: date,
        endDate: formattedEndOfMonth,
    };

    console.log(payload);

    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/history/rangedDate", {
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
        return response.json();
    })
    .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
    })
    .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
    });
};

  // Set default values for fromDate and toDate
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setWeekStartDate(formattedDate);
    setWeekEndDate(formattedDate);
  }, []);

  const pagination = {
    pageSize: 5,
    showQuickJumper: true,
  };

  const columns = [
    {
      title: "Log Date",
      dataIndex: "logDate",
      key: "logDate",
      align: 'center',
    },
    {
      title: "Emplyee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      align: 'center',
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      align: 'center',
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      align: 'center',
    },

    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      align: 'center',
    },

    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      align: 'center',
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     date: "2023-06-01",
  //     empId: "LD00001",
  //     empName: "Suvendu",
  //     project: "Project A",
  //     department: "IT",
  //     client: "Client A",
  //     activityHours: "5",
  //     status: "Pending",
  //   },
  //   {
  //     key: "2",
  //     date: "2023-06-02",
  //     empId: "LD00002",
  //     empName: "Subham",
  //     project: "Project B",
  //     department: "HR",
  //     client: "Client B",
  //     activityHours: "3",
  //     status: "Approved",
  //   },
  //   {
  //     key: "3",
  //     date: "2023-06-03",
  //     empId: "LD00003",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "4",
  //     date: "2023-06-04",
  //     empId: "LD00004",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "5",
  //     date: "2023-06-05",
  //     empId: "LD00005",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "6",
  //     date: "2023-06-06",
  //     empId: "LD00006",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  // ];

  const filteredData = data.filter((item) => {
    return (
      (!item.employeeName ||
        item.employeeName
          .toLowerCase()
          .includes(filters.employeeName.toLowerCase())) &&
      (!item.employeeId ||
        item.employeeId
          .toLowerCase()
          .includes(filters.employeeId.toLowerCase())) &&
      (filters.approvalStatus === "" ||
        item.approvalStatus === filters.approvalStatus) &&
      (!item.client ||
        item.client.toLowerCase().includes(filters.client.toLowerCase())) &&
      (filters.department === "" || item.department === filters.department)
    );
  });

  return (
    <>
      <NavigationBar />
      <div className={HistoryCSS["history-container"]}>
        {/* <div className={DashboardCSS["dashboard-logo"]}>
          <img
            src="https://ldtech.in/wp-content/uploads/2024/01/logo.png"
            alt="logo"
          // className={ActivityCSS["activity-logo"]}
          />
          <h3
            style={{
              marginLeft: "36px",
              marginBottom: "-22.92px",
              marginTop: "-16.92px",
              color: "darkred",
              fontFamily: "monospace",
            }}
          >
            History
          </h3>
        </div> */}

        <div className={HistoryCSS["history-form"]} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "8px" }}>Employee Id :</label>
            <input
              type="text"
              placeholder="Search By Employee Id"
              name="employeeId"
              id="empid"
              value={filters.employeeId}
              onChange={handleFilterChange}
              style={{ width: "170px", padding: "5px" }}

            />
            <IconButton
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={handleidSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "8px" }}>Employee Name :</label>
            <input
              type="text"
              placeholder="Search By Employee Name"
              name="employeeName"
              value={filters.employeeName}
              onChange={handleFilterChange}
              style={{ width: "170px", padding: "5px" }}
            />
            <IconButton
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={handlenameSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "8px" }}>Status :</label>
            <select
              value={filters.approvalStatus}
              onChange={handleFilterChange}
              name="approvalStatus"
              style={{ width: "183px", padding: "5px", textAlign: "center", cursor: "pointer" }}
            >
              <option value="">Select Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              {/* <option value="Pending">Pending</option> */}
            </select>
          </div>

        </div>

        <div className={HistoryCSS["history-form2"]} style={{ marginLeft: "300px", display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>From Date :&nbsp;</label>
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
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>To Date :&nbsp;</label>
            <input
              type="date"
              name="weekEndDate"
              id="weekEndDate"
              value={weekEndDate}
              onChange={(e) => handleWeekStartDateChange(e.target.value)}

              // readOnly
              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>
        </div>

        <div
          className={HistoryCSS["history-table"]}
          style={{ fontSize: "35px" }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={pagination}
            style={{
              fontSize: "35px",
              position: "relative",
              bottom: "25px",
              left: "110px",
              paddingLeft: "140px",
              width: "1350px"
            }}
          />

        </div>
      </div>
    </>
  );
}

export default History2;
