import axios from "axios";

export const API_SERVER = "https://k7a1061.p.ssafy.io/";

// export const API_SERVER = "http://localhost:8080/api";

export const CLIENT_URL = "https://k7a106.p.ssafy.io";

// export const CLIENT_URL = "http://localhost:3000";

export const AUTH_URL_KAKAO =
  API_SERVER + "member-service/oauth2/authorize/kakao";

export const AUTH_URL_GOOGLE =
  API_SERVER + "member-service/oauth2/authorize/google";

export const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}/oauth2/redirect`;
//
// const checkToken = async (config) => {
//     let accessToken = localStorage.getItem("accessToken");
//     const decode = jwt.decode(accessToken);
//     const nowDate = new Date().getTime() / 1000;
//
//     // 토큰 만료시간이 지났다면
//     if (decode.exp < nowDate) {
//         const {data} = await axios.post(`${API_SERVER}/auth/refresh`, {accessToken});
//         // 리프레쉬 토큰 발급 서버 요청
//
//         const res = data.data;
//
//         accessToken = res;
//         localStorage.setItem("accessToken", accessToken);
//     }
//
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//     return config;
// }

export { axios };
