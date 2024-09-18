// use specific route for a specific controller and model
// express router
// the router for user registration
import express from 'express';
import {createApplication, getAllApplications, getApplicationsByUser} from '../controllers/applicationController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const applicationRoutes = express.Router();

applicationRoutes.post('/', createApplication);
applicationRoutes.get('/', getAllApplications);
applicationRoutes.get('/:email', getApplicationsByUser);

export default applicationRoutes;