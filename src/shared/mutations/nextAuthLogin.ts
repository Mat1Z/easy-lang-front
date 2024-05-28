import { AuthData } from "../types";

export const nextAuthLogin = async (data: AuthData): Promise<any> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("ngrok-skip-browser-warning", "1");
  console.log(data)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );
  console.log(response)
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("login error: ", errorResponse.message);
    throw new Error(errorResponse.message);
  }
  return await response.json();
};