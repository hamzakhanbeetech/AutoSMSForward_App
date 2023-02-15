// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import SmsListener from 'react-native-android-sms-listener'

import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));



const HomeScreen = () => {
    var currentUserId = null;
    var smsFilterString = null;


    const veryIntensiveTask = async (taskDataArguments) => {
      // Example of an infinite loop task
      const { delay } = taskDataArguments;
      await new Promise( async (resolve) => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
              // console.log(i);
              SmsListener.addListener(message => {
                // console.info("smsssss",message)
                let requestBody = {email:currentUserId, content: message.body}
                if(requestBody.content.includes(smsFilterString)){
                  createSMS(requestBody);
          
                }
              })
              await sleep(delay);
          }
      });
    };
    
    const options = {
      taskName: 'Example',
      taskTitle: 'ExampleTask title',
      taskDesc: 'ExampleTask description',
      taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
      parameters: {
          delay: 1000,
      },
    };

  useEffect(() => {
    
    requestReadSmsPermission();
    
    BackgroundService.start(veryIntensiveTask, options);
    BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
   
    
    AsyncStorage.getItem('sms_filter_string').then((value) =>{      
      console.log("sms filter string: ", value)
      smsFilterString = value
    });

    AsyncStorage.getItem('user_id').then((value) =>{
        console.log("currentUser: ", value)
        currentUserId = value
    });


   
    
    
    // RNReactNativeSmsListener.SmsListener(message => {
    //   console.info("hiii")
    // })
  })

    
requestReadSmsPermission = async () => {
  try {
    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "Auto Verification OTP",
        message: "need access to read sms, to verify OTP"
}
    );
   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
console.log("sms read permissions granted", granted); 
granted = await PermissionsAndroid.request( 
PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,{ 
title: "Receive SMS",
message: "Need access to receive sms, to verify OTP"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("RECEIVE_SMS permissions granted", granted);
      } else {
        console.log("RECEIVE_SMS permissions denied");
      }
    } else {
      console.log("sms read permissions denied");
   }
} catch (err) {
    console.log(err);
  }
}


const createSMS = async (requestBody) => {
  console.log("in create sms")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

  try {
      await fetch(
          'https://f0ff-175-107-13-89.in.ngrok.io/api/sms/savesms', requestOptions)
          .then(response => {
              response.json()
                  .then(data => {
                      console.log("Post created at : ", 
                      data);
                  });
          })
  }
  catch (error) {
      console.error(error);
  }
}



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Welcome To Insurance System App
            {'\n\n'}
            This is the Home Screen
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          For More Details Please{'\n'}Visit Our Site
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.insurancesystem.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;