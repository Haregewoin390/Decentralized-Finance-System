import { ProposalProp } from "components/modules/proposals/type";

export type VoteProp = {
  proposal: ProposalProp;
  open: boolean;
  onCancel: () => void;
};
