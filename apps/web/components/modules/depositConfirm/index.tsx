import Link from "next/link";
import { Result, Typography } from "antd";
import Button from "components/elements/buttons";
import { useUser } from "utils/context/user";

import styles from "./depositConfirm.module.scss";

const { Title, Text } = Typography;

export default function SendConfirm(): JSX.Element {
  const { userInfo } = useUser();

  return (
    <div className={styles.container}>
      <Result
        status="success"
        title="Successfully Deposit a fund to your account"
        subTitle={
          <>
            <Text strong>
              A fund will be add to your account shortly to this address
              {userInfo?.pubad}
            </Text>
            <br />
            <Text strong>
              If the fund is not added to your account in 5 minutes please
              contact support!!
            </Text>
          </>
        }
        extra={[
          <Link href="/transactions">
            <Button type="primary" key="home" text="Go to Transaction" />,
          </Link>,
          <Link href="/">
            <Button key="transaction" text="Go to Dashboard" />
          </Link>,
        ]}
      />
    </div>
  );
}
