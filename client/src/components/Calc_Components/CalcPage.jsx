import React, { useEffect } from "react";
import { useContext } from "react";
import { Api } from "../../utils/Api";
import { FetchingStatus } from "../../utils/context";
import { ACTION_TYPES } from "../../utils/dataActionTypes";
import ProductComponent from "./ProductComponent";

export default function CalcPage({ data, dispatch }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  useEffect(() => {
    const fetch = async () => {
      try {
        setFetchingStatus({ loading: true, error: false });
        const { data } = await Api.get("/Calc");
        dispatch({
          type: ACTION_TYPES.FETCH_ALL_DATA,
          payload: { type: "calc", setupData: data },
        });

        setFetchingStatus({ loading: false, error: false });
      } catch {
        setFetchingStatus({ loading: false, error: true });
      }
    };
    fetch();
    localStorage.clear();
  }, [dispatch, setFetchingStatus]);

  return (
    <div>
      {data.calc.map((product, index) => {
        return (
          <ProductComponent
            productData={product}
            allData={data}
            dispatch={dispatch}
            key={`product${index}`}
          />
        );
      })}
    </div>
  );
}
