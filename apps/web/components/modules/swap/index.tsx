"use client";
import { useState } from "react";
import Image from "next/image";
import { Form, InputNumber, Select, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GlassCard } from "components/elements/cards";
import Button from "components/elements/buttons";
import { useUser } from "utils/context/user";
import { Assets, AssetProps } from "utils/constants/assets";

import styles from "./swap.module.scss";

const { Title } = Typography;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />
);

export default function Send(): JSX.Element {
  const { userInfo } = useUser();

  const [swapFromAssetIcon, setSwapFromAssetIcon] = useState<string>(
    Assets[0].imageUrl ?? ""
  );
  const [swapFromAsset, setSwapFromAsset] = useState<string>(Assets[0].name);
  const [swapToAssetIcon, setSwapToAssetIcon] = useState<string>("");
  const [swapToAsset, setSwapToAsset] = useState<string>("");
  const [selectAsset, setSelectAsset] = useState<boolean>(false);
  const [allSwapFromAssets, setAllSwapFromAssets] = useState<[]>();
  const [allSwapToAssets, setAllSwapToAssets] = useState<AssetProps[]>();

  const onChangeAsset = (_v: any, option: any) => {
    setSwapFromAssetIcon(option.icon);
    setSwapFromAsset(option.value);
    setSelectAsset(false);
  };

  const onChangeSwapToAsset = (_v: any, option: any) => {
    setSwapToAssetIcon(option.icon);
    setSwapToAsset(option.value);
  };

  const onAssetSelect = () => {
    setSelectAsset(true);
  };

  return (
    <div className={styles.container}>
      <GlassCard>
        <div className={styles.layout}>
          <Title level={4}>Swap</Title>
          <Form name="send" size="large" layout="vertical" autoComplete="off">
            <Form.Item label="Swap From" name="swapfrom">
              {selectAsset ? (
                <Select
                  showSearch
                  placeholder="Select an Asset"
                  optionFilterProp="children"
                  defaultActiveFirstOption
                  onChange={onChangeAsset}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Assets.map((value) => {
                    return {
                      icon: value.imageUrl,
                      value: value.name,
                      label: value.abbrev,
                    };
                  }).filter((value) => value.value != swapToAsset)}
                />
              ) : (
                <div className={styles.swapFrom}>
                  <Button
                    text={swapFromAsset}
                    icon={
                      <Image
                        src={swapFromAssetIcon}
                        alt={swapFromAssetIcon}
                        width={24}
                        height={24}
                      />
                    }
                    className={styles.selectAssestButton}
                    onClick={onAssetSelect}
                  />
                  <InputNumber
                    className={styles.selectAssestInput}
                    minLength={0}
                    min={0}
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item label="Swap To" name="swapTo">
              <Select
                showSearch
                placeholder="Select an Asset"
                optionFilterProp="children"
                defaultActiveFirstOption
                suffixIcon={
                  swapToAsset == "" ? null : (
                    <Image
                      src={swapToAssetIcon}
                      alt={swapToAsset}
                      width={28}
                      height={28}
                    />
                  )
                }
                onSelect={onChangeSwapToAsset}
                //onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Assets.map((value) => {
                  return {
                    icon: value.imageUrl,
                    value: value.name,
                    label: value.abbrev,
                  };
                }).filter((value) => value.value != swapFromAsset)}
              />
            </Form.Item>

            <Form.Item>
              <Button text="Swap" type="primary" htmlType="submit" />
            </Form.Item>
          </Form>
        </div>
      </GlassCard>
    </div>
  );
}
