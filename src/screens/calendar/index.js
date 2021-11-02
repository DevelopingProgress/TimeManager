import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { SettingsIcon, styles } from '../home'

export const CalendarScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Kalendarz'/>
                <SettingsIcon/>
            </View>
        </ScrollView>
    )
}
