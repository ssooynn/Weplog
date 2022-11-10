import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/";

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    memberId: localStorage.getItem("memberId"),
  },
});

//랭킹조회
const rankApi = async (success, fail) => {
  await authInstance.get(`ranking`).then(success).catch(fail);
};

export { rankApi };
