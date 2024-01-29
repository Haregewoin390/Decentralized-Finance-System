"use client";
import { useEffect, useState } from "react";
import { InputNumber, Typography, Upload, UploadProps, message } from "antd";
import { RcFile } from "antd/lib/upload";
import { UploadOutlined } from "@ant-design/icons";
import Button from "components/elements/buttons";
import { notification } from "components/elements/notification";
import { useSetting } from "utils/context/settings";
import { SettingProps } from "utils/types/settingTypes";
import { exportSettingsToFile } from "utils/helpers/sync";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "utils/helpers/localStorage";

import styles from "./advancedSetting.module.scss";
import Item from "antd/es/list/Item";

const { Text, Title } = Typography;

export function AdvancedSetting() {
  const { userSetting, setUserSetting } = useSetting();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    const settings = getItemFromLocalStorage("setting", true);
    setUserSetting(settings);
  }, []);

  const onChangeAutoLock = (value: number | null) => {
    if (value == null) value = 3;
    const settings: SettingProps = {
      lockerTimer: value,
    };
    setUserSetting({ ...userSetting, ...settings });
  };

  const saveSetting = () => {
    try {
      if (file) {
        if (file.contacts && file.contacts.length > 0) {
          const prev = getItemFromLocalStorage("contacts", true);
          const arry = Object.values(prev);
          const array = [...arry, ...file.contacts];

          const combined = Array.from(
            new Set(array.map((items) => items.address))
          ).map((address, index) => {
            const temp = array.find((item) => item.address === address);
            return {
              key: index.toString(),
              name: temp.name,
              address: temp.address,
            };
          });

          setItemInLocalStorage("contacts", combined, true);
        }
        if (file.sendHistory && file.sendHistory.length > 0) {
          const prev = getItemFromLocalStorage("send", true);
          const arry = Object.values(prev);
          const array = [...arry, ...file.sendHistory];
          const combined = Array.from(
            new Set(array.map((items) => items.transactionHash))
          ).map((hash) => {
            return array.find((item) => item.transactionHash === hash);
          });
          setItemInLocalStorage("send", combined, true);
        }
      }

      if (file && file.settings) {
        setItemInLocalStorage("settings", file.settings, true);
      } else {
        setItemInLocalStorage("settings", userSetting, true);
      }

      notification({
        message: "Setting Saved",
        description: "Setting Saved Successfully",
        messageType: "success",
      });
    } catch (err) {
      console.log(err);
      console.log("ERR");
    }
  };

  const exportSetting = () => {
    const response = exportSettingsToFile();
    if (response) {
      notification({
        message: "Succesfully Backed Your data",
        messageType: "success",
        description:
          "You Data is downloading you can find it in your browser download manager",
      });
    } else {
      notification({
        message: "Unexpected Error Occured",
        messageType: "error",
        description: "If these keep happining contact support",
      });
    }
  };

  const fileUpload = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const json = JSON.parse(e.target.result);
      setFile(json);
    };
    reader.readAsText(file);

    return false;
  };

  return (
    <div>
      <div className={styles.options}>
        <Title level={5}> Auto-locker timer(minutes)</Title>
        <Text type="secondary">
          Set the idle time in minutes before AnoBlock will become locked.
        </Text>
        <InputNumber
          min={3}
          max={60}
          onChange={onChangeAutoLock}
          value={userSetting.lockerTimer}
        />
      </div>
      <div className={styles.options}>
        <Title level={5}>Backup Your data</Title>
        <Text type="secondary">
          You can backup user settings containing preferences and account
          addresses into a JSON file
        </Text>
        <Button
          className={styles.button}
          text="Backup"
          onClick={exportSetting}
        />
      </div>
      <div className={styles.options}>
        {" "}
        <Title level={5}>Restore user data</Title>
        <Text type="secondary">
          You can restore user settings containing preferences and account
          addresses from a previously backed up JSON file
        </Text>
        <Upload
          maxCount={1}
          accept="application/JSON"
          beforeUpload={fileUpload}
        >
          <Button
            className={styles.button}
            icon={<UploadOutlined />}
            text="Restore"
          />
        </Upload>
      </div>
      <div className={styles.options}>
        <Button
          className={styles.button}
          text="Confirm Change"
          type="primary"
          onClick={saveSetting}
        />
      </div>
    </div>
  );
}
