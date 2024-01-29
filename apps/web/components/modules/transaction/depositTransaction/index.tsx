"use client";
import { useEffect, useState } from "react";
import { Typography, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatEther } from "ethers";
import { getDepositHistory } from "utils/helpers/transactionHistory";
import { useNetwork } from "utils/context/network";
import { useUser } from "utils/context/user";
import { NetworkNames } from "utils/constants/rpcProvider";
import { birr } from "utils/helpers/formatCurrency";

import styles from "./deposit.module.scss";

const { Text } = Typography;

interface DataType {
  key: React.Key;
  amount: number;
  date?: string;
}

export function DepositTransaction() {
  const { choosenNetwork, provider } = useNetwork();
  const { userInfo } = useUser();
  const [depositData, setDepositData] = useState<any>([]);

  useEffect(() => {
    const work = async () => {
      if (provider && userInfo) {
        const transaction = await getDepositHistory(
          provider,
          choosenNetwork.name as NetworkNames,
          userInfo?.pubad
        );
        const data = transaction.map((items: any, index: number) => {
          return {
            key: index.toString(),
            index: index + 1,
            amount: items[1],
          };
        });
        setDepositData(data);
      }
    };
    work();
  }, [provider, userInfo]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Index",
      dataIndex: "index",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_value, record) => {
        const bigNum = Number(formatEther(BigInt(120 * 1700) * _value));
        return <Text>{birr(bigNum)}</Text>;
      },
    },
  ];

  return (
    <div className={styles.options}>
      <Table columns={columns} dataSource={depositData} />
    </div>
  );
}
