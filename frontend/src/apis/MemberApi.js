import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/member/";

const instance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    contentType: "application/json",
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

const checkNicknameApi = async (nickname, success, fail) => {
  await authInstance.get(`check/${nickname}`).then(success).catch(fail);
};

const signupApi = async (user, success, fail) => {
  await authInstance.get(`info`, user).then(success).catch(fail);
};

export { checkNicknameApi, signupApi };
