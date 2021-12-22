import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { styles } from '../home'
import { LogoutIcon } from '../../reusable/logoutIcon'

export const CalendarScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Kalendarz'/>
                <LogoutIcon navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
