import { useEffect, useState } from "react";
import { Divider, Form, Input, Select, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import { assetInfo } from "utils/helpers/assets";
import { useSetting } from "utils/context/settings";
import { numberPrecision } from "utils/helpers/numberPrecision";

import styles from "./currencyStatistics.module.scss";

const { Text, Title } = Typography;

export default function CurrencyStatistics({ asset }: any) {
  const [data, setData] = useState<any>();
  const { userSetting } = useSetting();

  useEffect(() => {
    const work = async () => {
      if (asset) {
        try {
          const response = await assetInfo(asset.coingeckoId);
          setData(response);
        } catch (err) {
          console.log(err);
        }
      }
    };
    work();
  }, [asset]);

  return (
    <div className={styles.container}>
      <GlassCard>
        {data && (
          <>
            {" "}
            {asset && (
              <div className={"layouts"}>
                <Title level={5}>{`${asset.name} Price Statistics`}</Title>
                <div className={styles.info}>
                  <Text type="secondary">{`price`}</Text>{" "}
                  <span>
                    <Text type="secondary">
                      {`${userSetting.currencyConversion} `}
                    </Text>
                    <Text strong>
                      {userSetting.currencyConversion == "ETB"
                        ? numberPrecision(data.price * 55)
                        : numberPrecision(data.price)}
                    </Text>
                  </span>
                </div>
                <Divider />
                <div className={styles.info}>
                  <Text type="secondary">{`24h Low / 24h High`}</Text>{" "}
                  <span>
                    <Text type="secondary">
                      {`${userSetting.currencyConversion} `}
                    </Text>
                    <Text strong>
                      {userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(
                            data.low24 * 55
                          )} / ${numberPrecision(data.high24 * 55)}`
                        : `${numberPrecision(data.low24)} / ${numberPrecision(
                            data.high24
                          )}`}
                    </Text>
                  </span>
                </div>
                <Divider />
                {/* <div className={styles.info}>
                  <Text type="secondary">{`7d Low / 7d High`}</Text>{" "}
                  <Text strong>{`$0.81 / $0.90`}</Text>
                </div>
                <Divider /> */}
                <div className={styles.info}>
                  <Text type="secondary">{`Trading Volume`}</Text>{" "}
                  <span>
                    <Text type="secondary">
                      {`${userSetting.currencyConversion} `}
                    </Text>
                    <Text strong>
                      {userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(data.volume * 55)}`
                        : `${data.volume}`}
                    </Text>
                  </span>
                </div>
                <Divider />
                <div className={styles.info}>
                  <Text type="secondary">{`Market Cap`}</Text>{" "}
                  <span>
                    <Text type="secondary">
                      {`${userSetting.currencyConversion} `}
                    </Text>
                    <Text strong>
                      {userSetting.currencyConversion == "ETB"
                        ? `${numberPrecision(data.marketCap * 55)}`
                        : `${data.marketCap}`}
                    </Text>
                  </span>
                </div>
                <Divider />
                <div className={styles.info}>
                  <Text type="secondary">{`Volume / Market Cap`}</Text>{" "}
                  <Text strong>{`${numberPrecision(data.vc)}`}</Text>
                </div>
                <Divider />
                <div className={styles.info}>
                  <Text type="secondary">{`All-Time High`}</Text>{" "}
                  <div className={styles.priceChange}>
                    <div className={styles.price}>
                      <span>
                        <Text type="secondary">
                          {`${userSetting.currencyConversion} `}
                        </Text>
                        <Text strong>{`${numberPrecision(data.ath)}`}</Text>
                      </span>
                      {data.athPercent < 0 ? (
                        <Text type="danger">{` ${numberPrecision(
                          data.athPercent
                        )}%`}</Text>
                      ) : (
                        <Text type="success">{` ${numberPrecision(
                          data.athPercent
                        )}%`}</Text>
                      )}
                    </div>
                    <Text>{`${data.athDate}`}</Text>
                  </div>
                </div>
                <Divider />
                <div className={styles.info}>
                  <Text type="secondary">{`All-Time Low`}</Text>{" "}
                  <div className={styles.priceChange}>
                    <div className={styles.price}>
                      <span>
                        <Text type="secondary">
                          {`${userSetting.currencyConversion} `}
                        </Text>
                        <Text strong>{`${numberPrecision(data.atl)}`}</Text>
                      </span>
                      {data.atlPercent < 0 ? (
                        <Text type="danger">{` ${numberPrecision(
                          data.atlPercent
                        )}%`}</Text>
                      ) : (
                        <Text type="success">{` ${numberPrecision(
                          data.atlPercent
                        )}%`}</Text>
                      )}
                    </div>
                    <Text>{`${data.atlDate}`}</Text>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </GlassCard>
    </div>
  );
}
