
import { combineReducers } from "@reduxjs/toolkit";
import {  //AUTH
  loginUserReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  authVerifyEmailReducer,
  emailRegVerificationSlice ,
  //USER
  registerUserReducer,
  getUserReducer,
  getUsersReducer,
  updateUserReducer,
  deleteUser} from "./combineImports.ts";

const reducers = combineReducers({
  
      //LOGIN REDUCERS
      authUser: loginUserReducer,
      emailRegVerification: emailRegVerificationSlice,

       //USERS REDUCERS 
    getUsers: getUsersReducer,
    registerUser: registerUserReducer,
    delete: deleteUser,
    getUser: getUserReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    updateUser: updateUserReducer,
    
    authVerifyEmail: authVerifyEmailReducer,
});

export { reducers };