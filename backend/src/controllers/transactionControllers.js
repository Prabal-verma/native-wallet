import { sql } from "../config/dbconfig.js";

export async function getTransactionsByUserId(req,res){
  try {
    const {userId} = req.params;
    console.log(userId);
    const transcations = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    res.status(200).json(transcations);
    
  } catch (error) {
    res.status(500).json({message: "Internal Server Error in api"});
    console.log(error);

  }
}

export async function createTransaction(req,res){
   try {
    const{title,amount,category,user_id}=req.body;
    if(!title || !category || !user_id || amount === undefined){
      return res.status(400).json({message: "All fields are Required"});
    }

    const transaction = await sql`
    INSERT INTO transactions(user_id, title, amount, category)
    VALUES (${user_id}, ${title}, ${amount}, ${category})
    RETURNING *
    `

    console.log(transaction);
    res.status(201).json(transaction[0]);
   } catch (error) {
    res.status(500).json({message: "Internal Server Error in api"});
   }
}

export async function deleteTransaction(req,res){
  try {
    const{id} = req.params;
    console.log(id);

    if(isNaN(parseInt(id))){
      return res.status(400).json({message:"Invalid Transaction id"});
    }
    const result = await sql`
    DELETE FROM transactions WHERE id = ${id} RETURNING *
    `
    if(result.length ===0){
      return res.status(404).json({message:"Transaction Not Found"});
    }

    res.status(200).json({message:"Transaction Delete Successfully"});
  } catch (error) {
    console.log("Unabale to Delete")
  }
}

export async function getSummaryByUserId(req,res){
  try {
    const {userId} = req.params;
    console.log("hello",userId);

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
    `
    
    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
    `
    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id = ${userId} AND amount < 0
    `
    res.status(200).json({
      balance:balanceResult[0].balance,
      income:incomeResult[0].income,
      expense:expenseResult[0].expense
    })
    
  } catch (error) {
    res.status(500).json({message: "Internal Server Error in api"});
    console.log(error);
  }

}