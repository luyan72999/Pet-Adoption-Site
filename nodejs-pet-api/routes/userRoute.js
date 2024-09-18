// use specific route for a specific controller and model
// express router
// the router for user registration
import express from 'express';
import {registerUser, loginUser, getUserProfile, deleteUser} from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router();

userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/profile', isLoggedIn, getUserProfile); // pass the middleware isLoggedIn before the getUserProfile, to ensure only logged in user can use that endpoint to check user profile
userRoutes.delete('/:email', isLoggedIn, deleteUser);

export default userRoutes;