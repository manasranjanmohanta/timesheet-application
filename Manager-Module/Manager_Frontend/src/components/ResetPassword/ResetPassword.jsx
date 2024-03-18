import React, { useState } from "react";
import "./ResetPassword.css"; // You can create a separate CSS file for styling ResetPassword component
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      // You can add logic here to handle password reset, such as sending a request to the server
      // For demonstration purpose, let's assume password reset is successful
      navigate("/"); // Redirect to login page after successful password reset
      alert("Password has been reset");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <img
        src="src/assets/logo.png"
        alt="logo"
        style={{ paddingLeft: "90px" }}
      ></img>
      <div className="flex-row">
        <label
          htmlFor="new-password"
          style={{ fontSize: "15px", paddingLeft: "12px" }}
        >
          <svg x="0px" y="0px" width="15px" height="5px">
            <g>
              <path
                fill="#495057"
                d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
              />
            </g>
          </svg>
        </label>
        <input
          id="new-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          style={{ border: "none", background: "white", paddingLeft: "20px" , paddingRight: "10px", cursor: "pointer"}}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
      <div className="flex-row">
        <label
          htmlFor="confirm-password"
          style={{ fontSize: "15px",  paddingLeft: "12px"}}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ marginRight: "5px" }}
          />
        </label>
        <input
          id="confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button
          type="button"
          onClick={toggleShowConfirmPassword}
          style={{ border: "none", background: "white", paddingLeft: "20px" , paddingRight: "10px", cursor: "pointer"}}
        >
          {showConfirmPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
      <input
        className="reset-password-submit"
        type="submit"
        value="Reset Password"
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/" className="back-to-login">
        Back to Login
      </Link>
    </form>
  );
};

export default ResetPassword;
