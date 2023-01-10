import React, { useState } from "react";
import { useRef } from "react";
import "./BidRow.css";
export default function BidRow({ numOfRow, allData }) {
  const bidForm = useRef();
  const selectedItem = useRef();
  const [itemInRow, setItemInRow] = useState({
    number: "",
    desc: "",
    category: "",
    weight: "",
    length: "",
    quantity: "",
    totalWeight: "",
    image: "",
  });
  const allItems = allData.inventory.map((item, index) => {
    return <option key={`product${index}`}>{item.desc}</option>;
  });
  const setBySelectedValue = (e) => {
    const foundItem = allData.inventory.find((item) => {
      return item.desc === e.target.value;
    });
    setItemInRow((prev) => {
      return {
        ...prev,
        number: foundItem && foundItem.number,
        desc: foundItem && foundItem.desc,
        category: foundItem && foundItem.category,
        weight: foundItem && foundItem.weight,
        length: foundItem && foundItem.length,
        image: foundItem && foundItem.image,
      };
    });
  };
  const checkHandler = (e) => {
    const isFilled = validation();
    if (isFilled) {
      e.target.checked
        ? localStorage.setItem(`row${numOfRow + 1}`, JSON.stringify(itemInRow))
        : localStorage.removeItem(`row${numOfRow + 1}`);
    } else {
      e.target.checked = false;
    }
  };

  const validation = () => {
    const form = new FormData(bidForm.current);
    const data = Object.fromEntries(form);
    const vals = Object.values(data);
    for (let prop in vals) {
      if (vals[prop] === "") return false;
    }
    return true;
  };

  return (
    <form ref={bidForm} className="row">
      <input
        style={{ width: "3%", color: "red", cursor: "pointer" }}
        type="checkbox"
        onClick={(e) => checkHandler(e)}
      />

      <input
        name="totalWeight"
        disabled
        placeholder={`סה"כ`}
        className="input_box total"
        defaultValue={itemInRow.totalWeight}
      ></input>
      <input
        name="weight"
        className="input_box"
        placeholder="משקל"
        defaultValue={itemInRow.weight}
      ></input>
      <input
        name="quantity"
        className="input_box"
        placeholder="כמות"
        value={itemInRow.quantity}
        onChange={(e) =>
          setItemInRow((prev) => {
            return {
              ...prev,
              totalWeight: prev.weight
                ? (prev.weight * e.target.value).toFixed(2)
                : e.target.value,
              quantity: e.target.value,
            };
          })
        }
      ></input>
      <input
        name="length"
        className="input_box"
        placeholder="אורך"
        defaultValue={itemInRow.length}
      ></input>

      <img
        className="imgOfItem"
        style={{
          padding: itemInRow.image !== "" && "0.5% 2.5%",
        }}
        alt=""
        src={`.${itemInRow.image}`}
      ></img>

      <input
        name="category"
        className="input_box"
        placeholder="סוג"
        defaultValue={itemInRow.category}
      ></input>
      <datalist name="" id="products" ref={selectedItem}>
        {allItems}
      </datalist>
      <input
        className="input_box"
        defaultValue={itemInRow.desc}
        placeholder="בחר מוצר"
        onChange={(e) => {
          // console.log(e.target.value);
          setBySelectedValue(e);
        }}
        type="text"
        list="products"
        name="products"
        id="products"
      />
      <input
        name="number"
        className="input_box"
        placeholder="מספר"
        defaultValue={itemInRow.number}
      ></input>
      <input disabled className="row_number" value={numOfRow + 1} />
    </form>
  );
}
