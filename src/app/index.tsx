"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Card from './card'
import data from './data.json'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
const StableHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.currency.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div className='sm:px-40 px-5 py-5 flex flex-col gap-5 overflow-x-hidden max-w-full w-full relative'>
        {/* Header */}
        <header className='flex justify-between items-center'>
            <Image
            src={'/logo.png'}
            alt='Stable Fun Logo'
            width={147}
            height={30}
            className='sm:w-[147px] sm:h-[30px] w-[130px] h-[20px] object-cover bg-cover flex justify-center items-center'
            />
            <div className='relative flex flex-grow justify-center items-center'>
            <input
              type='search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search token Name, wallet address, contract address'
              className='bg-[#77777710] sm:block hidden placeholder:text-[12px] text-white pl-2 border border-[#FFFFFF0D] rounded-[10px] placeholder:pl-5 py-3 w-full sm:w-[70%]'
            />
               <CiSearch size={24} className='right-2 top-2 transform -translate-y-1/2 sm:mr-32 absolute sm:mt-5' color='white' />
          </div>
          <WalletMultiButton className='bg-[#044581] sm:py-4 text-white sm:px-10 py-4 px-5 leading-none rounded-lg mt-4 sm:mt-0'>
            {/* Connect Wallet */}
          </WalletMultiButton>
        </header>
        <main className='flex flex-col gap-4 justify-center'>
        <section
  className='gap-10 sm:gap-0 text-white justify-between flex flex-col md:flex-row py-10 sm:px-10 px-5 sm:w-[850px] sm:h-[300px] w-[330px] h-[450px] sm:rounded-[30px] rounded-[15px] bg-cover object-cover'
  style={{
    background: 'linear-gradient(262.78deg, #C01ECC 9.17%, #2A0FD3 100%)',
  }}
>
            <div className='flex flex-col gap-3 w-full sm:w-[400px] h-auto md:h-[218px]'>
              <h4 className='text-lg md:text-xl'>STABLE.FUN</h4>
              <h1 className='text-2xl md:text-3xl font-bold'>Mint Stablecoins & <br/>Exchange Instantly</h1>
              <p className='text-sm md:text-[16px] leading-none text-[#EEEEEE]'>
                Empower yourself to create custom stablecoins backed by yield-generating stablebonds from Etherfuse
              </p>
              <Link href={'/create'} className='bg-[#261B4C] text-white w-1/2 shadow-inner drop-shadow-lg rounded-lg px-3 sm:px-5 py-3  flex justify-center items-center text-sm md:text-base mt-5 font-bold'>
                Start A New Coin
              </Link>
            </div>
            <div className='flex justify-center items-center w-full md:w-auto'>
              <Image
                src={'/Gemini_Generated_Image_2kucpn2kucpn2kuc Background Removed 1.png'}
                alt='Gemini_Generated_Image_2kucpn2kucpn2kuc Background Removed 1'
                width={266}
                height={148}
                className='object-cover bg-cover w-[266px] h-[148px]'
              />
              <Image
                src={'/dice.png'}
                alt='dice'
                width={266}
                height={148}
                className='object-cover bg-cover w-[166px] h-[148px] absolute left-44 hidden '
              />
            </div>
</section>
            <div className='sm:flex sm:flex-wrap grid  justify-center gap-5 w-full 
             mt-8'>
              {filteredData.map((item) => (
                <Card
                  key={item.id}
                  logo={item.logo}
                  name={item.name}
                  symbol={item.symbol}
                  change={item.change}
                  totalSupply={item.totalSupply}
                  currency={item.currency}
                  isPositive={item.isPositive}
                />
              ))}
            </div>
                <footer>
                <div className="w-full flex justify-center">
                  <Image
                    src={'/secure.png'}
                    alt='secure'
                    className="w-full bg-cover object-cover sm:max-w-full sm:h-[340px]"
                    height={340}
                    width={1030}
                  />
           </div>
           <div className='border-2 border-white mt-4'></div>
           <div className='w-full sm:w-[70%] flex flex-col sm:flex-row text-white justify-between items-center p-4'>
            <h2 className='text-center md:text-left'>© Stable.fun 2024</h2>
            <div className='flex gap-3 mt-2 md:mt-0'>
              <p>Privacy policy</p>
              <div className='mx-4'>||</div>
              <p>Terms of service</p>
            </div>
          </div>
                </footer>
        </main>
    </div>
  )
}

export default StableHomePage