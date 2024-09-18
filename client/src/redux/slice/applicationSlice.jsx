import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    application: {},
    applications: [],
    loading: false,
    error: null,
    isApplied: false
}
// 1. create application
export const createApplication = createAsyncThunk(
  "applications/create",
  async ({userEmail, petID}, {rejectWithValue, getState, dispatch}) => {
      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/applications`, {
            userEmail: userEmail,
            petID: petID
          }); 
          console.log(res.data); 
          return res.data;
      } catch (error) {
          return rejectWithValue(error?.response?.data);
      }
  }
);

// 2. get all applications
export const getAllApplications = createAsyncThunk(
    "applications/get-all",
    async ({}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/applications`); 
            console.log(res.data); 
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


const applicationSlice = createSlice({
    name: 'application',
    initialState: initialState,
    reducers: {
      resetIsApplied(state) {
        state.isApplied = false;
      },
    },
    extraReducers: (builder)=>{
      //handle actions
      //1. create application
      builder.addCase(createApplication.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(createApplication.fulfilled, (state, action)=>{
        state.application = action.payload;
        state.loading = false;
        state.isApplied = true;
    });
    builder.addCase(createApplication.rejected, (state, action)=>{
        state.error = action.payload;
        state.loading = false;
    }); 

      //2. get all applications
      builder.addCase(getAllApplications.pending, (state, action)=>{
          state.loading = true;
      });
      builder.addCase(getAllApplications.fulfilled, (state, action)=>{
          state.applications = action.payload;
          state.loading = false;
      });
      builder.addCase(getAllApplications.rejected, (state, action)=>{
          state.error = action.payload;
          state.loading = false;
      }); 
    } 
  });
  
  const applicationReducer = applicationSlice.reducer;
  export const { resetIsApplied } = applicationSlice.actions;
  export default applicationReducer;
  

