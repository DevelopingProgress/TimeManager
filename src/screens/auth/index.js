import React from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { AuthForm } from './components/authForm'
import { Logo } from './components/logo'

export const AuthScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <Logo/>
                <AuthForm/>
            </View>
        </ScrollView>
        
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#e4e4e4'
    },
    container: {
        marginTop: 30,
        padding: 50,
        alignItems: 'center',
    }
})
