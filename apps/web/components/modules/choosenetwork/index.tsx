import { Menu, MenuProps } from "antd";
import { useNetwork } from "utils/context/network";

import styles from "./chooseNetwork.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

export default function ChooseNetwork(): JSX.Element {
  const { addNetwork, networks, changeNetwork, choosenNetwork } = useNetwork();

  const onClick: MenuProps["onClick"] = (e) => {
    changeNetwork(networks[e.key]);
  };

  const menu: MenuItem[] = Object.keys(networks).map((network) => {
    return { key: network, label: network };
  });

  const menuItems: MenuItem[] = [
    { label: `Network: ${choosenNetwork.name}`, key: "sub", children: menu },
  ];

  return (
    <div className={styles.container}>
      <Menu
        onClick={onClick}
        style={{ width: 180, borderRadius: 10 }}
        defaultSelectedKeys={[choosenNetwork.name]}
        mode="inline"
        items={menuItems}
        title={"Networks"}
      />
    </div>
  );
}
