import { QRCode } from "antd";
import { QrProps } from "./types";

import styles from "./qr.module.scss";

export default function Qr({ text }: QrProps): JSX.Element {
  return (
    <div className={styles.container}>
      <QRCode
        className={styles.qr}
        errorLevel="L"
        value={text}
        icon={"./icons/logo.svg"}
        iconSize={25}
        size={300}
      />
    </div>
  );
}
