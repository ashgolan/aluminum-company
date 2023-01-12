import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
export default function HomePage({ loginState, setLoginState }) {
  return (
    <div className="home-container">
      <div className="title-homepage">
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>מערכת לניהול</h1>
        <div className="welcome">
          <p style={{ color: "#3c2415" }}>הצעות</p>
          <p style={{ color: "#98ca3b" }}>הזמנות</p>
          <p style={{ color: "#f79722" }}>וחישובי מידות</p>
        </div>
        {(!localStorage.getItem("userID") ||
          localStorage.getItem("userID") === "null" ||
          loginState) && (
          <Link to="/login">
            <button
              onClick={() => setLoginState(true)}
              className="home-log-btn"
            >
              כניסה
            </button>
          </Link>
        )}
        {localStorage.getItem("userID") &&
          localStorage.getItem("userID") !== "null" && (
            <label
              style={{ fontSize: "1rem", color: "brown", fontWeight: "bold" }}
              htmlFor=""
            >
              המערכת פתוחה לשימוש חופשי
            </label>
          )}
      </div>
    </div>
  );
}
