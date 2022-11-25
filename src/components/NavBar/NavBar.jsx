import React from "react";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="nav_container">
      <ul className="nav">
        <li className="logo">אלומניום התפוח</li>
        <li>מחשבון</li>
        <li>הזמנה למפעל</li>
        <li>הצעת מחיר</li>
        <li>
          <img className="setup_img" src="/setup.png" alt="" />
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
