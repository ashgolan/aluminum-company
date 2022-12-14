import axios from "axios";
import React from "react";
import { useContext } from "react";
import { ACTION_TYPES } from "../../../utils/dataActionTypes";
import "./Delete_Item.css";
import { FetchingStatus } from "../../../utils/context";
import { Api } from "../../../utils/Api";
export default function DeleteItem({
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
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const deleteData = async () => {
    try {
      const filteredData = state.inventory.filter((item) => {
        return item._id !== itemId;
      });
      setFetchingStatus({ loading: true, error: false });
      console.log(itemId);
      const res = await Api.delete(`/Inventory/`, { data: { _id: itemId } });
      if (!res.statusText === "OK") throw Error();

      setMessage({ status: true, message: "המוצר נמחק בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        dispatch({ type: ACTION_TYPES.DELETE, payload: filteredData });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
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
        editText: prev.delete === "מחיקה" ? "ביטול" : "עריכה",
        delete: prev.delete === "מחיקה" ? "אישור" : "מחיקה",
        disabled: true,
        itemId: prev.delete === "מחיקה" ? itemId : null,
      };
    });
    if (changeStatus.delete === "ביטול") {
      const getTempObjFromLs = JSON.parse(localStorage.getItem("itemData"));
      setItemsValues(getTempObjFromLs);
      setMessage({ status: false, message: null });
      localStorage.removeItem("itemData");
    }
    if (changeStatus.delete === "אישור") {
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
