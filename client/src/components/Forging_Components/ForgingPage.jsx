import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import ForgingRow from "./ForgingRow";
import "./ForgingPage.css";
import { Api } from "../../utils/Api";
import { exportToPdf } from "../../utils/export-to-pdf";
export default function ForgingPage({ dispatch }) {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const [numOfRows, setNumOfRows] = useState(5);
  const [message, setMessage] = useState(false);
  const [forgingBid, setForgingBid] = useState({
    clientName: "",
    date: "",
    color: "",
    isApproved: false,
    data: [],
  });
  useEffect(() => {
    localStorage.clear();
  }, []);
  const uploadData = async (forgingBidObj) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      const { data } = await Api.post("/ForgingBids", forgingBidObj);
      exportToPdf("forgingBid");
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: { type: "forging", data: data },
      });
      setFetchingStatus({ loading: false, error: false });
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
    }
  };

  const saveBidHandler = (e) => {
    e.preventDefault();
    const allForgingBidRows = [];
    const ls = Object.values(localStorage);
    for (let item in ls) {
      allForgingBidRows.push(JSON.parse(ls[item]));
    }
    setForgingBid((prev) => {
      return { ...prev, data: allForgingBidRows };
    });
    uploadData({
      clientName: forgingBid.clientName,
      date: forgingBid.date,
      color: forgingBid.color,
      data: allForgingBidRows,
    });
    localStorage.clear();
    setTimeout(() => {
      setMessage(true);
      navigate("/");
    }, 1000);
  };
  return (
    <div
      id="forgingBid"
      className="forging-container"
      style={{ width: "70%", margin: "auto" }}
    >
      <h1 style={{ color: "brown" }}>הזמנת פרזול</h1>
      {message && <h5 className="message">ההזמנה נשמרה בהצלחה</h5>}
      <form onSubmit={saveBidHandler} className="header_container">
        <input type="submit" className="save" value="שמירה" />
        <input
          className="name"
          placeholder="צבע"
          required
          value={forgingBid.color}
          onChange={(e) => {
            setForgingBid((prev) => {
              return { ...prev, color: e.target.value };
            });
          }}
        />
        <input
          required
          className="date"
          type="date"
          placeholder="תאריך"
          value={forgingBid.date}
          onChange={(e) => {
            setForgingBid((prev) => {
              return { ...prev, date: e.target.value };
            });
          }}
        />
        <input
          className="name"
          required
          type="text"
          placeholder="שם"
          value={forgingBid.clientName}
          onChange={(e) => {
            setForgingBid((prev) => {
              return { ...prev, clientName: e.target.value };
            });
          }}
        />
      </form>
      {[...new Array(numOfRows)].map((row, index) => {
        return <ForgingRow key={`row${index}`} numOfRow={index}></ForgingRow>;
      })}{" "}
      <img
        src="/addItem.png"
        alt=""
        className="addRow_btn"
        onClick={() => {
          setNumOfRows((prev) => prev + 1);
        }}
      />
    </div>
  );
}
