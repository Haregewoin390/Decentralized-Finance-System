"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Assets } from "utils/constants/assets";
import { useNetwork } from "utils/context/network";
import { useUser } from "utils/context/user";
import { prices, userAssets } from "utils/helpers/assets";

interface assetValueProp {
  total: number;
  totalInUsd: number;
  totalInbirr: number;
  change: number;
  price: number;
}

export interface userBalanceProp {
  Matic: assetValueProp;
  EtbCoin: assetValueProp;
  Ether: assetValueProp;
  Usdt: assetValueProp;
  TotalInUsd: number;
  TotalInBirr: number;
}
export interface userBalanceprop {}

interface UserBalanceState {
  userBalance: userBalanceProp;
  setUserBalance(userbalance: userBalanceProp): void;
}

const defaultUserBalanceState: UserBalanceState = {
  userBalance: {
    EtbCoin: { total: 0, totalInbirr: 0, totalInUsd: 0, change: 0, price: 0 },
    Ether: { total: 0, totalInbirr: 0, totalInUsd: 0, change: 0, price: 0 },
    Matic: { total: 0, totalInbirr: 0, totalInUsd: 0, change: 0, price: 0 },
    Usdt: { total: 0, totalInbirr: 0, totalInUsd: 0, change: 0, price: 0 },
    TotalInUsd: 0,
    TotalInBirr: 0,
  },
  setUserBalance: () => {},
};

const UserBalanceContext = createContext(defaultUserBalanceState);

interface UserBalanceProviderProps {
  children: React.ReactNode;
}

export const UserBalanceProvider = ({
  children,
}: UserBalanceProviderProps): JSX.Element => {
  const [userBalance, setUserBalance] = useState<userBalanceProp>(
    defaultUserBalanceState.userBalance
  );

  const { provider, choosenNetwork } = useNetwork();
  const { userInfo } = useUser();

  useEffect(() => {
    const work = async () => {
      try {
        if (provider && userInfo) {
          const assetsBalance = await userAssets(
            userInfo?.pubad,
            provider,
            choosenNetwork
          );
          const price = await prices();

          const balance: userBalanceProp = {
            EtbCoin: {
              total: Number(assetsBalance.EtbCoin.toPrecision(4)),
              totalInbirr: Number(
                (
                  (price?.EtbCoin.price ?? 0) *
                  assetsBalance.EtbCoin *
                  55
                ).toPrecision(4)
              ),
              totalInUsd: Number(
                (
                  (price?.EtbCoin.price ?? 0) * assetsBalance.EtbCoin
                ).toPrecision(4)
              ),
              change: Number((price?.EtbCoin.change ?? 0).toPrecision(4)),
              price: Number((price?.EtbCoin.price ?? 0).toPrecision(4)),
            },
            Ether: {
              total: Number(assetsBalance.Ether.toPrecision(4)),
              totalInbirr: Number(
                (
                  (price?.Ether.price ?? 0) *
                  assetsBalance["Ether"] *
                  55
                ).toPrecision(4)
              ),
              totalInUsd: Number(
                ((price?.Ether.price ?? 0) * assetsBalance.Ether).toPrecision(4)
              ),
              change: Number((price?.Ether.change ?? 0).toPrecision(4)),
              price: Number((price?.Ether.price ?? 0).toPrecision(4)),
            },
            Usdt: {
              total: Number(assetsBalance.Usdt.toPrecision(4)),
              totalInbirr: Number(
                (
                  (price?.Usdt.price ?? 0) *
                  assetsBalance.Usdt *
                  55
                ).toPrecision(4)
              ),
              totalInUsd: Number(
                ((price?.Usdt.price ?? 0) * assetsBalance.Usdt).toPrecision(4)
              ),
              change: Number((price?.Usdt.change ?? 0).toPrecision(4)),
              price: Number((price?.Usdt.price ?? 0).toPrecision(4)),
            },
            Matic: {
              total: Number(assetsBalance.Matic.toPrecision(4)),
              totalInbirr: Number(
                (
                  (price?.Matic.price ?? 0) *
                  assetsBalance.Matic *
                  55
                ).toPrecision(4)
              ),
              totalInUsd: Number(
                ((price?.Matic.price ?? 0) * assetsBalance.Matic).toPrecision(4)
              ),
              change: Number((price?.Matic.change ?? 0).toPrecision(4)),
              price: Number((price?.Matic.price ?? 0).toPrecision(4)),
            },
            TotalInUsd: Number(
              (
                (price?.Ether.price ?? 0) * assetsBalance.Ether +
                (price?.EtbCoin.price ?? 0) * assetsBalance.EtbCoin +
                (price?.Matic.price ?? 0) * assetsBalance.Matic
              ).toPrecision()
            ),
            TotalInBirr: Number(
              (
                ((price?.Ether.price ?? 0) * assetsBalance.Ether +
                  (price?.EtbCoin.price ?? 0) * assetsBalance.EtbCoin +
                  (price?.Matic.price ?? 0) * assetsBalance.Matic) *
                55
              ).toPrecision()
            ),
          };

          setUserBalance(balance);
        }
      } catch (err) {
        console.log(err);
      }
    };

    work();
  }, [provider, userInfo]);

  return (
    <UserBalanceContext.Provider
      value={{
        userBalance,
        setUserBalance,
      }}
    >
      {children}{" "}
    </UserBalanceContext.Provider>
  );
};

export const useUserBalance = () => useContext(UserBalanceContext);
