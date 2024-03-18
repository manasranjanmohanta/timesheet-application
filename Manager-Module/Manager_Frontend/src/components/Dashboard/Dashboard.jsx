import { useEffect, useState } from "react";
import DashboardCSS from "./Dashboard.module.css";
import { Table } from "antd";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";



// import DatePicker from "react-datepicker";

function Dashboard() {
  const navigate = useNavigate();
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
    logDate: "",
  });

  useEffect(() => {
    // Calculate current week's start and end dates
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff =
      currentDate.getDate() -
      currentDayOfWeek +
      (currentDayOfWeek === 0 ? -6 : 1); // Adjust when current day is Sunday
    const monday = new Date(currentDate.setDate(diff));
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // Set the start and end dates in the state
    setWeekStartDate(formatDate(monday));
    setWeekEndDate(formatDate(friday));

    fetchData(); // Fetch data after setting the dates
  }, []);

  // Helper function to format date as "YYYY-MM-DD"
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
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
    fetch(`http://localhost:8080/api/v1/dashboard/name/${filters.employeeName}`, {
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
    fetch(`http://localhost:8080/api/v1/dashboard/id/${filters.employeeId}`, {
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

  function handleclientSearch() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/v1/dashboard/client/${filters.client}`, {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 4);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

  const handlePendingButtonClick = (record) => {
    navigate("/timesheet", {
      state: { id: record.employeeId, logDate: record.logDate },
    });
  };

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
      title: "Employee ID",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: 'center',
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      align: 'center',
    },
    // {
    //   title: "Activity Hours",
    //   dataIndex: "activityHours",
    //   key: "activityHours",
    // },
    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      align: 'center',
      render: (text, record) => {
        if (record.approvalStatus === "Pending") {
          return (
            <button onClick={() => handlePendingButtonClick(record)}
              style={{
                padding: "5px 20px 5px 20px",
                backgroundColor: "#387ADF",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white"
              }}
            >
              Pending
            </button>
          );
        } else {
          return <span>{text}</span>;
        }
      },
    },
  ];



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

      <div>
        <h1>Dashboard</h1>
        <NavigationBar />

        <div className={DashboardCSS["dashboard-container"]}>

          <div className={DashboardCSS["dashboard-form"]} style={{ display: "flex", flexDirection: "column" }}>
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
              <label style={{ fontSize: "15px", width: "150px", marginRight: "8px" }}>Client :</label>
              <input
                type="text"
                placeholder="Search By Client Name"
                value={filters.client}
                onChange={handleFilterChange}
                name="client"
                style={{ marginRight: "auto", width: "170px", padding: "5px" }}
              />
              <IconButton
                style={{ marginLeft: "10px" }}
                size="small"
                onClick={handleclientSearch}
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
                style={{ width: "183px", padding: "5px", cursor: "pointer", textAlign: "center" }}
              >
                <option value="">Select Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ fontSize: "15px", width: "150px", marginRight: "8px" }}>Department :</label>
              <select
                value={filters.department}
                onChange={handleFilterChange}
                name="department"
                style={{ width: "183px", alignItems: "center", padding: "5px", cursor: "pointer", textAlign: "center" }}
              >
                <option value="">Select Type</option>
                <option value="IT">IT</option>
                <option value="NON-IT">NON-IT</option>
              </select>
            </div>
          </div>


          <div className={DashboardCSS["dashboard-form2"]} style={{ marginLeft: "400px", display: "flex", flexDirection: "column", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Week Start Date :&nbsp;</label>
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
              <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Week End Date :&nbsp;</label>
              <input
                type="date"
                name="weekEndDate"
                id="weekEndDate"
                value={weekEndDate}
                readOnly
                style={{ padding: "5px", cursor: "pointer" }}
              />
            </div>
          </div>


          <div
            className={DashboardCSS["dashboard-table"]}
            style={{ fontSize: "25px" }}
          >
            <Table
              columns={columns}
              // dataSource={data}
              dataSource={filteredData}
              pagination={pagination}
              style={{
                fontSize: "25px",
                position: "relative",
                bottom: "25px",
                left: "110px",
                paddingLeft: "140px",
                width: "1370px",

              }}
            />

          </div>
        </div>
      </div>

    </>
  );
}

export default Dashboard;
