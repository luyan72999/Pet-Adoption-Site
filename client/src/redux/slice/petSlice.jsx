import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    pets:[],
    petsByCity: [],
    pet: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false
}

// 1.create pet action
export const createPet = createAsyncThunk(
    "pets/create",
    async ({petName, petGender, petBirthYear, petCity, petImageUrl, petDescription}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/pets`,
                {
                    name: petName,
                    birthYear: petBirthYear,
                    gender: petGender,
                    city: petCity,
                    imageUrl: petImageUrl,
                    description: petDescription
                }); 
                return res.data;

        } catch (error) {
            // get the error from the backend, e.g. invalid credentials
            // console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

// 2.get all pets action
export const getPets = createAsyncThunk(
    "pets/get-all",
    async ({}, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/pets`); 
            console.log(res.data); 
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

// 3.delete pet action
export const deletePet = createAsyncThunk(
    "pets/delete",
    async (petID, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/pets/${petID}`); 
            return res.data;

        } catch (error) {
            // get the error from the backend, e.g. invalid credentials
            // console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

// 4. edit pet action
export const editPet = createAsyncThunk(
    "pets/edit",
    async ({ petName, petGender, petBirthYear, petCity, petImageUrl, petDescription, petID}, {rejectWithValue, getState, dispatch}) => {
        try {
            const yearInt = parseInt(petBirthYear, 10);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/pets/${petID}`, {
                name: petName,
                gender: petGender,
                city: petCity,
                description: petDescription,
                birthYear: yearInt,
                imageUrl: petImageUrl
            }); 
            return res.data;

        } catch (error) {
            // get the error from the backend, e.g. invalid credentials
            // console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

// 5.get pets from a city action
export const getPetsByCity = createAsyncThunk(
    "pets/get-by-city",
    async (city, {rejectWithValue, getState, dispatch}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/pets/${city}`); 
            console.log(res.data); 
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


const petSlice = createSlice({
  name: 'pet',
  initialState: initialState,
  reducers: {
    resetIsAdded(state) {
      state.isAdded = false;
    },
    resetIsUpdated(state) {
        state.isUpdated = false;
    },
  },
  extraReducers: (builder)=>{
    //handle actions
    //1. create pet
    builder.addCase(createPet.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(createPet.fulfilled, (state, action)=>{
        state.pet = action.payload;
        state.loading = false;
        state.isAdded = true;
    });
    builder.addCase(createPet.rejected, (state, action)=>{
        state.error = action.payload;
        state.pet = null;
        state.loading = false;
        state.isAdded = false;
    });  

    //2. get all pets
    builder.addCase(getPets.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(getPets.fulfilled, (state, action)=>{
        state.pets = action.payload;
        state.loading = false;
    });
    builder.addCase(getPets.rejected, (state, action)=>{
        state.error = action.payload;
        // state.pets = [];
        state.loading = false;
    });  

    //3. delete pet
    builder.addCase(deletePet.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(deletePet.fulfilled, (state, action)=>{
        state.pets.data = state.pets.data.filter(pet => pet.petID !== action.payload.data.petID);
        console.log(state.pets.data);
        state.loading = false;
    });
    builder.addCase(deletePet.rejected, (state, action)=>{
        state.error = action.payload;
        state.loading = false;
    });  

    //4. edit pet
    builder.addCase(editPet.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(editPet.fulfilled, (state, action)=>{
        state.loading = false;
        state.isUpdated = true;
    });
    builder.addCase(editPet.rejected, (state, action)=>{
        state.error = action.payload;
        state.loading = false;
    });  

      //5. get pets by city
    builder.addCase(getPetsByCity.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(getPetsByCity.fulfilled, (state, action)=>{
        state.petsByCity = action.payload;
        state.loading = false;
    });
    builder.addCase(getPetsByCity.rejected, (state, action)=>{
        state.error = action.payload;
        state.loading = false;
    });  

  } 
});

const petReducer = petSlice.reducer;
export const { resetIsAdded } = petSlice.actions;
export const { resetIsUpdated } = petSlice.actions;
export default petReducer;
