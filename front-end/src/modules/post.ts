import { Dispatch } from "redux";
import { getPostsApi } from "../Api/post";

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

export const getPosts = (username: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_POSTS });
  try {
    const posts = await getPostsApi(username);
    console.log(posts);
    dispatch({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    dispatch({ type: GET_POSTS_ERROR, error: e });
  }
};

const initialState: PostsStateType = {
  posts: {
    loading: false,
    posts: null,
    error: null,
  },
};

type PostsStateType = {
  posts: {
    loading: boolean;
    posts: null | any[];
    error: null | Error;
  };
};

const posts = (
  state = initialState,
  action: { type: string; posts: any[]; error: Error }
) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          posts: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: true,
          posts: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          posts: null,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default posts;
