import { ENV } from "../../constants/env";

export const exchangeCode = async (code: string) => {
  const res = await fetch(`${ENV.AWS_API_GATEWAY_URL}/auth/exchange-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();

  if (!data.ok) {
    throw new Error("Failed to exchange code");
  }

  return data.data;
};
