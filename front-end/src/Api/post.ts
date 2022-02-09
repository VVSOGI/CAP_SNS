/* eslint-disable no-useless-concat */
import axios from "axios";
import { URL, headersWithCookie } from "./constant";

export type getPostsDataType = {
  [index: number]: getPostsEachData;
};

export type getPostsEachData = {
  id: string;
  text: string;
  createdAt: string;
  name: string;
  username: string;
  url?: string;
  message?: string;
};

export const getPostsApi = async (username: string) => {
  const query = username ? `?username=${username}` : "";
  console.log(query, headersWithCookie());

  const response = await axios.get(URL + "/posts" + query, headersWithCookie());
  const data: getPostsDataType = response.data;

  if (response.status !== 200) {
    throw new Error();
  }
  return data;
};

export const createPostsApi = async (text: string) => {
  const response = await axios.post(
    URL + "/posts",
    JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    headersWithCookie()
  );

  const data: getPostsDataType = await response.data;
  if (response.status !== 201) {
    throw new Error();
  }
  return data;
};

export const deletePostsApi = async (postid: number) => {
  const response = await axios.delete(
    URL + "/posts" + `/${postid}`,
    headersWithCookie()
  );

  if (response.status !== 204) {
    throw new Error();
  }
};

export const updatePostsApi = async (postid: number, text: string) => {
  const response = await axios.put(
    URL + "/posts" + `/${postid}`,
    JSON.stringify({ text }),
    headersWithCookie()
  );

  const data: getPostsDataType = await response.data;
  if (response.status !== 200) {
    throw new Error();
  }
  return data;
};
