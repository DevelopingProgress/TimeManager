import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Loading } from '../../reusable/loading'
import { Logo } from '../../reusable/logo'

export const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Logo style={{width: 150, height: 150}}/>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Ładowanie
            </Text>
            <Loading circlesnail/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center', 
        alignItems: 'center', 
        marginTop: 230
    }
})
