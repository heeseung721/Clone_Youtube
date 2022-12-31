import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const VideoAPI = {
  searchTag: (tag) => client.get(`/post/search?tag=${tag}`),
  sarchTitle: (keyword) => client.get(`/post/search?keyword=${keyword}`),
  postVideo: (formData) => client.post("/post", formData),
  getAllVideo: (id) => client.get(`/post?lastId=${id}`),
  getDetailVideo: (videoId) => client.get(`/post/${videoId}`),
  deleteVideo: (videoId) => client.delete(`/post/${videoId}`),
  patchVideo: (videoId, updatement) =>
    client.patch(`/post/${videoId}`, {
      title: updatement.title,
      tag: updatement.tag,
      content: updatement.content,
    }),
};

export const SignAPI = {
  dupEmailCheck: (email) => client.post(`/signup/emailcheck`, { email }),
  signUp: (formData) => client.post("/signup", formData),
  logIn: (loginData) => client.post("/login", loginData),
  auth: () => client.get("/auth"),
  kakaoLogin: (code) => client.get(`/login/kakao?code=${code}`),
};

export const CommentAPI = {
  postComment: (comment, postId) =>
    client.post(`/comment/post/${postId}`, { comment }),
  patchComment: (commentId, postId, comment) =>
    client.patch(`/comment/${commentId}/post/${postId}`, { comment }),
  deleteComment: (commentId, postId) =>
    client.delete(`/comment/${commentId}/post/${postId}`),
};

client.interceptors.request.use(
  function (config) {
    if (cookie.get("token")) {
      config.headers.authorization = `Bearer ${cookie.get("token")}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

client.interceptors.response.use(
  function (response) {
    if (response.data.token) {
      cookie.set("token", response.data.token, { path: "/" });
    }
    return response;
  },

  function (error) {
    if (error?.response.status === 401) {
      cookie.remove("token", { path: "/" });
      return error;
    }
    return error;
  }
);
