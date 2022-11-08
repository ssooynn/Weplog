import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "/achievement-service/";

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    memberId: localStorage.getItem("memberId"),
  },
});

//내 도전과제 조회
const myAchievementApi = async (success, fail) => {
  await authInstance.get(`achievement/my`).then(success).catch(fail);
};

export { myAchievementApi };
