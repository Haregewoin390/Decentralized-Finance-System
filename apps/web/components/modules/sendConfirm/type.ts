import { AssetProps } from "utils/constants/assets";

export type SendConfirmProps = {
  open: boolean;
  onCancel: () => void;
  address: string;
  asset: AssetProps;
  amount: number;
};
