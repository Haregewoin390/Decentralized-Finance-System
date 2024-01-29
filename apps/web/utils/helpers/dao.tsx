import { Contract, Provider, Wallet } from "ethers";
import { Contracts } from "utils/constants/contracts";
import { ProposalType } from "utils/types/proposalType";

export async function createProposal(
  provider: Provider,
  privateKey: string,
  network: "Polygon" | "Local" | "Mumbai",
  proposalInfo: ProposalType
) {
  try {
    const wallet = new Wallet(privateKey, provider);
    // const walletSigner = wallet.connect(provider);
    const contract = new Contract(
      Contracts.Dao[network].address,
      Contracts.Dao.abi,
      wallet
    );
    const response = await contract.addVote(
      proposalInfo.name,
      proposalInfo.description,
      proposalInfo.startDate,
      proposalInfo.endDate
    );
    await response.wait();
  } catch (err) {
    console.log(err);
  }
}

export async function getProposal(
  provider: Provider,
  network: "Polygon" | "Local" | "Mumbai",
  privateKey: string
) {
  try {
    const wallet = new Wallet(privateKey, provider);
    const contract = new Contract(
      Contracts.Dao[network].address,
      Contracts.Dao.abi,
      wallet
    );
    const response = await contract.getProposals();

    return { success: true, data: response };
  } catch (err) {
    console.log(err);
    return { success: false, data: err };
  }
}

export async function vote(
  provider: Provider,
  privateKey: string,
  network: "Polygon" | "Local" | "Mumbai",
  voteIndex: number,
  voteFor: boolean
) {
  try {
    const wallet = new Wallet(privateKey, provider);
    const contract = new Contract(
      Contracts.Dao[network].address,
      Contracts.Dao.abi,
      wallet
    );

    const response = await contract.voting(voteIndex + 1, voteFor);

    await response.wait();
    return { success: true, data: response };
  } catch (err) {
    console.log(err);
    return { success: false, data: err };
  }
}
