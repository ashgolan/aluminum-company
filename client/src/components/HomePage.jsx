import React from "react";
import "./HomePage.css";
export default function HomePage() {
  return (
    <div className="home-container">
      <div className="welcome">
        <p>מערכת לניהול</p>
        <p style={{ color: "#3c2415" }}>הצעות</p>
        <p style={{ color: "#98ca3b" }}>הזמנות</p>
        <p style={{ color: "#f79722" }}>וחישובי מידות</p>
      </div>
    </div>
  );
}
