import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import SetupPage from "./components/Setup_Components/SetupPage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import BidPage from "./components/Bid_components/BidPage";
import OrderPage from "./components/Order_Components/OrderPage";
import CalcPage from "./components/Calc_Components/CalcPage";
import ErrorPage from "./components/ErrorPage";
import ForgingPage from "./components/Forging_Components/ForgingPage";
import { fetchReducer, INITIAL_STATE } from "./utils/fetchReducer";
import { FetchingStatus } from "./utils/context";
import HomePage from "./components/HomePage";
import { ACTION_TYPES } from "./utils/dataActionTypes";
import { Api } from "./utils/Api";
import Login from "./components/login/Login";

function App() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ status: false, message: null });
  const [data, dispatchData] = useReducer(fetchReducer, INITIAL_STATE);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: false,
    error: false,
    status: false,
    message: null,
  });
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);

    const fetchData = async () => {
      let { data } = await Api.get("/bids");
      dispatchData({
        type: ACTION_TYPES.FETCH_ALL_DATA,
        payload: { type: "bids", setupData: data },
      });
      data = await Api.get("/Inventory");
      dispatchData({
        type: ACTION_TYPES.FETCH_ALL_DATA,
        payload: { type: "inventory", setupData: data.data },
      });
    };
    fetchData();
    if (
      localStorage.getItem("userID") &&
      localStorage.getItem("userID") !== "null"
    ) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <NavBar setLoginState={setLoginState}></NavBar>
      {fetchingStatus.loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <FetchingStatus.Provider value={[fetchingStatus, setFetchingStatus]}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage loginState={loginState} setLoginState={setLoginState} />
            }
          />
          <Route
            path="/Login"
            element={<Login setLoginState={setLoginState} />}
          ></Route>
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
