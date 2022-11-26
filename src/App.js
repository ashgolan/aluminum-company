import React, { useReducer, useState } from "react";
import "./App.css";
import SetupPage from "./components/Setup_Components/SetupPage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import BidPage from "./components/Bid_components/BidPage";
import OrderPage from "./components/Order_Components/OrderPage";
import CalcPage from "./components/Calc_Components/CalcPage";
import ErrorPage from "./components/ErrorPage";
import ForgingPage from "./components/Forging_Components/ForgingPage";
import { fetchReducer, INITIAL_STATE } from "./utils/fetchReducer";
import { FetchingStatus } from "./utils/context";
import { useContext } from "react";
function App() {
  const [data, dispatchData] = useReducer(fetchReducer, INITIAL_STATE);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: false,
    error: false,
  });

  return (
    <div>
      <NavBar></NavBar>
      <FetchingStatus.Provider value={[fetchingStatus, setFetchingStatus]}>
        <Routes>
          <Route
            path="/"
            element={<SetupPage dispatch={dispatchData} state={data} />}
          />
          <Route path="/bid" element={<BidPage dispatch={dispatchData} />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/forging" element={<ForgingPage />} />
          <Route path="/calc" element={<CalcPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </FetchingStatus.Provider>
    </div>
  );
}

export default App;
