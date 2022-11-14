import { API_SERVER, axios } from "./api";

const API_SERVER_USER = API_SERVER + "member-service/calendar";

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

const createCrewSchedule = async (calendarReq, success, fail) => {
  await authInstance.post(``, calendarReq).then(success).catch(fail);
};

const getCrewSchedule = async (params, success, fail) => {
  await authInstance
    .get(`/${params.crewId}/${params.date}`)
    .then(success)
    .catch(fail);
};

export { createCrewSchedule, getCrewSchedule };
