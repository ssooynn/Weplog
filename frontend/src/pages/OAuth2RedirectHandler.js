import { Box } from "grommet";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { myInfo } from "../utils/api/userApi";
import { setUser } from "../stores/modules/user";

export const OAuth2RedirectHandler = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    // localStorage.setItem("refreshToken", refreshToken);
    const register = params.get("needMoreInfo");
    const memberId = params.get("memberId");
    const accessToken = params.get("accessToken");

    let isRegister = JSON.parse(register);
    console.log(accessToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("memberId", memberId);

    // 회원가입후 추가 입력 안했으면
    if (isRegister === true) {
      console.log("추가입력 - X");
      navigate("/signup");
    } else {
      console.log(localStorage.getItem("accessToken"));
      // myInfo((res) => {
      //     console.log(res);
      //     const { data } = res;
      //     dispatch(setUser(data));
      //     console.log(data);

      //     // navigate("/");
      //     // window.location.href = '/';
      // }, (err) => {
      //     console.log(err);
      //     navigate("/");
      // });
      const from = localStorage.getItem("from");
      if (from) {
        localStorage.removeItem("from");
        navigate(from);
      } else {
        navigate("/");
      }
    }
  }, []);

  return;
};
