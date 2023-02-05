// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import SmsListener from 'react-native-android-sms-listener'

// import { PermissionsAndroid } from 'react-native';


// export default function App() {


//   useEffect(() => {
//     console.log("Now done")
//     requestReadSmsPermission();
//     SmsListener.addListener(message => {
//       console.info("smsssss",message)
//       requestBody.content = message.body
//       createSMS();
//     })
//     getPostExample();
//     // RNReactNativeSmsListener.SmsListener(message => {
//     //   console.info("hiii")
//     // })
//   })

  

  
// requestReadSmsPermission = async () => {
//   try {
//     var granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_SMS,
//       {
//         title: "Auto Verification OTP",
//         message: "need access to read sms, to verify OTP"
// }
//     );
//    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// console.log("sms read permissions granted", granted); 
// granted = await PermissionsAndroid.request( 
// PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,{ 
// title: "Receive SMS",
// message: "Need access to receive sms, to verify OTP"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("RECEIVE_SMS permissions granted", granted);
//       } else {
//         console.log("RECEIVE_SMS permissions denied");
//       }
//     } else {
//       console.log("sms read permissions denied");
//    }
// } catch (err) {
//     console.log(err);
//   }
// }
// let requestBody = {email:"hkhan1241@gmail.com", content:"added by app"}
// const requestOptions = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(requestBody)
// };

// const createSMS = async () => {
//   try {
//       await fetch(
//           'https://e7bf-111-119-178-151.eu.ngrok.io/api/sms/savesms', requestOptions)
//           .then(response => {
//               response.json()
//                   .then(data => {
//                       console.log("Post created at : ", 
//                       data);
//                   });
//           })
//   }
//   catch (error) {
//       console.error(error);
//   }
// }


// const getPostExample = async () => {
//   try {
//       await fetch(
//           'https://reqres.in/api/posts')
//           .then(response => {
//               response.json()
//                   .then(data => {
//                       console.log("Post created at : ", 
//                       data);
//                   });
//           })
//   }
//   catch (error) {
//       console.error(error);
//   }
// }

//   return (
//     <View style={styles.container}>
//       <Text>Hamza khan start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;