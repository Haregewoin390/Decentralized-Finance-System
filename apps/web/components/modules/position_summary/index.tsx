import { Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { useSetting } from "utils/context/settings";

import styles from "./postion.module.scss";

const { Title, Text } = Typography;

export default function Postion(): JSX.Element {
  const { userSetting } = useSetting();
  return (
    <GlassCard>
      <div className={styles.layout}>
        <Title className={styles.title} level={5} type="secondary">
          Postion Summary{" "}
        </Title>
        <div className={styles.postionBlock}>
          <Title level={5}>Collateral Value</Title>
          <Title level={5}>{`${userSetting.currencyConversion} 0.00`}</Title>
        </div>
        <div className={styles.postionBlock}>
          <Title level={5}> Liquidation Point </Title>
          <Title level={5}>{`${userSetting.currencyConversion} 0.00`}</Title>
        </div>
        <div className={styles.postionBlock}>
          <Title level={5}>Borrow Capacity</Title>
          <Title level={5}>{`${userSetting.currencyConversion} 0.00`}</Title>
        </div>
        <div className={styles.postionBlock}>
          <Title level={5}>Available Capacity</Title>
          <Title level={5}>{`${userSetting.currencyConversion} 0.00`}</Title>
        </div>
      </div>
    </GlassCard>
  );
}
