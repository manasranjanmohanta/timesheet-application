import ActivityCSS from "./Activity.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { rgbToHex } from "@material-ui/core";

function Activity() {
  const [tableRows, setTableRows] = useState([{ id: 1 }]); // Initial row
  const [weekStartDate, setWeekStartDate] = useState("");
  // const [projectType, setProjectType] = useState("");
  // const [activityType, setActivityType] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logDate, setLogDate] = useState("");
  // const [selectedProject, setSelectedProject] = useState("");
  // const [data, setData] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [employeeName, setEmpName] = useState("");
  const [employeeId, setEmpId] = useState("");

  const [rowData, setRowData] = useState([
    {
      selectedProject: "",
      activityType: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const payload = {
    employeeId: employeeId,
    allocateData: tableRows.map((row, index) => ({
      projectName: rowData[index].selectedProject,
      activityType: rowData[index].activityType,
      activityStartDate: rowData[index].startDate,
      activityEndDate: rowData[index].endDate,
    })),
    activityAllocationDate: logDate,
  };

  function saveActivity() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/v1/activityAllocations/allocate`, {
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
        // setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
    alert("Activity allocated to employee successfully!!");
  }
  const handleSearch = () => {
    if (employeeName.trim() !== "") {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/v1/activityAllocations/name/${employeeName}`, {
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
          setEmpId(data.employeeId); // Set the employee ID
        })
        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      // Handle empty employee name
      console.error("Employee name cannot be empty");
    }
  };

  const handleSearchid = () => {
    if (employeeId.trim() !== "") {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/v1/activityAllocations/id/${employeeId}`, {
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
          setEmpName(data.employeeName); // Set the employee ID
        })
        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      // Handle empty employee name
      console.error("Employee name cannot be empty");
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    // Calculate current week's start and end dates
    const currentDate = new Date();
    setLogDate(formatDate(currentDate));

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/v1/activityAllocations/projects/SK", {
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
        setProjectOptions(data); // Set project options directly from API response
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  };

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const wendDate = new Date(date);
    wendDate.setDate(wendDate.getDate() + 4);
    const formattedEndDate = wendDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

  // const addRow = () => {
  //   if (tableRows.length < 4) {
  //     const newRow = { id: tableRows.length + 1 };
  //     setTableRows([...tableRows, newRow]);
  //   }
  // };

  // const deleteRow = (id) => {
  //   if (id !== 1) {
  //     // Check if it's not the first row
  //     const updatedRows = tableRows.filter((row) => row.id !== id);
  //     setTableRows(updatedRows);
  //   }
  // };

  const addRow = () => {
    if (tableRows.length < 4) {
      const newRow = { id: tableRows.length + 1 };
      setTableRows([...tableRows, newRow]);
      // Add new empty row data
      setRowData([
        ...rowData,
        {
          selectedProject: "",
          activityType: "",
          startDate: "",
          endDate: "",
        },
      ]);
    }
  };

  // Function to delete a row
  const deleteRow = (id) => {
    if (id !== 1) {
      // Check if it's not the first row
      const updatedRows = tableRows.filter((row) => row.id !== id);
      setTableRows(updatedRows);
      // Remove corresponding row data
      setRowData(rowData.filter((row, index) => tableRows[index].id !== id));
    }
  };

  // Function to handle changes in dropdowns for each row
  const handleRowChange = (index, key, value) => {
    const updatedData = [...rowData];
    updatedData[index][key] = value;
    setRowData(updatedData);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    // Use navigate to go back to the previous page
    navigate(-1);
  };

  const resetPage = () => {
    // Reset all the state variables to their initial values
    setTableRows([{ id: 1 }]);
    setWeekStartDate("");
    setWeekEndDate("");
    setLogDate("");
    setEmpName("");
    setEmpId("");
    setRowData([
      {
        selectedProject: "",
        projectType: "",
        activityType: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  console.log("Payload:", payload);

  return (
    <>
      <NavigationBar />

      <div className={ActivityCSS["activity-container"]}>
        <div className={ActivityCSS["activity-form"]} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Employee Id :&nbsp;</label>
            <input
              type="text"
              placeholder="Search By Employee Id"
              name="employeeId"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmpId(e.target.value)}
              style={{ width: "170px", padding: "5px" }}
            />
            <IconButton
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={handleSearchid}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "150px", marginRight: "1px" }}>Employee Name :&nbsp;</label>
            <input
              type="text"
              placeholder="Search By Employee Name"
              name="employeeName"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmpName(e.target.value)}
              style={{ width: "170px", padding: "5px" }}
            />
            <IconButton
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "15px", width: "152px", marginRight: "1px" }}>Reporting Manager :&nbsp;</label>

            {/* <p style={{ fontSize: "15px", width: "150px", marginRight: "8px"}}>SK &nbsp;</p> */}
            <input
              type="text"
              placeholder="Sajjan Kumar Agrawalla"
              style={{ width: "170px", padding: "5px", textAlign: "center", border: "none", fontWeight: "bold", color: "black" }}
              readOnly
            />
          </div>
        </div>





        <div className={ActivityCSS["activity-form2"]} style={{ marginLeft: "400px", display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
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
              name="weekenddate"
              id="weekenddate"
              value={weekEndDate}
              readOnly
              style={{ padding: "5px", cursor: "pointer" }}
            />
          </div>
        </div>



        {/* <div className={ActivityCSS["activity-form3"]}>
         
        </div> */}
        <div
          className={ActivityCSS["activity-table1"]}
          style={{
            fontSize: "15px",
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
                    style={{ width: "140px", padding: "5px", cursor: "pointer" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div
          className={ActivityCSS["activity-table2"]}
          style={{ fontSize: "15px" }}
        >
          <table>
            <thead>
              <tr>
                <th>Project</th>
                {/* <th>Project Type</th> */}
                <th>Activity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <select
                      value={rowData[index].selectedProject}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "selectedProject",
                          e.target.value
                        )

                      }
                      style={{ width: "150px", padding: "5px", cursor: "pointer" }}
                    >
                      <option>Select Here</option>
                      {projectOptions.map((projectName, index) => (
                        <option key={index} value={projectName}>
                          {projectName}
                        </option>
                      ))}
                    </select>
                  </td>
                  {/* <td>
                    <select
                      value={rowData[index].projectType}
                      onChange={(e) =>
                        handleRowChange(index, "projectType", e.target.value)
                      }
                    >
                      <option>Select Here</option>
                      <option value="Developement">Developement</option>
                      <option value="Support">Support</option>
                      <option value="Testing">Testing</option>
                    </select>
                  </td> */}
                  <td>
                    <select
                      value={rowData[index].activityType}
                      onChange={(e) =>
                        handleRowChange(index, "activityType", e.target.value)
                      }
                      style={{ width: "150px", padding: "5px", cursor: "pointer" }}
                    >
                      <option>Select Here</option>
                      <option value="Fluid">Fluid</option>
                      <option value="Fiori">Fiori</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={rowData[index].startDate}
                      onChange={(e) =>
                        handleRowChange(index, "startDate", e.target.value)
                      }
                      style={{ width: "135px", padding: "5px", cursor: "pointer" }}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={rowData[index].endDate}
                      onChange={(e) =>
                        handleRowChange(index, "endDate", e.target.value)
                      }
                      style={{ width: "135px", padding: "5px", cursor: "pointer" }}
                    />
                  </td>
                  <td>
                    <input type="textarea"
                      style={{ width: "185px", padding: "5px", backgroundColor: "grey" }} readOnly />
                  </td>
                  <td>
                    <input type="textarea"
                      style={{ width: "185px", padding: "5px", backgroundColor: "grey" }} readOnly />
                  </td>
                  <td >
                    {tableRows.length < 4 || index === 0 ? (
                      <button onClick={addRow}
                        style={{ marginRight: "5px", cursor: "pointer" }} >Add</button>
                    ) : null}
                    {index !== 0 && (
                      <button style={{ cursor: "pointer" }} onClick={() => deleteRow(row.id)}

                      >Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className={ActivityCSS["activity-approval"]}>
        <label style={{ fontSize: "15px" }}>Approval:&nbsp;</label>
        <input type="text" name="approval" id="approval"></input>
      </div> */}

        {/* <div
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
            onClick={saveActivity}
            className={ActivityCSS["save-button"]}
          >
            Save
          </button>

          <button
            style={{ cursor: "pointer" }}
            onClick={resetPage}
            className={ActivityCSS["cancel-button"]}
          >
            Cancel
          </button>

          <button
            style={{ cursor: "pointer" }}
            onClick={handleBack}
            className={ActivityCSS["back-button"]}
          >
            Back
          </button>

        </div> */}
        <div className={ActivityCSS["activity-buttons"]} style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "650px",
          marginLeft: "290px",
          border: "none",
          borderRadius: "5px",
          gap: "15px",
        }}>
          <button onClick={saveActivity} className={ActivityCSS["save-button"]}>
            Save
          </button>
          <button onClick={resetPage} className={ActivityCSS["cancel-button"]}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Activity;
