import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";
const app = express();

//middlewares
app.use(cors({ origin: true, methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

//mongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Connected to Server, Port: ${PORT}`);
});
