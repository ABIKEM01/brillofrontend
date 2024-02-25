import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService.ts';
import { toast } from "react-toastify";


const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: null,
    token: null,
    id: null
}

export const logOutAction = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear()

    toast.success("Logout Successfully");
    setTimeout(() => {
        window.location.href = "/";
    }, 2000)
}

//LOGIN USER

export const loginAction = createAsyncThunk(
    "loginAction",
    async ({email, password,phone}: any, thunkAPI) => {
        try {
            console.log(email, password,phone, "hereee2")
            return await authService.login({email, password,phone});
        } catch (error: any) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.error) ||
              error.message || error.error
              error.toString();
            toast.warning(`${message}`);
            return thunkAPI.rejectWithValue(message);
          }
    }
)

//CREATE THE SLICE

export const authLoginSlice = createSlice({
    name: "authLogin",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.user = null;
            state.token = null;
            state.id = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action?.payload?.user?.token;
                state.id = action?.payload?.user?._id;
                state.message = null;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            })
    }
})


export const { reset } = authLoginSlice.actions;

export default authLoginSlice.reducer;




