import React, { useCallback } from "react";
import Image from "next/image";

import useAlphaVantageData from "@/hooks/useAlphaVantageData";
import Loader from "@/components/Loader";
import { StockContext } from "@/store/StockContext";

interface StockCardProps {
  name: string;
  symbol: string;
  logo: string;
}

function StockCard({ name, symbol, logo }: StockCardProps) {
  const { dispatch } = React.useContext(StockContext);

  const { data, error, isLoading } = useAlphaVantageData(
    symbol,
    "GLOBAL_QUOTE"
  );

  const handleClick = useCallback(() => {
    dispatch({ type: "SET_SYMBOL", payload: symbol });
  }, [dispatch, symbol]);

  const changePercent =
    data && data["Global Quote"]
      ? parseFloat(data["Global Quote"]["10. change percent"])
      : "-";

  const colorClass =
    changePercent > 0
      ? "text-green-500"
      : changePercent < 0
      ? "text-red-700"
      : "text-white";

  return (
    <>
      {isLoading && (
        <div className=" mx-auto">
          <Loader />
        </div>
      )}

      {!isLoading && !error && (
        <div
          className="flex w-full justify-between items-center  bg-black mx-auto p-4 rounded-lg shadow-lg max-w-xs cursor-pointer hover:bg-yellow-600 "
          onClick={handleClick}
        >
          <div className="flex text-white">
            <Image src={logo} width={30} height={30} alt="logo" />
            <div className="ml-3">
              <h3>{name}</h3>
              <p className="text-xs text-gray-500">
                <>
                  {data?.["Note"] ? "Not Available" : null || error}$
                  {data?.["Global Quote"]?.["05. price"]}
                </>
              </p>
            </div>
          </div>

          <div className="text-white text-sm">
            <p className={colorClass}>{changePercent}%</p>
          </div>
        </div>
      )}
    </>
  );
}

export default StockCard;
