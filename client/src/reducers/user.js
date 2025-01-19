import * as actions from "../constants/actionTypes";

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case actions.CREATE_GUEST:
      return action.payload;

    default:
      return user;
  }
};

export default userReducer;
