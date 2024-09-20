import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Header from '../view/components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
//import Calendar from './Calendar';
//import Files from './Files';
import Notifications from './Notifications';
//import Chat from './Chat';
import Patients from './Pacientes';
import Promotions from './components/Promotions';
import Agenda1 from './Agenda1';

const Colors = {
  light: {
    tint: '#FFFFFF',//ccc
    tabIconDefault: '#ccc',//#2f95dc,
    background: '#2f95dc',
  },
  dark: {
    tint: '#fff',
    tabIconDefault: '#ccc',
    background: '#000',
  },
};

const Tab = createBottomTabNavigator();

const color={}
const TabBarIcon = ({ name, color }) => {
  return <Ionicons name={name} size={35} color={color} />;
};

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={''} showArrow={false} showP={true} />
      <View style={styles.content}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.text}>Doctor [Nombre del doctor]</Text>
        <Image source={require('../../assets/images/imageHome.png')} style={styles.image} />
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
          borderTopWidth: 1,
          //elevation: 10,
          height: 80, // Aumenta la altura del tabBar
          //paddingBottom: 15, // Opcional: Ajusta el padding inferior para que los íconos estén centrados
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
        component={Patients}
        options={{
          title: 'Pacientes',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-circle" color={color} />
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
        name="Promotions"
        component={Promotions}
        options={{
          title: 'Promociones',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pricetags" color={color} />
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
    marginTop: '15%',
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
