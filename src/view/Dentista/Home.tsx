import * as React from 'react';
import { View, StyleSheet, Image, Text, useColorScheme, Dimensions, ScrollView } from 'react-native';
import Header from '../../view/components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Notifications from '../Notifications';
import Pacientes from '../Pacientes';
import Agenda1 from '../Agenda1';
import Promociones from './Promociones';

const { width } = Dimensions.get('window');
const Colors = {
  light: {
    tint: '#FFFFFF',//ccc
    tabIconDefault: '#F1F1F1',//#2f95dc,
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

// const { width: screenWidth } = Dimensions.get('window');
// const dummyData = [
//   { id: 1, title: 'Title 1' },
//   { id: 2, title: 'Title 2' },
//   { id: 3, title: 'Title 3' },
//   { id: 4, title: 'Title 4' },
//   { id: 5, title: 'Title 5' }
// ];

// const MyCarousel = ({ data }) => {
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.title}</Text>
//     </View>
//   );

//   return (
//     <Carousel
//       data={data}
//       renderItem={renderItem}
//       sliderWidth={screenWidth}
//       itemWidth={screenWidth}
//       layout={'default'}
//     />
//   );
// };

function Home() {

  // const data = [
  //   { id: 1, image: require('../../../assets/images/imageHome.png')},
  //   { id: 2, image: require('../../../assets/images/imageHome.png')},
  //   { id: 3, image: require('../../../assets/images/imageHome.png')},
  // ];

  return (
    <View style={styles.container}>
      <Header title={''} showArrow={false} showP={true} onPress={''} />
      <View style={styles.content}>
        <Text style={styles.textT}>Bienvenido</Text>
        <Text style={styles.textT}>Doctor [Nombre del doctor]</Text>
        {/* Carrusel */}
        {/* <View style={styles.cont}>
          <Text style={styles.text}>React Native carousel with react-native-snap-carousel</Text>
          <MyCarousel data={dummyData} />
        </View> */}
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
        name="Promociones"
        component={Promociones}
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
    alignItems: 'center',
  },
  textT: {
    fontSize: 24,
    marginBottom: 20,
  },
  textE: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  },
});
