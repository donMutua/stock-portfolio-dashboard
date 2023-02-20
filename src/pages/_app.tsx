import { StockProvider } from "@/store/StockContext";
import { ToastProvider } from "@radix-ui/react-toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

//create client

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StockProvider>
        <ToastProvider>
          <Component {...pageProps} />;
        </ToastProvider>
      </StockProvider>
    </QueryClientProvider>
  );
}
