import { Dispatch, SetStateAction } from 'react';

export type PasswordTypes = {
  passphrase: string[];
  extraPassphrase: string | undefined;
  setPassword: Dispatch<SetStateAction<string>>;
};
