// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forgot.css";

function Forgot() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/reset-password");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <img
        src="src/assets/logo.png"
        alt="logo"
        style={{ paddingLeft: "90px" }}
      ></img>
      <p style={{ fontSize: "12px", color: "purple" }}>
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <div className="flex-row">
        {/* <label className="lf--label" htmlFor="email">
          <svg x="0px" y="0px" width="15px" height="5px">
              <g>
                <path
                  fill="#B1B7C4"
                  d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                />
              </g>
            </svg>

        </label> */}
        <label className="lf--label" htmlFor="email">
          <svg x="0px" y="0px" width="15px" height="15px" viewBox="0 0 24 24">
            <g>
              <path
                fill="#495057"
                d="M21,3H3C2.4,3,2,3.4,2,4v16c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V4C22,3.4,21.6,3,21,3z M12,14.9L3.6,8H20.4L12,14.9z M3.6,16L12,9.1L20.4,16H3.6z"
              />
            </g>
          </svg>
        </label>

        <input
          id="email"
          className="lf--input"
          placeholder="email"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <input className="lf--submit" type="submit" value="SUBMIT" />
      <Link
        to="/"
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "flex-end",
          textDecoration: "none",
          color: "blue",
          fontWeight: "bold",
        }}
      >
        &lt; Back to Login
      </Link>
    </form>
  );
}

export default Forgot;
