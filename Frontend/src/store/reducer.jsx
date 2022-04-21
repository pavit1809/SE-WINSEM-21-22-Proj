import * as actionTypes from "./actions";

const initialState = {
  userDetails: null,
  recordDetails: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER: {
      // {console.log("user edited")}
      return {
        ...state,
        userDetails: action.userDetails,
      };
    }
    case actionTypes.CHANGE_RECORD: {
      // {console.log("user edited")}
      return {
        ...state,
        recordDetails: action.recordDetails,
      };
    }
    default:
      return state;
  }
};

export default reducer;
