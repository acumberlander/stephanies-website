import * as actions from "../constants/actionTypes";

const productReducer = (products = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PRODUCTS:
      return action.payload;

    case actions.FETCH_PRODUCT_BY_ID:
      return action.payload;

    default:
      return products;
  }
};

export default productReducer;
