import React, { useState } from "react";
import { useEffect } from "react";
import { url } from "../../../utils/Api";
import DeleteItem from "../Delete_Item/DeleteItem";
import EditItem from "../Edit_Item/EditItem";
import "./Item_Table.css";
export default function ItemsTable({
  item,
  itemInChange,
  setItemInChange,
  state,
  dispatch,
}) {
  const [changeStatus, setChangeStatus] = useState({
    editText: "עריכה",
    delete: "מחיקה",
    disabled: true,
    itemId: null,
  });
  const [itemsValues, setItemsValues] = useState({
    number: "",
    desc: "",
    category: "",
    weight: "",
    length: "",
    image: null,
    id: "1",
  });
  const [message, setMessage] = useState({ status: false, message: null });
  useEffect(() => {
    const getData = async () => {
      const thisItem = state.inventory.find((t) => t._id === item._id);
      setItemsValues((prev) => {
        return {
          number: thisItem.number,
          desc: thisItem.desc,
          category: thisItem.category,
          weight: thisItem.weight,
          length: thisItem.length,
          image: thisItem.image,
        };
      });
    };
    getData();
  }, [item.id, state.inventory]);
  return (
    <div>
      <form className="Item_form" key={`form${item.id}`}>
        <img
          id="image"
          className="item_image"
          src={itemsValues.image && url + "/" + itemsValues.image}
          // src={window.location.origin + itemsValues.image}
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
          id="length"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.length}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, length: e.target.value };
            });
          }}
        ></input>
        <input
          id="category"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.category}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, category: e.target.value };
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
        {(!itemInChange || changeStatus.itemId === item._id) && (
          <EditItem
            setMessage={setMessage}
            itemId={item._id}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            dispatch={dispatch}
            state={state}
          ></EditItem>
        )}
        {(!itemInChange || changeStatus.itemId === item._id) && (
          <DeleteItem
            setMessage={setMessage}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            itemId={item._id}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            setItemsValues={setItemsValues}
            dispatch={dispatch}
            state={state}
          ></DeleteItem>
        )}
      </form>
      {message.status && <h5 className="message">{message.message}</h5>}
    </div>
  );
}
