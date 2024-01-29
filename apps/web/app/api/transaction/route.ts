import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_API_KEY}`);
    myHeaders.append("Content-Type", "application/json");

    const { origin } = new URL(request.url);
    const raw = JSON.stringify({
      amount: body.amount,
      currency: "ETB",
      email: "anoblocks@gmail.com",
      first_name: "Ano",
      last_name: "Blocks",
      tx_ref: `${body.address + Date.now()}`,
      callback_url: `${origin}/api/transaction/confirm`,
      return_url: `${origin}/deposit/confirm`,
      "customization[title]": "Payment for AnoBlocks",
      "customization[description]": "Deposit to AnoBlock platform",
    });

    const requestOptions = {
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
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  const data = { ok: "await response.json();" };

  return NextResponse.json(data);
}
