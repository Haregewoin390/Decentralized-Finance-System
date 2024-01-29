import { Contract, InterfaceAbi, Provider, Wallet, parseUnits } from "ethers";
import { Contracts } from "utils/constants/contracts";

export async function getCreditScore(
  provider: Provider,
  network: "Polygon" | "Local" | "Mumbai"
) {
  const contract = new Contract(
    Contracts.Loan[network].address,
    Contracts.Loan.abi as InterfaceAbi,
    provider
  );

  const credit = await contract.calculateCredit();
  console.log(credit);
  return credit;
}

export async function getCreditLimit(
  provider: Provider,
  network: "Polygon" | "Local" | "Mumbai"
) {
  const contract = new Contract(
    Contracts.Loan[network].address,
    Contracts.Loan.abi as InterfaceAbi,
    provider
  );

  const credit = await contract.calculateCreditLimit();
  console.log(credit);
  return credit;
}

export async function currentUserLoan(
  provider: Provider,
  network: "Polygon" | "Local" | "Mumbai"
) {
  const contract = new Contract(
    Contracts.Loan[network].address,
    Contracts.Loan.abi as InterfaceAbi,
    provider
  );

  const balance = await contract.currentUserLoan();
  return balance;
}

export async function getLoan(
  amount: number,
  date: 30 | 60 | 90,
  provider: Provider,
  privateKey: string,
  network: "Polygon" | "Local" | "Mumbai"
) {
  const wallet = new Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  try {
    const contract = new Contract(
      Contracts.Loan[network].address,
      Contracts.Loan.abi as InterfaceAbi,
      walletSigner
    );
    const amountToBorrow = (amount / (55 * 14.83)).toFixed(2);
    const formatAmount = parseUnits(amountToBorrow.toString(), 18);
    const response = await contract.giveLoan(amount, formatAmount, date);
    console.log(response);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function payLoan() {}

export async function getUserLoan(
  provider: Provider,
  network: "Polygon" | "Local" | "Mumbai"
) {
  try {
    console.log("working");
    const contract = new Contract(
      Contracts.Loan[network].address,
      Contracts.Loan.abi as InterfaceAbi,
      provider
    );
    const credits = await contract.getUserLoans();
    console.log(credits);
    console.log("op");

    return credits;
  } catch (err) {
    console.log("err worked");
    console.log(err);
  }
}
