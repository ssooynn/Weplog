// import axios from "axios";
import { createAction, handleActions } from "redux-actions";
// import { useNavigate } from "react-router-dom";
import produce from "immer";
// import { loginApi } from "../../utils/apis/UserAPI";

const SET_USER = "SET_USER";

export const setUser = createAction(SET_USER, (user) => user);

const initialState = {
  user: {
    email: "",
    id: 0,
    name: "",
    nickname: "",
    weight: "",
    profileImageUrl: "",
    role: "",
  },
};

export default handleActions(
  {
    //사용자 정보 설정
    [SET_USER]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
        // console.log(draft.user);
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  // login,
  // join,
};

export { actionCreators };
