import { Contract, Provider } from "ethers";
import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from "utils/helpers/localStorage";
import { NetworkNames } from "utils/constants/rpcProvider";
import { Contracts } from "utils/constants/contracts";

export type SendHistoryProps = {
  recieverAddress: string;
  transactionHash: string;
  network: string;
  amount: number;
  asset: string;
  date: string;
};

export function saveSendHistory(sendHistory: SendHistoryProps) {
  const previous = getItemFromLocalStorage("send", true);
  if (Object.keys(previous).length != 0) {
    setItemInLocalStorage("send", [...previous, sendHistory], true);
  } else setItemInLocalStorage("send", [sendHistory], true);
}

export function getSendHistory() {
  const history = getItemFromLocalStorage("send", true);
  if (Array.isArray(history)) return history;
  else return [];
}

export async function getDepositHistory(
  provider: Provider,
  network: NetworkNames,
  address: string
) {
  try {
    const etbcContract = new Contract(
      Contracts.ChapaTracker[network].address,
      Contracts.ChapaTracker.abi,
      provider
    );
    const transaction = await etbcContract.getTransaction(address);
    return transaction;
  } catch (err) {
    console.log(err);
    return [];
  }
}
