import { View, Text } from 'react-native'
import { useRouter } from "expo-router"
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [isExpense, setIsExpense] = useState(true);
const [isLoading, setIsLoading] = useState(false);

const handleCreate = async () => {
  // validations
  if (!title.trim()) return Alert.alert("Error", "Please enter a transaction title");
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    Alert.alert("Error", "Please enter a valid amount");
    return;
  }

  if (!selectedCategory) return Alert.alert("Error", "Please select a category");

  setIsLoading(true);
  try {
    
  } catch (error) {
    
  } finally {
    setIsLoading(false);
  }
};


const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <View>
      <Text>CreateScreen</Text>
    </View>
  );
}

export default CreateScreen
