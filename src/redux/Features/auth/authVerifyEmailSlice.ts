import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {verifyEmail} from './authService.ts';


  const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const verifyEmailAction = createAsyncThunk(
    "/verifyEmailAction",
    async (
       {id, token}:any,
      thunkAPI
    ) => {
      try {
        return await verifyEmail({id, token});
      } catch (error: any) {
        const message : any = toast.warning("Email Verification Token Expired. Kindly generate a new Token ");
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const verifyEmailSlice = createSlice({
    name: "verifyEmail",
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
        .addCase(verifyEmailAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(verifyEmailAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload
        })
        .addCase(verifyEmailAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something  Went Wrong. Please Try Again";
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = verifyEmailSlice.actions;
  
  export default verifyEmailSlice.reducer;