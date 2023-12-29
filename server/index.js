import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import dbConfig from "./src/configs/db.config.js";
import routes from "./src/routes/index.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", routes);

// Connect MongoDB
dbConfig.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ads-management", server, port);
