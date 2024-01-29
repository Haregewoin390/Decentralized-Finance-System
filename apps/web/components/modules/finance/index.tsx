"use client";
import { Tabs, Typography } from "antd";
import type { TabsProps } from "antd";
import { GlassCard } from "components/elements/cards";
import { GetLoan } from "components/modules/finance/getLoan";
import { PayLoan } from "components/modules/finance/payLoan";
import { useEffect } from "react";
import { getUserLoan } from "utils/helpers/loan";
import { useNetwork } from "utils/context/network";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Get Loan`,
    children: <GetLoan />,
  },
  {
    key: "2",
    label: `Pay Loan`,
    children: <PayLoan />,
  },
  {
    key: "3",
    label: `History`,
    children: <p>h</p>,
  },
];

export default function Finance(): JSX.Element {
  const { provider, choosenNetwork } = useNetwork();

  useEffect(() => {
    const work = async () => {
      console.log("dd");
      if (provider) {
        await getUserLoan(
          provider,
          choosenNetwork.name as "Polygon" | "Mumbai" | "Local"
        );
        console.log("dds");
      }
    };
    work();
  }, [provider]);
  return (
    <GlassCard>
      <Tabs defaultActiveKey="1" items={items} />{" "}
    </GlassCard>
  );
}
