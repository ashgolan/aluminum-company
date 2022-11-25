import axios from "axios";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import { dataReducer, INITIAL_STATE } from "../../utils/fetchReducer";
import Add_Item from "./Add_Item/Add_Item";
import Add_Item_Btn from "./Add_Item/Add_Item_Btn";
import Items_Table from "./Items_Table/Items_Table";
import "./SetupPage.css";
export default function SetupPage() {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);
  const [itemInChange, setItemInChange] = useState(false);
  const [addItemToggle, setaddItemToggle] = useState({
    btnVisible: true,
    formVisible: false,
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch({ type: ACTION_TYPES.FETCH_START });
        const { data } = await axios.get(
          "https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany"
        );
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      } catch {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {state.loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      {state.error && (
        <h5 style={{ textAlign: "center", color: "brown" }}>
          אין מוצרים .. תקלה בקריאת הנתונים
        </h5>
      )}
      {!state.loading &&
        state.data.map((item) => {
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
      {!addItemToggle.formVisible && !state.error && (
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
