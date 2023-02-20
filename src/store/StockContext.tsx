import useAlphaVantageData from "@/hooks/useAlphaVantageData";
import React from "react";
import { createContext } from "react";

type StockState = {
  symbol: string;
  timeSeries: string;
  dataSeries: string;
};

interface StockProviderProps {
  children: React.ReactNode;
}

type StockActionType =
  | { type: "SET_SYMBOL"; payload: string }
  | { type: "SET_TIME_SERIES"; payload: string }
  | { type: "SET_DATA_SERIES"; payload: string };

type StockContextType = {
  state: StockState;
  dispatch: React.Dispatch<StockActionType>;
  data: any;
  error: Error | null;
  isLoading: boolean;
};

const initialState: StockState = {
  symbol: "IBM",
  timeSeries: "TIME_SERIES_DAILY_ADJUSTED",
  dataSeries: "Time Series (Daily)",
};

const stockReducer = (
  state: StockState,
  action: StockActionType
): StockState => {
  switch (action.type) {
    case "SET_SYMBOL":
      return {
        ...state,
        symbol: action.payload,
      };

    case "SET_TIME_SERIES": {
      return {
        ...state,
        timeSeries: action.payload,
      };
    }

    case "SET_DATA_SERIES": {
      return {
        ...state,
        dataSeries: action.payload,
      };
    }

    default:
      return state;
  }
};

export const StockContext = createContext<StockContextType>({
  state: initialState,
  error: null,
  isLoading: false,
  data: null,
  dispatch: () => null,
});

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(stockReducer, initialState);
  const { data, isLoading, error } = useAlphaVantageData(
    state.symbol,
    state.timeSeries
  ) as {
    data: any;
    isLoading: boolean;
    error: Error | null;
  };

  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,
      data,
      error,
      isLoading,
    }),
    [state, dispatch, data, error, isLoading]
  );

  return (
    <StockContext.Provider value={contextValue}>
      {children}
    </StockContext.Provider>
  );
};
