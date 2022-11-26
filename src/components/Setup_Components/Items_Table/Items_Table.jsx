import React, { useState } from "react";
import { useEffect } from "react";
import Delete_Item from "../Delete_Item/Delete_Item";
import Edit_Item from "../Edit_Item/Edit_Item";
import "./Item_Table.css";
export default function Items_Table({
  item,
  itemInChange,
  setItemInChange,
  state,
  dispatch,
}) {
  const [changeStatus, setChangeStatus] = useState({
    editText: "Edit",
    delete: "Delete",
    disabled: true,
    itemId: null,
  });
  const [itemsValues, setItemsValues] = useState({
    number: "",
    desc: "",
    kind: "",
    weight: "",
    length: "",
    image: null,
    id: "1",
  });
  const [message, setMessage] = useState({ status: false, message: null });
  useEffect(() => {
    const getData = () => {
      const thisItem = state.inventory.find((t) => t.id === item.id);
      setItemsValues((prev) => {
        return {
          number: thisItem.number,
          desc: thisItem.desc,
          kind: thisItem.kind,
          weight: thisItem.weight,
          length: thisItem.length,
          image: thisItem.image,
        };
      });
    };
    getData();
  }, []);
  return (
    <div>
      <form className="Item_form" key={`form${item.id}`}>
        <img
          id="image"
          className="item_image"
          src={itemsValues.image}
          alt={`img${item.id}`}
          value={itemsValues.image}
        />
        <input
          id="weight"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.weight}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, weight: e.target.value };
            });
          }}
        ></input>
        <input
          id="kind"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.kind}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, kind: e.target.value };
            });
          }}
        ></input>
        <input
          id="desc"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.desc}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, desc: e.target.value };
            });
          }}
        ></input>
        <input
          id="number"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.number}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, number: e.target.value };
            });
          }}
        ></input>
        {(!itemInChange || changeStatus.itemId === item.id) && (
          <Edit_Item
            setMessage={setMessage}
            itemId={item.id}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            dispatch={dispatch}
            state={state}
          ></Edit_Item>
        )}
        {(!itemInChange || changeStatus.itemId === item.id) && (
          <Delete_Item
            setMessage={setMessage}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            itemId={item.id}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            setItemsValues={setItemsValues}
            dispatch={dispatch}
            state={state}
          ></Delete_Item>
        )}
      </form>
      {message.status && <h5 className="message">{message.message}</h5>}
    </div>
  );
}
