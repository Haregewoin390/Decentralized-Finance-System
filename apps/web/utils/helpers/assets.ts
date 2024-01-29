import {
  Provider,
  AddressLike,
  Contract,
  formatEther,
  InterfaceAbi,
} from "ethers";
import moment from "moment";
import { NetworkNames, NetworkType } from "utils/constants/rpcProvider";
import { AssetNames, Assets } from "utils/constants/assets";

export async function userAssets(
  userAddress: string,
  provider: Provider,
  network: NetworkType
) {
  let assets = {
    Matic: 0,
    Ether: 0,
    Usdt: 0,
    EtbCoin: 0,
  };
  const maticBalance = await provider?.getBalance(userAddress as AddressLike);
  const contracts = Assets.filter((value) => value.name != "Matic");
  let formatedMatic;
  if (maticBalance) {
    formatedMatic = Number(formatEther(maticBalance));
  } else {
    formatedMatic = 0;
  }
  assets.Matic = formatedMatic;
  await contracts.reduce(async (previousValue, asset) => {
    await previousValue;
    const contract = new Contract(
      asset.contractAddress[network.name as NetworkNames],
      asset.abi as InterfaceAbi,
      provider
    );
    const balance = await contract.balanceOf(userAddress);

    let formatedBalance;
    if (balance) {
      formatedBalance = Number(formatEther(balance));
    } else {
      formatedBalance = 0;
    }
    assets[asset.name] = formatedBalance;
  }, Promise.resolve());

  return assets;
}

export async function prices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cmatic-network%2Ctether&vs_currencies=usd%2Cbtc&include_24hr_change=true&precision=2"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return {
      Matic: {
        price: data["matic-network"].usd,
        change: data["matic-network"].usd_24h_change,
      },
      Ether: {
        price: data.ethereum.usd,
        change: data.ethereum.usd_24h_change,
      },
      Usdt: {
        price: data.tether.usd,
        change: data.tether.usd_24h_change,
      },
      EtbCoin: {
        price: 14.83,
        change: 0.01,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export async function assetPriceInfo(day: number, assetId: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=7`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    let price: number[] = [];
    let date: string[] = [];
    data.prices.forEach((item: [number, number]) => {
      price.push(item[1]);
      date.push(moment.unix(item[0] / 1000).format("dd-MM"));
    });

    return {
      dates: date,
      prices: price,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function assetInfo(assetId: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetId}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const dataResponse = await response.json();
    const data = dataResponse[0];
    return {
      price: data["current_price"],
      marketCap: data["market_cap"],
      volume: data["total_volume"],
      high24: data["high_24h"],
      low24: data["low_24h"],
      vc: data["total_volume"] / data["market_cap"],
      ath: data["ath"],
      athPercent: data["ath_change_percentage"],
      athDate: data["ath_date"],
      atl: data["atl"],
      atlPercent: data["atl_change_percentage"],
      atlDate: data["atl_date"],
    };
  } catch (err) {
    console.log(err);
  }
}
