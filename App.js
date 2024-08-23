
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import StackNavigator from './src/view/StackNavigator';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
   <NavigationContainer>
    <StackNavigator/>
   </NavigationContainer>

  )
}