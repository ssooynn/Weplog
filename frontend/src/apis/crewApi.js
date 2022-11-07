import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/";

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
  baseURL: API_SERVER_PERSONAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
    memberId: localStorage.getItem("memberId"),
  },
});

// 전체 크루 리스트 조회
const getAllCrewList = async (success, fail) => {
  await authInstance.get(`/crew`).then(success).catch(fail);
};

// 크루 생성하기
const createCrew = async (formData, success, fail) => {
  await authFormInstance.post(`/crew`, formData).then(success).catch(fail);
};

// 크루 상세 조회
const getCrewDetail = async (crewId, success, fail) => {
  await authInstance.get(`/crew/${crewId}`).then(success).catch(fail);
};

//크루 가입신청 허가하기
const approveCrewJoin = async (joinWatingId, success, fail) => {
  await authInstance
    .post(`/crew/access/${joinWatingId}`)
    .then(success)
    .catch(fail);
};

//크루 가입신청 하기
const createCrewJoin = async (crewId, params, success, fail) => {
  await authInstance
    .post(`/crew/join/${crewId}`, { params: params })
    .then(success)
    .catch(fail);
};

// 크루 가입신청 대기자들 보기
const getCrewWaitingList = async (crewId, success, fail) => {
  await authInstance.get(`/crew/waiting/${crewId}`).then(success).catch(fail);
};

export {
  getAllCrewList,
  createCrew,
  getCrewDetail,
  approveCrewJoin,
  createCrewJoin,
  getCrewWaitingList,
};
