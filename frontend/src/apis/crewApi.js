import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/crew";

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

const authFormInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    memberId: localStorage.getItem("memberId"),
  },
});

// 전체 크루 리스트 조회
const getAllCrewList = async (success, fail) => {
  await authInstance.get(`/`).then(success).catch(fail);
};

// 크루 생성하기
const createCrew = async (formData, success, fail) => {
  await authFormInstance.post(`/`, formData).then(success).catch(fail);
};

// 크루 상세 조회
const getCrewDetail = async (crewId, success, fail) => {
  await authInstance.get(`/${crewId}`).then(success).catch(fail);
};

//크루 가입신청 허가하기
const approveCrewJoin = async (joinWatingId, success, fail) => {
  await authInstance.post(`/access/${joinWatingId}`).then(success).catch(fail);
};

//크루 가입신청 하기
const createCrewJoin = async (crewId, params, success, fail) => {
  await authInstance
    .post(`/join/${crewId}`, { params: params })
    .then(success)
    .catch(fail);
};

// 내 크루 목록 조회
const getMyCrewList = async (success, fail) => {
  await authInstance.get(`/my`).then(success).catch(fail);
};

// 내 근처 크루 목록 조회
const getMyNearCrewList = async (coords, success, fail) => {
  await authInstance
    .get(`/near/${coords.lat}/${coords.lng}`)
    .then(success)
    .catch(fail);
};

//TOP3 크루 목록 조회
const getTop3CrewList = async (success, fail) => {
  await authInstance.get(`/top3`).then(success).catch(fail);
};

// 크루 가입신청 대기자들 보기
const getCrewWaitingList = async (crewId, success, fail) => {
  await authInstance.get(`/waiting/${crewId}`).then(success).catch(fail);
};

export {
  getAllCrewList,
  createCrew,
  getCrewDetail,
  approveCrewJoin,
  createCrewJoin,
  getMyCrewList,
  getMyNearCrewList,
  getTop3CrewList,
  getCrewWaitingList,
};
