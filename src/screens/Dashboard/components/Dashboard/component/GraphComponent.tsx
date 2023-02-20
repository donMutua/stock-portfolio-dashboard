import React, { useEffect, useState, useRef } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

import Loader from "@/components/Loader";
import SelectComponet from "./Select";

import { StockContext } from "@/store/StockContext";

import falling from "public/images/falling.svg";
import Image from "next/image";

interface StockValue {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
  "8. split coefficient": string;
}

function GraphComponent() {
  const { data, state, isLoading, error } = React.useContext(StockContext);
  const { dataSeries } = state;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [chartData, setChartData] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    if (data) {
      const newChartData = Object.entries(data?.[dataSeries] || {}).map(
        ([date, values]) => ({
          x: new Date(Date.parse(date)),
          y: parseFloat((values as StockValue)["5. adjusted close"]),
        })
      );
      setChartData(newChartData || []);
    }
  }, [data, dataSeries]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const { width, height } =
        chartContainerRef.current.getBoundingClientRect();
      setChartDimensions({ width, height });
    }
  }, [chartContainerRef]);

  return (
    <>
      <div className="ml-5 mb-10 mt-2 ">
        <SelectComponet />
      </div>

      <div
        ref={chartContainerRef}
        className="flex justify-center items-center ml-5 h-1/2 "
      >
        {isLoading ? (
          <div className="">
            <Loader />
          </div>
        ) : error ? (
          <div className=" flex flex-col bg-blue-200  justify-center items-center w-full h-full">
            <Image src={falling} width={250} height={100} alt="falling" />
            <h3 className="text-2xl font-bold mb-2 ">
              Aaah!Something went wrong
            </h3>
            <p>Please refresh the page after a minute or try again later </p>
          </div>
        ) : (
          <VictoryChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            padding={{ top: 50, left: 50, bottom: 50, right: 50 }}
          >
            <VictoryLine
              data={chartData}
              interpolation="natural"
              style={{
                data: {
                  stroke: "orange",
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `$${tick}`}
              style={{
                axis: { stroke: "grey" },
                tickLabels: { fill: "orange" },
              }}
            />

            <VictoryAxis
              label="Date"
              tickFormat={(date) => new Date(date).toLocaleDateString()}
              style={{
                axis: { stroke: "grey" },
                tickLabels: { fill: "white" },
              }}
            />
          </VictoryChart>
        )}
      </div>
    </>
  );
}

export default GraphComponent;
