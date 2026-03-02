import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/db.js";

const app = express();

dotenv.config();
dbConnection();

app.get("/api", (req, res) => {
  res.json("Doc_Gen_Backend");
});

export default app;
