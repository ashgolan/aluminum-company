import React, { useState } from "react";
import { useRef } from "react";
import "./BidRow.css";
export default function BidRow({ numOfRow, setIsFilledStatus }) {
  const bidForm = useRef();
  const fileInput = useRef();
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
      <input type="checkbox" onClick={(e) => checkHandler(e)} />
      <input
        name="totalWeight"
        disabled
        placeholder={`סה"כ`}
        className="input_box total"
        value={itemInRow.totalWeight}
      ></input>
      <input
        name="weight"
        className="input_box"
        placeholder="משקל"
        value={itemInRow.weight}
        onChange={(e) =>
          setItemInRow((prev) => {
            return {
              ...prev,
              totalWeight: prev.quantity
                ? prev.quantity * e.target.value
                : e.target.value,
              weight: e.target.value,
            };
          })
        }
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
                ? prev.weight * e.target.value
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
        value={itemInRow.length}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, length: e.target.value };
          })
        }
      ></input>

      <input
        type="file"
        id="image"
        style={{ display: "none" }}
        ref={fileInput}
        accept="image/png, image/jpeg"
        onInput={(e) => {
          setItemInRow((prev) => {
            return { ...prev, image: "/images/" + e.target.files[0].name };
          });
        }}
      />
      <img
        style={{ width: "4%", cursor: "pointer", margin: "0 1%" }}
        src="../uploadImage2.png"
        alt=""
        onClick={(e) => {
          e.preventDefault();
          fileInput.current.click();
        }}
      />
      <input
        name="category"
        className="input_box"
        placeholder="סוג"
        value={itemInRow.category}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, category: e.target.value };
          })
        }
      ></input>
      <input
        name="desc"
        className="input_box"
        placeholder="מוצר"
        value={itemInRow.desc}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, desc: e.target.value };
          })
        }
      ></input>
      <input
        name="number"
        className="input_box"
        placeholder="מספר"
        value={itemInRow.number}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, number: e.target.value };
          })
        }
      ></input>
      <input disabled className="row_number" value={numOfRow + 1} />
    </form>
  );
}
