import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import "./OrderPage.css";
import { Api } from "../../utils/Api";
import { exportToPdf } from "../../utils/export-to-pdf";
import { useRef } from "react";
export default function OrderPage({ data: allData, dispatch }) {
  const selectOptionRef = useRef();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);
  }, [isApproved]);
  const filtered = allData.bids.filter((clientBid) => {
    return clientBid.isApproved === isApproved;
  });

  const bidsNames = filtered.map((bid, index) => {
    return (
      <option
        id={bid._id}
        key={`bidName${index}`}
        value={`${bid.clientName}${bid.date}`}
      >
        {bid.clientName} - {bid.date}
      </option>
    );
  });

  const foundClient = allData.bids.find((client) => {
    return client._id === selectedOption;
  });

  const customBid =
    foundClient &&
    foundClient.isApproved === isApproved &&
    foundClient.data.map((bidRow, index) => {
      return (
        <form key={`bidRow${index}`} className="orderRow">
          <div>{bidRow.totalWeight}</div>
          <div>{bidRow.weight}</div>
          <div>{bidRow.quantity}</div>
          <div>{bidRow.length}</div>
          <img
            style={{
              padding: bidRow.image !== "" && "0.2% 4%",
              minWidth: bidRow.image !== "" && "12.5%",
            }}
            alt=""
            src={`.${bidRow.image}`}
          ></img>
          <div>{bidRow.category}</div>
          <div>{bidRow.desc}</div>
          <div>{bidRow.number}</div>
        </form>
      );
    });

  const approveBid = async (e) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      await Api.patch(`/bids/`, { _id: foundClient._id, isApproved: true });
      dispatch({
        type: ACTION_TYPES.EDIT,
        payload: { type: "bids", updateData: allData.bids },
      });
      exportToPdf("pdfOrder");

      setFetchingStatus({ loading: false, error: false });
      setSelectedOption((prev) => null);
      foundClient.isApproved = true;
    } catch {
      setFetchingStatus({ loading: false, error: true });
    }
  };
  return (
    <div className="order-container">
      {foundClient && !isApproved && (
        <button
          onClick={(e) => {
            approveBid(e);
          }}
          className="approving"
        >
          ?????? ????????????
        </button>
      )}
      <div id="pdfOrder">
        <header className="orderheader">
          <img
            onClick={() => {
              setSelectedOption(null);
              setIsApproved((prev) => !prev);
              selectOptionRef.current.value = isApproved
                ? "?????? ??????????"
                : "?????? ????????";
            }}
            src="/history.png"
            alt=""
          />

          {foundClient && (
            <div
              style={{
                width: "20%",
                padding: "1% 5%",
                borderRadius: " 10px",
                border: "1px rgb(148, 141, 37) solid",
                fontSize: " 1.1rem",
                margin: "1%",
                color: "rgb(6, 47, 122)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label htmlFor=""> ??????</label>
              {`  : ${foundClient.color}`}
            </div>
          )}

          <select
            className="order-selection"
            ref={selectOptionRef}
            onChange={(e) => {
              setSelectedOption(e.target.selectedOptions[0].id);
            }}
            name=""
            defaultValue={isApproved ? "?????? ??????????" : "?????? ????????"}
          >
            <option defaultValue="?????? ????????">
              {isApproved ? "?????? ??????????" : "?????? ????????"}
            </option>
            {bidsNames}
          </select>
        </header>
        <form className="orderRow titles">
          <div>????"??</div>
          <div>????????</div>
          <div>????????</div>
          <div>????????</div>
          <div style={{ minWidth: "12.5%" }}>??????????</div>
          <div>??????</div>
          <div>????????</div>
          <div>????????</div>
        </form>
        {customBid}
      </div>
    </div>
  );
}
