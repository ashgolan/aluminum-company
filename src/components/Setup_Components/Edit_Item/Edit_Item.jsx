import axios from "axios";
import React from "react";
import { ACTION_TYPES } from "../../../utils/dataActionTypes";
import "./Edit_Item.css";
import { FetchingStatus } from "../../../utils/context";
import { useContext } from "react";
export default function Edit_Item({
  itemId,
  itemInChange,
  setItemInChange,
  changeStatus,
  setChangeStatus,
  itemsValues,
  setMessage,
  dispatch,
  state,
}) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const checkInputsValues = () => {
    for (let i in itemsValues) {
      if (itemsValues[i] === "") return true;
    }
  };
  const isInputsChanged = () => {
    const lSobj = JSON.parse(localStorage.getItem("itemData"));
    for (let i in lSobj) {
      if (itemsValues[i] !== lSobj[i]) return true;
    }
  };
  const updateData = async () => {
    try {
      setFetchingStatus({ loading: true, error: false });
      const { data } = await axios.put(
        `https://6384bd7c3fa7acb14fff0d13.mockapi.io/inventory/${itemId}`,
        itemsValues
      );

      dispatch({ type: ACTION_TYPES.EDIT, payload: state.inventory });
      setFetchingStatus({ loading: false, error: false });
    } catch {
      setFetchingStatus({ loading: false, error: true });
      setMessage({ status: true, message: ".. תקלה בקריאת הנתונים" });
    }
  };

  const editHandler = (e) => {
    e.preventDefault();

    changeStatus.editText === "Edit" &&
      localStorage.setItem("itemData", JSON.stringify(itemsValues));

    if (changeStatus.editText === "Confirm") {
      const haveAnEmptyValues = checkInputsValues();
      if (haveAnEmptyValues) {
        setMessage({ status: true, message: "צריך למלא את כל הנתונים" });
        return;
      }
      const isChanged = isInputsChanged();

      isChanged && updateData();
      setMessage({ status: false, message: null });
      localStorage.removeItem("itemData");
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
