"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";
import {
  NetworkNames,
  Networks,
  NetworkType,
} from "utils/constants/rpcProvider";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "utils/helpers/localStorage";

interface NetworkState {
  choosenNetwork: NetworkType;
  networks: Record<string, NetworkType>;
  changeNetwork(network: NetworkType): void;
  addNetwork(newNetwork: NetworkType, networkKey: string): void;
  provider: JsonRpcProvider | undefined;
}

const defaultNetworkState: NetworkState = {
  choosenNetwork: Networks.Polygon,
  networks: Networks,
  changeNetwork: () => {},
  addNetwork: (newNetwork: NetworkType, networkKey: string) => {},
  provider: undefined,
};

const NetworkContext = createContext(defaultNetworkState);

interface NetworkProviderProps {
  children: React.ReactNode;
}

export const NetworkProvider = ({
  children,
}: NetworkProviderProps): JSX.Element => {
  const [choosenNetwork, setChoosenNetwork] = useState<NetworkType>(
    Networks.Polygon
  );
  const [networks, setNetworks] =
    useState<Record<string, NetworkType>>(Networks);

  const [provider, setProvider] = useState<JsonRpcProvider>();

  const addNetwork = (newNetwork: NetworkType, networkKey: string) => {
    setNetworks({ ...networks, [networkKey]: newNetwork });
  };

  const changeNetwork = (network: NetworkType) => {
    try {
      setChoosenNetwork(network);
      const provider = new JsonRpcProvider(network.rpcLink);
      setProvider(provider);
      setItemInLocalStorage("network", network.name);
    } catch (error) {
      console.log("error occured on changing network");
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    const userNetwork = getItemFromLocalStorage("network");
    if (userNetwork && Networks[userNetwork as NetworkNames]) {
      setChoosenNetwork(Networks[userNetwork as NetworkNames]);
      const provider = new JsonRpcProvider(
        Networks[userNetwork as NetworkNames].rpcLink
      );
      setProvider(provider);
    } else {
      setChoosenNetwork(Networks.Mumbai);
      const provider = new JsonRpcProvider(Networks.Mumbai.rpcLink);
      setProvider(provider);
    }
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        networks,
        choosenNetwork,
        changeNetwork,
        addNetwork,
        provider,
      }}
    >
      {children}{" "}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
