/* eslint-disable no-useless-concat */
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

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
  const response = await axios.get(URL + "/posts" + query, {
    headers: { "Content-Type": "application/json" },
  });
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
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const data: getPostsDataType = await response.data;
  if (response.status !== 201) {
    throw new Error();
  }
  return data;
};

export const deletePostsApi = async (postid: number) => {
  const response = await axios.delete(URL + "/posts" + `/${postid}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status !== 204) {
    throw new Error();
  }
};

export const updatePostsApi = async (postid: number, text: string) => {
  const response = await axios.put(
    URL + "/posts" + `/${postid}`,
    JSON.stringify({ text }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const data: getPostsDataType = await response.data;
  if (response.status !== 200) {
    throw new Error();
  }
  return data;
};
