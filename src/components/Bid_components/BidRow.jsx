import React, { useState } from "react";
import "./BidRow.css";
export default function BidRow({ numOfRow }) {
  const [itemInRow, setItemInRow] = useState({
    number: "",
    desc: "",
    kind: "",
    weight: "",
    length: "",
    quantity: "",
    image: null,
  });
  return (
    <div className="row">
      <input disabled className="input_box total" placeholder='סה"כ'></input>
      <input
        className="input_box"
        placeholder="משקל"
        value={itemInRow.weight}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, weight: e.target.value };
          })
        }
      ></input>
      <input
        className="input_box"
        placeholder="כמות"
        value={itemInRow.quantity}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, quantity: e.target.value };
          })
        }
      ></input>
      <input
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
        className="input_box"
        onInput={(e) => {
          setItemInRow((prev) => {
            return { ...prev, image: "/images/" + e.target.files[0].name };
          });
        }}
      />
      <input
        className="input_box"
        placeholder="סוג"
        value={itemInRow.kind}
        onChange={(e) =>
          setItemInRow((prev) => {
            return { ...prev, kind: e.target.value };
          })
        }
      ></input>
      <input
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
    </div>
  );
}
