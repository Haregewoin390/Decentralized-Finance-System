import { Form, InputNumber, Radio, Select, Switch, Typography } from "antd";
import Button from "components/elements/buttons";
import { getLoan } from "utils/helpers/loan";
import { useUser } from "utils/context/user";
import { useNetwork } from "utils/context/network";

import styles from "./getLoan.module.scss";
import { notification } from "components/elements/notification";

const { Text, Title } = Typography;

export function GetLoan() {
  const { userInfo } = useUser();
  const { provider, choosenNetwork } = useNetwork();

  const [form] = Form.useForm();

  const returnDateOptions = ["30 days", "60 days", "90 days"];

  const onSumbit = (value: any) => {
    const work = async () => {
      let returnDay: 30 | 60 | 90;
      if (value.date == "30 days") returnDay = 30;
      else if (value.date == "60 days") returnDay = 60;
      else returnDay = 90;
      if (provider && userInfo) {
        const res = await getLoan(
          value.amount,
          returnDay,
          provider,
          userInfo?.priv,
          choosenNetwork.name as "Polygon" | "Mumbai" | "Local"
        );
        if (res) {
          notification({
            message: "success",
            description: "loan is approved and send to your account",
            messageType: "success",
          });
        } else {
          notification({
            message: "error occured",
            description: "you have unpaid loan!",
            messageType: "error",
          });
        }
      }
    };

    work();
  };

  return (
    <Form
      name="getLoan"
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onSumbit}
    >
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
        <Title level={5}>Return Date</Title>
        <Text type="secondary">
          Select Your return data, Interset rate are different for different
          return dates.
        </Text>
        <Form.Item name="date" required>
          <Radio.Group
            options={returnDateOptions}
            optionType="button"
            defaultValue={"30 days"}
          />
        </Form.Item>
      </div>

      <div className={styles.options}>
        <Form.Item>
          <Button
            className={styles.button}
            text="Request Loan"
            type="primary"
            htmlType="submit"
          />
        </Form.Item>
      </div>
    </Form>
  );
}
