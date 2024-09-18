import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
// function: create new pet
// endpoint: POST /api/v1/pets
// access: private(admin)
export const createPet = expressAsyncHandler(async(req, res) => {
  const {name, gender, birthYear, city, description, imageUrl} = req.body;
  const yearInt = parseInt(birthYear, 10);
  // create product
  const pet = await prisma.pet.create({
    data: {
      petName: name,
      petBirthYear: yearInt,
      petGender: gender,
      petCity: city,
      petDescription: description,
      imageUrl: imageUrl
    },
  });
  // send a response 
  res.status(201).json({
    status: "success",
    message: "Pet created sucessfully",
    data: pet
  });
});


// function: get all pet
// endpoint: GET /api/v1/pets
// access: public
// if the user doesn't allow to share the location, fetch all pets; otherwise, fetch pets from that city
export const getAllPets = expressAsyncHandler(async(req, res)=>{
  const pets = await prisma.pet.findMany();
  
  // might need pagnination 
 
  res.json({
    status: "success",
    message: "Pets fetched successfully.",
    data: pets
  });
}
);

// function: get all pets from a city
// endpoint: GET /api/v1/pets/:city
// access: public
// if the user allows to share the location, fetch all pets from that city
export const getPetsByCity = expressAsyncHandler(async(req, res)=>{
  const city = req.params.city;
  const pets = await prisma.pet.findMany({
    where: {
      petCity: {
        equals: city
      }
    }
  });
  
  // might need pagnination 
 
  res.json({
    status: "success",
    message: "Pets from a city fetched successfully.",
    data: pets
  });
}
);

// function: get a single pet by ID
// endpoint: /api/v1/pets/:id (i.e. /api/v1/pets/123456789)
// access: public
export const getPetById = expressAsyncHandler(async(req, res)=>{
  const id = parseInt(req.params.id);
  const pet = await prisma.pet.findUnique({
    where: {
      petID: id
    },
  })

  if(!pet) {
    throw new Error("Pet id is not found.");
  } 

  res.json({
    status: "success",
    message: "Pet is fetched successfully.",
    data: pet,
  });
});

// function: update a single pet by ID
// endpoint: PUT /api/v1/pets/:id (i.e. /api/v1/pets/123456789)
// access: private(admin)
export const updatePetById = expressAsyncHandler(async(req, res)=>{
  const {name, gender, birthYear, city, description, imageUrl} = req.body;
  const id = parseInt(req.params.id);
  const updatedPet = await prisma.pet.update({
    where: {
      petID: id,
    },
    data: {
      petName: name,
      petBirthYear: birthYear,
      petGender: gender,
      petCity: city,
      petDescription: description,
      imageUrl: imageUrl
    },
  });

  if (!updatedPet) {
    throw new Error("Pet to update is not found.")
  }

  res.json({
    status: "success",
    message: "Pet is updated successfully.",
    data: updatedPet,
  });
});

// function: delete a single pet by ID
// endpoint: DELETE /api/v1/pets/:id (i.e. /api/v1/pets/123456789)
// access: private(admin)
export const deletePetById = expressAsyncHandler(async(req, res)=>{
  const id = parseInt(req.params.id);
  const deletedPet = await prisma.pet.delete({
    where: {
      petID: id,
    },
  })
  if (!deletedPet) {
    throw new Error("Pet is not found.")
  }
  res.json({
    status: "success",
    message: "Pet is deleted successfully.",
    data: deletedPet
  });
});


// Maybe the following filtering can be done only in the front end? So no need to reach database each time.
// filterByName 
// filterByGender 
// filterByAge: under 1, 1 to 3, 4 to 6, above 6, etc.

// filterByCity
