"use client";
import { App } from "antd";
import ThemeToggle from "components/elements/themeToggle";
import { Theme } from "utils/context/antdTheme";

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout({ children }: Props): JSX.Element {
  return (
    <Theme>
      <App>
        <ThemeToggle />
        {children}
      </App>
    </Theme>
  );
}
