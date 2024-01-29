"use client";
import { useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { Form, Input, InputNumber, Select, Spin, Typography } from "antd";
import {
  CheckCircleTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import { GlassCard } from "components/elements/cards";
import Button from "components/elements/buttons";
import SendConfirm from "components/modules/sendConfirm";
import { AssetProps, Assets } from "utils/constants/assets";
import { useNetwork } from "utils/context/network";
import { useUserBalance } from "utils/context/userBalance";

import styles from "./send.module.scss";

const { Title } = Typography;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />
);

export default function Send(): JSX.Element {
  const [form] = Form.useForm();
  const { userBalance } = useUserBalance();
  const [assetIcon, setAssetIcon] = useState<string>("");
  const [isAddress, setIsAddress] = useState<
    "notAddress" | "searching" | "address" | null
  >(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetProps>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  const onChangeAsset = (_v: any, option: any) => {
    setAssetIcon(option.icon);
    setSelectedAsset(option.asset);
    form.setFieldsValue({
      amount: undefined,
    });
  };

  const onChangeAddress = (event: any) => {
    let timer;
    clearTimeout(timer);
    setIsAddress("searching");
    timer = setTimeout(() => {
      //"0x8ba1f109551bd432803012645ac136ddd64dba72"
      setIsAddress(
        ethers.isAddress(event.target.value) ? "address" : "notAddress"
      );
    }, 5000);
  };

  const setMaxiumum = () => {
    if (selectedAsset)
      form.setFieldsValue({
        amount: userBalance[selectedAsset.name]["total"],
      });
  };

  return (
    <>
      {form.getFieldValue("asset") && selectedAsset && (
        <SendConfirm
          open={confirmOpen}
          onCancel={handleCancel}
          address={form.getFieldValue("receiveraddress")}
          asset={selectedAsset}
          amount={form.getFieldValue("amount")}
        />
      )}
      <div className={styles.container}>
        <GlassCard>
          <div className={styles.layout}>
            <Title level={4}>Send</Title>
            <Form
              name="send"
              form={form}
              size="large"
              layout="vertical"
              autoComplete="off"
              onFinish={() => {
                setConfirmOpen(true);
              }}
            >
              <Form.Item
                label="Receiver Address"
                name="receiveraddress"
                rules={[
                  {
                    required: true,
                    message: `Please Input Receiver!`,
                  },
                  {
                    message: "invalid address",
                    validator: (_, value) => {
                      if (ethers.isAddress(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("invalid address");
                      }
                    },
                  },
                ]}
              >
                <Input
                  onChange={onChangeAddress}
                  autoCorrect="false"
                  spellCheck={false}
                  suffix={
                    isAddress == "searching" ? (
                      <Spin indicator={antIcon} />
                    ) : isAddress == "address" ? (
                      <CheckCircleTwoTone rev={undefined} />
                    ) : (
                      <WarningTwoTone twoToneColor="#eb2f96" rev={undefined} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                label="Asset"
                name="asset"
                rules={[
                  {
                    required: true,
                    message: `Please Select Asset!`,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select an Asset"
                  optionFilterProp="children"
                  defaultActiveFirstOption
                  suffixIcon={
                    assetIcon == "" ? null : (
                      <Image
                        src={assetIcon}
                        alt={assetIcon}
                        width={28}
                        height={28}
                      />
                    )
                  }
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
                      asset: value,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: `Please Input Amount!`,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={
                    selectedAsset && userBalance[selectedAsset.name]["total"]
                  }
                  addonAfter={
                    selectedAsset != undefined && (
                      <Button
                        text={`max ${userBalance[selectedAsset.name]["total"]}`}
                        type="text"
                        onClick={setMaxiumum}
                      />
                    )
                  }
                  width="222"
                />
              </Form.Item>
              <Form.Item>
                <Button text="Send" type="primary" htmlType="submit" />
              </Form.Item>
            </Form>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
