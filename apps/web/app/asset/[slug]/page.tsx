"use client";
import CurrencyInfoPage from "components/features/currencyInfo";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <CurrencyInfoPage params={params} />
    </>
  );
}
