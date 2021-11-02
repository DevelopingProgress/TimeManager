import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { styles } from '../home'
import { SettingsIcon } from '../../reusable/settingsIcon'

export const TimeMeasurementScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Mierzenie czasu'/>
                <SettingsIcon  navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
