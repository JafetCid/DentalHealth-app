import React, { useState, useEffect } from 'react';
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

  interface Promotion {
    promotionalImageUrl: string;
    title: string;
    description: string;
  }

  const [data, setData] = useState<Promotion[] | null>(null);
  const [error, setError] = useState('');
  const [imageDimensions, setImageDimensions] = useState<{ width: number, height: number } | null>(null);

  const calculateImageStyle = (dimensions: { width: number, height: number }) => {
    const ratio = dimensions.width / dimensions.height;
    if (ratio > 1) {
      // Imagen más ancha que alta, ajusta al ancho
      return { width: screenWidth * 0.8, height: 300 }; // Usamos un valor numérico para el ancho
    } else {
      // Imagen más alta que ancha, ajusta a la altura
      return { width: 'auto', height: 300 };
    }
  };


  useEffect(() => {
    // Función para hacer la solicitud GET
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.119:5000/api/promotion/get');
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json(); // Convierte la respuesta en un objeto JSON
        setData(data); // Guarda los datos en el estado
      } catch (error) {
        setError(error.message); // Guarda el error en el estado
      }
    };

    fetchData(); // Llama a la función fetchData cuando se monta el componente
    console.log(data);
  }, []);

  const navigation = useNavigation(); // Use navigation hook

  const handlePress = (item) => {
    // navigation.navigate("Promociones", { promotionId: item.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={""} showArrow={false} showP={true} onPress={""} point={'PerfilP'} />
        <View style={styles.content}>
          <Text style={styles.textT}>Bienvenido</Text>
          <Text style={styles.textT}>[Nombre del Paciente]</Text>
          {/* Carrusel */}
          {data && data.length > 0 ? (
            <Carousel
              loop
              width={screenWidth * 0.8}
              height={470}
              style={styles.carousel}
              autoPlay={true}
              autoPlayInterval={3000}
              data={data}
              renderItem={({ item }: { item: Promotion }) => (
                <View style={styles.contenImageC}>
                  <TouchableOpacity
                    style={styles.carouselItem}
                    onPress={() => handlePress(item)}
                  >
                    <Image
                      source={{ uri: item.promotionalImageUrl }}
                      style={[
                        styles.carouselImage,
                        imageDimensions
                          ? calculateImageStyle(imageDimensions)
                          : { width: screenWidth * 0.8, height: 300 }
                      ]}
                      onLoad={(e) => {
                        const { width, height } = e.nativeEvent.source;
                        setImageDimensions({ width, height });
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.textPromo}>
                    <Text style={styles.textS}>{item.title}</Text>
                    <Text style={styles.descripcionS}>{item.description}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text>No hay datos</Text>
          )}
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
  textT: {
    fontSize: 24,
    marginBottom: 10,
  },
  carousel: {
    marginBottom: 10,
  },
  contenImageC: {
    height: '100%',
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
  textPromo: {
    alignSelf: 'center',
  },
  textS: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  descripcionS: {
    textAlign: 'center',
    fontSize: 16,
  },
});
