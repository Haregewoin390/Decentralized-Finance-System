export const dynamic = "force-dynamic";

import {
  mintFromDepositLocal,
  mintFromDepositMumbai,
} from "utils/helpers/deposit";

export async function GET(request: Request) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_API_KEY}`);
    myHeaders.append("Content-Type", "application/json");

    const { searchParams } = new URL(request.url);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const status = searchParams.get("status");
    if (status && status == "success") {
      const txRef = searchParams.get("trx_ref");
      const userAddress = txRef?.slice(0, 42);
      if (userAddress) {
        const response = await fetch(
          `https://api.chapa.co/v1/transaction/verify/${txRef}`,
          requestOptions
        );

        const { data, status } = await response.json();
        if (status == "success") {
          const mintEth = data.amount / (120 * 1700);
          const mintForlocal = await mintFromDepositLocal(mintEth, userAddress);
          const mintformumbai = await mintFromDepositMumbai(
            mintEth,
            userAddress
          );
        }
      }
      console.log("success");
    }
  } catch (err) {
    console.log(err);
    console.log("error");
  }

  // return NextResponse.json(data);
}
