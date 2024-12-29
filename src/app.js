import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}));

app.use(express.json({limit: '50kb'}));

app.use(express.urlencoded({ extended: true , limit: '50kb'}));

app.use(express.static('public'));

app.use(cookieParser());

// router
import { router } from "./routes/user.routes.js";
app.use("/api/v1/users", router);
// http://localhost:8000/api/v1/users/register

export { app };
