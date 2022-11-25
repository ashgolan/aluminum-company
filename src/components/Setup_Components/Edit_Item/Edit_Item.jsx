import axios from "axios";
import React from "react";
import "./Edit_Item.css";
export default function Edit_Item({
  itemId,
  itemInChange,
  setItemInChange,
  changeStatus,
  setChangeStatus,
  itemsValues,
  setMessage,
}) {
  const chickInputsValues = () => {
    for (let i in itemsValues) {
      if (itemsValues[i] === "") return true;
    }
  };
  const updateData = async () => {
    return await axios.put(
      `https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany/${itemId}`,
      itemsValues
    );
  };

  const editHandler = (e) => {
    e.preventDefault();

    changeStatus.editText === "Edit" &&
      localStorage.setItem("itemData", JSON.stringify(itemsValues));

    if (changeStatus.editText === "Confirm") {
      const haveAnEmptyValues = chickInputsValues();
      if (haveAnEmptyValues) {
        setMessage({ status: true, message: "צריך למלא את כל הנתונים" });
        return;
      }
      updateData();
      setMessage({ status: false, message: null });
    }

    setItemInChange(!itemInChange);
    setChangeStatus((prev) => {
      return {
        editText: prev.editText === "Edit" ? "Confirm" : "Edit",
        delete: prev.editText === "Edit" ? "Cancel" : "Delete",
        disabled: prev.editText === "Edit" ? false : true,
        itemId: prev.editText === "Edit" ? itemId : null,
      };
    });
  };

  return (
    <button className="edit_btn" onClick={editHandler}>
      {changeStatus.editText}
    </button>
  );
}
