"use client";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { GlassCard } from "components/elements/cards";
import { useSetting } from "utils/context/settings";
import { assetPriceInfo } from "utils/helpers/assets";

import styles from "./currencyInfo.module.scss";

const { Title, Text } = Typography;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function CurrencyInfo({ asset }: any) {
  const [assetChartData, setAssetChartData] = useState<any>();
  const { userSetting } = useSetting();

  useEffect(() => {
    const work = async () => {
      if (asset) {
        try {
          const assetPrice = await assetPriceInfo(7, asset.coingeckoId);
          if (assetPrice) {
            const data = {
              labels: assetPrice.dates,
              datasets: [
                {
                  label: "Price",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "#00ac7a",
                  borderColor: "#00ac7a",
                  borderWidth: 1,

                  data:
                    userSetting.currencyConversion == "ETB"
                      ? assetPrice.prices.map((items) => {
                          return items * 55;
                        })
                      : assetPrice.prices ?? [],
                },
              ],
            };
            setAssetChartData(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    work();
  }, [asset]);

  return (
    <GlassCard>
      {asset != undefined && (
        <div className={styles.layouts}>
          <Title
            level={3}
          >{`${asset.name} Price Chart (${asset.abbrev})`}</Title>
          <Text>{`currency in ${userSetting.currencyConversion}`}</Text>
          <div>{assetChartData && <Line data={assetChartData} />}</div>
        </div>
      )}
    </GlassCard>
  );
}
