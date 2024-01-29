"use client";
import { useState } from "react";
import { Form, InputNumber, Result, Typography } from "antd";
import Button from "components/elements/buttons";

import styles from "./payLoan.module.scss";

const { Text, Title } = Typography;

export function PayLoan() {
  const [form] = Form.useForm();
  const [loan, setLoan] = useState<boolean>(false);

  const onSumbit = () => {};

  return loan ? (
    <Form
      name="getLoan"
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onSumbit}
    >
      <div className={styles.options}>
        <Title level={5}>Info</Title>
        <Text type="warning">
          {" "}
          Your loan balance is ETB 100 with interest rate of 3.4% for due date
          34/12/2015{" "}
        </Text>
      </div>
      <div className={styles.options}>
        <Title level={5}>Amount</Title>

        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: `Please Input Amount!`,
            },
          ]}
        >
          <InputNumber min={100} width="222" />
        </Form.Item>
      </div>

      <div className={styles.options}>
        <Form.Item>
          <Button
            className={styles.button}
            text="Pay Loan"
            type="primary"
            htmlType="submit"
          />
        </Form.Item>
      </div>
    </Form>
  ) : (
    <div>
      <Result
        status="success"
        title={<Title>Your records are clear </Title>}
        extra={<Text>Keep it up!!</Text>}
      />
    </div>
  );
}
