import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/member/";

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

//닉네임 중복체크
const checkNicknameApi = async (nickname, success, fail) => {
  instance.defaults.headers.common["Authorization"] =
    `Bearer ` + localStorage.getItem("accessToken");
  instance.defaults.headers.common["memberId"] =
    localStorage.getItem("memberId");

  await instance.get(`check/${nickname}`).then(success).catch(fail);
};

//회원가입(이미 유저 정보 있는 상황에서 데이터 넣기)
const signupApi = async (user, success, fail) => {
  instance.defaults.headers.common["Authorization"] =
    `Bearer ` + localStorage.getItem("accessToken");
  instance.defaults.headers.common["memberId"] =
    localStorage.getItem("memberId");
  await instance.put(`info`, user).then(success).catch(fail);
};

//펫 등록 api
const registerPetApi = async (petId, success, fail) => {
  await authInstance.post(`pet/${petId}`).then(success).catch(fail);
};

export { checkNicknameApi, signupApi, registerPetApi };
