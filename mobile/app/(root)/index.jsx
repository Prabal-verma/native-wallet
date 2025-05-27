import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { FlatList, Image, Text, TextComponent, TouchableOpacity,RefreshControl, View } from 'react-native'
import { SignOutButton } from './../../components/SignOutButton'
import { useTransaction } from '../../hooks/useTransactions'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import TransactionItem from '../../components/TransactionItem'
import { styles } from '../../assets/styles/home.styles'
import {Ionicons} from "@expo/vector-icons"
import { BalanceCard } from '../../components/BalancedCard'
import {Alert} from "react-native"
import NoTransactionsFound from '../../components/NoTransactionsFound'

export default function Page() {
  const router = useRouter();
  const { user } = useUser()
  const [refreshing,setRefreshing] = useState(false);
  const{transactions,summary,isloading,loadData,deleteTransactions}=useTransaction(user.id);

  const onRefresh = async () => {
  setRefreshing(true);
  await loadData();
  setRefreshing(false);
};


  useEffect(()=>{
    loadData();

  },[loadData]);

  const handleDelete = (id) => {
  Alert.alert(
    "Delete Transaction",
    "Are you sure you want to delete this transaction?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransactions(id),
      },
    ]
  );
};


  if(isloading && !refreshing) return <PageLoader/>;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          {/* Left */}
          <View style={styles.headerLeft}>
            <Image
            source = {require("./../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text> 
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>

            </View>
          </View>

          {/* Right */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>{router.push("/create")}}>
              <Ionicons name="add" size={20} color="#FFF"/>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>

        </View>
        <BalanceCard summary={summary}/>
        <View style={styles.transactionsHeaderContainer}>
          <Text style = {styles.sectionTitle}>Recent Transactions</Text>
          
        </View>
      </View>

      <FlatList
      style = {styles.transactionsList}
      contentContainerStyle = {styles.transactionsListContent}
      data={transactions}
      renderItem={({item})=>(
        <TransactionItem item ={item} onDelete={handleDelete} /> 
      )}
      ListEmptyComponent={<NoTransactionsFound/>}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
      
    </View>
  )
}