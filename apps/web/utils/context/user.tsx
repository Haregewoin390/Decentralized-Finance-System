"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { UserLoginInfo } from "utils/types/userType";
import {
  checkIfUserLogin,
  checkUserSession,
  checkUserWithPassword,
} from "utils/helpers/userSession";
import { Routes } from "utils/constants/routes";

interface UserState {
  userLoggedin: boolean;
  showPasswordModal: boolean;
  setPasswordModal(showPasswordModal: boolean): void;
  setUserLoggedin(userLoggedin: boolean): void;
  userInfo: UserLoginInfo;
  setUserInfo(userInfo: UserLoginInfo): void;
}

const defaultUserState: UserState = {
  userLoggedin: false,
  showPasswordModal: false,
  setPasswordModal: () => {},
  setUserLoggedin: () => {},
  userInfo: null,
  setUserInfo: () => {},
};

const UserContext = createContext(defaultUserState);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const [userLoggedin, setUserLoggedin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserLoginInfo>(null);
  const [showPasswordModal, setPasswordModal] = useState<boolean>(false);

  const redirectTo = async (path: string): Promise<void> => {
    const user = checkIfUserLogin();

    if (!user) {
      if (Object.values(Routes.authenticationRoutes).includes(path)) {
        return;
      } else {
        router.push(Routes.authenticationRoutes.intro);
      }

      return;
    }
    if (Object.values(Routes.authorizationRoutes).includes(path)) {
      return;
    }
    if (Object.values(Routes.authenticationRoutes).includes(path)) {
      router.push(Routes.authorizedRoutes.home);
      return;
    }
    if (userLoggedin) {
      return;
    }

    const userSession = await checkUserSession();

    if (userSession) {
      if (typeof userSession.password == "string") {
        const auth = await checkUserWithPassword(userSession.password);

        if (
          auth &&
          typeof auth.hdPriv == "string" &&
          typeof auth.priv == "string" &&
          typeof auth.pubad == "string" &&
          typeof auth.pubkey == "string"
        ) {
          const user: UserLoginInfo = {
            hdPriv: auth.hdPriv,
            priv: auth.priv,
            pubad: auth.pubad,
            pubkey: auth.pubkey,
          };

          setUserInfo(user);
          setUserLoggedin(true);
        }
      }
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("redirect", path);
    const redirect = params;
    router.push(`${Routes.authorizationRoutes.auth}?${redirect}`);
  };

  useEffect(() => {
    redirectTo(currentPath ?? "/intro");
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLoggedin,
        setUserLoggedin,
        showPasswordModal,
        userInfo,
        setUserInfo,
        setPasswordModal,
      }}
    >
      {children}{" "}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
