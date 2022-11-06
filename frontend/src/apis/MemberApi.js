import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/member/";

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

const checkNicknameApi = async (nickname, success, fail) => {
  instance.defaults.headers.common["Authorization"] =
    `Bearer ` + localStorage.getItem("accessToken");
  instance.defaults.headers.common["memberId"] =
    localStorage.getItem("memberId");

  await instance.get(`check/${nickname}`).then(success).catch(fail);
};

const signupApi = async (user, success, fail) => {
  instance.defaults.headers.common["Authorization"] =
    `Bearer ` + localStorage.getItem("accessToken");
  instance.defaults.headers.common["memberId"] =
    localStorage.getItem("memberId");
  await instance.put(`info`, user).then(success).catch(fail);
};

const registerPetApi = async (petId, success, fail) => {
  await authInstance.post(`pet/${petId}`).then(success).catch(fail);
};

export { checkNicknameApi, signupApi, registerPetApi };
