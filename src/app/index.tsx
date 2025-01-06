"use client"
import Image from 'next/image'
import React from 'react'
import Card from './card'
import data from './data.json'
import Link from 'next/link'
const StableHomePage = () => {
  return (
    <div className='sm:px-40 px-10 py-5 flex flex-col gap-5 overflow-x-hidden'>
        {/* Header */}
        <header className='flex justify-between items-center'>
            <Image
            src={'/logo.png'}
            alt='Stable Fun Logo'
            width={147}
            height={30}
            />
            
        </header>
        <main className='flex flex-col gap-4 justify-center'>
        <section className='bg-[url("/rectangle.png")] bg-no-repeat gap-10 sm:gap-0 justify-between flex flex-col md:flex-row py-12 sm:px-10 px-5 rounded-[30px] w-full bg-cover '>
            <div className='flex flex-col gap-3 w-full md:w-[400px] h-auto md:h-[218px]'>
              <h4 className='text-lg md:text-xl'>STABLE.FUN</h4>
              <h1 className='text-2xl md:text-3xl font-bold'>Mint Stablecoins & Exchange Instantly</h1>
              <p className='text-sm md:text-base'>
                Empower yourself to create custom stablecoins backed by yield-generating stablebonds from Etherfuse
              </p>
              <Link href={'/create'} className='bg-gray-900 text-white shadow-inner drop-shadow-lg rounded-lg px-6 md:px-10 py-2 md:py-3 flex justify-center items-center text-sm md:text-base'>
                Start A New Coin
              </Link>
            </div>
            <div className='flex justify-center items-center w-full md:w-auto'>
              <Image
                src={'/Gemini_Generated_Image_2kucpn2kucpn2kuc Background Removed 1.png'}
                alt='Gemini_Generated_Image_2kucpn2kucpn2kuc Background Removed 1'
                width={266}
                height={148}
                className='object-cover'
              />
            </div>
</section>
            <div className='grid sm:grid-cols-3 grid-cols-1 justify-center gap-10 w-full 
             mt-8'>
              {data.map((item) => (
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
                    className="w-full h-auto max-w-full"
                    height={340}
                    width={1030}
                  />
           </div>
           <div className='w-full md:w-1/2 flex flex-col md:flex-row text-white justify-between items-center p-4'>
            <h2 className='text-center md:text-left'>© Stable.fun 2024</h2>
            <div className='flex gap-5 mt-2 md:mt-0'>
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