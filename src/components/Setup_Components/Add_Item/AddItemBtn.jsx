import React from "react";
import "./Add_Item_Btn.css";
export default function AddItemBtn({ setaddItemToggle }) {
  const showFormHandler = () => {
    setaddItemToggle({ btn_Visible: false, formVisible: true });
  };
  return (
    <div className="addItem_btn_btn_container">
      <img
        src="/addItem.png"
        className="addItem_btn"
        onClick={showFormHandler}
        alt=""
      ></img>
    </div>
  );
}
