import axios from "axios"
import { POST_DEVELOPER_FAILURE, POST_DEVELOPER_REQUEST, POST_DEVELOPER_SUCCESS } from "./actiontype"

export const postuser=(data)=>async(dispatch)=>{
    dispatch(postdata_request())
   
        return axios.post(``).then((res)=>{
            const data= res.data
            dispatch(postdata_success(data))
        }).catch((err)=>{
            dispatch(postdata_failure())
            console.log(err)
        })
        

}
const postdata_request=()=>{
return {type:POST_DEVELOPER_REQUEST}
}
const postdata_success=(payload)=>{
return {type:POST_DEVELOPER_SUCCESS,payload}
}
const postdata_failure=()=>{
return {type:POST_DEVELOPER_FAILURE}
}