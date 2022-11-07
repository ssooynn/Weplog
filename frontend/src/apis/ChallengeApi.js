import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "challenge-service/challenge";

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    memberId: localStorage.getItem("memberId"),
  },
});

const fileInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    memberId: localStorage.getItem("memberId"),
  },
});

//챌린지 목록 조회
const challengeListAPi = async (page, size, sort, success, fail) => {
  await authInstance
    .get(`?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

//챌린지 생성
const challengeRegisterApi = async (formData, success, fail) => {
  await fileInstance.post(``, formData).then(success).catch(fail);
};

//챌린지 상세 조회
const challengeDetailApi = async (challengeId, success, fail) => {
  await authInstance.get(`/${challengeId}`).then(success).catch(fail);
};

//챌린지 포기
const challengeGiveUpApi = async (challengeId, success, fail) => {
  await authInstance.delete(`/${challengeId}`).then(success).catch(fail);
};

//현 시간 기준 끝난 챌린지 종료시키기(임시)
const challengeEndApi = async (success, fail) => {
  await authInstance.post(`/end`).then(success).catch(fail);
};

//나의 챌린지 조회
const challengeMyApi = async (page, size, sort, success, fail) => {
  await authInstance
    .get(`/my?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

//챌린지 내부 랭킹 조회
const challengeRankingApi = async (challengeId, success, fail) => {
  await authInstance.get(`/rank/${challengeId}`).then(success).catch(fail);
};

//챌린지 제목으로 조회
const challengeSearchByTitleAPi = async (
  title,
  page,
  size,
  sort,
  success,
  fail
) => {
  await authInstance
    .get(`/search/${title}?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

export {
  challengeListAPi,
  challengeRegisterApi,
  challengeDetailApi,
  challengeGiveUpApi,
  challengeEndApi,
  challengeMyApi,
  challengeRankingApi,
  challengeSearchByTitleAPi,
};
