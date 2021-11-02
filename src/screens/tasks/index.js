import React from 'react'
import { ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { styles } from '../home'

export const TasksScreen = ({navigation}) => {
    
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText title='Twoje zadania'/>
                <SettingsIcon navigation={navigation}/>
            </View>
        </ScrollView>
    )
}
