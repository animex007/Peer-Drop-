import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./HomeScreen";
import { ChatScreen } from "./ChatScreen";
import { FileShareScreen } from "./FileShareScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2e6ddf",
                },
                headerTintColor: "white",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Peer Drop" }}
            />
            <StackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={{ title: "Chat" }}
            />
            <StackNavigator.Screen
                name="FileShare"
                component={FileShareScreen}
                options={{ title: "Share Files" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);