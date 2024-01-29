import { Card } from "antd";

import styles from "./transparentCard.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function GlassCard({ children }: Props): JSX.Element {
  return <Card className={styles.container}>{children}</Card>;
}
