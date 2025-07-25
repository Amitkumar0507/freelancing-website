import express from "express";
import dotenv from "dotenv";
import { db } from "./firebase_admin.js";
import cors from "cors";
import router from "./routes/routes.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT =  3000

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // frontend domain
    credentials: true,
  }));
app.use(cookieParser());

app.use("/user",router);

app.listen(PORT,()=>{
    console.log(`Server is listening to post : ${PORT}`);
});