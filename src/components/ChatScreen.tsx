import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Message, PeerService } from '../services/PeerService';
import { TextField } from '@nativescript/core';

type ChatScreenProps = {
    route: RouteProp<MainStackParamList, "Chat">,
    navigation: FrameNavigationProp<MainStackParamList, "Chat">,
};

export function ChatScreen({ navigation }: ChatScreenProps) {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inputText, setInputText] = React.useState('');
    const peerService = PeerService.getInstance();

    React.useEffect(() => {
        const messagesSub = peerService.messages$.subscribe(msgs => {
            setMessages(msgs);
        });

        return () => messagesSub.unsubscribe();
    }, []);

    const sendMessage = () => {
        if (inputText.trim()) {
            peerService.sendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <scrollView style={styles.messageList}>
                {messages.map((msg) => (
                    <flexboxLayout key={msg.id} style={styles.messageContainer}>
                        <label style={styles.sender}>{msg.sender}</label>
                        <label style={styles.message}>{msg.content}</label>
                    </flexboxLayout>
                ))}
            </scrollView>
            <flexboxLayout style={styles.inputContainer}>
                <textField
                    style={styles.input}
                    text={inputText}
                    onTextChange={(args) => {
                        const textField = args.object as TextField;
                        setInputText(textField.text);
                    }}
                    hint="Type a message..."
                />
                <button
                    style={styles.sendButton}
                    onTap={sendMessage}
                >
                    Send
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
    messageList: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: "column",
        padding: 10,
        margin: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    sender: {
        fontSize: 12,
        color: "#666",
    },
    message: {
        fontSize: 16,
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
    },
    sendButton: {
        width: 80,
        backgroundColor: "#2e6ddf",
        color: "white",
        borderRadius: 20,
    },
});