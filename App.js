
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//initialize a connection with Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { getStorage } from 'firebase/storage';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection is lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]) //if the dependency's value changes, the useEffect() code will be re-executed

  // My web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBvFpeDFNTSzEY26swQqEbqTt-1Kq_iG8A",
    authDomain: "chatapp-67386.firebaseapp.com",
    projectId: "chatapp-67386",
    storageBucket: "chatapp-67386.appspot.com",
    messagingSenderId: "900936407621",
    appId: "1:900936407621:web:540e18f347cb0b216ca12c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service, in this case, the "db" variable
  const db = getFirestore(app);
  const storage = getStorage(app); // initializes the Firebase storage handler

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start" //prop value should be the name of a Stack.Screen (either one)
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name='Chat' >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} storage={storage} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;