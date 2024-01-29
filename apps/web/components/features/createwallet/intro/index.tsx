import Welcome from "components/layouts/welcome";
import { IntroductionWallet } from "components/modules/createwallet_card";

import styles from "./createwallet.module.scss";

export default function CreateWallet() {
  return (
    <Welcome>
      <div className={styles.container}>
        <IntroductionWallet />
      </div>
    </Welcome>
  );
}
