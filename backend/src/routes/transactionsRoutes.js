import express from "express"
import { sql } from "../config/dbconfig.js";
import {createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId} from "./../controllers/transactionControllers.js"

const router = express.Router();

router.get("/:userId", getTransactionsByUserId)

router.delete("/:id",deleteTransaction)
router.post("/",createTransaction)

router.get("/summary/:userId",getSummaryByUserId)

export default router;