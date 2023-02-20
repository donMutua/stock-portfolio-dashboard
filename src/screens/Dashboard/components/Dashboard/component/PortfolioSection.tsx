import React from "react";
import StockCard from "./StockCard";

import appleLogo from "public/images/logos/apple.svg";
import microsoftLogo from "public/images/logos/microsoft.svg";
import teslaLogo from "public/images/logos/tesla.svg";
import twitterLogo from "public/images/logos/twitter.svg";
import facebookLogo from "public/images/logos/facebook.svg";
import ibmLogo from "public/images/logos/IBM.svg";

const portfolioCompanies = [
  {
    name: "Apple",
    symbol: "AAPL",
    image: appleLogo,
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    image: microsoftLogo,
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    image: teslaLogo,
  },
  {
    name: "Twitter",
    symbol: "TWTR",
    image: twitterLogo,
  },

  {
    name: "Facebook",
    symbol: "META",
    image: facebookLogo,
  },

  {
    name: "IBM",
    symbol: "IBM",
    image: ibmLogo,
  },
];

export default function PortfolioSection() {
  return (
    <div className="m-auto">
      <h2 className="ml-24 text-white text-lg font-bold mt-5 mb-5">
        Portfolio
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {portfolioCompanies.map((company) => (
          <StockCard
            key={company.name}
            symbol={company.symbol}
            name={company.name}
            logo={company.image}
          />
        ))}
      </div>
    </div>
  );
}
