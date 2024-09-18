import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const payload = {userId: userId};
  const secretKey = process.env.JWT_KEY;  // keep this key secret
  const expire = {expiresIn: "1y"};
  return jwt.sign(payload, secretKey, expire);
}