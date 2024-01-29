"use client";
import { useEffect, useState } from "react";
import { Form, InputNumber, Typography } from "antd";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { GlassCard } from "components/elements/cards";
import Button from "components/elements/buttons";
import { notification } from "components/elements/notification";
import { useNetwork } from "utils/context/network";
import { useUser } from "utils/context/user";

import styles from "./deposit.module.scss";

const { Title, Text } = Typography;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />
);

export default function Send(): JSX.Element {
  const [form] = Form.useForm();
  const { userInfo } = useUser();
  const { push } = useRouter();

  const { provider, choosenNetwork } = useNetwork();
  const [receiverAddress, setreceiverAddress] = useState<string>();

  useEffect(() => {
    setreceiverAddress(userInfo?.pubad);
  }, [userInfo]);

  const onFinsh = (value: any) => {
    const work = async () => {
      try {
        if (userInfo) {
          var raw = JSON.stringify({
            amount: value.amount,
            address: userInfo?.pubad,
          });
          const response = await fetch("/api/transaction", {
            method: "POST",
            body: raw,
          });
          const body = await response.json();
          if (body.status == "success") {
            push(body.data.checkout_url);
          } else {
            console.log(body);
            notification({
              message: "error",
              messageType: "error",
              description: "Contact developer if these continue happining",
            });
          }
        }
      } catch (err) {
        notification({
          message: "error",
          messageType: "error",
          description: "Contact developer if these continue happining",
        });
      }
    };
    work();
  };

  return (
    <>
      <div className={styles.container}>
        <GlassCard>
          <div className={styles.layout}>
            <Title level={4}>Deposit</Title>
            <Text type="secondary">
              You can transfer your money to our platform using tele birr.
            </Text>
            <div className={styles.l}>
              <Text>Receiver Address</Text>
              <Text type="secondary">
                The transfer will be made to this account.
              </Text>
              <Text type="success">{userInfo?.pubad}</Text>
            </div>
            <Form
              name="send"
              form={form}
              size="large"
              layout="vertical"
              autoComplete="off"
              initialValues={{}}
              onFinish={onFinsh}
            >
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
                <InputNumber min={20} width="222" />
              </Form.Item>
              <Form.Item>
                <Button text="Deposit" type="primary" htmlType="submit" />
              </Form.Item>
            </Form>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
