"use client";
import { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { currentUserLoan } from "utils/helpers/loan";
import { useNetwork } from "utils/context/network";

import styles from "./creditAmont.module.scss";

const { Title, Text } = Typography;

export default function CreditAmount(): JSX.Element {
  const [creditAmount, setCreditAmount] = useState<any>(0);
  const { choosenNetwork, provider } = useNetwork();

  useEffect(() => {
    const work = async () => {
      if (provider && choosenNetwork) {
        const credit = await currentUserLoan(
          provider,
          choosenNetwork.name as "Polygon" | "Mumbai" | "Local"
        );

        setCreditAmount(credit.toString());
      }
    };
    work();
  }, [provider]);

  return (
    <GlassCard>
      <div className={styles.balance}>
        <Title level={5} type="secondary">
          Credit Balance
        </Title>
        <Divider />
        <Text className={styles.amount}>
          {"ETB " + creditAmount}
          {/* {userSetting.currencyConversion == "ETB"
            ? birr(userBalance.TotalInBirr)
            : usd(userBalance.TotalInUsd)} */}
        </Text>
      </div>
    </GlassCard>
  );
}
