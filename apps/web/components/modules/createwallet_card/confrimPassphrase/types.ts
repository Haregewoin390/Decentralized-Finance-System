import { Dispatch, SetStateAction } from 'react';

export type RandomPassphraseType = {
  postion: number[];
  choosenWords: number[][];
};

export type ConfirmPasspraseProps = {
  passphrase: string[];
  stateChanger: Dispatch<SetStateAction<1 | 2 | 3>>;
};
