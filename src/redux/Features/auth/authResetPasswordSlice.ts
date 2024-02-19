import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {resetPassword} from './authService.ts';


  const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const resetPasswordAction = createAsyncThunk(
    "/resetPasswordAction",
    async (
       {id, token, newPassword}:any,
      thunkAPI
    ) => {
      try {
        return await resetPassword({id, token, newPassword});
      } catch (error: any) {
        const message : any = toast.warning("Password Reset Token Expired. Kindly generate a new Token ");
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetPasswordAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(resetPasswordAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload
        })
        .addCase(resetPasswordAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something  Went Wrong. Please Try Again";
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = resetPasswordSlice.actions;
  
  export default resetPasswordSlice.reducer;