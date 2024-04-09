import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Metatags from "@/components/Metatags";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Wallet from "@/components/Wallet"


import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
const chains = [arbitrum, mainnet, polygon];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "2e603b4827e59dd1a715066175aee2e8" }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "2e603b4827e59dd1a715066175aee2e8",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <WagmiConfig client={wagmiClient}>
        <Header />
        <Metatags />
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </WagmiConfig>
      <Wallet>BAĞLAN</Wallet>
    </main>
  );
}
