import express from "express";
import dotenv from "dotenv"
import { sql } from "./config/dbconfig.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

async function dbinit(){
  try {
    await sql`CREATE TABLE IF NOT EXISTS transcations(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL, 
    amount DECIMAL(10,2) NOT NULL,  
    category VARCHAR(255) NOT NULL, 
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("Database Initialised successfully");
  } catch (error) {
    console.log("Error initailsing DB");
    process.exit(1);
  }
}

app.get("/", (req,res)=>{
  res.send("working");
})

dbinit().then(()=>{
  app.listen(PORT, ()=>{
  console.log("Server started at port", PORT);
  });
});

