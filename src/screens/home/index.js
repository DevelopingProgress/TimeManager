import React from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { Colors } from '../../reusable/tools'
import { Pane } from './components/pane'
import TasksImage from '../../assets/images/Tasks.jpg'
import TimeImage from '../../assets/images/Time.jpg'
import AnalyticsImage from '../../assets/images/Analytics.jpg'
import CalendarImage from '../../assets/images/Calendar.jpg'
import { Icon } from 'react-native-elements'

export const HomeScreen = ({navigation}) => {

    var hours = new Date().getHours()
    const name = useSelector(state => state.auth.user.name)
    const greetingName = name.split(' ', 1)
    
    const GreetingText = () => (
        <View style={{flex: 1}}>
            <Text style={styles.greetingText}>
                {hours && hours < 17 && hours > 4 ? 'Dzień Dobry' : 'Dobry Wieczór'}
                , <Text style={styles.greetingName}>
                    {greetingName}
                </Text>
            </Text>
        </View>
            
    )


    const Panes = () => (
        <>
            <Pane 
                title='Twórz zadania' 
                sub='Wykonuj je w określonym czasie'
                navigation={navigation} 
                navigate='TasksScreen'
                image={TasksImage}
            />
            <Pane 
                title='Mierz czas' 
                sub='Mierz czas swoich aktywności na bieżąco'
                navigation={navigation} 
                navigate='TimeMeasurementScreen'
                image={TimeImage}
            />
            <Pane 
                title='Sprawdzaj statystyki' 
                sub='Sprawdzaj swoje statystyki'
                navigation={navigation} 
                navigate='AnalyticsScreen'
                image={AnalyticsImage}
            />
            <Pane 
                title='Zintegruj zadania' 
                sub='Zintegruj swoje zadania z kalendarzem'
                navigation={navigation} 
                navigate='CalendarScreen'
                image={CalendarImage}
            />
        </>
        
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <GreetingText/>
                <SettingsIcon/>
            </View>
            <Panes/>
        </ScrollView>

    )
}

export const SettingsIcon = () => (
    <View>
        <Icon 
            type='entypo' 
            name='dots-three-vertical' 
            size={25} 
            style={{
                marginTop: 5,
                color: Colors.black2,
            }}

        />
    </View>
)

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
    },
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 5, 
        flexDirection: 'row'
    },
    greetingText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: Platform.OS === 'android' ? 25 : 20
    },
    greetingName: {
        fontSize: Platform.OS === 'android' ? 25 : 20, 
        fontWeight: 'bold', 
        color: Colors.blue
    },
    cardTitle: {
        fontSize: 25
    }
})
