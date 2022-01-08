import {Text, View} from "react-native";
import {styles} from "../../screens/home";
import React from "react";

export const GreetingText = (props) => (
    <View style={{flex: 1}}>
        <Text style={styles.greetingText}>
            {props.title}
        </Text>
    </View>

)
