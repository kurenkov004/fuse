import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params; //extract props from navigation

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <Text>Welcome to Chat!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;