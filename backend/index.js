import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config({});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());

const corsOption = {
    origin: ['http://localhost:3000', 'https://chat-2-0-1.onrender.com'], // Allowed origins
    credentials: true, // Allows cookies and other credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    optionsSuccessStatus: 204, // Status code for successful OPTIONS requests
    preflightContinue: false, // Determines if the middleware should move to the next middleware after handling OPTIONS requests
    maxAge: 86400 // Max age for the preflight response in seconds (24 hours)
};

app.use(cors(corsOption)); 

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Fallback to index.html for React Router
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
});
