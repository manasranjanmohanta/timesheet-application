import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Home.css";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the container to wrap items to the next line */
`;

const SidebarContainer = styled.div`
  background-color: lightgrey;
  width: 250px;
  min-height: 100vh; /* Make sure the sidebar takes at least the full height */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const Logo = styled.img`
  width: 200px;
  height: 36px;
  margin-right: 10px;
  padding-left: 20px;
`;

const MenuContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: monospace;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
  border-radius: 5px;
  font-weight: bold;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  background-color: ${(props) => (props.isActive ? "darkgrey" : "transparent")};
 
  &:hover {
    background-color: #e0e4e8;
  }
`;

const MenuIcon = styled.i`
  margin-right: 10px;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-top: 20px;
`;

const SignOutButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px 95px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StatusContainer = styled.div`
  width: 86.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 220px;
  background-color: lightgrey;
  padding: 12px;
  z-index: 1000;
  box-sizing: border-box;
 
  @media (max-width: 768px) {
    left: 0;
  }
`;

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  width: calc(30% - 20px);
  margin: 0 10px;
  box-sizing: border-box;
 
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 10px 0;
  }
`;

const StatusTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 1px;
`;

const StatusCount = styled.span`
  font-size: 20px;
`;

const TotalStatusHeader = styled.h1`
  font-size: 25px;
  font-weight: bold;
  padding-left: 105px;
`;

const DashboardContent = styled.div`
  padding: 52px;
  box-sizing: border-box;
  flex: 1; /* Allow the content to grow and take remaining space */
`;

const ResponsiveDatePicker = styled(DatePicker)`
  .react-responsive-ui .react-responsive-datepicker {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  background-color: yellow;
  color: black;
  border-radius: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
  padding-right: 33px;
  margin-left: 268px;
  border-right-width: 0px;
  border-right-style: solid;
  margin-bottom: 0px;
  border-top-width: 0px;
  border-top-style: solid;
  margin-right: 0px;
  animation: slide-in 2s linear forwards;
 
  @keyframes slide-in {
    0% {
      transform: translateX(-60%);
    }
    125% {
      transform: translateX(0%);
    }
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 2px;
  right: 10px;
  cursor: pointer;
  margin-top: 9px;
`;

const Home = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const accessToken = localStorage.getItem("token");  

        const [approvedResponse, rejectedResponse, pendingResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/v1/home/status/accepted", {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }),
            fetch("http://localhost:8080/api/v1/home/status/rejected", {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }),
            fetch("http://localhost:8080/api/v1/home/status/pending", {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }),
          ]);
        console.log(
          "response",
          approvedResponse,
          rejectedResponse,
          pendingResponse
        );

        const [approvedData, rejectedData, pendingData] = await Promise.all([
          approvedResponse.json(),
          rejectedResponse.json(),
          pendingResponse.json(),
        ]);

        setApprovedCount(approvedData);
        setRejectedCount(rejectedData);
        setPendingCount(pendingData);
        setLoading(false);
        console.log(approvedCount, rejectedCount, pendingCount);
        console.log(approvedResponse, rejectedResponse, pendingResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, [approvedCount, rejectedCount, pendingCount]);

  useEffect(() => {
    // Fetch pending count data
    const fetchPendingCount = async () => {
      try {
        const accessToken = localStorage.getItem("token"); 
        const response = await fetch(
          "http://localhost:8080/api/v1/home/status/pending", {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        const data = await response.json();
        setPendingCount(data);
        setShowAlert(true); // Show alert when pending count is fetched
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };

    fetchPendingCount();
  }, []); // Run once on component mount

  useEffect(() => {
    // Set showAlert to true to display the alert message
    setShowAlert(true);
    // Set showAlert back to false after 3 seconds
    setTimeout(() => setShowAlert(false));
  }, []);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  // if (loading) {
  //   return (
  //     <div className="spinner-container">
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }

  const COLORS = ["#4caf50", "#f44336", "#ff9800"];

  const handleSignOut = () => {
    // Handle sign out logic here
    // For example, you might clear user authentication state
    navigate("/"); // Navigate to the Login2 component
  };
  return (
    <>

      <AlertContainer show={showAlert}>
        <CloseIcon onClick={toggleAlert}>
          <FaTimes />
        </CloseIcon>
        <p
          style={{
            fontStyle: "italic",
            // borderTopWidth: "4px",
            borderTopStyle: "solid",
            borderTopColor: "yellow",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          &nbsp;&nbsp;&nbsp;You have {pendingCount} Timesheets waiting for your
          approval.&nbsp;
        </p>
      </AlertContainer>

      <DashboardContainer>
        <SidebarContainer>
          <LogoContainer>
            <Link to="/home">
              <Logo src="src/assets/logo.png" alt="logo" />
            </Link>
          </LogoContainer>
          {/* <MenuContainer>
            <MenuItem>
              <MenuLink href="/home" style={{ backgroundColor: "gray" }}>
                <MenuIcon className="fas fa-tachometer-alt" />
                Home
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/dashboard">
                <MenuIcon className="fas fa-tachometer-alt" />
                Dashboard
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/activity">
                <MenuIcon className="fas fa-calendar-check" />
                Activity Allocation
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/report">
                <MenuIcon className="fas fa-file-alt" />
                Report
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/history">
                <MenuIcon className="fas fa-history" />
                History
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/timesheet">
                <MenuIcon className="fas fa-file-invoice" />
                Timesheet
              </MenuLink>
            </MenuItem>
          </MenuContainer> */}
          <MenuContainer>
            <MenuItem>
              <MenuLink href="/home" isActive={location.pathname === "/home"}>
                <MenuIcon className="fas fa-tachometer-alt" />
                Home
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/dashboard">
                <MenuIcon className="fas fa-tachometer-alt" />
                Dashboard
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/activity">
                <MenuIcon className="fas fa-calendar-check" />
                Activity Allocation
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/report">
                <MenuIcon className="fas fa-file-alt" />
                Download Timesheet Report
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/history">
                <MenuIcon className="fas fa-history" />
                Timesheet History
              </MenuLink>
            </MenuItem>
            {/* <MenuItem>
                <MenuLink href="/timesheet">
                  <MenuIcon className="fas fa-file-invoice" />
                  My Team Timesheet
                </MenuLink>
              </MenuItem> */}

            <MenuItem>
              <MenuLink href="/mytimesheet">
                <MenuIcon className="fas fa-file-invoice" />
                My Timesheet
              </MenuLink>
            </MenuItem>
          </MenuContainer>
          <FooterContainer>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </FooterContainer>
        </SidebarContainer>
        <StatusContainer>
          <StatusBox>
            <div style={{ paddingTop: "5px" }}>
              <FaCheckCircle color="#4caf50" size={25} />
            </div>

            <StatusTitle>Approved</StatusTitle>

            <StatusCount>{approvedCount}</StatusCount>
          </StatusBox>

          <StatusBox>
            <div style={{ paddingTop: "5px" }}>
              <FaTimesCircle color="#f44336" size={25} />
            </div>
            <StatusTitle>Rejected</StatusTitle>
            <StatusCount>{rejectedCount}</StatusCount>
          </StatusBox>

          <StatusBox>
            <div style={{ paddingTop: "5px" }}>
              <FaExclamationTriangle color="#ff9800" size={25} />
            </div>
            <StatusTitle>Pending</StatusTitle>
            <StatusCount>{pendingCount}</StatusCount>
          </StatusBox>
        </StatusContainer>
        <DashboardContent>
          <div
            style={{
              marginLeft: "250px",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={[
                  { name: "Approved", value: approvedCount },
                  { name: "Rejected", value: rejectedCount },
                  { name: "Pending", value: pendingCount },
                ]}
                dataKey="value"
                fontSize={15}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {[
                  { name: "Approved", value: approvedCount },
                  { name: "Rejected", value: rejectedCount },
                  { name: "Pending", value: pendingCount },
                ].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            {/* <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Approved: {approvedCount}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                |
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Rejected: {rejectedCount}
              c
              <span
                style={{
                  fontSize: "18px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                |
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Pending: {pendingCount}
              </span>
            </div> */}
            <TotalStatusHeader>
              Total Status : {approvedCount + rejectedCount + pendingCount}
            </TotalStatusHeader>
          </div>
        </DashboardContent>
        <div
          style={{
            position: "fixed",
            bottom: "15px",
            right: "25px",
            zIndex: 1000,
          }}
        >
          <ResponsiveDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            className="custome-datepicker"
          />
        </div>
      </DashboardContainer>
    </>
  );
};

export default Home;
