import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { taiko, taikoHekla } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Stable Fun",
  projectId: "3e5fb9eb794c48260e2a5a41be9e5b38",
  chains: [taiko, taikoHekla],
  transports: {
    [taiko.id]: http("https://rpc.mainnet.taiko.xyz"),
    [taikoHekla.id]: http("https://rpc.hekla.taiko.xyz"),
  },
});
