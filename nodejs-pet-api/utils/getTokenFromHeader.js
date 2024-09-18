
export const getTokenFromHeader = (req)=>{
  // extract the token from request header
  const headerObj = req?.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  // const token = headerObj?.authorization?.split[" "][1];
  // note: use ?. to ensure the data exist before extracting to prevent errors, because in a request the data might be missing
  if (token === undefined) {
    return "token does not exist";
  } else {
    return token;
  }
}