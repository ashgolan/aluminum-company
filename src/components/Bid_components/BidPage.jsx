import React, { useEffect } from "react";
import "./BidPage.css";
import { useState } from "react";
import BidRow from "./BidRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";

export default function BidPage({ dispatch, allData }) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const navigate = useNavigate();
  const [numOfRows, setNumOfRows] = useState(5);
  const [message, setMessage] = useState(false);

  const [bid, setBid] = useState({
    name: "",
    date: "",
    isApproved: false,
    data: [],
  });

  const uploadData = async (bidObj) => {
    try {
      setFetchingStatus({ loading: true, error: false });

      const { data } = await axios.post(
        "https://6374adb808104a9c5f85d1fb.mockapi.io/Bids",
        bidObj
      );
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: { type: "bids", data: data },
      });
      console.log(allData);
      setFetchingStatus({ loading: false, error: false });
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
    }
  };

  const saveBidHandler = (e) => {
    e.preventDefault();
    const allBidRows = [];
    const ls = Object.values(localStorage);
    for (let item in ls) {
      allBidRows.push(JSON.parse(ls[item]));
    }
    setBid((prev) => {
      {
        return { ...prev, data: allBidRows };
      }
    });
    uploadData({
      name: bid.name,
      date: bid.date,
      isApproved: bid.isApproved,
      data: allBidRows,
    });
    console.log(allBidRows);
    localStorage.clear();
    setMessage(true);
    setTimeout(() => {
      navigate("/order");
    }, 1000);
  };

  return (
    <div className="bid_container">
      {message && <h5 className="message">ההצעה נשמרה בהצלחה</h5>}
      <form onSubmit={saveBidHandler} className="header_container">
        <input type="submit" className="save" value="שמירה" />
        <button className="empty">ריקון</button>
        <input
          className="name"
          required
          type="text"
          placeholder="שם"
          value={bid.name}
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        />
        <input
          required
          className="date"
          type="date"
          placeholder="תאריך"
          value={bid.date}
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, date: e.target.value };
            });
          }}
        />
      </form>
      {[...new Array(numOfRows)].map((row, index) => {
        return <BidRow key={`row${index}`} numOfRow={index}></BidRow>;
      })}
      <img
        src="/addItem.png"
        alt=""
        className="addWRow_btn"
        onClick={() => {
          setNumOfRows((prev) => prev + 1);
        }}
      />
    </div>
  );
}
