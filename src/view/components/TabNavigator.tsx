// src/components/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Calendar from '../Calendar';
import Files from '../Files';
import Home from '../Home';
import Notifications from '../Notifications';
import Chat from '../Chat';
import { TabActions } from '@react-navigation/native';
import Promociones from '../Promociones';



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
        name="Promociones"
        component={Promociones}
        options={{
          title: 'Promociones',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
