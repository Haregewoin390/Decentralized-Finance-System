export interface NetworkType {
  name: string;
  rpcLink: string;
  currency: string;
  blockExplorer?: string;
  type?: "Main" | "Test" | "Custom";
}

export type NetworkNames = "Polygon" | "Mumbai" | "Local";

export const Networks: Record<NetworkNames, NetworkType> = {
  Polygon: {
    name: "Polygon",
    rpcLink:
      "https://rpc.ankr.com/polygon/7e1b505b2f6a817e58d34ec9daa603aff5f27252d76b641239ed744be6b7bfa7",
    currency: "Matic",
    type: "Main",
    blockExplorer: "https://polygonscan.com",
  },
  Mumbai: {
    name: "Mumbai",
    rpcLink:
      "https://rpc.ankr.com/polygon_mumbai/7e1b505b2f6a817e58d34ec9daa603aff5f27252d76b641239ed744be6b7bfa7",
    currency: "Matic",
    type: "Test",
    blockExplorer: "https://mumbai.polygonscan.com",
  },
  Local: {
    name: "Local",
    rpcLink: "HTTP://127.0.0.1:8545",
    currency: "Eth",
    type: "Test",
  },
};
