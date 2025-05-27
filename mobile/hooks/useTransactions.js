import { use, useCallback, useState } from "react"
import {Alert} from "react-native"

const API_URL = "https://native-wallet.onrender.com/api"
export const useTransaction = (userId)=>{
  const [transactions,setTransactions] = useState([]);
  const [summary,setSummary] = useState({
    balance:0,
    income:0,
    expense:0,
  })  
  const [isloading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async()=>{
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`)
      const data = await response.json();
      setTransactions(data);    
    } catch (error) {
      console.log("Error Fetching data1", error);
      
    }

  },[userId])

  const fetchSummary = useCallback(async()=>{
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error Fetching data2", error);
    }
  },[userId])

  const loadData = useCallback(async()=>{
    if(!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(),fetchSummary()]);

    } catch (error) {
      console.log("Error loading data3", error);
    } finally{
      setIsLoading(false);

    }
  },[fetchTransactions,fetchSummary,userId]); 

  const deleteTransactions = async(id)=>{
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`,{method:"DELETE"});
      if(!response.ok) throw new Error("Failed to delete Transaction");
      loadData();
      Alert.alert("success","Transactu=ion Delete Successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error",error.message);
      
    }
  };

  return{transactions,summary,isloading,loadData, deleteTransactions};

}