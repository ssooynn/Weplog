import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "achievement-service/";

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    memberId: localStorage.getItem("memberId"),
  },
});

authInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["memberId"] = localStorage.getItem("memberId");
    } else {
      window.location.href = "/login";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//내 도전과제 조회
const myAchievementApi = async (success, fail) => {
  await authInstance.get(`achievement/my`).then(success).catch(fail);
};

export { myAchievementApi };
