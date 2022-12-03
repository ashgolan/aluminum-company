import React, { useState } from "react";
import { useRef } from "react";
import "./BidRow.css";
export default function BidRow({ numOfRow, allData }) {
  const bidForm = useRef();
  const fileInput = useRef();
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
    console.log(e);
    const foundItem = allData.inventory.find((item) => {
      return item.desc === e.target.value;
    });
    setItemInRow((prev) => {
      return {
        ...prev,
        number: foundItem.number,
        desc: foundItem.desc,
        category: foundItem.category,
        weight: foundItem.weight,
        length: foundItem.length,
        image: foundItem.image,
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
        // onChange={(e) =>
        //   setItemInRow((prev) => {
        //     return {
        //       ...prev,
        //       totalWeight: prev.quantity
        //         ? (prev.quantity * e.target.value).toFixed(2)
        //         : e.target.value,
        //       weight: e.target.value,
        //     };
        //   })
        // }
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
        // onChange={(e) =>
        //   setItemInRow((prev) => {
        //     return { ...prev, length: e.target.value };
        //   })
        // }
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
        // onChange={(e) =>
        //   setItemInRow((prev) => {
        //     return { ...prev, category: e.target.value };
        //   })
        // }
      ></input>
      <select
        name=""
        id=""
        ref={selectedItem}
        defaultValue={itemInRow.desc}
        onChange={(e) => setBySelectedValue(e)}
      >
        {allItems}
      </select>
      <input
        name="number"
        className="input_box"
        placeholder="מספר"
        defaultValue={itemInRow.number}
        // onChange={(e) =>
        //   setItemInRow((prev) => {
        //     return { ...prev, number: e.target.value };
        //   })
        // }
      ></input>
      <input disabled className="row_number" value={numOfRow + 1} />
    </form>
  );
}
