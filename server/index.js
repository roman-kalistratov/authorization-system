import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import multer from "multer";

const app = express();
// const allowedOrigins = ['https://authorizationrk.vercel.app'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// };

// multer settings
const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../client/public/upload`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadAvatar = multer({ storage: storageUser });
//middlewares
app.use(cors({ origin: true, credentials: true }));
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", uploadAvatar.single("file"), authRoute);
app.use("/api/v1/user", userRoute);

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
