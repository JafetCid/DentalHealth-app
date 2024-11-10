import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  Dimensions,
  ScrollView,
  TouchableOpacity, // Import TouchableOpacity for clickable carousel items
} from "react-native";
import Header from "../components/Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

import Pacientes from "../Pacientes";
import Agenda1 from "../Agenda1";
import Promociones from "../Dentista/Promociones";
import Carousel from "react-native-reanimated-carousel";
import NotificationScreen from "../Notifications";
import Chat from "../Chat";
import PerfilP from "./PerfilP";
import DentalHealthScreen from "../Calendar";
import InfoCard from "../components/InfoCard";
import { CardPerfilP } from "../components/CardPerfilP";

const { width: screenWidth } = Dimensions.get("window");

const Colors = {
  light: {
    tint: "#FFFFFF",
    tabIconDefault: "#C0C0C0",
    // tabIconDefault: "#F0F0F0",
    background: "#2f95dc",
  },
  dark: {
    tint: "#fff",
    tabIconDefault: "#ccc",
    background: "#000",
  },
};

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color }) => {
  return <Ionicons name={name} size={35} color={color} />;
};

function Home1() {
  const navigation = useNavigation(); // Use navigation hook
  const data = [
    { id: 1, image: require("../../../assets/images/imageHome.png") },
    { id: 2, image: require("../../../assets/images/sukuna.jpeg") },
    { id: 3, image: require("../../../assets/images/Gojo.jpeg") },
    { id: 4, image: require("../../../assets/images/logo.png") },
  ];

  const handlePress = (item) => {
    // navigation.navigate("Promociones", { promotionId: item.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={""} showArrow={false} showP={true} onPress={""} point={'PerfilP'}/>
        <View style={styles.content}>
          {/* <Text style={styles.textT}>Bienvenido</Text>
          <Text style={styles.textT}>Doctor [Nombre del Paciente]</Text> */}
          

          {/* Carrusel */}
          <Carousel
            loop
            width={screenWidth * 0.8}
            height={200}
            style={styles.carousel}
            autoPlay={true}
            autoPlayInterval={3000}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.carouselItem}
                onPress={() => handlePress(item)}
              >
                <Image source={item.image} style={styles.carouselImage} />
              </TouchableOpacity>
            )}
          />

          <Text style={styles.textS}>Promoción</Text>
          <Text style={styles.descripcionS}>descripción</Text>

          <View style={styles.contTextL}>
            <Text style={styles.textL}>"Tu sonrisa, nuestra prioridad. Agenda tu cita fácilmente con nuestra app dental."</Text>
            <Text style={styles.textL2}>Nuestra aplicación está diseñada para ser intuitiva y fácil de usar. 
              Desde cualquier lugar y en cualquier momento, puedes programar, modificar o cancelar tus citas.</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}

export default function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
    initialRouteName="Home" 
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "dark"].tabIconDefault,
        tabBarStyle: {
          display: route.name === "Chat" ? "none" : "flex",
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopWidth: 0,
          height: "8%",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
          paddingVertical: 5,
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Citas"
        component={DentalHealthScreen}
        options={{
          title: "Cita",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-number" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Expedientes"
        component={CardPerfilP}
        options={{
          title: "Expedientes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-tray-full" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home1}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
        ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: "Notificaciones",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="notifications" color={color} />
          ),
          tabBarBadge: "+99",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubble-sharp" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
  },
  carousel: {
    marginBottom: 20,
  },
  carouselItem: {
    borderRadius: 10,
    overflow: "hidden",
    width: screenWidth * 0.8,
  },
  carouselImage: {
    width: "100%",
    height: '100%',
    resizeMode: "cover",
  },
  textS: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  descripcionS: {
    alignSelf: 'center',
    fontSize: 16,
  },
  contTextL: {
    width: '90%',
    marginTop: 30,
    alignItems: 'center',
  },
  textL:{
    fontSize:18,
    marginBottom: 20,
  },
  textL2:{
    fontSize:15,
  },
});
