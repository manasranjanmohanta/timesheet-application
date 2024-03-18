import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
 
const NavbarContainer = styled.div`
  /* Styles for the navigation bar container */
  display: flex;
  flex-wrap: wrap; /* Allow the container to wrap items to the next line */
`;
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
  margin-bottom: 20px;
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
  z-index: 1000;
  box-sizing: border-box;
 
  @media (max-width: 768px) {
    left: 0;
  }
`;
 
const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
 
  const handleSignOut = () => {
    localStorage.removeItem("token");
    console.log("User signed out");
    navigate("/");
  };
 
  React.useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setPageTitle("Home");
        break;
      case "/dashboard":
        setPageTitle("Dashboard");
        break;
      case "/activity":
        setPageTitle("Activity Allocation");
        break;
        case "/timesheet":
        setPageTitle("Validate Timesheet");
        break;
      case "/report":
        setPageTitle("Download Team Timesheet Report");
        break;
      case "/history":
        setPageTitle("Timesheet History");
        break;
      case "/mytimesheet":
        setPageTitle("My Timesheet");
        break;
      default:
        setPageTitle("Dashboard");
        break;
    }
  }, [location.pathname]);
 
  return (
    <NavbarContainer>
      <StatusContainer>
        <DashboardContainer>
          <h3>{pageTitle}</h3>
          <SidebarContainer>
            <Link to="/home">
              <Logo src="src/assets/logo.png" alt="logo" />
            </Link>
            <MenuContainer>
              <MenuItem>
                <MenuLink href="/home" isActive={location.pathname === "/home"}>
                  <MenuIcon className="fas fa-tachometer-alt" />
                  Home
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="/dashboard"
                  isActive={location.pathname === "/dashboard"}
                >
                  <MenuIcon className="fas fa-tachometer-alt" />
                  Dashboard
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="/activity"
                  isActive={location.pathname === "/activity"}
                >
                  <MenuIcon className="fas fa-calendar-check" />
                  Activity Allocation
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="/report"
                  isActive={location.pathname === "/report"}
                >
                  <MenuIcon className="fas fa-file-alt" />
                  Download Team Timesheet Report
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="/history"
                  isActive={location.pathname === "/history"}
                >
                  <MenuIcon className="fas fa-history" />
                  Timesheet History
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  href="/mytimesheet"
                  isActive={location.pathname === "/mytimesheet"}
                >
                  <MenuIcon className="fas fa-file-invoice" />
                  My Timesheet
                </MenuLink>
              </MenuItem>
            </MenuContainer>
            <FooterContainer>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            </FooterContainer>
          </SidebarContainer>
        </DashboardContainer>
      </StatusContainer>
    </NavbarContainer>
  );
};
 
export default NavigationBar;
 