import React from 'react'
import {Platform, ScrollView, StyleSheet, View} from 'react-native'
import {AuthForm} from './components/authForm'
import {Logo} from '../../reusable/utils/logo'
import {Colors} from '../../reusable/utils/tools'

export const AuthScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <Logo style={{width: Platform.OS === 'android' ?  200 : 150, height: Platform.OS === 'android' ?  200 : 150}}/>
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
