import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { SettingsIcon, styles } from '../home'

export const AnalyticsScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Analityka'/>
                <SettingsIcon/>
            </View>
        </ScrollView>
    )
}
