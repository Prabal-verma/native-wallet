import express from "express";
import dotenv from "dotenv"
import { dbinit } from "./config/dbconfig.js";
import ratelimiter from "./middleware/ratelimitter.js";
import transcationRoute from "./routes/transactionsRoutes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(ratelimiter)
app.use(express.json());
app.use("/api/transactions", transcationRoute);


dbinit().then(()=>{
  app.listen(PORT, ()=>{
  console.log("Server started at port", PORT);
  });
});

