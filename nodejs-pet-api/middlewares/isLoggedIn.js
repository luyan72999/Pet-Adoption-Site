import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import expressAsyncHandler from 'express-async-handler';

export const isLoggedIn = expressAsyncHandler((req, res, next) => {
  // extract the token from request header
  const token = getTokenFromHeader(req);
  //send token to JWT server to verify the token
  const decodedUser = verifyToken(token);
  // save the user into request obj
  if (!decodedUser) {
    throw new Error("Token expired or invalid.")
  } else {
    req.userAuthId = decodedUser.userId;
    next();
  }
});