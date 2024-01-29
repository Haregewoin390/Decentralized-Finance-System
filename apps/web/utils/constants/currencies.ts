export interface CurrencyProps {
  name: string;
  country: string;
  imageUrl?: string;
}

export const Curriences: CurrencyProps[] = [
  {
    name: "ETB",
    country: "Ethiopia",
  },
  {
    name: "USD",
    country: "USA",
  },
];
