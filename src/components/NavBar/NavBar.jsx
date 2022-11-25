import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav_container">
      <ul className="nav">
        <li className="logo">אלומניום התפוח</li>
        <Link to={"/calc"}>מחשבון</Link>
        <Link to={"/forging"}>פרזול</Link>
        <Link to={"/order"}>הזמנה למפעל</Link>
        <Link to={"/bid"}> הצעת מחיר</Link>
        <Link to={"/"}>
          <img className="setup_img" src="/setup.png" alt="" />
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
