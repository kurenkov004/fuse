
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//initialize a connection with Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';



const App = () => {
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
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;