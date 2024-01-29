"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { Typography } from "antd";
import Button from "components/elements/buttons";
import { GlassCard } from "components/elements/cards";
import { IntroductionData } from "utils/constants/introdcationData";

import styles from "./introduction.module.scss";

const { Title, Text } = Typography;

export default function Introduction(): JSX.Element {
  const [step, setStep] = useState<number>(0);
  const [loadingButton1, setLoadingButton1] = useState<boolean>(false);
  const [loadingButton2, setLoadingButton2] = useState<boolean>(false);

  const lengthOfIntroData = IntroductionData.length;
  const router = useRouter();

  useEffect(() => {
    const steps = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % lengthOfIntroData);
    }, 4000);
    return () => clearInterval(steps);
  }, [lengthOfIntroData]);

  return (
    <div className={styles.container}>
      <GlassCard>
        <div className={styles.layouts}>
          <Title className={styles.title} level={2}>
            {IntroductionData[step].title}
          </Title>
          <NextImage
            className={styles.image}
            src={IntroductionData[step].image}
            alt={IntroductionData[step].title}
            width={150}
            height={200}
          />
          <Text className={styles.description}>
            {IntroductionData[step].description}
          </Text>
          <div className={styles.progress}>
            {IntroductionData.map((_, index) => {
              return (
                <div
                  className={step == index ? styles.step : styles.circle}
                  key={index}
                ></div>
              );
            })}
          </div>
          <div className={styles.button}>
            <Button
              text="Create Wallet"
              type="primary"
              onClick={() => {
                setLoadingButton1(true);
                router.push("/new");
                setLoadingButton1(false);
              }}
              size="large"
              loading={loadingButton1}
            />
            <Button
              text="I have Wallet"
              onClick={() => {
                setLoadingButton2(true);
                router.push("/import");
                setLoadingButton2(false);
              }}
              size="large"
              loading={loadingButton2}
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
