import React, { useState } from "react";
import { useEffect } from "react";
import Delete_Item from "../Delete_Item/Delete_Item";
import Edit_Item from "../Edit_Item/Edit_Item";
import "./Item_Table.css";
export default function Items_Table({
  item,
  setItemsData,
  itemInChange,
  setItemInChange,
  itemsData,
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
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const getData = () => {
      const thisItem = itemsData.find((t) => t.id === item.id);
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
          className="item_image"
          src={itemsValues.image}
          alt={`img${item.id}`}
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
            message={message}
            setMessage={setMessage}
            itemId={item.id}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
          ></Edit_Item>
        )}
        {(!itemInChange || changeStatus.itemId === item.id) && (
          <Delete_Item
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            itemId={item.id}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            setItemsData={setItemsData}
            itemsValues={itemsValues}
            setItemsValues={setItemsValues}
          ></Delete_Item>
        )}
      </form>
      {message && <h5 className="message">all values are required !!</h5>}
    </div>
  );
}
