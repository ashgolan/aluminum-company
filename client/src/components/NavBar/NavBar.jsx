import React from "react";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
function NavBar({ setLoginState }) {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const logout = async (e) => {
    e.preventDefault();
    try {
      await Api.get("/logout");
      localStorage.removeItem("userID");
      setLoginState((prev) => !prev);
      navigate("/");
    } catch {
      console.log("error");
    }
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
      <ul className="list">
        <Link style={{ width: "20%" }} to={"/"}>
          <img className="logo" src="/logo6.png" alt="" />
        </Link>
        <Link
          className="items"
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/calc"
          }
        >
          מחשבון
        </Link>
        <Link
          className="items"
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/forging"
          }
        >
          פרזול
        </Link>
        <Link
          className="items"
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/order"
          }
        >
          הזמנות למפעל
        </Link>
        <Link
          className="items"
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/bid"
          }
        >
          הצעת מחיר
        </Link>
        <Link
          style={{ width: "5%" }}
          className="items"
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/SetupPage"
          }
        >
          <img className="setup_img" src="/setup.png" alt="" />
        </Link>

        <Link className="nav-logout">
          <img
            style={{
              width: "20%",
              visibility:
                localStorage.getItem("userID") &&
                localStorage.getItem("userID") !== "null"
                  ? "visible"
                  : "hidden",
            }}
            src="/img/logout2.png"
            onClick={logout}
          />
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
