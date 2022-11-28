import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import Add_Item from "./Add_Item/Add_Item";
import Add_Item_Btn from "./Add_Item/Add_Item_Btn";
import Items_Table from "./Items_Table/Items_Table";
import { FetchingStatus } from "../../utils/context";
import "./SetupPage.css";

export default function SetupPage({ dispatch, state }) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [itemInChange, setItemInChange] = useState(false);
  const [addItemToggle, setaddItemToggle] = useState({
    btnVisible: true,
    formVisible: false,
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        setFetchingStatus({ loading: true, error: false });
        const { data } = await axios.get(
          "https://6384bd7c3fa7acb14fff0d13.mockapi.io/inventory"
        );
        dispatch({
          type: ACTION_TYPES.FETCH_ALL_DATA,
          payload: { type: "inventory", setupData: data },
        });

        setFetchingStatus({ loading: false, error: false });
      } catch {
        setFetchingStatus({ loading: false, error: true });
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {fetchingStatus.error && (
        <h5 style={{ textAlign: "center", color: "brown" }}>
          אין מוצרים .. תקלה בקריאת הנתונים
        </h5>
      )}
      <div>
        <form className="Item_form">
          <i className="fa-regular fa-image"></i>
          <input
            id="weight"
            className="input_show_item head"
            value="משקל"
            disabled
          ></input>
          <input
            id="kind"
            className="input_show_item head"
            value="סוג"
            disabled
          ></input>
          <input
            id="desc"
            className="input_show_item head"
            value="תאור"
            disabled
          ></input>
          <input
            id="number"
            className="input_show_item head"
            value="מספר"
            disabled
          ></input>
          <button style={{ visibility: "hidden" }} className="edit_btn">
            edit
          </button>
          <button style={{ visibility: "hidden" }} className="delete_btn">
            delete
          </button>
        </form>
      </div>
      {(!fetchingStatus.loading || state.inventory.length) &&
        state.inventory.map((item) => {
          return (
            <Items_Table
              key={`item${item.id}`}
              item={item}
              state={state}
              dispatch={dispatch}
              itemInChange={itemInChange}
              setItemInChange={setItemInChange}
            ></Items_Table>
          );
        })}
      {!addItemToggle.formVisible && !fetchingStatus.error && (
        <Add_Item_Btn setaddItemToggle={setaddItemToggle}></Add_Item_Btn>
      )}
      {!addItemToggle.btnVisible && (
        <Add_Item
          setaddItemToggle={setaddItemToggle}
          state={state}
          dispatch={dispatch}
        ></Add_Item>
      )}
    </div>
  );
}
