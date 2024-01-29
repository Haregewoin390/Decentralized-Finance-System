"use client";
import { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { getCreditLimit } from "utils/helpers/loan";
import { useNetwork } from "utils/context/network";

import styles from "./creditLimit.module.scss";

const { Title, Text } = Typography;

export default function CreditLimit(): JSX.Element {
  const [creditLimit, setCreditLimit] = useState<any>(0);
  const { choosenNetwork, provider } = useNetwork();

  useEffect(() => {
    const work = async () => {
      if (provider && choosenNetwork) {
        const credit = await getCreditLimit(
          provider,
          choosenNetwork.name as "Polygon" | "Mumbai" | "Local"
        );

        setCreditLimit(credit.toString());
      }
    };
    work();
  }, [provider]);

  return (
    <GlassCard>
      <div className={styles.balance}>
        <Title level={5} type="secondary">
          Credit Limit
        </Title>
        <Divider />
        <Text className={styles.amount}>
          {"ETB " + creditLimit}
          {/* {userSetting.currencyConversion == "ETB"
            ? birr(userBalance.TotalInBirr)
            : usd(userBalance.TotalInUsd)} */}
        </Text>
      </div>
    </GlassCard>
  );
}
