import { useState } from "react";
import { Divider, Form, Input, Select, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { Curriences } from "utils/constants/currencies";
import { useUserBalance } from "utils/context/userBalance";
import { numberPrecision } from "utils/helpers/numberPrecision";

import styles from "./convert.module.scss";

const { Text, Title } = Typography;

export default function Convert({ asset }: any) {
  const { userBalance } = useUserBalance();
  const [convertAsset, setConvertAsset] = useState<string>(Curriences[0].name);
  const [input, setInput] = useState<number>(1);

  const onChangeAsset = (_v: any, option: any) => {
    setConvertAsset(option.value);
  };

  const onChangeInput = (event: any) => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setInput(event.target.value);
    }, 1000);
  };

  return (
    <GlassCard>
      {asset != undefined && (
        <div className={styles.layouts}>
          <Title level={5}>{`${asset.name} Converter`}</Title>
          <Form>
            <Form.Item name="convert">
              <Input
                size="large"
                type="number"
                prefix={
                  <>
                    {asset.abbrev}
                    <Divider type="vertical" />
                  </>
                }
                min={0.001}
                onChange={onChangeInput}
              />
            </Form.Item>
            <Form.Item name="to">
              <Select
                showSearch
                placeholder="Select an Asset"
                optionFilterProp="children"
                defaultActiveFirstOption
                onChange={onChangeAsset}
                size="large"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Curriences.map((value) => {
                  return {
                    value: value.name,
                    label: value.name,
                  };
                })}
              />
            </Form.Item>
          </Form>
          <Title level={4}>{`${input} ${asset.name} = ${
            convertAsset == "ETB"
              ? numberPrecision(
                  input * 55 * (userBalance as any)[asset.name]["price"]
                )
              : numberPrecision(
                  input * (userBalance as any)[asset.name]["price"]
                )
          } ${convertAsset}`}</Title>
        </div>
      )}
    </GlassCard>
  );
}
