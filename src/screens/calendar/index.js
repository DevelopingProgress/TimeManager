import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { styles } from '../home'
import { SettingsIcon } from '../../reusable/settingsIcon'

export const CalendarScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Kalendarz'/>
                <SettingsIcon navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
