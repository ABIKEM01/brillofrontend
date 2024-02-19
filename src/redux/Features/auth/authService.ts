
import axios from "axios";

import { AuthProps, SignupProps } from './authDTO'

const API_BASEURL = 'https://brilloapis.onrender.com/api/v1'

const login = async ({email, password}: AuthProps) => {
  console.log(email, password, "iokhebwdhshde")
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  const {data} = await axios.post(`${API_BASEURL}/users/login`, {email, password}, config);
  return data
}


const forgetPassword = async (email: string) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

  const {data} = await axios.post(`${API_BASEURL}/users/forgot-password`,{email}, config);
  return data
}

export const resetPassword = async ({token, id, newPassword} : any) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

  const {data} = await axios.post(`${API_BASEURL}/users/resetpassword/${id}/${token}`, {newPassword},  config);
  return data
}


export const verifyEmail = async ({token, id} : any) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

  const {data} = await axios.post(`${API_BASEURL}/users/verify?id=${id}&token=${token}`,  config);
  return data
}

export const emailRegVerification = async (id: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  try{
    const {data} = await axios.get(`${API_BASEURL}/users/verify/${id}`,  config);
return data

  }catch(err){
    return err
  }


}


const authService = {
  login,
  forgetPassword,
  verifyEmail,
  emailRegVerification
}

export default authService
