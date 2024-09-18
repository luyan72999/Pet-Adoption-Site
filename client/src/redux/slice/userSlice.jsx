import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from "axios";

// 1.login action
export const loginUser = createAsyncThunk(
    "users/login",
    async ({email, password}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`,
                {
                    email,
                    password,
                }); 
                // save the user into localStorage
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                console.log(res.data);
                return res.data;
        } catch (error) {
            // get the error from the backend, e.g. invalid credentials
            return rejectWithValue(error?.response?.data);
        }
    }
);

//2. register action
export const registerUser = createAsyncThunk(
    "users/register",
    async ({email, password, name, birthYear}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`,
                {
                    email,
                    password,
                    name,
                    birthYear,
                }); 
                return res.data;
        } catch (error) {
            // get the error from the backend
            return rejectWithValue(error?.response?.data);
        }
    }
);

// get user profile action
export const getUserProfile = createAsyncThunk(
    "users/profile",
    async ({token}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
              });
        
            return res.data;
        } catch (error) {
            // get the error from the backend, e.g. invalid credentials
            return rejectWithValue(error?.response?.data);
        }
    }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    users: [],
    user: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    userProfile: {
        loading: false,
        error: null,
        profile: {},
        applications: []
    },
    success: false,
  },
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
    logOut(state) {
      state.userAuth.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder)=>{
    //handle actions
    //1. login
    builder.addCase(loginUser.pending, (state, action)=>{
        state.userAuth.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action)=>{
        state.userAuth.userInfo = action.payload;
        //console.log(state.userAuth.userInfo);
        state.userAuth.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action)=>{
        state.userAuth.error = action.payload;
        //console.log(state.userAuth.error);
        state.userAuth.loading = false;
    });  

     // 2. register
     builder.addCase(registerUser.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action)=>{
        state.user = action.payload;
        state.success = true;
        //console.log(state.userAuth.userInfo);
        state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action)=>{
        state.error = action.payload;
        //console.log(state.userAuth.error);
        state.loading = false;
    }); 

    // 3. get User Profile
    builder.addCase(getUserProfile.pending, (state, action)=>{
        state.userProfile.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action)=>{
        state.userProfile.profile = action.payload.user;
        state.userProfile.applications = action.payload.applications;
        state.userProfile.loading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action)=>{
        state.userProfile.error = action.payload;
        state.userProfile.loading = false;
    }); 
  } 
});

const userReducer = userSlice.reducer;
export const {resetSuccess, logOut} = userSlice.actions;
export default userReducer;
