import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Header from '../view/components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
//import Calendar from './Calendar';
//import Files from './Files';
import Notifications from './Notifications';
import Chat from "./Chat";
import Pacientes from "./Pacientes";
import Agenda1 from './Agenda1';
import Promociones from './Dentista/Promociones';

const Colors = {
  light: {
    tint: 'white',
    tabIconDefault: '#ccc',
    background: '#308CFF',
  },
  dark: {
    tint: '#fff',
    tabIconDefault: '#ccc',
    background: '#000',
  },
};

const Tab = createBottomTabNavigator();
const TabBarIcon = ({ name, color }) => {
  return <Ionicons name={name} size={30} color={color} />;
};

function Home() {
  return (
    <View style={styles.container}>
      <Header title={''} showArrow={false} showP={true} onPress={''}/>
      <View style={styles.content}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.text}>Doctor [Nombre del doctor]</Text>
        {/* Aquí se incluye la imagen */}
        <Image source={require('../../assets/images/imageHome.png')}/>
        <Text style={styles.textE}>Tus promociones publicadas</Text>
      </View>
    </View>
  );
}

export default function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
        tabBarStyle: {
          display: route.name === 'Chat' ? 'none' : 'flex',
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          height: '8%',
          elevation: 0,
          // borderColor: 'black',
          // borderWidth: 3,
        },
        
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          paddingVertical:5,
        
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Calendar"
        component={Agenda1}
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-number" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={Pacientes}
        options={{
          title: 'Pacientes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="notifications" color={color} />
          ),
          tabBarBadge:'+99',
        }}
      />
      <Tab.Screen
        name="Promociones"
        component={Promociones}
        options={{
          title: 'Promocion',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'pricetag' : 'pricetag-outline'} color={color} />
          ),
          
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Color de fondo blanco
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  textE: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  },
});
