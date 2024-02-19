// import API_BASEURL from "constants";
import axios from "axios";
import {toast} from 'react-toastify'


const API_BASEURL = 'https://brilloapis.onrender.com/api/v1'

export interface RegisterUserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  interest_id: string;
}

export interface UserProps {
  id: string,
  token: string,
}

export interface UpdateUserProps {
  id: string
  token: string
  name: string
  street: string
  province: string
}

export interface UpdateUser {
  id: string;
  token: string;
  role: string;
  business_name: string
  website:string;
  address:string
}

const registerUser = async (payload: RegisterUserProps) => {
  console.log(payload, "payload")
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(`${API_BASEURL}/users/register`, payload, config);

  return data;
}

const getUsers = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };


  const { data } = await axios.get(`${API_BASEURL}/users`, config);
  return data;
}

const getUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_BASEURL}/users/${id}`, config);
  return data
}

const getAllInterests = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try{
    const { data } = await axios.get(`${API_BASEURL}/interests`, config);
    return data

  } catch (error) {

  }
}



const deleteUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.delete(`${API_BASEURL}/users/${id}`, config);
  return data
}

const updateUser = async ({ phone, isDisabled, name, email, merchant_application, id, role, token, business_name, address, website }: any) => {
  const data = {
    role,
    business_name,
    address,
    website,
    merchant_application,
    phone, 
    name, 
    email,
    isDisabled,
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${API_BASEURL}/users/update/${id}`, data , config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again");
  }
}


const reactivateUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/users/reactivateuser/${id}`, {}, config);
  return response.data
}


const disableUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_BASEURL}/users/disableuser/${id}`, {}, config);
  return response.data
}


const userService = {
  registerUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  reactivateUser,
  disableUser,
  getAllInterests
}

export default userService