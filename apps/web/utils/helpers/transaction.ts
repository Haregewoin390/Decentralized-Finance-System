import {
  AddressLike,
  Contract,
  InterfaceAbi,
  Provider,
  Wallet,
  parseEther,
  parseUnits,
} from "ethers";
import { AssetProps } from "utils/constants/assets";
import { NetworkNames, NetworkType } from "utils/constants/rpcProvider";

export async function getGasPrice(provider: Provider) {
  const fee = await provider.getFeeData();

  return fee;
}

export async function sendContractToken(
  provider: Provider,
  amount: number,
  privateKey: string,
  receiverAddress: AddressLike,
  asset: AssetProps,
  network: NetworkType
) {
  const wallet = new Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  try {
    const assetContract = new Contract(
      asset.contractAddress[network.name as NetworkNames],
      asset.abi as InterfaceAbi,
      walletSigner
    );
    const numberOfTokens = parseUnits(amount.toString(), 18);
    const transferResult = await assetContract.transfer(
      receiverAddress,
      numberOfTokens
    );
    return { result: true, data: transferResult };
  } catch (err) {
    return { result: false, data: err };
  }
}

export async function sendToken(
  provider: Provider,
  amount: number,
  privateKey: string,
  senderAddress: AddressLike,
  receiverAddress: AddressLike
) {
  const wallet = new Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  const nonce = await provider.getTransactionCount(
    senderAddress as AddressLike,
    "latest"
  );
  try {
    const fee = await provider.getFeeData();
    const tx = {
      from: senderAddress,
      to: receiverAddress,
      value: parseEther(amount?.toString() ?? "0"),
      nonce: nonce,
      gasLimit: 21000, // 100000
      gasPrice: fee.gasPrice,
    };

    const transferResult = await walletSigner.sendTransaction(tx);
    return { result: true, data: transferResult };
  } catch (err) {
    return { result: false, data: err };
  }
}
