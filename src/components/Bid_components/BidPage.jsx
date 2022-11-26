import React from "react";
import "./BidPage.css";
import { useState } from "react";
import BidRow from "./BidRow";

export default function BidPage({ dispatchData }) {
  const numOfRows = new Array(10);

  const [bid, setBid] = useState({
    name: "",
    date: "",
    isAproved: false,
    data: [],
  });
  // dispatchData({ type: "add_Bid", payload: bid });
  return (
    <div className="bid_container">
      <input type="text" placeholder="Name" />
      <input type="date" placeholder="Date" />

      {[...numOfRows].map((row, index) => {
        return <BidRow key={`row${index}`} numOfRow={index}></BidRow>;
      })}
      <button className="add_Btn">הוסף שורה</button>
    </div>
  );
}
