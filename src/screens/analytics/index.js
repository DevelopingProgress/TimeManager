import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { styles } from '../home'

export const AnalyticsScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Analityka'/>
                <SettingsIcon navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
