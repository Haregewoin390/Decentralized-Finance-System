"use client";
import { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { getCreditScore } from "utils/helpers/loan";
import { useNetwork } from "utils/context/network";

import styles from "./creditScore.module.scss";

const { Title, Text } = Typography;

export default function CreditScore(): JSX.Element {
  const [creditScore, setCreditScore] = useState<any>(0);
  const { choosenNetwork, provider } = useNetwork();

  useEffect(() => {
    const work = async () => {
      if (provider && choosenNetwork) {
        const credit = await getCreditScore(
          provider,
          choosenNetwork.name as "Polygon" | "Mumbai" | "Local"
        );

        setCreditScore(credit.toString());
      }
    };
    work();
  }, [provider]);

  return (
    <GlassCard>
      <div className={styles.balance}>
        <Title level={5} type="secondary">
          Credit Score
        </Title>
        <Divider />
        <Text className={styles.amount}>{creditScore}</Text>
      </div>
    </GlassCard>
  );
}
