import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import LoginOptions from "./view/LoginOptions";
import Login from "./view/Login";
import Home from "./view/Home";


const Tab = createBottomTabNavigator();

function Tabs() {
    return(
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={Home}
                />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
    )
}