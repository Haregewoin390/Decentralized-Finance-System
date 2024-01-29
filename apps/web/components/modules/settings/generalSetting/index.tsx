import { useEffect } from "react";
import { Form, Radio, Select, Switch, Typography } from "antd";
import Button from "components/elements/buttons";
import { notification } from "components/elements/notification";
import { Curriences } from "utils/constants/currencies";
import { useSetting } from "utils/context/settings";
import { SettingProps } from "utils/types/settingTypes";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "utils/helpers/localStorage";

import styles from "./generalSetting.module.scss";

const { Text, Title } = Typography;

export function GeneralSetting() {
  const [form] = Form.useForm();
  const { userSetting, setUserSetting } = useSetting();

  const primaryCurrencyOptions = ["Matic", "Fiat"];

  const saveSetting = (value: any) => {
    const newSetting: SettingProps = {
      currencyConversion: value["currency conversion"] ?? "ETB",
      primaryCurrency: value["primary currency"] ?? "Fiat",
      hideAssets: value["hide asset"] ?? false,
    };

    setUserSetting({ ...userSetting, ...newSetting });
    setItemInLocalStorage("settings", userSetting, true);
    notification({
      message: "Setting Saved",
      description: "Setting Saved Successfully",
      messageType: "success",
    });
  };

  useEffect(() => {
    const settings = getItemFromLocalStorage("settings", true);
    form.setFieldsValue({
      "currency conversion": settings.currencyConversion ?? "ETB",
      "primary currency": settings.primaryCurrency ?? "Fiat",
      "hide asset": settings.hideAssets ?? false,
    });

    setUserSetting({ ...settings, ...userSetting });
  }, []);

  return (
    <Form
      name="general-setting"
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={saveSetting}
    >
      <div className={styles.options}>
        <Title level={5}>Currency conversion</Title>
        <Form.Item name="currency conversion">
          <Select
            className={styles.currencies}
            showSearch
            placeholder="Select currencys"
            optionFilterProp="children"
            defaultActiveFirstOption
            value={userSetting.currencyConversion}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Curriences.map((value) => {
              return {
                value: value.name,
                label: value.name,
              };
            })}
          />
        </Form.Item>
      </div>

      <div className={styles.options}>
        <Title level={5}>Primary currency</Title>
        <Text type="secondary">
          Select native to prioritize displaying values in the native currency
          of the chain (e.g. ETH). Select Fiat to prioritize displaying values
          in your selected fiat currency.
        </Text>
        <Form.Item name="primary currency">
          <Radio.Group options={primaryCurrencyOptions} optionType="button" />
        </Form.Item>
      </div>

      <div className={styles.options}>
        <Title level={5}>Hide assets without balance</Title>
        <Text strong>{userSetting.hideAssets ? "Hide" : "Show"}</Text>
        <span>
          <Form.Item name="hide asset">
            <Switch />
          </Form.Item>
        </span>
      </div>
      <div className={styles.options}>
        <Form.Item>
          <Button
            className={styles.button}
            text="Confirm Change"
            type="primary"
            htmlType="submit"
          />
        </Form.Item>
      </div>
    </Form>
  );
}
