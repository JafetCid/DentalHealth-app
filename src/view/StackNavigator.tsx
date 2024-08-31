// src/view/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from './LoginOptions';
import Login from './Login';
import StepperD from './StepperD';
import StepperP from './StepperP';
import Home from './Home';

import DentalHealthScreen from './Calendar';
import AgendaScreen from './AgendaScreen';
import Patients from './Pacientes';
import Chat from './Chat';
import TabNavigator from './Home';
import DentalExamScreen from './ExamenAdult';
import Agenda1 from './Agenda1';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginO" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginO" component={LoginOptions} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StepperD" component={StepperD} />
      <Stack.Screen name="StepperP" component={StepperP} />
      <Stack.Screen name="Inicio" component={Home} />
      <Stack.Screen name="DentalHealth" component={DentalHealthScreen} /> 
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
      <Stack.Screen name='Pacientes' component={Patients}/>
      <Stack.Screen name='Chat' component={Chat}/>
      <Stack.Screen name='TabNavigator' component={TabNavigator}/>
      <Stack.Screen name='ExamenAdult' component={DentalExamScreen}/>
      <Stack.Screen name='Agenda' component={Agenda1} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
