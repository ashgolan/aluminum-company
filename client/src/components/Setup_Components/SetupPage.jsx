import React from "react";
import { useState, useContext } from "react";
import AddItem from "./Add_Item/AddItem";
import AddItemBtn from "./Add_Item/AddItemBtn";
import ItemsTable from "./Items_Table/ItemsTable";
import { FetchingStatus } from "../../utils/context";
import "./SetupPage.css";

export default function SetupPage({ dispatch, state }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [itemInChange, setItemInChange] = useState(false);
  const [addItemToggle, setaddItemToggle] = useState({
    btnVisible: true,
    formVisible: false,
  });
  return (
    <div>
      {fetchingStatus.error && (
        <h5 style={{ textAlign: "center", color: "brown" }}>
          אין מוצרים .. תקלה בקריאת הנתונים
        </h5>
      )}
      <div>
        <form className="Item_form">
          <img className="imageHead" src="../draw.png" alt="" />
          <input
            id="weight"
            className="input_show_item head"
            value="משקל"
            disabled
          ></input>
          <input
            id="length"
            className="input_show_item head"
            value="אורך"
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
        state.inventory
          .sort((a, b) => (a.category > b.category ? 1 : -1))
          .map((item) => {
            return (
              <ItemsTable
                key={`item${item.id}`}
                item={item}
                state={state}
                dispatch={dispatch}
                itemInChange={itemInChange}
                setItemInChange={setItemInChange}
              ></ItemsTable>
            );
          })}
      {!addItemToggle.formVisible && !fetchingStatus.error && (
        <AddItemBtn setaddItemToggle={setaddItemToggle}></AddItemBtn>
      )}
      {!addItemToggle.btnVisible && (
        <AddItem
          setaddItemToggle={setaddItemToggle}
          state={state}
          dispatch={dispatch}
        ></AddItem>
      )}
    </div>
  );
}
