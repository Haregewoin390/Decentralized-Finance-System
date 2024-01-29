import { InterfaceAbi } from "ethers";
import { NetworkNames } from "utils/constants/rpcProvider";
import etherumAbi from "utils/abis/etherum_abi.json";
import usdtAbi from "utils/abis/usdt_abi.json";
import etbcAbi from "utils/abis/etbc_abi.json";

export type AssetNames = "Matic" | "Ether" | "Usdt" | "EtbCoin";
export interface AssetProps {
  name: AssetNames;
  abbrev: string;
  imageUrl?: string;
  contractAddress: Record<NetworkNames, string>;
  coingeckoId?: string;
  abi?: InterfaceAbi;
}

export const Assets: AssetProps[] = [
  {
    name: "Matic",
    abbrev: "Matic",
    imageUrl: "./icons/assets/matic.svg",
    contractAddress: {
      Local: "",
      Mumbai: "",
      Polygon: "",
    },
    coingeckoId: "matic-network",
  },
  {
    name: "Ether",
    abbrev: "ETH",
    imageUrl: "./icons/assets/eth.svg",
    contractAddress: {
      Polygon: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      Mumbai: "0x91B0A9bb04991cf83f62348FE24196BbAA8D2603",
      Local: "0x47d72035D968AD6dAe6790D20FB52CE3a2ecF4f9",
    },
    coingeckoId: "ethereum",
    abi: etherumAbi,
  },
  {
    name: "EtbCoin",
    abbrev: "ETBC",
    imageUrl: "./icons/assets/etbcoin.svg",
    contractAddress: {
      Polygon: "",
      Mumbai: "0xd5EE2bF2FB8c78ccca0a77144F64E4F5f6d9c731",
      Local: "0xf98D58b1E2D0B5869e773fCa4d6cEEADd4B63ad3",
    },
    abi: etbcAbi,
  },
  {
    name: "Usdt",
    abbrev: "USDT",
    imageUrl: "./icons/assets/usdt.svg",
    contractAddress: {
      Polygon: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      Mumbai: "0x1Fc88C1721a3aEF4E6aBF83E2262e8638F977513",
      Local: "0xce31B91f46019397572e1fCC40F1C9F0F4347D87",
    },
    coingeckoId: "tether",
    abi: usdtAbi,
  },
];
