import { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Button, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { GlassCard } from "components/elements/cards";
import { Assets as assets, AssetProps } from "utils/constants/assets";
import { useUserBalance } from "utils/context/userBalance";
import { useSetting } from "utils/context/settings";

import styles from "./assets.module.scss";

const { Title, Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  priceChange: number;
  value: number;
  amount: number;
  abbrv?: string;
  imageUrl?: string;
  more?: JSX.Element;
}

export default function Assets(): JSX.Element {
  const [data, setData] = useState<DataType[]>();
  const { userBalance } = useUserBalance();
  const { userSetting } = useSetting();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (value, record) => {
        return (
          <div className={styles.assets}>
            {record.imageUrl ? (
              <NextImage
                src={record.imageUrl}
                alt="etbc coin icon"
                width={35}
                height={35}
              />
            ) : null}
            <div className={styles.name}>
              <Text>{record.name} </Text>
              <Text type="secondary">{record.abbrv}</Text>
            </div>
          </div>
        );
      },
    },
    {
      title: "Price/24 change",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (value, record) => {
        return (
          <span className={styles.priceAndchange}>
            <div className={styles.price}>
              <Text type="secondary">{userSetting.currencyConversion} </Text>
              <Text strong>{record.price}</Text>
            </div>
            {record.priceChange < 0 ? (
              <Text type="danger">{"  " + record.priceChange + "%"}</Text>
            ) : (
              <Text type="success">{"  " + record.priceChange + "%"}</Text>
            )}
          </span>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => a.value - b.value,
      render: (value, record) => {
        return (
          <span>
            <Text type="secondary">{`${userSetting.currencyConversion} `}</Text>
            <Text strong>{record.value}</Text>
          </span>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (_value, record) => {
        return (
          <span>
            <Text strong>{record.amount}</Text>
            <Text type="secondary">{" " + record.abbrv}</Text>
          </span>
        );
      },
    },
    {
      title: "",
      dataIndex: "more",
      render: (_value, record) => (
        <Link href={"asset/" + record.name.toLowerCase()}>
          <Button icon={<MoreOutlined rev={undefined} />} />{" "}
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const work = async () => {
      try {
        const mapDataForAssetsTable = (items: AssetProps, index: number) => {
          return {
            key: index.toString(),
            name: items.name,
            abbrv: items.abbrev,
            imageUrl: items.imageUrl,
            price:
              userSetting.currencyConversion == "ETB"
                ? Number(
                    (
                      (userBalance as any)[items.name]["price"] * 55
                    ).toPrecision(4)
                  )
                : (userBalance as any)[items.name]["price"],
            priceChange: (userBalance as any)[items.name]["change"].toPrecision(
              3
            ),
            amount: (userBalance as any)[items.name]["total"],

            value:
              userSetting.currencyConversion == "ETB"
                ? (userBalance as any)[items.name]["totalInbirr"]
                : (userBalance as any)[items.name]["totalInUsd"],
          };
        };

        const temp: DataType[] = assets.map(mapDataForAssetsTable);

        setData(temp);
      } catch (err) {
        console.log(err);
      }
    };
    work();
  }, [userBalance]);

  return (
    <GlassCard>
      <div className={styles.layout}>
        <Title className={styles.title} level={5} type="secondary">
          Assets{" "}
        </Title>
        <Table columns={columns} dataSource={data} />
      </div>
    </GlassCard>
  );
}
