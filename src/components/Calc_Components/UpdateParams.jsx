import React from "react";
import "./UpdateParams.css";
export default function UpdateParams({
  productDetails,
  changeParams,
  paramsData,
  setParamsData,
}) {
  return (
    <div
      className={changeParams ? "calc_row showEditor" : "calc_row hideEditor"}
    >
      <input
        style={{ visibility: "hidden" }}
        className="calc_div edit-header"
      ></input>
      <input
        type="number"
        value={paramsData.wCanaf}
        className="calc_div edit-header wCanaf"
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, wCanaf: +e.target.value };
          })
        }
      />
      <input
        type="number"
        className="calc_div edit-header wCanafParam"
        value={paramsData.wCanafParam}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, wCanafParam: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.hCanaf}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, hCanaf: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.wRechet}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, wRechet: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.hRechet}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, hRechet: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.wTreess}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, wTreess: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.hTreess}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, hTreess: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.wZchochet}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, wZchochet: +e.target.value };
          })
        }
      ></input>
      <input
        type="number"
        className="calc_div edit-header"
        value={paramsData.hZchochet}
        onChange={(e) =>
          setParamsData((prev) => {
            return { ...prev, hZchochet: +e.target.value };
          })
        }
      ></input>
      <img
        style={{ width: "4%", visibility: "hidden" }}
        src="/widthHeight.png"
        alt=""
      />
    </div>
  );
}
