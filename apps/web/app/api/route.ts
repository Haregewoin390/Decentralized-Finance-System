import { NextResponse } from "next/server";

export async function POST() {
  ("d");
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    amount: "100",
    currency: "ETB",
    email: "anoblocks@gmail.com",
    first_name: "Ano",
    last_name: "Blocks",
    tx_ref: "chewatatest-6669",
    callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
    return_url: "https://www.google.com/",
    "customization[title]": "Payment for AnoBlocks",
    "customization[description]": "Deposit to AnoBlock platform",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  const response = await fetch(
    "https://api.chapa.co/v1/transaction/initialize",
    requestOptions
  );

  const data = await response.json();

  return NextResponse.json(data);
}

export async function GET() {
  const data = { ok: "await response.json();" };

  return NextResponse.json(data);
}
