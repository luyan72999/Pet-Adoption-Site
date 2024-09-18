import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// function: create an application
// end point: POST /api/v1/applications
// access: private (user login needed)
export const  createApplication =  expressAsyncHandler(async(req, res) => {
  const {userEmail, petID, personalStatement} = req.body;
  // check if already exist
  const applicationExists = await prisma.application.findUnique({
    where: {
      userEmail_petID: {
        userEmail: userEmail,
        petID: petID
      }
    },
  });
  if (applicationExists) {
    // throw an error
    throw new Error("Application failed: application already exist.");
  }

  const application = await prisma.application.create({
    data: {
      userEmail: userEmail,
      petID: petID,
      personalStatement: personalStatement
    }
  });

  res.status(201).json({
    status: "success",
    message: "Application created sucessfully",
    data: application
  });
});

// function: withdraw an application
// end point: UPDATE /api/v1/applications/withdraw
// access: private (user login needed)
// export const  withdrawApplication =  expressAsyncHandler(async(req, res) => {
//   const {userEmail, petID} = req.body;
//   const withdrawnApplication = await prisma.application.update({
//     where: {
//       userEmail_petID: {
//         userEmail: userEmail,
//         petID: petID
//       }
//     },
//     data: {
//       applicationStatus: "withdrawn"
//     },
//   });
//   res.json({
//     status: "success",
//     message: "Application withdrawn sucessfully",
//     data: withdrawnApplication
//   });
// });

// function: approve an application
// end point: UPDATE /api/v1/applications/approve
// access: private (admin login needed)
// export const  approveApplication =  expressAsyncHandler(async(req, res) => {
//   const {userEmail, petID} = req.body;
//   const application = await prisma.application.update({
//     where: {
//       userEmail_petID: {
//         userEmail: userEmail,
//         petID: petID
//       }
//     },
//     data: {
//       applicationStatus: "approved"
//     },
//   });
//   res.json({
//     status: "success",
//     message: "Application approved sucessfully",
//     data: application
//   });
// });


// function: reject an application
// end point: UPDATE /api/v1/applications/reject
// access: private (admin login needed)
// export const rejectApplication =  expressAsyncHandler(async(req, res) => {
//   const {userEmail, petID} = req.body;
//   const application = await prisma.application.update({
//     where: {
//       userEmail_petID: {
//         userEmail: userEmail,
//         petID: petID
//       }
//     },
//     data: {
//       applicationStatus: "rejected"
//     },
//   });
//   res.json({
//     status: "success",
//     message: "Application rejected sucessfully",
//     data: application
//   });
// });

// function: get all applications
// end point: GET /api/v1/applications
// access: private (admin login needed)
export const getAllApplications = expressAsyncHandler(async(req, res)=>{
  const applications = await prisma.application.findMany();
  
  // might need pagnination 
 
  res.json({
    status: "success",
    message: "Applications fetched successfully.",
    data: applications
  });
}
);

// function: get all applications
// end point: GET /api/v1/applications/:email
// access: private (admin login needed)
export const getApplicationsByUser = expressAsyncHandler(async(req, res)=>{
  const applications = await prisma.application.findMany({
    where: {
      userEmail: req.params.email,
    }
  });
  
  res.json({
    status: "success",
    message: "Applications for the user fetched successfully.",
    data: applications
  });
}
);