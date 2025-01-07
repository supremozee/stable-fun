import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SolanaWalletProvider from "./SolanaWallet";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stable Fun",
  description: "A Solana program for creating and managing stablecoins pegged to fiat currencies, using real-time oracle rates for minting and redeeming.",
};


// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
              <SolanaWalletProvider>
                  {children}
              </SolanaWalletProvider>   
      </body>
    </html>
  );
}