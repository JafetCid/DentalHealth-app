// src/view/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from './LoginOptions';
import Login from './Login';
import StepperD from './Dentista/StepperD';
import StepperP from './Pacientes/StepperP';
import Home from './Dentista/Home';
import DentalHealthScreen from './Calendar';
import AgendaScreen from './AgendaScreen';
import Patients from './Pacientes';
import Chat from './Chat';
import TabNavigator from './Dentista/Home';
import DentalExamScreen from './ExamenAdult';
import Agenda1 from './Agenda1';
import Promociones from './Dentista/Promociones';
import CrearPromocion from './Dentista/CrearPromocion';
import PerfilD from './Dentista/PerfilD';
import FormCrearE from './Dentista/FormCrearE';
import PerfilP from './Pacientes/PerfilP';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginO" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginO" component={LoginOptions} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StepperD" component={StepperD} />
      <Stack.Screen name="StepperP" component={StepperP} />
      {/* <Stack.Screen name="Inicio" component={Home} /> */}
      {/* <Stack.Screen name="Promociones" component={Promociones}/> */}
      <Stack.Screen name="CrearP" component={CrearPromocion} />
      <Stack.Screen name="PerfilD" component={PerfilD} />
      <Stack.Screen name="PerfilP" component={PerfilP} />
      <Stack.Screen name="DentalHealth" component={DentalHealthScreen} /> 
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
      <Stack.Screen name="CrearExpediente" component={FormCrearE} />
      {/* <Stack.Screen name='Pacientes' component={Patients}/> */}
      <Stack.Screen name='Chat' component={Chat}/>
      <Stack.Screen name='TabNavigator' component={TabNavigator}/>
      <Stack.Screen name='ExamenAdult' component={DentalExamScreen}/>
      {/* <Stack.Screen name='Agenda' component={Agenda1} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
