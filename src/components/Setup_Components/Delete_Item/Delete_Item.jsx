import axios from "axios";
import React from "react";
import "./Delete_Item.css";
export default function Delete_Item({
  itemInChange,
  setItemInChange,
  itemId,
  changeStatus,
  setChangeStatus,
  setItemsValues,
  itemsValues,
}) {
  const deleteData = async () => {
    return await axios.delete(
      `https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany/${itemId}`,
      itemsValues
    );
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setChangeStatus((prev) => {
      return {
        editText: prev.delete === "Delete" ? "Cancel" : "Edit",
        delete: prev.delete === "Delete" ? "Confirm" : "Delete",
        disabled: true,
        itemId: prev.delete === "Delete" ? itemId : null,
      };
    });
    if (changeStatus.delete === "Cancel") {
      const getTempObjFromLs = JSON.parse(localStorage.getItem("itemData"));
      setItemsValues(getTempObjFromLs);
      localStorage.removeItem("itemData");
    }
    if (changeStatus.delete === "Confirm") {
      deleteData();
    }
    setItemInChange(!itemInChange);
  };
  return (
    <button className="delete_btn" onClick={(e) => deleteHandler(e)}>
      {changeStatus.delete}
    </button>
  );
}
