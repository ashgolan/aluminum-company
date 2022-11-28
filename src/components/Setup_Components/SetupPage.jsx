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
          "https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany"
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
