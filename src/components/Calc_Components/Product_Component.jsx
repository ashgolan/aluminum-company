import React from "react";
import "./Product_Component.css";
import { useState } from "react";
import UpdateParams from "./UpdateParams";
import axios from "axios";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";

export default function Product_Component({ allData, productData, dispatch }) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const [input, setInput] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState({
    size1: 21,
    size2: 28,
    size3: 0,
  });
  const [changeParams, setChangeParams] = useState(false);

  const [paramsData, setParamsData] = useState({
    wCanaf: productData.params.wCanaf,
    wCanafParam: productData.params.wCanafParam,
    hCanaf: productData.params.hCanaf,
    wRechet: productData.params.wRechet,
    hRechet: productData.params.hRechet,
    wTreess: productData.params.wTreess,
    hTreess: productData.params.hTreess,
    wZchochet: productData.params.wZchochet,
    hZchochet: productData.params.hZchochet,
  });
  const saveParamsHandler = async (e) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      console.log(fetchingStatus);
      const { data } = await axios.put(
        `https://6384bd7c3fa7acb14fff0d13.mockapi.io/calc/${productData.id}`,
        { productName: productData.productName, params: paramsData }
      );
      dispatch({
        type: ACTION_TYPES.EDIT,
        payload: allData,
      });
      setFetchingStatus({ loading: false, error: false });
      setChangeParams(false);
    } catch {
      setFetchingStatus({ loading: false, error: true });
    }
  };
  return (
    <div>
      <form className="calc-container">
        <div className="CalcHeader_container ">
          {changeParams && (
            <div
              onClick={(e) => {
                saveParamsHandler(e);
              }}
              className="save-container"
            >
              <label htmlFor="">שמירה</label>
              <i
                style={{ color: "brown" }}
                className="fa-regular fa-floppy-disk"
              ></i>
            </div>
          )}
          <div
            onClick={(e) => {
              e.preventDefault();
              setChangeParams((prev) => !prev);
            }}
            className="edit-container"
          >
            <label htmlFor="">שינוי פרמטרים</label>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>

          <input
            id="height"
            className="width_heightInputs"
            value={input.height}
            type="number"
            placeholder="גובה"
            onChange={(e) => {
              setInput((prev) => {
                return { ...prev, height: e.target.value };
              });
              console.log(productData);

              console.log(input.height, input.width);
            }}
          />
          <input
            id="width"
            className="width_heightInputs"
            value={input.width}
            type="number"
            placeholder="רוחב"
            onChange={(e) => {
              setInput((prev) => {
                return { ...prev, width: e.target.value };
              });
            }}
          />
          <div className="productName">{productData.productName}</div>
        </div>

        <UpdateParams
          productDetails={productData.params}
          changeParams={changeParams}
          paramsData={paramsData}
          setParamsData={setParamsData}
        ></UpdateParams>

        <div className="calc_row calcHeader">
          <div className="size-box ">מידה</div>
          <div className="calc_div">ר.כנף</div>
          <div className="calc_div">ג.כנף</div>
          <div className="calc_div">ר.רשת</div>
          <div className="calc_div">ג.רשת</div>
          <div className="calc_div">ר.תריס</div>
          <div className="calc_div">ג.תריס</div>
          <div className="calc_div">ר.זכוכית</div>
          <div className="calc_div">ג.זכוכית </div>
        </div>
        <div className="calc_row">
          <input
            className="size-box"
            type="number"
            value={size.size1}
            onChange={(e) => {
              setSize((prev) => {
                return { ...prev, size1: e.target.value };
              });
            }}
          ></input>

          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam
              ).toFixed(1)}{" "}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              +input.height - size.size1 - paramsData.hCanaf}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam +
                paramsData.wRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (
                +input.height -
                size.size1 -
                paramsData.hCanaf +
                paramsData.hRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (input.width - paramsData.wTreess).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (input.height - paramsData.hTreess).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam -
                paramsData.wZchochet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size1 &&
              (
                +input.height -
                size.size1 -
                paramsData.hCanaf -
                paramsData.hZchochet
              ).toFixed(1)}
          </div>
        </div>

        <div className="calc_row">
          <input
            className="size-box"
            type="number"
            value={size.size2}
            onChange={(e) => {
              setSize((prev) => {
                return { ...prev, size2: e.target.value };
              });
            }}
          ></input>

          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (+input.height - size.size2 - paramsData.hCanaf).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam +
                paramsData.wRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (
                +input.height -
                size.size2 -
                paramsData.hCanaf +
                paramsData.hRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (input.width - paramsData.wTreess).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (input.height - paramsData.hTreess - 2).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam -
                paramsData.wZchochet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size2 &&
              (
                +input.height -
                size.size2 -
                paramsData.hCanaf -
                paramsData.hZchochet
              ).toFixed(1)}
          </div>
        </div>
        <div className="calc_row">
          <input
            className="size-box"
            type="number"
            value={size.size3}
            onChange={(e) => {
              setSize((prev) => {
                return { ...prev, size3: e.target.value };
              });
            }}
          ></input>

          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (+input.height - size.size3 - paramsData.hCanaf).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam +
                paramsData.wRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (
                +input.height -
                size.size3 -
                paramsData.hCanaf +
                paramsData.hRechet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (input.width - paramsData.wTreess).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (input.height - paramsData.hTreess - 2).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (
                (input.width - paramsData.wCanaf) / 2 +
                paramsData.wCanafParam -
                paramsData.wZchochet
              ).toFixed(1)}
          </div>
          <div className="calc_div">
            {input.width &&
              input.height &&
              size.size3 !== "" &&
              (
                +input.height -
                size.size3 -
                paramsData.hCanaf -
                paramsData.hZchochet
              ).toFixed(1)}
          </div>
        </div>
      </form>
      <div className="line-under-form"></div>
    </div>
  );
}
