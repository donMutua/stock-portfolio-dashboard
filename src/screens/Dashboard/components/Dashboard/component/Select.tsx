import React, { useContext } from "react";
import * as Select from "@radix-ui/react-select";
import { clsx } from "clsx";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { StockContext } from "@/store/StockContext";
import Loader from "@/components/Loader";

const options = [
  {
    label: "Daily",
    value: "Time Series (Daily)",
  },
  {
    label: "1 Week",
    value: "Weekly Adjusted Time Series",
  },
  {
    label: "1 Month",
    value: "Monthly Adjusted Time Series",
  },
];

/** case function */

const getSelected = (selectedValue: string) => {
  switch (selectedValue) {
    case "Time Series (Daily)":
      return "TIME_SERIES_DAILY_ADJUSTED";
    case "Weekly Adjusted Time Series":
      return "TIME_SERIES_WEEKLY_ADJUSTED";
    case "Monthly Adjusted Time Series":
      return "TIME_SERIES_MONTHLY_ADJUSTED";
    default:
      return "TIME_SERIES_DAILY_ADJUSTED";
  }
};

function SelectComponet() {
  const { dispatch, isLoading, error } = useContext(StockContext);

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (selectedValue: string) => {
    dispatch({ type: "SET_DATA_SERIES", payload: selectedValue });
    dispatch({
      type: "SET_TIME_SERIES",
      payload: getSelected(selectedValue),
    });
  };

  return (
    <Select.Root
      defaultValue={options[0].value}
      onValueChange={(value) => handleChange(value)}
    >
      <Select.Trigger
        aria-label="stocks"
        className="focus:outline-none flex items-baseline"
      >
        <p className="text-white mr-5 ">Summary</p>
        <Select.Icon className="flex text-white text-xs items-center justify-center">
          <Select.Value />
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton className="flex items-center justify-center text-gray-400 dark:text-gray-300">
          <ChevronUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport className=" dark:bg-black p-2 rounded-lg shadow-lg">
          <Select.Group>
            {options.map((item) => (
              <Select.Item
                key={item.label}
                value={item.value}
                className={clsx(
                  "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-400 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900",
                  "radix-disabled:opacity-50",
                  "focus:outline-none select-none"
                )}
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Root>
  );
}

export default SelectComponet;
