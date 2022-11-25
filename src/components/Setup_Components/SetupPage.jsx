import axios from "axios";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import { dataReducer, INITIAL_STATE } from "../../utils/fetchReducer";
import Add_Item from "./Add_Item/Add_Item";
import Add_Item_Btn from "./Add_Item/Add_Item_Btn";
import Items_Table from "./Items_Table/Items_Table";

export default function SetupPage() {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);
  const [itemsData, setItemsData] = useState([]);
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
        setItemsData(data);
      } catch {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {state.loading && <h2>Loading ...</h2>}
      {!state.loading &&
        itemsData.map((item) => {
          return (
            <Items_Table
              key={`item${item.id}`}
              item={item}
              itemsData={itemsData}
              setItemsData={setItemsData}
              itemInChange={itemInChange}
              setItemInChange={setItemInChange}
            ></Items_Table>
          );
        })}
      {!addItemToggle.formVisible && (
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
