import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrumSepolia, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

const { chains, publicClient } = configureChains(
  [arbitrumSepolia, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "ad9d4173328447d73a95b113fec565eb",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const id = "";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#e5e7eb",
            accentColorForeground: "black",
            fontStack: "system",
          })}
          chains={chains}
        >
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
