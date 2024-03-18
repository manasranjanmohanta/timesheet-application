import React from "react";
import RoughCSS from "./Rough.module.css";

function Rough() {
  return (
    <div className={RoughCSS.rough}>
      <div className={RoughCSS.image}>
        <img
          src="https://www.ldtech.in/images/logo.png"
          alt="logo"
          className={RoughCSS.logo}
        />
      </div>
    </div>
  );
}

export default Rough;
