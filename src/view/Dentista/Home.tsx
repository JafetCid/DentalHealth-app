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

function Home() {
  const navigation = useNavigation(); // Use navigation hook
  const data = [
    { id: 1, image: require("../../../assets/images/imageHome.png") },
    { id: 2, image: require("../../../assets/images/promo-1.jpg") },
    
    { id: 4, image: require("../../../assets/images/logo.png") },
  ];

  const handlePress = (item) => {
    // navigation.navigate("Promociones", { promotionId: item.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={""} showArrow={false} showP={true} onPress={""} point={'PerfilD'} />
        <View style={styles.content}>
          <Text style={styles.textT}>Bienvenido</Text>
          <Text style={styles.textT}>Doctor [Nombre del Doctor]</Text>

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

          <Text style={styles.textE}>Tus promociones publicadas</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default function TabNavigator1() {
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
        name="Calendar"
        component={Agenda1}
        options={{
          title: "Agenda",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-number" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={Pacientes}
        options={{
          title: "Pacientes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-circle" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
        name="Promociones"
        component={Promociones}
        options={{
          title: "Promociones",
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
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
  },
  textT: {
    fontSize: 24,
    marginBottom: 20,
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
  textE: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  },
});
