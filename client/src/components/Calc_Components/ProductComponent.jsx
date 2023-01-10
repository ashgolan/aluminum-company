import React from "react";
import "./ProductComponent.css";
import { useState } from "react";
import UpdateParams from "./UpdateParams";
import axios from "axios";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";
import { Api } from "../../utils/Api";

export default function ProductComponent({ allData, productData, dispatch }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  // eslint-disable-next-line
  const [numOfRows, setNumOfRows] = useState(3);
  // eslint-disable-next-line
  const [numOfCharts, setNumOfCharts] = useState(4);
  const [showChart, setShowChart] = useState(false);
  const [input, setInput] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState({
    size1: 21,
    size2: 28,
    size3: "0",
  });
  const [chartSize, setChartSize] = useState(null);
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
      await Api.patch(`Calc/${productData.id}`, {
        productName: productData.productName,
        params: paramsData,
      });
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
            <label className="changeParams" htmlFor="">
              שינוי פרמטרים
            </label>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>

          <input
            id="height"
            className="width_heightInputs"
            value={input.height}
            type="number"
            placeholder="גובה משקוף"
            onChange={(e) => {
              setShowChart(false);
              setChangeParams(false);
              setInput((prev) => {
                return { ...prev, height: e.target.value };
              });
            }}
          />
          <input
            id="width"
            className="width_heightInputs"
            value={input.width}
            type="number"
            placeholder="רוחב משקוף"
            onChange={(e) => {
              setChangeParams(false);
              setShowChart(false);
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
          input={input}
          size={size}
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
          {input.width && input.height && size.size1 && (
            <img
              style={{ width: "4%", visibility: "hidden" }}
              src="/widthHeight.png"
              alt=""
            />
          )}
        </div>
        {[...new Array(numOfRows)].map((row, index) => {
          return (
            <div key={`calcRow${index}`} className="calc_row">
              <input
                className="size-box"
                type="number"
                value={size[`size${index + 1}`]}
                onChange={(e) => {
                  setSize((prev) => {
                    if (index === 0) return { ...prev, size1: +e.target.value };
                    if (index === 1) return { ...prev, size2: +e.target.value };
                    if (index === 2) return { ...prev, size3: +e.target.value };
                  });
                  setChartSize(() => +e.target.value);
                }}
              ></input>

              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam
                  ).toFixed(1)}
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  +input.height - size[`size${index + 1}`] - paramsData.hCanaf}
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam +
                    paramsData.wRechet
                  ).toFixed(1)}
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  (
                    +input.height -
                    size[`size${index + 1}`] -
                    paramsData.hCanaf +
                    paramsData.hRechet
                  ).toFixed(1)}
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] !== "0" &&
                  size[`size${index + 1}`] &&
                  (input.width - paramsData.wTreess).toFixed(1)}
              </div>
              <div className="calc_div">
                {
                  input.width &&
                    input.height &&
                    size[`size${index + 1}`] !== "0" &&
                    (size[`size${index + 1}`] === 21
                      ? (input.height - paramsData.hTreess).toFixed(1)
                      : (input.height - paramsData.hTreess - 2).toFixed(1))
                  // (input.height - paramsData.hTreess)
                  // .toFixed(1)
                }
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam -
                    paramsData.wZchochet
                  ).toFixed(1)}
              </div>
              <div className="calc_div">
                {input.width &&
                  input.height &&
                  size[`size${index + 1}`] &&
                  (
                    +input.height -
                    size[`size${index + 1}`] -
                    paramsData.hCanaf -
                    paramsData.hZchochet
                  ).toFixed(1)}
              </div>
              {input.width && input.height && size[`size${index + 1}`] && (
                <img
                  onClick={(e) => {
                    e.preventDefault();
                    setChartSize(() => size[`size${index + 1}`]);
                    setShowChart(() => true);
                  }}
                  style={{ width: "4%", cursor: "pointer" }}
                  src="/widthHeight.png"
                  alt=""
                />
              )}
            </div>
          );
        })}
      </form>
      {showChart && (
        <form className="chart-container">
          <div className="windowContainer">
            <div className="upperDiv">
              <div className="windowDraw">כנף</div>
              <div className="heightParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  +input.height - chartSize - paramsData.hCanaf}
              </div>
            </div>
            <div className="bottomDiv">
              <div className="widthParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam
                  ).toFixed(1)}
              </div>
              <div style={{ width: "20%", height: "3vh" }}></div>
            </div>
          </div>

          <div className="windowContainer">
            <div className="upperDiv">
              <div className="windowDraw">רשת</div>
              <div className="heightParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  (
                    +input.height -
                    chartSize -
                    paramsData.hCanaf +
                    paramsData.hRechet
                  ).toFixed(1)}
              </div>
            </div>
            <div className="bottomDiv">
              <div className="widthParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam +
                    paramsData.wRechet
                  ).toFixed(1)}
              </div>
              <div style={{ width: "20%", height: "3vh" }}></div>
            </div>
          </div>

          <div className="windowContainer">
            <div className="upperDiv">
              <div className="windowDraw">תריס</div>
              <div className="heightParamBox">
                {input.width &&
                  input.height &&
                  chartSize &&
                  chartSize !== "" &&
                  chartSize !== "0" &&
                  (chartSize !== 21
                    ? (input.height - paramsData.hTreess - 2).toFixed(1)
                    : (input.height - paramsData.hTreess).toFixed(1))}
              </div>
            </div>
            <div className="bottomDiv">
              <div className="widthParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  chartSize !== "0" &&
                  (input.width - paramsData.wTreess).toFixed(1)}
              </div>
              <div style={{ width: "20%", height: "3vh" }}></div>
            </div>
          </div>
          <div className="windowContainer">
            <div className="upperDiv">
              <div className="windowDraw">זכוכית</div>
              <div className="heightParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  (
                    +input.height -
                    chartSize -
                    paramsData.hCanaf -
                    paramsData.hZchochet
                  ).toFixed(1)}
              </div>
            </div>
            <div className="bottomDiv">
              <div className="widthParamBox">
                {input.width &&
                  input.height &&
                  chartSize !== "" &&
                  (
                    (input.width - paramsData.wCanaf) / 2 +
                    paramsData.wCanafParam -
                    paramsData.wZchochet
                  ).toFixed(1)}
              </div>
              <div style={{ width: "20%", height: "3vh" }}></div>
            </div>
          </div>
          <i
            style={{ fontSize: "2rem", cursor: "pointer" }}
            className="fa-solid fa-eye-slash"
            onClick={() => setShowChart(() => false)}
          ></i>
        </form>
      )}
      <div className="line-under-form"></div>
    </div>
  );
}
