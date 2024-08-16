import { StatusBar } from 'expo-status-bar';
import LoginOptions from './src/view/LoginOptions';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Navigation from './src/Navigation';
import Login from './src/view/Login';
import StepperD from './src/view/StepperD';
import StepperP from './src/view/StepperP';
import Home from './src/view/Home';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <Navigation/> */}
      {/* <StatusBar barStyle="dark-content"/> */}
      <Stack.Navigator initialRouteName="LoginO"   
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginO" component={LoginOptions}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="StepperD" component={StepperD}/>
        <Stack.Screen name="StepperP" component={StepperP}/>
        <Stack.Screen name="Inicio" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}