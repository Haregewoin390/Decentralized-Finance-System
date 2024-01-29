"use client";
import { Layout, Typography } from "antd";
import Image from "next/image";
import CommonLayout from "components/layouts/common";

import styles from "./welcome.module.scss";

const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

export default function Welcome({ children }: Props): JSX.Element {
  return (
    <CommonLayout>
      <Layout className={styles.welcome}>
        <div className={styles.logo}>
          <Image
            className={styles.image}
            alt="logo of ano block"
            src="/icons/logo.svg"
            height={0}
            width={0}
          />
        </div>
        <Title className={styles.title} level={1}>
          Welcome to Anoblocks
        </Title>
        <div className={styles.content}>{children}</div>
      </Layout>
    </CommonLayout>
  );
}
