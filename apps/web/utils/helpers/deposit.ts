import { Contract, JsonRpcProvider, Wallet, parseEther } from "ethers";
import { Contracts } from "utils/constants/contracts";
import { Networks } from "utils/constants/rpcProvider";

export async function mintFromDepositLocal(amount: number, address: string) {
  try {
    const localProvider = new JsonRpcProvider(Networks.Local.rpcLink);
    if (process.env.LOCAL_OWNER_PRIVATE_KEY) {
      const wallet = new Wallet(process.env.LOCAL_OWNER_PRIVATE_KEY);
      const walletSigner = wallet.connect(localProvider);
      const etbc = new Contract(
        Contracts.Etbc.Local.address,
        Contracts.Etbc.abi,
        walletSigner
      );
      const chapaContract = new Contract(
        Contracts.ChapaTracker.Local.address,
        Contracts.ChapaTracker.abi,
        walletSigner
      );
      const amountInWei = parseEther(amount.toString());
      const etherContract = new Contract(
        Contracts.Ether.Local.address,
        Contracts.Ether.abi,
        walletSigner
      );
      const approve = await etherContract.approve(
        Contracts.Etbc.Local.address,
        amountInWei
      );
      const receipt = await approve.wait();

      const mint = await etbc.mintForDeposit(amountInWei, address);
      const record = await chapaContract.newTransaction(address, amountInWei);

      return true;
    } else {
      console.log("no private key");
      return false;
    }
  } catch (err) {
    return false;
  }
}

export async function mintFromDepositMumbai(amount: number, address: string) {
  try {
    const mumbaiProvider = new JsonRpcProvider(Networks.Mumbai.rpcLink);
    if (process.env.MUMBAI_OWNER_PRIVATE_KEY) {
      const wallet = new Wallet(process.env.MUMBAI_OWNER_PRIVATE_KEY);
      const walletSigner = wallet.connect(mumbaiProvider);
      const etbc = new Contract(
        Contracts.Etbc.Mumbai.address,
        Contracts.Etbc.abi,
        walletSigner
      );
      const precision = amount.toPrecision(10);
      const amountInWei = parseEther(precision);
      const etherContract = new Contract(
        Contracts.Ether.Mumbai.address,
        Contracts.Ether.abi,
        walletSigner
      );

      const chapaContract = new Contract(
        Contracts.ChapaTracker.Mumbai.address,
        Contracts.ChapaTracker.abi,
        walletSigner
      );

      const approve = await etherContract.approve(
        Contracts.Etbc.Mumbai.address,
        amountInWei
      );

      const receipt = await approve.wait();

      const mint = await etbc.mintForDeposit(amountInWei, address);

      const record = await chapaContract.newTransaction(address, amountInWei);

      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
