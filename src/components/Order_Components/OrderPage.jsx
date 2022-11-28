import axios from "axios";
import React from "react";
import { useState } from "react";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import "./OrderPage.css";
export default function OrderPage({ data: allData, dispatch }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  const filtered = allData.bids.filter((clientBid) => {
    return clientBid.isApproved === isApproved;
  });

  const bidsNames = filtered.map((bid, index) => {
    return (
      <option
        id={bid.id}
        key={`bidName${index}`}
        value={`${bid.name}${bid.date}`}
      >
        {bid.name} - {bid.date}
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
        <form key={`bidRow${index}`} className="bidRow">
          <div>{bidRow.totalWeight}</div>
          <div>{bidRow.weight}</div>
          <div>{bidRow.quantity}</div>
          <div>{bidRow.length}</div>
          <div>{bidRow.image}</div>
          <div>{bidRow.kind}</div>
          <div>{bidRow.desc}</div>
          <div>{bidRow.number}</div>
        </form>
      );
    });

  const approveBid = async (e) => {
    try {
      foundClient.isApproved = true;
      const { data } = await axios.put(
        `https://6374adb808104a9c5f85d1fb.mockapi.io/Bids/${foundClient.id}`,
        foundClient
      );
      dispatch({
        type: ACTION_TYPES.EDIT,
        payload: { type: "bids", updateData: allData.bids },
      });
      console.log(allData);
    } catch {}
  };
  return (
    <div className="bid-container">
      <header className="header">
        <i
          onClick={() => {
            setSelectedOption(null);
            setIsApproved((prev) => !prev);
          }}
          className="fa-solid fa-clock-rotate-left"
        ></i>
        {!isApproved && (
          <button
            onClick={(e) => {
              approveBid(e);
            }}
            className="approving"
          >
            שלח להזמנה
          </button>
        )}
        <select
          className="bid-selection"
          onChange={(e) => {
            setSelectedOption((prev) => e.target.selectedOptions[0].id);
            console.log(allData);
            console.log(selectedOption);
            console.log(foundClient);
          }}
          name=""
          //   value={!selectedOption && "הצעות בהמתנה"}
        >
          <option value="הצעות בהמתנה" disabled>
            הצעות בהמתנה
          </option>
          {bidsNames}
        </select>
      </header>
      <form className="bidRow titles">
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
