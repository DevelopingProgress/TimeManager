import { Text } from "react-native";
import { styles } from "../screens/home";
import React from "react";

export const GreetingText = (props) => (
    <Text style={styles.greetingText}>
        {props.title}
    </Text>
)