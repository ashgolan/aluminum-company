import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./OrderPage.css";

export default function OrderPage({ data: allData, dispatch }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  useEffect(() => {
    localStorage.clear();
  }, []);

  const filtered = allData.bids.filter((clientBid) => {
    return clientBid.isApproved === isApproved;
  });

  const bidsNames = filtered.map((bid, index) => {
    return (
      <option
        id={bid.id}
        key={`bidName${index}`}
        value={`${bid.clientName}${bid.date}`}
      >
        {bid.clientName} - {bid.date}
      </option>
    );
  });

  const foundClient = allData.bids.find((client) => {
    return client.id === selectedOption;
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
              width: bidRow.image !== "" && "12.5%",
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

  const exportToPdf = () => {
    const input = document.getElementById("pdfOrder");
    html2canvas(input, {
      scale: 2,
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const widthRatio = imgWidth / canvas.width;
      const heightRatio = imgHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const marginX = (imgWidth - canvasWidth) / 2;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", marginX, 0, imgWidth, imgHeight);
      pdf.save("order.pdf");
    });
  };
  const approveBid = async (e) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      await axios.put(
        `https://6384bd7c3fa7acb14fff0d13.mockapi.io/bids/${foundClient.id}`,
        foundClient
      );
      dispatch({
        type: ACTION_TYPES.EDIT,
        payload: { type: "bids", updateData: allData.bids },
      });
      exportToPdf();

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
          שלח להזמנה
        </button>
      )}
      <div id="pdfOrder">
        <header className="orderheader">
          <img
            onClick={() => {
              setSelectedOption(null);
              setIsApproved((prev) => !prev);
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
              <label htmlFor=""> צבע</label>
              {`  : ${foundClient.color}`}
            </div>
          )}

          <select
            className="order-selection"
            onChange={(e) => {
              setSelectedOption(e.target.selectedOptions[0].id);
            }}
            name=""
            defaultValue={isApproved ? "בחר הזמנה" : "בחר הצעה"}
          >
            <option value="בחר הצעה">
              {isApproved ? "בחר הזמנה" : "בחר הצעה"}
            </option>
            {bidsNames}
          </select>
        </header>
        <form className="orderRow titles">
          <div>סה"כ</div>
          <div>משקל</div>
          <div>כמות</div>
          <div>אורך</div>
          <div>תמונה</div>
          <div>סוג</div>
          <div>תאור</div>
          <div>מספר</div>
        </form>
        {customBid}
      </div>
    </div>
  );
}
