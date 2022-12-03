import React, { useEffect, useReducer, useState } from "react";
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
import axios from "axios";
import HomePage from "./components/HomePage";
import { ACTION_TYPES } from "./utils/dataActionTypes";
function App() {
  const [message, setMessage] = useState({ status: false, message: null });
  const [data, dispatchData] = useReducer(fetchReducer, INITIAL_STATE);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: false,
    error: false,
    status: false,
    message: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(
        "https://6384bd7c3fa7acb14fff0d13.mockapi.io/bids"
      );
      dispatchData({
        type: ACTION_TYPES.FETCH_ALL_DATA,
        payload: { type: "bids", setupData: data },
      });
      data = await axios.get(
        "https://6384bd7c3fa7acb14fff0d13.mockapi.io/inventory"
      );
      console.log(data);
      dispatchData({
        type: ACTION_TYPES.FETCH_ALL_DATA,
        payload: { type: "inventory", setupData: data.data },
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      {fetchingStatus.loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <FetchingStatus.Provider value={[fetchingStatus, setFetchingStatus]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/SetupPage"
            element={
              <SetupPage
                dispatch={dispatchData}
                state={data}
                message={message}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="/bid"
            element={
              <BidPage
                allData={data}
                dispatch={dispatchData}
                message={message}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="/order"
            element={<OrderPage data={data} dispatch={dispatchData} />}
          />
          <Route
            path="/forging"
            element={<ForgingPage data={data} dispatch={dispatchData} />}
          />
          <Route
            path="/calc"
            element={<CalcPage data={data} dispatch={dispatchData} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </FetchingStatus.Provider>
    </div>
  );
}

export default App;
