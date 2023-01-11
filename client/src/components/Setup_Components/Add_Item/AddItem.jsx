import axios from "axios";
import React, { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Api } from "../../../utils/Api";
import { FetchingStatus } from "../../../utils/context";
import { ACTION_TYPES } from "../../../utils/dataActionTypes";
import "./Add_item.css";
export default function AddItem({ setaddItemToggle, dispatch }) {
  const fileInput = useRef();
  const productFormData = useRef();
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [itemsValues, setItemsValues] = useState({
    number: "",
    desc: "",
    category: "",
    weight: "",
    length: "",
    image: null,
  });

  const addItem = async () => {
    try {
      let formData = new FormData();
      formData.append("number", itemsValues.number);
      formData.append("desc", itemsValues.desc);
      formData.append("category", itemsValues.category);
      formData.append("weight", itemsValues.weight);
      formData.append("length", itemsValues.length);
      formData.append("image", itemsValues.image);

      setFetchingStatus({ loading: true, error: false });
      const { data } = await Api({
        method: "post",
        url: "/inventory",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: { type: "inventory", data: data },
      });
      setFetchingStatus({ loading: false, error: false });
    } catch {
      setFetchingStatus({ loading: false, error: true });
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
    <form
      ref={productFormData}
      onSubmit={confirmAddingItem}
      className="addItem_form"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1% 0",
        }}
      >
        <input
          type="file"
          name="name"
          id="image"
          style={{ display: "none" }}
          ref={fileInput}
          accept="image/png, image/jpeg"
          onInput={(e) => {
            setItemsValues((prev) => {
              // return { ...prev, image: "/images/" + e.target.files[0].name };
              return { ...prev, image: e.target.files[0] };
            });
          }}
        />
      </div>

      <img
        style={{ width: "5%", cursor: "pointer", margin: "1% auto" }}
        src="../uploadImage2.png"
        alt=""
        onClick={(e) => {
          e.preventDefault();
          fileInput.current.click();
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input
          name="weight"
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
          name="length"
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
          name="category"
          id="category"
          required
          className="add_item"
          placeholder="סוג"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, category: e.target.value };
            })
          }
          value={itemsValues.category}
        ></input>
        <input
          name="desc"
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
          name="number"
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
        <input className="confirm_addItem" type="submit" value="אישור"></input>
        <button className="remove_addItem" onClick={cancelAddingItem}>
          הסרה
        </button>
      </div>
    </form>
  );
}
