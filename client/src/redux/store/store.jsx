import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice'
import petReducer from '../slice/petSlice';
import applicationReducer from '../slice/applicationSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    pet: petReducer,
    application: applicationReducer
  },
});

export default store;
