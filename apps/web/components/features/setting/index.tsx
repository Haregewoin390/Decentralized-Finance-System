"use client";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Default from "components/layouts/default";
import { GlassCard } from "components/elements/cards";
import {
  GeneralSetting,
  AdvancedSetting,
  ContactSetting,
} from "components/modules/settings";

import styles from "./setting.module.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `General`,
    children: <GeneralSetting />,
  },
  {
    key: "2",
    label: `Advanced`,
    children: <AdvancedSetting />,
  },
  {
    key: "3",
    label: `Contacts`,
    children: <ContactSetting />,
  },
];
export default function Setting(): JSX.Element {
  return (
    <Default>
      <div className={styles.layout}>
        <GlassCard>
          <Tabs defaultActiveKey="1" items={items} />{" "}
        </GlassCard>
      </div>
    </Default>
  );
}
