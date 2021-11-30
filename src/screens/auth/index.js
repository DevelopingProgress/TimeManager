import React from 'react'
import { View, StyleSheet, ScrollView} from 'react-native'
import { AuthForm } from './components/authForm'
import { Logo } from '../../reusable/logo'
import { Colors } from '../../reusable/tools'

export const AuthScreen = () => {
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
        backgroundColor: Colors.white
    },
    container: {
        padding: 50,
        alignItems: 'center',
    }
})
