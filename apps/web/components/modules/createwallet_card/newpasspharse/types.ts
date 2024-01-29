import { Dispatch, SetStateAction } from 'react';

export type PassphraseTypes = {
  passPhrase: string[];
  setpassPhrase: Dispatch<SetStateAction<string[]>>;
  stateChanger: Dispatch<SetStateAction<1 | 2 | 3>>;
  setExtraPassphrase: Dispatch<SetStateAction<string | undefined>>;
};
