"use client";
import { useState, useEffect, useRef } from "react";
import { Switch } from "antd";
import Button from "components/elements/buttons";
import Input from "components/elements/input";
import { notification } from "components/elements/notification";
import { PassphraseTypes } from "./types";
import { Typography } from "antd";

const { Title, Text } = Typography;
import styles from "./importphrase.module.scss";

export default function ImportPassphrase({
  passPhrase,
  setpassPhrase,
  stateChanger,
  setExtraPassphrase,
}: PassphraseTypes): JSX.Element {
  const [copy, setCopie] = useState<boolean>(false);
  const [extraWord, setExtraWord] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const passphraseFetchedRef = useRef<boolean | null>(false);

  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      const c = document.getElementById("input" + i) as HTMLInputElement;
      if (c.value != "") {
        const passphraseArray = c.value.split(" ");
        if (passphraseArray.length == 1) {
          return;
        }
        if (passphraseArray.length != 12) {
          notification({
            message: "Incorrect passphrase",
            messageType: "error",
            description:
              "Make sure to to copy all passphrases separted by only space",
          });
          return;
        }
        setpassPhrase(passphraseArray);
      }
    }
  }, [copy, passPhrase]);

  const handleSumbit = async (event: any) => {
    setButtonLoading(true);
    event.preventDefault();

    if (!event.target) {
      setButtonLoading(false);
      return;
    }
    const extraWordInput = document.getElementById(
      "extraword"
    ) as HTMLInputElement;

    setExtraPassphrase(extraWordInput.value);
    for (let i = 0; i < 12; i++) {
      if (!event.target["input" + i].value) {
        notification({
          message: "Empty field",
          messageType: "error",
          description:
            "Make sure to fill every field or copy all passphrase on one field",
        });
        setButtonLoading(false);
        return;
      }
    }
    setButtonLoading(false);
    stateChanger(2);
  };

  const handelCopy = () => {
    setCopie((prev) => !prev);
  };

  const onChange = (value: string, index: number) => {
    let temp = [];
    for (let i = 0; i < 12; i++) {
      if (i === index) {
        temp[i] = value;
      } else {
        temp[i] = passPhrase[i];
      }
    }
    setpassPhrase(temp);
  };

  const handleSwitch = () => {
    const extraWordInput = document.getElementById(
      "extraword"
    ) as HTMLInputElement;
    if (extraWord) extraWordInput.value = "";
    setExtraWord((prev) => !prev);
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className={styles.layouts}>
        <Title className={styles.title} level={3}>
          Import Wallet
        </Title>
        <Text className={styles.description}>
          {" "}
          Please Enter Your PassPhrase Correctly by Entering One by One or Copy
          it in The First Field!!
        </Text>

        <div className={styles.passphrase}>
          {passPhrase.map((content, index) => {
            return (
              <div className={styles.input} key={index}>
                <Text className={styles.index}>{index + 1 + "."}</Text>
                <div className={styles.wordinputfield} key={index}>
                  <Input
                    value={passPhrase[index]}
                    error={false}
                    inputType={"text"}
                    minLength={2}
                    name={"input" + index}
                    id={"input" + index}
                    onPasteCapture={() => {
                      console.log("called 1");
                      handelCopy();
                    }}
                    onChange={(event) => onChange(event.target.value, index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.extraWord}>
          <div className={styles.extraWordSwitch}>
            <Text className={styles.extraWordLabel}>Add Extra Word</Text>
            <Switch
              onChange={handleSwitch}
              className={styles.switch}
              checked={extraWord}
            />
          </div>
          <div className={styles.extraWordInput}>
            <Input
              id="extraword"
              inputType="text"
              error={false}
              disabled={!extraWord}
            />
          </div>
        </div>
        <Button
          text="Next"
          size="large"
          className={styles.button}
          type="primary"
          htmlType="submit"
          loading={buttonLoading}
        />
      </div>
    </form>
  );
}
