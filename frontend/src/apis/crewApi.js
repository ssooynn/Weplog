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

//크루 가입신청 거절하기
const rejectCrewJoin = async (joinWatingId, success, fail) => {
  await authInstance.delete(`/deny/${joinWatingId}`).then(success).catch(fail);
};

//크루 가입신청 하기
const createCrewJoin = async (crewId, request, success, fail) => {
  await authInstance.post(`/join/${crewId}`, request).then(success).catch(fail);
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

//플로깅 채팅 만들기
const createCrewRoom = async (crewId, success, fail) => {
  await authInstance.post(`/room`, crewId).then(success).catch(fail);
};

// 크루 아이디로 룸 불러오기
const getRoomByCrewId = async (crewId, success, fail) => {
  await authInstance.get(`/room/${crewId}`).then(success).catch(fail);
};

// 플로깅 시작 전 진행중인 크루 플로깅 가져오가
const getExistCrewPlogging = async (success, fail) => {
  await authInstance.get(`/rooms`).then(success).catch(fail);
};

//크루 랭킹
const getCrewRankingList = async (crewId, success, fail) => {
  await authInstance.get(`/ranking/${crewId}`).then(success).catch(fail);
};
// 크루 채팅 기록 불러오기
const getCrewChats = async (crewId, success, fail) => {
  await authInstance.get(`/chat/${crewId}`).then(success).catch(fail);
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
  createCrewRoom,
  getRoomByCrewId,
  getExistCrewPlogging,
  rejectCrewJoin,
  getCrewRankingList,
  getCrewChats,
};
