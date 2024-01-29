"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  CreditCardIcon,
  DesktopIcon,
  DaoIcon,
  HistoryIcon,
  LockIcon,
  LogoutIcon,
  ReceiveIcon,
  SendIcon,
  SettingIcon,
  SwapIcon,
} from "components/elements/icons";
import { lock } from "utils/helpers/userSession";
import { useUser } from "utils/context/user";

import styles from "./menu.module.scss";

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export function MenuBar() {
  const router = useRouter();
  const { setUserLoggedin } = useUser();
  const currentPath = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState(!collapsed);
  const [selected, setSelected] = useState<string>();

  const lockPage = () => {
    lock();
    setUserLoggedin(false);
    router.push("/auth");
  };

  const mainRoutes: MenuItem[] = [
    { type: "divider" },
    getItem(
      "Dashboard",
      "/",
      <Link href="/">
        <DesktopIcon />
      </Link>
    ),
    getItem(
      "Dao",
      "/dao",
      <Link href="/dao">
        <DaoIcon />
      </Link>
    ),
    getItem(
      "Transactions",
      "/transactions",
      <Link href="/transactions">
        <HistoryIcon />
      </Link>
    ),
    { type: "divider" },
    getItem(
      "Send",
      "/send",
      <Link href="/send">
        <SendIcon />
      </Link>
    ),
    getItem(
      "Deposit",
      "/deposit",
      <Link href="/deposit">
        <ReceiveIcon />{" "}
      </Link>
    ),
    getItem(
      "Swap",
      "/swap",
      <Link href="/swap">
        <SwapIcon />
      </Link>
    ),
    getItem(
      "Borrow/Pay",
      "/finance",
      <Link href="/finance">
        <CreditCardIcon />
      </Link>
    ),
    { type: "divider" },
  ];

  const subRoutes: MenuItem[] = [
    { type: "divider" },
    getItem(
      "Setting",
      "1",
      <Link href="/setting">
        <SettingIcon />
      </Link>
    ),
    getItem(
      "Lock",
      "2",
      <Link onClick={lockPage} href="/auth">
        <LockIcon />
      </Link>
    ),
    getItem("Logout", "3", <LogoutIcon />),
    { type: "divider" },
  ];

  useEffect(() => {
    if (collapsed) setTitle(false);
    else {
      setTimeout(() => {
        setTitle(true);
      }, 150);
    }
  }, [collapsed]);

  useEffect(() => {
    if (currentPath) setSelected(currentPath);
  }, [currentPath]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value: boolean) => setCollapsed((prev) => !prev)}
      theme="light"
    >
      <div className={styles.logo}>
        <Image
          className={styles.image}
          alt="logo of ano block"
          src="/icons/logo.svg"
          height={0}
          width={0}
        />
        {title ? (
          <Title level={4} className={styles.title}>
            AnoBlocks{" "}
          </Title>
        ) : null}
      </div>
      <div className={styles.menu}>
        <Menu
          defaultSelectedKeys={["1"]}
          items={mainRoutes}
          theme="light"
          selectedKeys={[currentPath ?? "/"]}
        />
        <Menu items={subRoutes} theme="light" />
      </div>
    </Sider>
  );
}
