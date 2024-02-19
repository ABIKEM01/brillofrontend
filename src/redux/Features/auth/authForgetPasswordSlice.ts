import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from './authService.ts';



  const initialState: any = {
    products: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const forgetPasswordAction = createAsyncThunk(
    "/forgetPasswordAction",
    async (
        email : string,
      thunkAPI: any,
    ) => {
      try {
        return await authService.forgetPassword(email);
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
  );
  
  export const forgetPasswordSlice = createSlice({
    name: "forgetPassword",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.products = null;

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(forgetPasswordAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(forgetPasswordAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.products = action.payload.message;
          state.message = action.payload.status
        })
        .addCase(forgetPasswordAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something  Went Wrong. Please Try Again";
          state.products = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = forgetPasswordSlice.actions;
  
  export default forgetPasswordSlice.reducer;