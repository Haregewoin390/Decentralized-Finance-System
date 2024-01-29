"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "antd";
import Button from "components/elements/buttons";
import Input from "components/elements/input";
import { notification } from "components/elements/notification";
import { useUser } from "utils/context/user";
import { createWallet } from "utils/helpers/createWallet";
import { setUserSession, signUp } from "utils/helpers/userSession";
import { PasswordTypes } from "./types";

import styles from "./password.module.scss";

const { Title, Text } = Typography;

export default function CreatePassword({
  setPassword,
  passphrase,
  extraPassphrase,
}: PasswordTypes): JSX.Element {
  const router = useRouter();
  const [passInputError, setPassError] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const { setUserLoggedin, setUserInfo } = useUser();

  const handleSumbit = async (event: any) => {
    try {
      setButtonLoading(true);
      event.preventDefault();
      if (!event.target) {
        setPassError(false);
        return;
      }
      if (event.target.password.value != event.target.repassword.value) {
        setPassError(true);
        notification({
          message: "password doesn't match",
          messageType: "error",
          description: "make sure your password are the same",
        });
        setButtonLoading(false);

        return;
      }

      setPassword(event.target.password.value);
      const account = await createWallet(passphrase, extraPassphrase);
      const userLogin = signUp(account, event.target.password.value);
      await setUserSession(event.target.password.value);

      setUserInfo(account);
      setUserLoggedin(true);
      setButtonLoading(false);
      router.push("/");
    } catch (err) {
      notification({
        message: "Error",
        description: "InCorrect PassPhrase",
        messageType: "error",
      });

      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.layouts}>
      <Title level={3} className={styles.title}>
        New Password
      </Title>
      <Text type="warning" className={styles.description}>
        {" "}
        Password will insure you wallet safe but It is temporary, If you forget
        your password you can recover using your passphrase!!
      </Text>
      <form onSubmit={handleSumbit}>
        <div className={styles.form}>
          <Input
            label="Password"
            inputType="password"
            autoComplete="off"
            error={passInputError}
            id="password"
            name="password"
            required
            minLength={5}
          />
          <Input
            label="Retype Password"
            inputType="password"
            autoComplete="off"
            error={passInputError}
            id="repassword"
            name="repassword"
            required
            minLength={5}
          />
          <Button
            className={styles.button}
            text="Finsh"
            type="primary"
            htmlType="submit"
            loading={buttonLoading}
          />
        </div>
      </form>
    </div>
  );
}
