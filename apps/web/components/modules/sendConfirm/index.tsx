import { useEffect, useState } from "react";
import Link from "next/link";
import { Divider, Result, Typography } from "antd";
import { BigNumberish, TransactionResponse, formatUnits } from "ethers";
import moment from "moment";
import Button from "components/elements/buttons";
import { notification } from "components/elements/notification";
import Modal from "components/elements/modal";
import { useSetting } from "utils/context/settings";
import { useNetwork } from "utils/context/network";
import { useUser } from "utils/context/user";
import { numberPrecision } from "utils/helpers/numberPrecision";
import {
  getGasPrice,
  sendContractToken,
  sendToken,
} from "utils/helpers/transaction";
import { prices } from "utils/helpers/assets";
import {
  SendHistoryProps,
  saveSendHistory,
} from "utils/helpers/transactionHistory";
import { SendConfirmProps } from "./type";

import styles from "./sendConfirm.module.scss";

const { Title, Text } = Typography;

export default function SendConfirm({
  address,
  asset,
  amount,
  open,
  onCancel,
}: SendConfirmProps): JSX.Element {
  const { provider, choosenNetwork } = useNetwork();
  const { userSetting } = useSetting();
  const { userInfo } = useUser();
  const [gasPrice, setGasPrice] = useState(0);
  const [price, setPrice] = useState<any>();
  const [buttonLoading, setButtonloading] = useState<boolean>(false);
  const [transactionState, setTransactionState] = useState<
    "ongoing" | "error" | "success"
  >("ongoing");
  const [transactionHash, setTransactionHash] = useState<string>("");

  const verifyTx = () => {
    const work = async () => {
      setButtonloading(true);
      try {
        if (provider && userInfo) {
          if (choosenNetwork.currency == asset.name) {
            const result = await sendToken(
              provider,
              amount,
              userInfo.priv,
              userInfo?.pubad,
              address
            );
            if (result.result && result)
              console.log((result.data as TransactionResponse).hash);
            setTransactionHash((result.data as TransactionResponse).hash);
          } else {
            const result = await sendContractToken(
              provider,
              amount,
              userInfo.priv,
              address,
              asset,
              choosenNetwork
            );
            if (result.result && result) {
              console.log(moment().format("D MMM, YYYY"));
              const transactionHistory: SendHistoryProps = {
                amount: amount,
                recieverAddress: address,
                transactionHash: (result.data as TransactionResponse).hash,
                network: choosenNetwork.name,
                asset: asset.name,
                date: moment().format("D MMM, YYYY"),
              };
              saveSendHistory(transactionHistory);
            }
            setTransactionHash((result.data as TransactionResponse).hash);
          }
        }
        setTransactionState("success");
      } catch (err) {
        setTransactionState("error");
        notification({
          message: "error occured",
          messageType: "error",
          description: err as string,
        });
      } finally {
        setButtonloading(false);
      }
    };

    work();
  };

  const onAnotherTransaction = () => {
    setTransactionState("ongoing");
    onCancel();
  };

  useEffect(() => {
    const work = async () => {
      if (provider) {
        const gas = await getGasPrice(provider);
        const priceResponse = await prices();
        setPrice(priceResponse);
        formatUnits(gas.gasPrice as BigNumberish, "ether");
        const gasInEther = Number(
          Number(formatUnits(gas.gasPrice as BigNumberish, "ether")).toFixed(20)
        );
        setGasPrice(gasInEther);
      }
    };
    work();
  }, [provider]);

  return (
    <Modal
      open={open}
      centered={true}
      closable={false}
      onCancel={onCancel}
      maskClosable={false}
    >
      {transactionState == "ongoing" ? (
        <div className={styles.container}>
          <Title className={styles.title} level={4}>
            Confirm Sending test
          </Title>

          <span>
            <Text type="secondary">Sending</Text>
            <Text strong type="success">
              {" " + asset.name + " "}
            </Text>
            <Text type="secondary">to</Text>
            <Text strong type="success">
              {" " + address}
            </Text>
          </span>
          <Divider />
          <div className={styles.flexRow}>
            <Text type="secondary">Amount to send</Text>
            <div className={styles.flexColumn}>
              <span>
                <Text
                  className={styles.primaryCurrency}
                  strong
                >{`${amount} `}</Text>
                <Text>{asset.name}</Text>
              </span>

              {userSetting && (
                <span>
                  <Text className={styles.secondryCurrency} type="secondary">
                    {price &&
                      (userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(
                            price[asset.name].price * 55 * amount
                          )}`
                        : `${price[asset.name].price * amount}`)}
                  </Text>
                  <Text type="secondary">
                    {userSetting.currencyConversion == "ETB" ? ` ETB` : ` USD`}
                  </Text>
                </span>
              )}
            </div>
          </div>
          <Divider />
          <div className={styles.flexRow}>
            <Text type="secondary">Gas price + Transaction fee</Text>
            <div className={styles.flexColumn}>
              <span>
                <Text
                  className={styles.primaryCurrency}
                  strong
                >{`${gasPrice} `}</Text>
                <Text>{asset.name}</Text>
              </span>

              {userSetting && (
                <span>
                  <Text className={styles.secondryCurrency} type="secondary">
                    {price &&
                      (userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(
                            price[asset.name].price * 55 * gasPrice
                          )}`
                        : `${numberPrecision(
                            price[asset.name].price * gasPrice
                          )}`)}
                  </Text>
                  <Text type="secondary">
                    {userSetting.currencyConversion == "ETB" ? ` ETB` : ` USD`}
                  </Text>
                </span>
              )}
            </div>
          </div>
          <Divider />
          <div className={styles.flexRow}>
            <Text type="secondary">Total Amount + Transaction fee</Text>
            <div className={styles.flexColumn}>
              <span>
                <Text className={styles.primaryCurrency} strong>{`${
                  amount + gasPrice
                } `}</Text>
                <Text>{asset.name}</Text>
              </span>

              {userSetting && (
                <span>
                  <Text className={styles.secondryCurrency} type="secondary">
                    {price &&
                      (userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(
                            price[asset.name].price * 55 * (amount + gasPrice)
                          )}`
                        : `${price[asset.name].price * (amount + gasPrice)}`)}
                  </Text>
                  <Text type="secondary">
                    {userSetting.currencyConversion == "ETB" ? ` ETB` : ` USD`}
                  </Text>
                </span>
              )}
            </div>
          </div>
          <Divider />
          <div className={styles.flexRow}>
            <div className={styles.button}>
              <Button
                text="Reject"
                size="large"
                block
                onClick={onCancel}
                disabled={buttonLoading}
              />
            </div>
            <div className={styles.button}>
              <Button
                text="Confirm"
                type="primary"
                size="large"
                block
                onClick={verifyTx}
                loading={buttonLoading}
              />
            </div>
          </div>
        </div>
      ) : transactionState == "success" ? (
        <Result
          status="success"
          title="Successfully Sent "
          subTitle={`${amount} ${asset.name} sent to ${address} transaction hash ${transactionHash}`}
          extra={[
            <Link href="/">
              <Button type="primary" key="home" text="Go to dashbord" />
            </Link>,
            <Link href="/transactions">
              <Button type="primary" key="home" text="Go to transaction" />
            </Link>,

            // <Button
            //   key="transaction"
            //   text="Another transaction"
            //   onClick={onAnotherTransaction}
            // />,
          ]}
        />
      ) : (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Link href="/">
              <Button
                type="primary"
                key="console"
                text="Go Dashbord
          "
              />
            </Link>
          }
        />
      )}
    </Modal>
  );
}
