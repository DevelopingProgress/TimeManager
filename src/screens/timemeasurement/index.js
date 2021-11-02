import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { styles } from '../home'

export const TimeMeasurementScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Mierzenie czasu'/>
            </View>
        </ScrollView>
    )
}
