import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params; //extract props from navigation
  const [messages, setMessages] = useState([]); //state to handle new messages being set/ rendered


  //this is triggered right after the Chat component mounts
  useEffect(() => {
    navigation.setOptions({ title: name }) // changes the title of the navbar to the name the user entered on Start screen
    setMessages([ //this will make the page load two static messages
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //function to handle new messages 
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
        _id: 1,
        name
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