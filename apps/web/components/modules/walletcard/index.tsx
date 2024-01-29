"use client";
import { useState } from "react";
import { Divider, Typography } from "antd";
import { CopyIcon, QrIcon } from "components/elements/icons";
import { GlassCard } from "components/elements/cards";
import QrAddress from "components/modules/qrAddress";
import { notification } from "components/elements/notification";
import { useUser } from "utils/context/user";
import { shortenText } from "utils/helpers/shortText";
import { copyToClipBoard } from "utils/helpers/copytext";
import { useUserBalance } from "utils/context/userBalance";
import { useSetting } from "utils/context/settings";
import { birr, usd } from "utils/helpers/formatCurrency";

import styles from "./walletcard.module.scss";

const { Title, Text } = Typography;

export default function Wallet(): JSX.Element {
  const { userInfo } = useUser();
  const { userBalance } = useUserBalance();
  const { userSetting, setUserSetting } = useSetting();

  const [qrOpen, setQrOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setQrOpen(false);
  };

  const handelCopy = () => {
    const response = copyToClipBoard(userInfo?.pubad ?? "");
    notification({
      messageType: "success",
      message: "Copied!",
      description: "You Copied the address",
    });
  };

  return (
    <>
      <GlassCard>
        <div className={styles.layout}>
          <Title className={styles.title} level={5} type="secondary">
            Total portfolio value
          </Title>
          <div className={styles.balance}>
            <Text className={styles.amount}>
              {userSetting.currencyConversion == "ETB"
                ? birr(userBalance.TotalInBirr)
                : usd(userBalance.TotalInUsd)}
            </Text>
            <Text type="secondary">
              {userSetting.currencyConversion != "ETB"
                ? `   ETB ${userBalance.TotalInBirr.toPrecision(4)}`
                : `   USD ${userBalance.TotalInUsd}`}
            </Text>
          </div>
          <Divider />

          <div className={(styles.column, styles.walletaddress)}>
            <Title level={5} type="secondary">
              Main account
            </Title>
            <div className={styles.walletinfo}>
              <Title level={4}>{shortenText(userInfo?.pubad)}</Title>
              <div className={styles.icons}>
                <CopyIcon
                  className={styles.icon}
                  style={{ fontSize: "170%" }}
                  onClick={handelCopy}
                />
                <QrIcon
                  className={styles.icon}
                  style={{ fontSize: "170%" }}
                  onClick={() => setQrOpen(!qrOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      <QrAddress
        address={userInfo?.pubad ?? ""}
        open={qrOpen}
        onCancel={handleCancel}
      />
    </>
  );
}
