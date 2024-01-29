'use client';
import { SetStateAction, useState } from 'react';
import { GlassCard } from 'components/elements/cards';
import Welcome from 'components/layouts/welcome';
import {
  CreatePassword,
  ImportPassphrase,
} from 'components/modules/createwallet_card';

import styles from './exisisting.module.scss';

export default function NewWallet() {
  const [steps, setSteps] = useState<1 | 2 | 3>(1);
  const [passphrase, setPassphrase] = useState<string[]>(Array(12).fill(''));
  const [password, setPassword] = useState<string>('');
  const [extraPassphrase, setExtraPassPhrase] = useState<string | undefined>();

  return (
    <Welcome>
      <GlassCard>
        <div className={styles.container}>
          {(() => {
            switch (steps) {
              case 1:
                return (
                  <ImportPassphrase
                    passPhrase={passphrase}
                    setpassPhrase={setPassphrase}
                    stateChanger={setSteps}
                    setExtraPassphrase={setExtraPassPhrase}
                  />
                );
              case 2:
                return (
                  <CreatePassword
                    setPassword={setPassword}
                    passphrase={passphrase}
                    extraPassphrase={extraPassphrase}
                  />
                );

              default:
                null;
            }
          })()}
        </div>
      </GlassCard>
    </Welcome>
  );
}
