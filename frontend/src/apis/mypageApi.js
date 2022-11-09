import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service";

const instance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    memberId: localStorage.getItem("memberId"),
  },
});

const myPageInfoApi = async (success, fail) => {
  await authInstance.get(`/mypage`).then(success).catch(fail);
};

const myPageProfileApi = async (success, fail) => {
  await authInstance.get(`/mypage/profile`).then(success).catch(fail);
};
export { myPageInfoApi, myPageProfileApi };
