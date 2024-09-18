import express from 'express';
import { createPet, getAllPets, getPetsByCity, getPetById, updatePetById, deletePetById} from '../controllers/petController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const petRoutes = express.Router();

// petRoutes.post('/', isLoggedIn, createPet);
petRoutes.post('/', createPet);
petRoutes.get('/', getAllPets);
petRoutes.get('/:city', getPetsByCity);
petRoutes.get('/:id', getPetById);
// petRoutes.put('/:id', isLoggedIn, updatePetById);
petRoutes.put('/:id', updatePetById);
// petRoutes.delete('/:id', isLoggedIn, deletePetById);
petRoutes.delete('/:id', deletePetById);

export default petRoutes;