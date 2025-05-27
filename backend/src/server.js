import express from "express";
import dotenv from "dotenv"
import { dbinit } from "./config/dbconfig.js";
import ratelimiter from "./middleware/ratelimitter.js";
import transcationRoute from "./routes/transactionsRoutes.js"
import job from "./config/cron.js";

const app = express();
dotenv.config();

if(process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT;
app.use(ratelimiter)
app.use(express.json());
app.use("/api/transactions", transcationRoute);

app.get("/api/health",(req,res)=>{
  res.status(200).json({status:"ok"});
})


dbinit().then(()=>{
  app.listen(PORT, ()=>{
  console.log("Server started at port", PORT);
  });
});

