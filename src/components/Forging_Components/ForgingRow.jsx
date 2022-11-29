import React, { useState } from "react";
import { useRef } from "react";
import "./ForgingRow.css";
export default function ForgingRow({ numOfRow }) {
  const [forgingItemInRow, setForgingItemInRow] = useState({
    product: "",
    quantity: "",
  });

  const forgingBidForm = useRef();

  const checkHandler = (e) => {
    const isFilled = validation();
    if (isFilled) {
      e.target.checked
        ? localStorage.setItem(
            `forgingItem${numOfRow + 1}`,
            JSON.stringify(forgingItemInRow)
          )
        : localStorage.removeItem(`forgingItem${numOfRow + 1}`);
    } else {
      e.target.checked = false;
    }
  };

  const validation = () => {
    const form = new FormData(forgingBidForm.current);
    const data = Object.fromEntries(form);
    const vals = Object.values(data);
    for (let prop in vals) {
      if (vals[prop] === "") return false;
    }
    return true;
  };

  return (
    <form ref={forgingBidForm} className="forgingForm">
      <input
        type="checkbox"
        onChange={(e) => {
          checkHandler(e);
        }}
      />
      <input
        name="quantity"
        className="input_box"
        placeholder="כמות"
        value={forgingItemInRow.quantity}
        onChange={(e) => {
          setForgingItemInRow((prev) => {
            return { ...prev, quantity: e.target.value };
          });
        }}
      ></input>
      <input
        style={{ width: "30%" }}
        name="product"
        className="input_box total"
        value={forgingItemInRow.product}
        placeholder="מוצר"
        onChange={(e) => {
          setForgingItemInRow((prev) => {
            return { ...prev, product: e.target.value };
          });
        }}
      ></input>

      <input disabled className="row_number" value={numOfRow + 1} />
    </form>
  );
}
