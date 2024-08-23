import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Header from '../view/components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Calendar from './Calendar';
import Files from './Files';
import Notifications from './Notifications';
import Chat from "./Chat";

const Colors = {
  light: {
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    background: '#fff',
  },
  dark: {
    tint: '#fff',
    tabIconDefault: '#ccc',
    background: '#000',
  },
};

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color }) => {
  return <Ionicons name={name} size={24} color={color} />;
};

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={''} showArrow={false} showP={true} />
      <View style={styles.content}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.text}>Doctor [Nombre del doctor]</Text>
        {/* Aquí se incluye la imagen */}
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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          display: route.name === 'Chat' ? 'none' : 'flex',
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: 'Citas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Files"
        component={Files}
        options={{
          title: 'Expedientes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'folder' : 'folder-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} />
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
