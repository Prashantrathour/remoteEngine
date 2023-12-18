import axios from "axios";
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actiontype";
const API = `${process.env.REACT_APP_API}/user`;
export const login = (data) => async (dispatch) => {
  dispatch(postdata_request());



  try {
    const res=await axios.post(`${API}/login`,data)
    dispatch(postdata_success(res.data));
    return res
  } catch (error) {
    dispatch(postdata_failure());
    return error
  }
   
};
export const register = (data) => async (dispatch) => {
  dispatch(postdata_request());

try {
  const res=await axios.post(`${API}/register`,data)
  dispatch(postdata_success(res.data));
  return res
} catch (error) {
  dispatch(postdata_failure());
  return error
  
}
};
const postdata_request = () => {
  return { type: SIGNUP_REQUEST };
};
const postdata_success = (payload) => {
  return { type: SIGNUP_SUCCESS, payload };
};
const postdata_failure = () => {
  return { type: SIGNUP_FAILURE };
};
