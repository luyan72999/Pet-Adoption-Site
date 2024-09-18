import mongoose from "mongoose";

const dbConnect = async ()=> {
  // the async keyword defines an asynchronous function
  try {
    // mongoose.connect('url') returns a Promise, so we can use await to wait for promises to resolve or reject.
    const connected = await mongoose.connect(process.env.MANGODB_URL); // the mangoDB connection url
    console.log(`MongoDB connected: ${connected.connection.host}`)
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1);
  }
}

export default dbConnect;
