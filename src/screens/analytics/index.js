import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { LogoutIcon } from '../../reusable/logoutIcon'
import { styles } from '../home'

export const AnalyticsScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Analityka'/>
                <LogoutIcon navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
