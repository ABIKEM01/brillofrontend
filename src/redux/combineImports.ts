import loginUserReducer  from './Features/auth/authLoginSlice.ts';
import getUsersReducer from "./Features/user/getUsersSlice.ts";
import registerUserReducer from "./Features/user/registerUserSlice.ts";
import deleteUser from "./Features/user/deleteUserSlice.ts";
import getUserReducer from "./Features/user/getUserSlice.ts";
import forgetPasswordReducer  from "./Features/auth/authForgetPasswordSlice.ts";
import resetPasswordReducer  from "./Features/auth/authResetPasswordSlice.ts";
import authVerifyEmailReducer from "./Features/auth/authVerifyEmailSlice.ts";
import emailRegVerificationSlice  from "./Features/auth/authEmailRegVerificationSlice.ts";
import updateUserReducer from "./Features/user/updateUserSlice.ts";




export {
   

    //AUTH
    loginUserReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    authVerifyEmailReducer,
    emailRegVerificationSlice ,
    //USER
    registerUserReducer,
    getUserReducer,
    getUsersReducer,
    deleteUser,
    updateUserReducer
    
}

