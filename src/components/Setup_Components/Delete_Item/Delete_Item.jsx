import axios from "axios";
import React from "react";
import { ACTION_TYPES } from "../../../utils/dataActionTypes";
import "./Delete_Item.css";
export default function Delete_Item({
  itemInChange,
  setItemInChange,
  itemId,
  changeStatus,
  setChangeStatus,
  setItemsValues,
  itemsValues,
  setMessage,
  dispatch,
  state,
}) {
  const deleteData = async () => {
    try {
      const filteredData = state.data.filter((item) => {
        return item.id !== itemId;
      });
      dispatch({ type: ACTION_TYPES.FETCH_START });
      const res = await axios.delete(
        `https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany/${itemId}`,
        itemsValues
      );
      if (!res.statusText === "OK") throw Error();
      setMessage({ status: true, message: "המוצר נמחק בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: filteredData });
      }, 1000);
    } catch (e) {
      dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      setMessage({
        status: true,
        message: "המוצר לא נמצא .. תקלה בקריאת הנתונים",
      });
    }
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
      setMessage({ status: false, message: null });
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
