import React, { useEffect } from "react";
import "./BidPage.css";
import { useState } from "react";
import BidRow from "./BidRow";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import { Api } from "../../utils/Api";

export default function BidPage({ dispatch, allData }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const navigate = useNavigate();
  const [numOfRows, setNumOfRows] = useState(5);
  const [message, setMessage] = useState(false);

  const [bid, setBid] = useState({
    clientName: "",
    date: "",
    color: "",
    isApproved: false,
    data: [],
  });
  useEffect(() => {
    localStorage.clear();
  }, []);
  const uploadData = async (bidObj) => {
    try {
      setFetchingStatus({ loading: true, error: false });

      const { data } = await Api.post("/bids", bidObj);
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: { type: "bids", data: data },
      });
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
      return { ...prev, data: allBidRows };
    });
    uploadData({
      clientName: bid.clientName,
      date: bid.date,
      color: bid.color,
      isApproved: bid.isApproved,
      data: allBidRows,
    });
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

        <h4>ש"ח</h4>
        <input
          style={{
            width: "9.5%",
            textAlign: "center",
            fontWeight: "bold",
            // fontSize: "1.3rem",
          }}
          className="name"
          placeholder='סה"כ'
          required
          defaultValue={0}
        />
        <h4>סכום ההצעה</h4>
        <input
          className="name"
          placeholder="צבע"
          value={bid.color}
          required
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, color: e.target.value };
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
        <input
          className="name"
          required
          type="text"
          placeholder="שם"
          value={bid.clientName}
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, clientName: e.target.value };
            });
          }}
        />
      </form>
      {[...new Array(numOfRows)].map((row, index) => {
        return (
          <BidRow
            key={`row${index}`}
            numOfRow={index}
            allData={allData}
          ></BidRow>
        );
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
