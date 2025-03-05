import React from "react";
import "./Loader.css"; // We'll create this file next

const Loader = () => {
  return (
    <div class="Loader">
      <div class="loader">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="text">Loading AB_TECH</div>
        <div class="particles">
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
