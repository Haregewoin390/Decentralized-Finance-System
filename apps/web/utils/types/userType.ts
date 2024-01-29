export type UserType = {
  privateKey: string;
  accountNumber: string;
};

export type UserLoginInfo = {
  hdPriv: string;
  priv: string;
  pubad: string;
  pubkey: string;
} | null;
