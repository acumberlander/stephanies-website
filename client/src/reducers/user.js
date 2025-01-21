import * as actions from "../constants/actionTypes";

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case actions.FETCH_CART:
      return action.payload;

    case actions.EMPTY_CART:
      return action.payload;

    case actions.UPDATE_QUANTITY:
      return action.payload;

    case actions.REFRESH_CART:
      return action.payload;

    case actions.ADD_TO_CART:
      return action.payload;

    case actions.REMOVE_FROM_CART:
      return action.payload;

    case actions.SET_USER:
      return action.payload;

    default:
      return user;
  }
};

export default userReducer;
