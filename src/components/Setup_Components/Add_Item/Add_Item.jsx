import axios from "axios";
import React from "react";
import { useState, useReducer } from "react";
import { ACTION_TYPES } from "../../../utils/dataActionTypes";
import { dataReducer, INITIAL_STATE } from "../../../utils/fetchReducer";
import "./Add_item.css";
export default function Add_Item({ setaddItemToggle, state, dispatch }) {
  const [itemsValues, setItemsValues] = useState({
    number: "",
    desc: "",
    kind: "",
    weight: "",
    length: "",
    image: null,
  });

  const addItem = async () => {
    try {
      dispatch({ type: ACTION_TYPES.FETCH_START });
      const { data } = await axios.post(
        "https://6374adb808104a9c5f85d1fb.mockapi.io/aluminumCompany",
        itemsValues
      );
      dispatch({
        type: ACTION_TYPES.FETCH_SUCCESS,
        payload: [...state.data, data],
      });
    } catch {
      dispatch({ type: ACTION_TYPES.FETCH_ERROR });
    }
  };

  const confirmAddingItem = (e) => {
    e.preventDefault();

    setaddItemToggle({ btnVisible: true, formVisible: false });
    addItem();
  };
  const cancelAddingItem = (e) => {
    e.preventDefault();
    setaddItemToggle({ btnVisible: true, formVisible: false });
  };
  return (
    <form onSubmit={confirmAddingItem} className="addItem_form">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1% 0",
        }}
      >
        <input
          type="file"
          id="image"
          className="add_item"
          accept="image/png, image/jpeg"
          onInput={(e) => {
            console.log(e.target.files[0]);
            setItemsValues((prev) => {
              return { ...prev, image: "/images/" + e.target.files[0].name };
            });
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input
          id="weight"
          required
          className="add_item"
          placeholder="משקל"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, weight: e.target.value };
            })
          }
          value={itemsValues.weight}
        ></input>
        <input
          id="length"
          required
          className="add_item"
          placeholder="אורך"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, length: e.target.value };
            })
          }
          value={itemsValues.length}
        ></input>
        <input
          id="kind"
          required
          className="add_item"
          placeholder="סוג"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, kind: e.target.value };
            })
          }
          value={itemsValues.kind}
        ></input>
        <input
          id="desc"
          required
          className="add_item"
          placeholder="תאור"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, desc: e.target.value };
            })
          }
          value={itemsValues.desc}
        ></input>
        <input
          id="number"
          required
          className="add_item"
          placeholder="מספר"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, number: e.target.value };
            })
          }
          value={itemsValues.number}
        ></input>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}
      >
        <input
          className="confirm_addItem"
          type="submit"
          value="Confirm"
        ></input>
        <button className="remove_addItem" onClick={cancelAddingItem}>
          Remove
        </button>
      </div>
    </form>
  );
}
