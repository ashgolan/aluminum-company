import React from "react";
import "./Product_Component.css";
import { useState } from "react";
export default function Product_Component({ data }) {
  const [input, setInput] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState({
    size1: 21,
    size2: 28,
    without: 0,
  });
  //   const [size1Row, setSize1Row] = useState({
  //     wCanaf: 0,
  //     hCanaf: 0,
  //     wRechet: 0,
  //     hRechet: 0,
  //     wTreess: 0,
  //     hTreess: 0,
  //     wZchochet: 0,
  //     hZchochet: 0,
  //   });

  return (
    <div>
      <form className="calc-container">
        <div className="CalcHeader_container ">
          <input
            id="height"
            className="width_heightInputs"
            value={input.height}
            type="text"
            placeholder="גובה"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, height: e.target.value };
              })
            }
          />
          <input
            id="width"
            className="width_heightInputs"
            value={input.width}
            type="text"
            placeholder="רוחב"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, width: e.target.value };
              })
            }
          />
          <div className="productName">{data.productName}</div>
        </div>
        <div className="calc_row head">
          <div className="size-box ">מידה</div>
          <div>ר.כנף</div>
          <div>ג.כנף</div>
          <div>ר.רשת</div>
          <div>ג.רשת</div>
          <div>ר.תריס</div>
          <div>ג.תריס</div>
          <div>ר.זכוכית</div>
          <div>ג.זכוכית </div>
        </div>
        <div className="calc_row">
          <div className="size-box">{size.size1}</div>

          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              +input.height - size.size1 - data.params.hCanaf}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam +
                data.params.wRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.size1 -
                data.params.hCanaf +
                data.params.hRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.width - data.params.wTreess).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.height - data.params.hTreess).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam -
                data.params.wZchochet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.size1 -
                data.params.hCanaf -
                data.params.hZchochet
              ).toFixed(1)}
          </div>
        </div>

        <div className="calc_row">
          <div className="size-box">{size.size2}</div>

          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (+input.height - size.size2 - data.params.hCanaf).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam +
                data.params.wRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.size2 -
                data.params.hCanaf +
                data.params.hRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.width - data.params.wTreess).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.height - data.params.hTreess - 2).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam -
                data.params.wZchochet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.size2 -
                data.params.hCanaf -
                data.params.hZchochet
              ).toFixed(1)}
          </div>
        </div>
        <div className="calc_row">
          <div className="size-box">{size.without}</div>

          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (+input.height - size.without - data.params.hCanaf).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam +
                data.params.wRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.without -
                data.params.hCanaf +
                data.params.hRechet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.width - data.params.wTreess).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (input.height - data.params.hTreess - 2).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                (input.width - data.params.wCanaf) / 2 +
                data.params.wCanafParam -
                data.params.wZchochet
              ).toFixed(1)}
          </div>
          <div>
            {input.width &&
              input.height &&
              (
                +input.height -
                size.without -
                data.params.hCanaf -
                data.params.hZchochet
              ).toFixed(1)}
          </div>
        </div>
      </form>
      <div className="line-under-form"></div>
    </div>
  );
}
