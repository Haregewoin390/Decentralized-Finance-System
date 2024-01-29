"use client";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Button, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { CopyIcon } from "components/elements/icons";
import { notification } from "components/elements/notification";
import {
  getSendHistory,
  SendHistoryProps,
} from "utils/helpers/transactionHistory";
import { AssetProps, Assets } from "utils/constants/assets";
import { copyToClipBoard } from "utils/helpers/copytext";
import { shortenText } from "utils/helpers/shortText";
import { NetworkNames, Networks } from "utils/constants/rpcProvider";

import styles from "./deposit.module.scss";

const { Text } = Typography;

interface DataType {
  key: React.Key;
  coin: string;
  recieverAddress: string;
  amount: number;
  asset: AssetProps;
  network: NetworkNames;
  hash: string;
  date?: string;
  more?: JSX.Element;
}

export function SendTransaction() {
  const [sendData, setSendData] = useState<any>([]);

  useEffect(() => {
    const send = getSendHistory();
    let asset: any = {};
    for (let i = 0; i < Assets.length; i++) {
      asset[Assets[i].name] = Assets[i];
    }
    const sendMap = send.map((data: SendHistoryProps, index: number) => {
      return {
        key: index.toString(),
        amount: data.amount,
        recieverAddress: data.recieverAddress,
        hash: data.transactionHash,
        asset: asset[data.asset],
        date: data.date,
        network: data.network,
      };
    });
    setSendData(sendMap);
  }, []);

  const handelCopy = (text: string) => {
    const response = copyToClipBoard(text);
    notification({
      messageType: "success",
      message: "Copied!",
      description: "You Copied the address",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Coin",
      dataIndex: "coin",
      render: (_value, record) => {
        return (
          <NextImage
            src={record.asset.imageUrl ?? ""}
            alt="etbc coin icon"
            width={35}
            height={35}
          />
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_value, record) => {
        return (
          <span>
            <Text strong>{`${record.amount} ${record.asset.abbrev}`}</Text>
          </span>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "recieverAddress",
      render: (_value, record) => {
        return (
          <span>
            <Text>{shortenText(record.recieverAddress) + " "}</Text>
            <CopyIcon
              className={styles.icon}
              style={{ fontSize: "120%" }}
              onClick={() => {
                handelCopy(record.recieverAddress);
              }}
            />
          </span>
        );
      },
    },

    {
      title: "Hash",
      dataIndex: "hash",
      render: (_value, record) => {
        return (
          <span>
            <Text>{shortenText(record.hash) + " "}</Text>
            <CopyIcon
              className={styles.icon}
              style={{ fontSize: "120%" }}
              onClick={() => {
                handelCopy(record.hash);
              }}
            />
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "",
      dataIndex: "more",
      render: (_value, record) => {
        return (
          <Link
            href={
              `${Networks[record.network].blockExplorer}/tx/${record.hash}` ??
              ""
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button icon={<MoreOutlined rev={undefined} />} />{" "}
          </Link>
        );
      },
    },
  ];

  return (
    <div className={styles.options}>
      <Table columns={columns} dataSource={sendData} />
    </div>
  );
}
