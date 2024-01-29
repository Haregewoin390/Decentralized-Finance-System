import { Dispatch, SetStateAction } from 'react';

export type PassphraseTypes = {
  passPhrase: string[];
  setExtraPassphrase: Dispatch<SetStateAction<string | undefined>>;
  setpassPhrase: Dispatch<SetStateAction<string[]>>;
  stateChanger: Dispatch<SetStateAction<1 | 2 | 3>>;
};
