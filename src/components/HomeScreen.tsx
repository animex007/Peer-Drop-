import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { PeerList } from "./PeerList";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <flexboxLayout style={styles.container}>
            <PeerList />
            <flexboxLayout style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onTap={() => navigation.navigate("Chat")}
                >
                    Open Chat
                </button>
                <button
                    style={styles.button}
                    onTap={() => navigation.navigate("FileShare")}
                >
                    Share Files
                </button>
            </flexboxLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "column",
        padding: 20,
    },
    button: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#2e6ddf",
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        textAlignment: "center",
    },
});