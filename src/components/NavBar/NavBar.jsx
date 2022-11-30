import React from "react";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 500) && (
        <ul className="list">
          <Link style={{ width: "20%" }} to={"/"} className="items">
            <img className="logo" src="/logo6.png" alt="" />
          </Link>
          <Link className="items" to={"/calc"}>
            מחשבון
          </Link>
          <Link className="items" to={"/forging"}>
            פרזול
          </Link>
          <Link className="items" to={"/order"}>
            הזמנות למפעל
          </Link>
          <Link className="items" to={"/bid"}>
            מילוי הצעה
          </Link>
          <Link style={{ width: "5%" }} className="items" to={"/SetupPage"}>
            <img className="setup_img" src="/setup.png" alt="" />
          </Link>
        </ul>
      )}
      <i className="fa-solid fa-bars btn" onClick={toggleNav}></i>
    </nav>
  );
}

export default NavBar;
