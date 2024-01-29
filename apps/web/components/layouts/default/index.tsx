import { Layout } from "antd";
import { MenuBar } from "components/modules/menu";
import Loading from "components/elements/loading";
import CommonLayout from "components/layouts/common";
import ChooseNewtork from "components/modules/choosenetwork";
import { SettingProvider } from "utils/context/settings";
import { NetworkProvider } from "utils/context/network";
import { UserBalanceProvider } from "utils/context/userBalance";
import { useUser } from "utils/context/user";

import styles from "./layout.module.scss";
const { Content, Footer } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function Default({ children }: Props): JSX.Element {
  const { userLoggedin } = useUser();

  return (
    <SettingProvider>
      <NetworkProvider>
        <UserBalanceProvider>
          <CommonLayout>
            <Layout style={{ minHeight: "100vh" }} className={styles.body}>
              <MenuBar />
              <ChooseNewtork />
              <Layout>
                <Content className={styles.contents}>
                  {userLoggedin ? (
                    <div className={styles.content}>{children}</div>
                  ) : (
                    <Loading />
                  )}
                </Content>

                {/* <Footer style={{ textAlign: 'center' }}>
          Ano ©2023 Created by AnoBlocks
        </Footer> */}
              </Layout>
            </Layout>
          </CommonLayout>
        </UserBalanceProvider>
      </NetworkProvider>
    </SettingProvider>
  );
}
