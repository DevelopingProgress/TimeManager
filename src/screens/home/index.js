import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../reusable/tools'

export const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>
                Dzień Dobry, <Text style={styles.greetingName}>
                    Kacper
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center', 
        padding: 10, 
        marginTop: 40
    },
    greetingText: {
        fontSize: 25
    },
    greetingName: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: Colors.blue
    }
})
