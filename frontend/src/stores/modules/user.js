// import axios from "axios";
import { createAction, handleActions } from "redux-actions";
// import { useNavigate } from "react-router-dom";
import produce from "immer";

const SET_USER = "SET_USER";

export const setUser = createAction(SET_USER, (user) => user);

const user = {
  memberId: "",
  name: "",
  nickname: "",
  weight: "",
  profileImageUrl: "",
};

export default handleActions(
  {
    //사용자 정보 설정
    [SET_USER]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft = user;
        // console.log(draft.user);
      }),
  },
  user
);

const actionCreators = {
  setUser,
  // login,
  // join,
};

export { actionCreators };
