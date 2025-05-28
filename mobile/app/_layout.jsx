import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import SafeScreen from "./../components/SafeScreen.jsx";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style='dark'/>
    </ClerkProvider>
  );
}
