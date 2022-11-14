import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "challenge-service/";

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

//챌린지 참가
const challengeJoinAPi = async (challengeId, success, fail) => {
  await authInstance
    .post(`memberChallenge/${challengeId}`)
    .then(success)
    .catch(fail);
};

//나의 진행중인 챌린지 조회
const challengeIngListAPi = async (success, fail) => {
  await authInstance
    .get(`memberChallenge/challenging`)
    .then(success)
    .catch(fail);
};

//나의 끝난 챌린지 리스트
const challengeEndListAPi = async (success, fail) => {
  await authInstance.get(`memberChallenge/end`).then(success).catch(fail);
};

export { challengeJoinAPi, challengeIngListAPi, challengeEndListAPi };
