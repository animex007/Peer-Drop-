import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { PeerService } from '../services/PeerService';
import { File, Folder, knownFolders, path } from '@nativescript/core';

type FileShareScreenProps = {
    route: RouteProp<MainStackParamList, "FileShare">,
    navigation: FrameNavigationProp<MainStackParamList, "FileShare">,
};

export function FileShareScreen({ navigation }: FileShareScreenProps) {
    const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
    const peerService = PeerService.getInstance();

    const selectFile = async () => {
        // Implementation for file selection will go here
        // This is a placeholder as file picking requires additional setup
        console.log("File selection not implemented yet");
    };

    const shareFile = () => {
        if (selectedFile) {
            peerService.sendMessage(selectedFile, 'FILE');
            setSelectedFile(null);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label style={styles.title}>Share Files</label>
            <button
                style={styles.button}
                onTap={selectFile}
            >
                Select File
            </button>
            {selectedFile && (
                <>
                    <label style={styles.selectedFile}>
                        Selected: {selectedFile}
                    </label>
                    <button
                        style={[styles.button, styles.shareButton]}
                        onTap={shareFile}
                    >
                        Share File
                    </button>
                </>
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#2e6ddf",
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        textAlignment: "center",
    },
    shareButton: {
        backgroundColor: "#28a745",
    },
    selectedFile: {
        fontSize: 16,
        color: "#666",
        marginVertical: 10,
        textAlignment: "center",
    },
});