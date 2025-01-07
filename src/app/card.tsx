"use client"
import React from "react";
import Image from "next/image";

interface CardProps {
  logo: string;
  name: string;
  symbol: string;
  change: number;
  totalSupply: number;
  currency: string;
  isPositive: boolean;
}

const Card: React.FC<CardProps> = ({ logo, name, symbol, change, totalSupply, currency, isPositive }) => {
  return (
    <div
    className="border border-[#FFFFFF2E] drop-shadow-lg shadow-inner text-white sm:p-4 p-3 rounded-[25px] sm:max-w-[255px] w-60 justify-center relative transform transition-transform duration-500 hover:scale-105 hover:shadow-md hover:shadow-blue-500/50"
    style={{
      backgroundImage: "url('/Card shape.png')",
      backgroundPosition: 'center',
    }}
  >
    <p className="text-gray-400 text-sm absolute top-3 right-2 px-6 py-3 bg-gray-600 rounded-full">{currency}</p>
    <div className="flex justify-center flex-col items-center mt-10 w-full">
      <Image src={logo} alt={name} width={40} height={40} className="rounded-full" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-center">{name}</h2>
        <div className="flex gap-3 justify-center items-center">
          <p className="text-sm text-gray-400 text-center">{symbol}</p>
          <div className={`text-lg font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "↑" : "↓"} {change}%
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div className="text-gray-400 text-sm">Total Supply: {totalSupply}</div>
      <p>USD</p>
    </div>
  </div>
  );
};

export default Card;