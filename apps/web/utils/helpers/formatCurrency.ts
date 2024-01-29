export function usd(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function birr(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "ETB",
  });
}
