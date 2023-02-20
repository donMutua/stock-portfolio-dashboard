import { useQuery } from "react-query";

interface AlphaVantageData {
  open: number;
  high?: number;
  low?: number;
  close: number;
  volume: number;
  price: number;
  [key: string]: any;
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

async function fetchUrl(url: string): Promise<AlphaVantageData> {
  const res = await fetch(url);
  const data = await res.json();

  if (data["Note"]) {
    throw new Error(data["Note"]);
  }
  return data;
}

function useAlphaVantageData(symbol: string, timeSeries: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&apikey=${apiKey}`;

  const { isLoading, error, data } = useQuery<AlphaVantageData>(
    url,
    () => fetchUrl(url),

    {
      cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
      staleTime: 1000 * 60 * 5, // consider cached data stale after 5 minutes
      refetchOnWindowFocus: true,
    }
  );

  return {
    isLoading,
    error,
    data,
  };
}

export default useAlphaVantageData;
