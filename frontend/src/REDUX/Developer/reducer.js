import { POST_DEVELOPER_FAILURE, POST_DEVELOPER_REQUEST, POST_DEVELOPER_SUCCESS } from "./actiontype";

const initialstate = {
  message: "",
  isLoading:false,
  isError:false,
};

export const reducer = (state = initialstate, {type,payload}) => {
  switch (type) {
    case POST_DEVELOPER_REQUEST:
      return {
        ...state,
        isLoading:true
      };
    case POST_DEVELOPER_SUCCESS:
      return {
        ...state,
        isLoading:false,
        message:payload.message
      };
    case POST_DEVELOPER_FAILURE:
      return {
        ...state,
        isError:true
      };

    default:
      return state;
  }
};
