import { StatusBar } from 'expo-status-bar';
import LoginOptions from './src/view/LoginOptions';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import Login from './src/view/Login';
import Stepper from './src/view/Stepper';
import { ScrollView } from 'react-native';



export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"/>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LoginOptions}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Stepper" component={Stepper}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}



