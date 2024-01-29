"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "antd";
import Button from "components/elements/buttons";
import { notification } from "components/elements/notification";
import { chooseRandomPasspharse } from "utils/helpers/chooseRandomPassPharse";
import { RandomPassphraseType, ConfirmPasspraseProps } from "./types";

import styles from "./confirmPassphrase.module.scss";

const { Title, Text } = Typography;

export default function ConfirmPassphrase({
  passphrase,
  stateChanger,
}: ConfirmPasspraseProps): JSX.Element {
  const router = useRouter();
  const [randomPassphrase, setRandomPassphrase] =
    useState<RandomPassphraseType>();
  const [passphraseCoosen, setPassphraseCoosen] = useState<boolean[]>(
    Array(4).fill(true)
  );
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    const chooseRandomPass = chooseRandomPasspharse();
    if (chooseRandomPass) setRandomPassphrase(chooseRandomPass);
  }, []);

  const handleSumbit = async (event: any) => {
    setButtonLoading(true);
    event.preventDefault();

    if (!event.target) {
      return;
    }
    let correctChoosen = Array(4).fill(false);
    let allWordSelected = true;
    for (let i = 0; i <= 3; i++) {
      const choosenWord = "input" + i;
      if (!event.target[choosenWord].value) {
        allWordSelected = false;
        break;
      }
      if (
        randomPassphrase &&
        event.target[choosenWord].value ==
          passphrase[randomPassphrase?.postion[i]]
      ) {
        correctChoosen[i] = true;
      }
    }
    if (!allWordSelected)
      notification({
        message: "Choose all words",
        description: "Choose all words with the correct sequence",
        messageType: "warning",
      });
    else if (correctChoosen.includes(false))
      setPassphraseCoosen(correctChoosen);
    else {
      stateChanger(3);
    }
    setButtonLoading(false);
  };

  return (
    <div className={styles.layouts}>
      <Title className={styles.title} level={3}>
        Confirm PassPhrase
      </Title>
      <Text type="warning" className={styles.description}>
        {" "}
        Correctly Enter Your PassPhrase in Order!!
      </Text>
      <form onSubmit={handleSumbit}>
        {randomPassphrase?.choosenWords.map((items, index) => {
          return (
            <div className={styles.passphraseChoice} key={index}>
              <div className={styles.passphraseNumber}>
                <h2 className={styles.passphraseNo}>
                  {randomPassphrase.postion[index] + 1}
                </h2>
                <Text>word</Text>
              </div>

              <div className={styles.row}>
                {items.map((subitems, subindex) => {
                  return (
                    <div className={styles.oneitem} key={index + subindex}>
                      <input
                        className={styles.input}
                        type="radio"
                        name={index.toString()}
                        id={"input" + index.toString()}
                        alt={passphrase[subitems]}
                        value={passphrase[subitems]}
                      />
                      <label
                        className={
                          passphraseCoosen[index] ? styles.labels : styles.error
                        }
                        htmlFor={(index + subindex).toString()}
                      >
                        {passphrase[subitems]}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Button
          className={styles.button}
          text="Next"
          type="primary"
          htmlType="submit"
          loading={buttonLoading}
        />
      </form>
    </div>
  );
}
