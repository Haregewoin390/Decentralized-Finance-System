"use client";
import { useState, createContext, useContext } from "react";
import { ConfigProvider, theme } from "antd";
import { getCookie } from "cookies-next";

interface ThemeState {
  darkTheme: boolean;
  setDarkTheme(darkTheme: boolean): void;
}

const defaultThemeState: ThemeState = {
  darkTheme: false,
  setDarkTheme: () => {},
};

const ThemeContext = createContext(defaultThemeState);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function Theme({ children }: ThemeProviderProps) {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    getCookie("theme") == "dark"
  );

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <ConfigProvider
        theme={{
          algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

          token: {
            colorPrimary: "#00ac7a",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
