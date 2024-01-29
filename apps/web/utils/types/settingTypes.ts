export interface SettingProps {
  currencyConversion?: "ETB" | "USD";
  primaryCurrency?: "Matic" | "Fiat";
  language?: string;
  hideAssets?: boolean;
  lockerTimer?: number;
}
