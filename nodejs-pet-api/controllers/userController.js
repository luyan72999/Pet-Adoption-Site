import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

const prisma = new PrismaClient();
// function: user registration
// endpoint: POST /api/v1/users/register
// access: private; only the developer can register an Admin user
export const registerUser = expressAsyncHandler(async(req, res) => {

  const {email, password, name, birthYear, role} = req.body;
  const birthYearInt = parseInt(birthYear, 10);
  
  // check if the user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      userEmail: email
    },
  });
  if (userExists) {
    // throw an error
    throw new Error("Registration failed: user email already exist.");
  }

  const user = await prisma.user.create({
    data: {
      userEmail: email,
      userPassword: password,
      userName: name,
      userBirthYear: birthYearInt,
      userRole: role
    },
  });

  res.status(201).json({
    status: "success",
    message: "User registered sucessfully",
    data: user
  });
});

// function: user login
// endpoint: POST /api/v1/users/login
// access: public
export const loginUser = expressAsyncHandler(async(req, res) => {
  const {email, password} = req.body;
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      userEmail: email
    },
  });

  if (user && user.userPassword === password) {
    
    res.status(200).json({
      status: "success",
      message: "Login succeeded",
      data: user,
      token: generateToken(user?.userEmail)
    });
  } else if (!user) {
    throw new Error("Login failed: user does not exist.");
  } else {
    throw new Error("Login failed: invalid credentials.");
  }
});

// function: get user profile and applications
// endpoint: GET /api/v1/users/profile
// access: private
export const getUserProfile = expressAsyncHandler((async(req, res)=>{

  // extract the token from request header
  const token = getTokenFromHeader(req);
  console.log(token);
  //send token to JWT server to verify the token
  const decodedUser = verifyToken(token);

  if (decodedUser) {
    const email = decodedUser.userId;
    // get user info
    const user = await prisma.user.findUnique({
      where: {
        userEmail: email
      },
    });
    console.log(user);

    if (!user) {
      throw new Error("User does not exist");
    }

    const applications = await prisma.application.findMany({
      where: {
        userEmail: email,
      },
      include: {
        pet: true, // include related pet details
      },
    });

    res.json({
      message: "get profile succeeded",
      user: user,
      applications: applications
    })
  }
}));

// function: delete
// endpoint: DELETE /api/v1/users/:email
// access: private
export const deleteUser = expressAsyncHandler((async(req, res)=>{
  const deletedUser = await prisma.user.delete({
    where: {
      userEmail: req.params.email,
    },
  });

  if (!deletedUser) {
    throw new Error("User is not found.")
  }

  res.json({
    status: "success",
    message: "User is deleted successfully.",
  });
}));


// function: get user applications (not sure should be there or should be in applicationController?)
// endpoint: GET /api/v1/users/application
// access: private
// export const getUserApplication = expressAsyncHandler((async(req, res)=>{
  
 
// }));

