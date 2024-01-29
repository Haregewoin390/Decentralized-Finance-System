import QrAddress from '.';

export type QrAddressProps = {
  open: boolean;
  address: string;
  onCancel: () => void;
};
