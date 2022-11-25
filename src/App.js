import React from "react";
import "./App.css";
import SetupPage from "./components/Setup_Components/SetupPage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import BidPage from "./components/Bid_components/BidPage";
import OrderPage from "./components/Order_Components/OrderPage";
import CalcPage from "./components/Calc_Components/CalcPage";
import ErrorPage from "./components/ErrorPage";
import ForgingPage from "./components/Forging_Components/ForgingPage";
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/bid" element={<BidPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/forging" element={<ForgingPage />} />
        <Route path="/calc" element={<CalcPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
