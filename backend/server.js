import express from "express";
import dotenv from "dotenv"
import { sql } from "./config/dbconfig.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

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


app.post("/api/transactions",async(req,res)=>{
   try {
    const{title,amount,category,user_id}=req.body;
    if(!title || !category || !user_id || amount === undefined){
      return res.status(400).json({message: "All fields are Required"});
    }

    const transaction = await sql`
    INSERT INTO transcations(user_id, title, amount, category)
    VALUES (${user_id}, ${title}, ${amount}, ${category})
    RETURNING *
    `

    console.log(transaction);
    res.status(201).json(transaction[0]);
   } catch (error) {
    res.status(500).json({message: "Internal Server Error in api"});
   }
})

dbinit().then(()=>{
  app.listen(PORT, ()=>{
  console.log("Server started at port", PORT);
  });
});

