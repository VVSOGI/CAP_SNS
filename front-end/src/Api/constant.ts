import { getToken } from "../db/token";

export const URL = process.env.REACT_APP_BASE_URL;
export const headers = {
  headers: { "Content-Type": "application/json" },
};

export const headersWithCookie = () => {
  const token = getToken();
  let header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
};

export const handleMakeJsonStr = (props: any) => {
  return JSON.stringify({ ...props });
};
