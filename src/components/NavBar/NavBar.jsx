import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav_container">
      <ul className="nav">
        <Link to={"/"}>
          <img className="logo" src="/logo6.png" alt="" />
        </Link>
        <Link to={"/calc"}>מחשבון</Link>
        <Link to={"/forging"}>פרזול</Link>
        <Link to={"/order"}>ביצוע הזמנות למפעל</Link>
        <Link to={"/bid"}>מילוי הצעה</Link>
        <Link to={"/SetupPage"}>
          <img className="setup_img" src="/setup.png" alt="" />
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
