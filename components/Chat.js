import CustomActions from './CustomActions';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params; //extract props from navigation
  const [messages, setMessages] = useState([]); //state to handle new messages being set/ rendered


  let unsubMessages;
  
  //this is triggered right after the Chat component mounts
  useEffect(() => {
    if (isConnected === true) {

    // unregister current onSnapshot() listener to avoid registering multiple listeners when
    // useEffect code is re-executed.
    if (unsubMessages) unsubMessages();
    unsubMessages = null;

    navigation.setOptions({ title: name }) // changes the title of the navbar to the name the user entered on Start screen
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach(doc => { //doc stands for each document in the docSnapshot collection
        newMessages.push({
          id: doc.id,
          ...doc.data(), 
          createdAt: new Date(doc.data().createdAt.toMillis()) 
        })
      })
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("Messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
  
  //function to handle new messages, saves them to Firestore db by using addDoc()
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  //function to customize chat bubble colours
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        } 
      }}
    />
  }

  //function to override GiftedChat's InputToolbar in case user goes offline
  const renderInputToolbar = (props) => {
    if(isConnected)
      return <InputToolbar {...props} />;
    else return null;
  }

  //this creates the circle action button
  const renderCustomActions = (props) => {
    return <CustomActions {...props} storage={storage} userID={userID} />
  }

  //this checks if the currentMessage contains location data - if yes, it will return MapView
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }


 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderCustomActions}
      onSend={messages => onSend(messages)}
      renderCustomView={renderCustomView}
      user={{
        _id: userID,
        name: name
      }}
     />
     {Platform.OS ==='android' ? <KeyboardAvoidingView behavior='height' /> : null }
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;