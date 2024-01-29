import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Default from "components/layouts/default";
import Convert from "components/modules/convert";
import CurrencyInfo from "components/modules/currencyInfo";
import CurrencyStatistics from "components/modules/currencyStatistics";
import { AssetProps, Assets } from "utils/constants/assets";

import styles from "./currencyInfo.module.scss";

export default function CurrencyInfoPage({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [asset, setAsset] = useState<AssetProps>();

  useEffect(() => {
    Assets.forEach((item) => {
      if (item.name.toLocaleLowerCase() == params.slug.toLocaleLowerCase()) {
        setAsset(item);
      }
    });
  }, []);

  return (
    <Default>
      <div className={styles.container}>
        <Row
          gutter={[
            { xs: 15, sm: 4, md: 4, lg: 20 },
            { xs: 15, sm: 4, md: 4, lg: 20 },
          ]}
        >
          <Col md={12} xs={24} lg={16} span={16}>
            {" "}
            <CurrencyInfo asset={asset} />
          </Col>
          <Col md={12} xs={24} lg={6} span={18}>
            {" "}
            <Convert asset={asset} />
            <CurrencyStatistics asset={asset} />{" "}
          </Col>
        </Row>
      </div>
    </Default>
  );
}
