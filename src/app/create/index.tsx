"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateStablecoin = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [yieldToken, setYieldToken] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    console.log({
      tokenName,
      tokenSymbol,
      targetCurrency,
      yieldToken,
      initialSupply,
    });
  };
const router = useRouter()
  return (
    <div className='bg-[#030B15] sm:px-40 py-5 px-5'>
      <Image
        src={'/logo.png'}
        alt='Stable Fun Logo'
        width={147}
        height={30}
        onClick={()=>router.push('/')}
        className='cursor-pointer sm:w-[147px] sm:h-[30px] w-[130px] h-[20px] object-cover bg-cover flex justify-center items-center'
        />
     <div className="min-h-screen w-full text-white flex flex-col justify-center mx-auto py-10 overflow-x-hidden">
      <div className='w-full justify-between items-center flex sm:px-[7.5rem] py-10'>
        <h1 className="text-3xl font-bold  w-full">Create Your Stablecoin</h1>
          <p className='text-[#A3AED0] sm:block hidden' onClick={()=> router.back()}>back</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:justify-center gap-32 items-center rounded-[10px] flex sm:flex-row flex-col shadow-lg"
      >
        <div className='flex flex-col gap-3'>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="tokenName">
              Token Name
            </label>
            <input
              id="tokenName"
              type="text"
              placeholder="Give your stablecoin a unique name"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="tokenSymbol">
              Token Symbol
            </label>
            <input
              id="tokenSymbol"
              type="text"
              placeholder="Choose an abbreviation (e.g., USDS, EUR)"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="targetCurrency">
              Target Currency
            </label>
            <input
              id="targetCurrency"
              type="text"
              placeholder="Select the fiat currency it mirrors (USD, EUR, JPY)"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="yieldToken">
              Yield-Bearing Token
            </label>
            <select
              id="yieldToken"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={yieldToken}
              onChange={(e) => setYieldToken(e.target.value)}
            >
              <option value="" disabled>
                Choose an abbreviation (e.g., USDS, EUR)
              </option>
              <option value="USDS">USDS</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="initialSupply">
              Initial Supply
            </label>
            <input
              id="initialSupply"
              type="number"
              placeholder="Set the amount of stablecoins to mint"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="agreed"
              type="checkbox"
              className="mr-2"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agreed" className="text-sm">
              I agree to the terms and condition
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-5 justify-center p-4 sm:p-0 '>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="initialSupply">
              Lock Yield Tokens
            </label>
            <input
              id="initialSupply"
              type="number"
              placeholder="Deposit tokens to back the stablecoin"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
            />
            <Image
              src={'/upload.png'}
              alt='upload'
              width={400}
              height={400}
              className='w-[300px] h-[300px]'
            />
            <button
              type="submit"
              className="w-full sm:w-full bg-[#7551FF]  text-white py-3 rounded-[14px] border border-white border-opacity-15 font-semibold"
            >
              Mint Stablecoin
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateStablecoin;