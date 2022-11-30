import React from "react";
import "./HomePage.css";
export default function HomePage() {
  return (
    <div className="home-container">
      <label className="welcome" htmlFor="">
        מערכת לניהול <span style={{ color: "#3c2415" }}>הצעות</span> ,
        <span style={{ color: "#98ca3b" }}>הזמנות</span> ,
        <span style={{ color: "#f79722" }}>וחישובי המידות</span>
      </label>
    </div>
  );
}
