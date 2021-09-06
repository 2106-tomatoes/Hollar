import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from "../Screens/Home";
import ActiveEvent from "../Screens/ActiveEvent"
import InActiveEvent from "../Screens/InActiveEvent"


const Tab = createBottomTabNavigator();

export default function App() {
  return (

      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'All Events') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';}
             else if (route.name === 'Up Coming') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
          } else if (route.name === 'Passed') {
            iconName ='ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
   
      })}
      

      >
        <Tab.Screen name="All Events" component={Home} />
        <Tab.Screen name="Up Coming" component={ActiveEvent} />
        <Tab.Screen name="Passed" component={InActiveEvent} />
      </Tab.Navigator>

  );
}