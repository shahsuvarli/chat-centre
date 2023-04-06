import React from "react";
import "./index.css";
import spinner from "../../images/spinner.svg";

function Loading() {
  return (
    <div className="loading-container">
      <img src={spinner} alt="loading" />
    </div>
  );
}

export default Loading;
