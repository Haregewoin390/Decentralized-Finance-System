import Modal from "components/elements/modal";
import Qr from "components/elements/qr";
import { useUser } from "utils/context/user";
import { QrAddressProps } from "./types";

import styles from "./qrAddress.module.scss";

export default function QrAddress({
  address,
  open,
  onCancel,
}: QrAddressProps): JSX.Element {
  const { userInfo } = useUser();

  return (
    <Modal
      open={open}
      centered={true}
      className={styles.modal}
      closable={true}
      onCancel={onCancel}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Scan for Sending</h2>
        <Qr text={address} />
        <h3>{userInfo?.pubad}</h3>
      </div>
    </Modal>
  );
}
