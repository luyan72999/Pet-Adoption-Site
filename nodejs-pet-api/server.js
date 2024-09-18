//This file is the server file to run the application

// nodeJS http module: https://www.w3schools.com/nodejs/nodejs_http.asp
import http from 'http';
import app from './app/app.js'
import dotenv from 'dotenv';

//the port on which the server should listen
// if the environment variable PORT is set (usually during deployment/production), use that one; otherwise, use the default 8000
const PORT = parseInt(process.env.PORT || 8000);

const server = http.createServer(app);
// listen to the client at a port
server.listen(PORT, console.log(`Server is running on port ${PORT}`));



