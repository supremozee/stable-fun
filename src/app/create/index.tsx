"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Keypair } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";
import { useRouter } from "next/navigation";

// Import and type your IDL
import idl from "../../../idl.json";
// const idl = rawIdl as anchor.Idl;

// Program constants
const PROGRAM_ID = new PublicKey(
  "9sMy4hnC9MML6mioESFZmzpntt3focqwUq1ymPgbMf64"
);

// Define the program type based on your IDL
type StablecoinProgram = Program<anchor.Idl>;

const CreateStablecoin = () => {
  const router = useRouter();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<StablecoinProgram | null>(null);

  // Form state
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [yieldToken, setYieldToken] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize program when wallet connects
  useEffect(() => {
    if (wallet && connection) {
      try {
        const provider = new AnchorProvider(connection, wallet, {
          commitment: "confirmed",
        });
        const programInstance = new Program(idl, PROGRAM_ID, provider);
        console.log("programInstance", programInstance)
        setProgram(programInstance);
      } catch (error) {
        console.error("Error initializing program:", error);
      }
    }
  }, [connection, wallet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (!program || !wallet || !wallet.publicKey) {
      console.log("program", program, "wallet", wallet)
      alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);

    try {
      // Generate a new mint account
      const mintKeypair = Keypair.generate();

      // Generate the token metadata account
      const [metadataAddress] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      );

      // Generate the vault account for yield tokens
      const [vaultAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), mintKeypair.publicKey.toBuffer()],
        PROGRAM_ID
      );

      // Create the transaction
      const tx = await program.methods
        .initializeStablecoin({
          name: tokenName,
          symbol: tokenSymbol,
          targetCurrency,
          initialSupply: new BN(initialSupply),
          lockAmount: new BN(lockAmount),
        })
        .accounts({
          mint: mintKeypair.publicKey,
          metadata: metadataAddress,
          vault: vaultAddress,
          yieldToken: new PublicKey(yieldToken),
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair])
        .rpc();

      alert("Stablecoin created successfully! Transaction: " + tx);

      // Reset form
      setTokenName("");
      setTokenSymbol("");
      setTargetCurrency("");
      setYieldToken("");
      setInitialSupply("");
      setLockAmount("");
      setAgreed(false);
    } catch (error) {
      console.error("Error minting stablecoin:", error);
      if (error instanceof Error) {
        alert(`Error creating stablecoin: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex flex-col gap-3">
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="agreed"
              type="checkbox"
              className="mr-2"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <label htmlFor="agreed" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center p-4 sm:p-0">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="lockAmount">
              Lock Yield Tokens
            </label>
            <input
              id="lockAmount"
              type="number"
              placeholder="Deposit tokens to back the stablecoin"
              className="w-full sm:w-full p-3 rounded-[10px] border border-white border-opacity-15 bg-[#030B15] focus:ring-2 focus:ring-blue-500 outline-none"
              value={lockAmount}
              onChange={(e) => setLockAmount(e.target.value)}
              required
            />
            <Image
              src={"/upload.png"}
              alt="upload"
              width={460}
              height={420}
              className="w-[460px] h-[420px] object-cover bg-cover rounded-[25px]"
            />
            <button
              type="submit"
              disabled={isLoading || !wallet || !wallet.publicKey}
              className="w-full sm:w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-[10px] border border-white border-opacity-15 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating Stablecoin..."
                : wallet && wallet.publicKey
                ? "Mint Stablecoin"
                : "Connect Wallet to Mint"}
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateStablecoin;