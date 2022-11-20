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

// 나의 모든 펫 조회하기
const getAllMyPet = async (success, fail) => {
  await authInstance.get(`/mypet`).then(success).catch(fail);
};

// 나의 펫 상세 조회
const getMyPetDetail = async (petId, success, fail) => {
  await authInstance.get(`/mypet/${petId}`).then(success).catch(fail);
};

// 나의 펫 등록하기
const postMyPet = async (petId, success, fail) => {
  await authInstance.post(`/mypet/${petId}`).then(success).catch(fail);
};

// 나의 펫 종류 조회하기
const getMyPetKinds = async (success, fail) => {
  await authInstance.get(`/mypet/kinds`).then(success).catch(fail);
};

// 레벨 별 펫 조회하기
const getPetLevel = async (level, success, fail) => {
  await authInstance.get(`/pet/${level}`).then(success).catch(fail);
};

//육성 완료된 펫 이미지 변신
const changePetLevelApi = async (memberPetId, success, fail) => {
  await authInstance
    .patch(`/mypet/${memberPetId}/transformation`)
    .then(success)
    .catch(fail);
};

export {
  getAllMyPet,
  getMyPetDetail,
  postMyPet,
  getMyPetKinds,
  getPetLevel,
  changePetLevelApi,
};
