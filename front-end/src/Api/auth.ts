import axios from "axios";
import { saveToken } from "../db/token";
import { handleMakeJsonStr, headers, URL } from "./constant";

type SignupResType = {
  data: { token: string };
};

const auth = "/auth";

export const signUp = async (
  username: string,
  password: string,
  name: string,
  email: string,
  url: string
) => {
  const response: SignupResType = await axios.post(
    URL + auth + "/signup",
    handleMakeJsonStr({ username, password, name, email, url }),
    headers
  );

  saveToken(response.data.token);

  return response;
};

export const Login = async (username: string, password: string) => {
  const response: SignupResType = await axios.post(
    URL + auth + "/login",
    handleMakeJsonStr({ username, password }),
    headers
  );

  saveToken(response.data.token);

  return response;
};

export const AuthCheck = async () => {
  // const response = await axios.get(URL + auth + "/me", headersWithCookie);
  // return response;
};
