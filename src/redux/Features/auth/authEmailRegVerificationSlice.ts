import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {emailRegVerification} from './authService.ts';


  const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: "",
  };
  
export const emailRegVerificationAction = createAsyncThunk(
    "/emailRegVerificationAction",
    async (
       id: string,
      thunkAPI
    ) => {
      try {
        return await emailRegVerification(id);
      } catch (error: any) {
        const message : any = toast.warning("Email Verification Token Expired. Kindly generate a new Token ");
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const emailRegVerificationSlice = createSlice({
    name: "emailRegVerification",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(emailRegVerificationAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(emailRegVerificationAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload
        })
        .addCase(emailRegVerificationAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something  Went Wrong. Please Try Again";
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = emailRegVerificationSlice.actions;
  
  export default emailRegVerificationSlice.reducer;