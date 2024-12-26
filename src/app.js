import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({
    origin: ORIGIN_URL,
    credentials: true,
}));

app.use(express.json({limit: '50kb'}));

app.use(express.urlencoded({ extended: true , limit: '50kb'}));

app.use(express.static('public'));


app.use(cookieParser());

export { app };
