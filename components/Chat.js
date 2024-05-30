import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { name, background, _id } = route.params; //extract props from navigation
  const [messages, setMessages] = useState([]); //state to handle new messages being set/ rendered


  //this is triggered right after the Chat component mounts
  useEffect(() => {
    navigation.setOptions({ title: name }) // changes the title of the navbar to the name the user entered on Start screen
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

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

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: _id,
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