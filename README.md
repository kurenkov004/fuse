# Fuse App
This is a project created for the careerFoundry Full Stack Development Course. It is a chat app for mobile devices made using React Native as the framework. The app will provide users with a chat interface and options to share images and their location.
## Features and Requirements
### Key Features:
- a Start page where useres can enter their name and select a background color for the chat screen before entering the chat room
- a Chat page displaying the conversation as well as an input field and submit button
- Chat allows the sharing of image files and location data
- Data gets stored online using Google Firebase and offline using client-side storage; this will enable users to read old messages without an internet connection available.

### Technologies Used:
- React Native as the framework
- Expo as the development platform
- Google Firebase for cloud-cased storage of messages and image files sent through the chat
- GiftedChat library for creating the chat interface
- Android Studio for a device emulator

### Dependencies:
- @react-navigation/native: ^6.1.17
- @react-navigation/native-stack: ^6.9.26
- expo: ~51.0.8
- expo-status-bar: ~1.12.1
- firebase: ^10.3.1
- react: 18.2.0
- react-native: 0.74.1
- react-native-gifted-chat: ^2.4.0
- react-native-safe-area-context: 4.10.1
- react-native-screens: 3.31.1
- @react-native-async-storage/async-storage: 1.23.1
- @react-native-community/netinfo: 11.3.1
- expo-location: ~17.0.1
- react-native-maps: 1.14.0
- expo-image-picker: ~15.0.5

### Installation:
- Clone this repository
- Install Node.js (It's recommended to use version 16.19.0 to avoid issues down the line)
- Install Expo globally using "-g expo-cli"
- Install dependencies listed above
- Navigate to the desired project folder and use "npx create-expo-app hello-world --template" to create your project (sub "hello world" for your project name).It's recommended to start with a Blank template for a clean canvas to work from
- use "npx expo start" to start your development server and check it with the Expo Go
- set up Firebase - follow prompt to create a new Firestore Database, make sure to set all rules to "allow read, write: if true;" remember to install Firebase using npm and follow Firebase documentation to initialise Firebase in your project file
- Happy coding!

