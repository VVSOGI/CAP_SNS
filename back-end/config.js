import dotenv from "dotenv";
dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: required("JWT_EXPIRES_SEC", 86400),
  },
  bcrpty: {
    bcrptySaltRounds: parseInt(required("BECRYPT_SALT_ROUNDS")),
  },
  host: {
    port: required("HOST_PORT", 8080),
  },
};
