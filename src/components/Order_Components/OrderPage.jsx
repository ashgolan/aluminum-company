import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import "./OrderPage.css";
export default function OrderPage({ data: allData, dispatch }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  useEffect(() => {
    localStorage.clear();
  }, []);
  const filtered = allData.bids.filter((clientBid) => {
    return clientBid.isApproved === isApproved;
  });

  const bidsNames = filtered.map((bid, index) => {
    return (
      <option
        id={bid.id}
        key={`bidName${index}`}
        value={`${bid.clientName}${bid.date}`}
      >
        {bid.clientName} - {bid.date}
      </option>
    );
  });

  const foundClient = allData.bids.find((client) => {
    return client.id === selectedOption;
  });

  const customBid =
    foundClient &&
    foundClient.isApproved === isApproved &&
    foundClient.data.map((bidRow, index) => {
      return (
        <form key={`bidRow${index}`} className="orderRow">
          <div>{bidRow.totalWeight}</div>
          <div>{bidRow.weight}</div>
          <div>{bidRow.quantity}</div>
          <div>{bidRow.length}</div>
          <div>{bidRow.image}</div>
          <div>{bidRow.category}</div>
          <div>{bidRow.desc}</div>
          <div>{bidRow.number}</div>
        </form>
      );
    });

  const approveBid = async (e) => {
    try {
      foundClient.isApproved = true;
      setFetchingStatus({ loading: true, error: false });
      const { data } = await axios.put(
        `https://6384bd7c3fa7acb14fff0d13.mockapi.io/bids/${foundClient.id}`,
        foundClient
      );
      dispatch({
        type: ACTION_TYPES.EDIT,
        payload: { type: "bids", updateData: allData.bids },
      });
      setFetchingStatus({ loading: false, error: false });
      setSelectedOption((prev) => null);
      console.log(allData);
    } catch {
      setFetchingStatus({ loading: false, error: true });
    }
  };
  return (
    <div className="order-container">
      <header className="orderheader">
        <i
          onClick={() => {
            setSelectedOption(null);
            setIsApproved((prev) => !prev);
          }}
          className="fa-solid fa-clock-rotate-left"
        ></i>
        {foundClient && !isApproved && (
          <button
            onClick={(e) => {
              approveBid(e);
            }}
            className="approving"
          >
            שלח להזמנה
          </button>
        )}
        {foundClient && (
          <div
            style={{
              fontWeight: "bold",
              backgroundColor: "gold",
              padding: "1%",
            }}
          >
            צבע : {foundClient.color}
          </div>
        )}
        <select
          className="order-selection"
          defaultValue={"בחר"}
          onChange={(e) => {
            setSelectedOption(e.target.selectedOptions[0].id);
          }}
          name=""
          //   value={!selectedOption && "הצעות בהמתנה"}
        >
          <option value="הצעות בהמתנה">הצעות בהמתנה</option>
          {bidsNames}
        </select>
      </header>
      <form className="orderRow titles">
        <div>סה"כ</div>
        <div>משקל</div>
        <div>כמות</div>
        <div>אורך</div>
        <div>תמונה</div>
        <div>סוג</div>
        <div>תאור</div>
        <div>מספר</div>
      </form>
      {customBid}
    </div>
  );
}
