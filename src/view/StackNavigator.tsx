// src/view/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from './LoginOptions';
import Login from './Login';
import StepperD from './Dentista/StepperD';
import StepperP from './Paciente/StepperP';
import Home1 from './Paciente/Home1';
import DentalHealthScreen from './Calendar';
import AgendaScreen from './AgendaScreen';
import Chat from './Chat';
import TabNavigator from './Paciente/Home1';
import DentalExamScreen from './ExamenAdult';
import CrearPromocion from './Dentista/CrearPromocion';
import PerfilD from './Dentista/PerfilD';
import FormCrearE from './Dentista/FormCrearE';
import PerfilP from './Paciente/PerfilP';
import PatientsDetalles from './PatientsDetalles';
import ExpedienteList from './components/ExpedienteList';
import ExamenesDentalesScreen from './ExamenDental';
import ExpedienteDentalesScreen from './ExpedienteDental';
import VerExamenDental from './VerExamenDental'
import TabNavigator1 from './Dentista/Home';
import { VerExpedienteM } from './VerExpedienteM';
import { CardPerfilP } from './components/CardPerfilP';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginO" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginO" component={LoginOptions} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StepperD" component={StepperD} />
      <Stack.Screen name="StepperP" component={StepperP} />
      <Stack.Screen name="HomeP" component={Home1} />
      <Stack.Screen name="CrearP" component={CrearPromocion} />
      <Stack.Screen name="PerfilD" component={PerfilD} />
      <Stack.Screen name="PerfilP" component={PerfilP} />
      <Stack.Screen name="DentalHealth" component={DentalHealthScreen} /> 
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
      <Stack.Screen name="CrearExpediente" component={FormCrearE} />
      <Stack.Screen name='Chat' component={Chat}/>
      <Stack.Screen name='TabNavigator' component={TabNavigator}/>
      <Stack.Screen name='ExamenAdult' component={DentalExamScreen}/>
      <Stack.Screen name='Pdetalles' component={PatientsDetalles}/>
      {/*<Stack.Screen name='ExpedientList' component={ExpedienteList} />*/}
      <Stack.Screen name='ExamDent' component={ExamenesDentalesScreen}/>
      <Stack.Screen name='ExpedienteLista' component={ExpedienteDentalesScreen}/>
      {/* <Stack.Screen name='Examen' component={VerDentalExamScreen}/> */}
      <Stack.Screen name='VerExpedienteM' component={VerExpedienteM}/>
      <Stack.Screen name='VerExamenD' component={VerExamenDental}/>
      {/* <Stack.Screen name='ExpedienteDental' component={ExpedienteDentales}/> */}
      <Stack.Screen name='CardPerfilP' component={CardPerfilP}/>
      
      <Stack.Screen name='TabNav'component={TabNavigator1}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
