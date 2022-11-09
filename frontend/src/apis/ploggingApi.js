import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "plogging-service/plogging";

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

// 내 플로깅 리스트 가져오기
const getPloggingList = async (params, success, fail) => {
  await authInstance.get(`/`, { params: params }).then(success).catch(fail);
};

// 플로깅 전 5km 이내 기록 리스트 조회
const getNearRecentPloggingList = async (params, success, fail) => {
  await authInstance
    .get(`/${params.lat}/${params.lng}`)
    .then(success)
    .catch(fail);
};

//플로깅 상세 조회
const getPloggingDetail = async (ploggingId, success, fail) => {
  await authInstance.get(`/${ploggingId}`).then(success).catch(fail);
};

// 플로깅 종료
const exitPlogging = async (params, success, fail) => {
  await authInstance.post(`/exit`, params).then(success).catch(fail);
};

//최근 피드 리스트 조회
const getRecentFeedList = async (success, fail) => {
  await authInstance.get(`/feed`).then(success).catch(fail);
};

//크루 플로깅 피드 리스트 조회
const getCrewFeedList = async (crewId, success, fail) => {
  await authInstance.get(`/feed/crew/${crewId}`).then(success).catch(fail);
};

//근처 쓰레기통 리스트
const getGarbageList = async (params, success, fail) => {
  await authInstance
    .get(`/garbage/${params.lat}/${params.lng}`)
    .then(success)
    .catch(fail);
};

//플로깅 사진 등록
const postPloggingPicture = async (ploggindId, formData, success, fail) => {
  await authFormInstance
    .post(`/picture/${ploggindId}`, formData)
    .then(success)
    .catch(fail);
};

export {
  getPloggingList,
  getNearRecentPloggingList,
  getPloggingDetail,
  exitPlogging,
  getRecentFeedList,
  getCrewFeedList,
  getGarbageList,
  postPloggingPicture,
};
