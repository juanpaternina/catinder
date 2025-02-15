import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.default.tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#FFF",
          marginHorizontal: 80,
          marginBottom: 42,
          borderRadius: 130,
          borderColor: "transparent",
          shadowOpacity: 0.25,
          shadowRadius: 6.84,
          height: 54,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => (
            <TabBarIcon>
              <FontAwesome
                testID="paw-icon"
                name="paw"
                size={28}
                color={color}
                style={{ transform: [{ rotate: "15deg" }] }}
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon>
              <Feather
                testID="message-icon"
                name="message-circle"
                size={28}
                color={color}
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Tab Three",
          tabBarIcon: ({ color }) => (
            <TabBarIcon>
              <Feather testID="user-icon" name="user" size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
