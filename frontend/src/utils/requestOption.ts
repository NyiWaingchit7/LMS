import { SignJWT } from "jose";
import { config } from "./config";

export const headerOptions = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const apitoken = await generateToken();
  return {
    Authorization: `Bearer ${accessToken}`,
    "content-type": "application/json",
    API_TOKEN: `Bearer ${apitoken}`,
  };
};

const secretToken = new TextEncoder().encode(config.secretKey);

export const generateToken = async () => {
  const token = await new SignJWT({ app: config.apiId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1m")
    .sign(secretToken);

  return token;
};
