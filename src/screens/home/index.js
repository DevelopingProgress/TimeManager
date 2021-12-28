import React, { useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { Colors } from '../../reusable/utils/tools'
import { Pane } from './components/pane'
import TasksImage from '../../assets/images/Tasks.jpg'
import AnalyticsImage from '../../assets/images/Analytics.jpg'
import CalendarImage from '../../assets/images/Calendar.jpg'
import { LogoutIcon } from '../../reusable/logoutIcon'
import { useFocusEffect } from '@react-navigation/core'


export const HomeScreen = ({navigation}) => {

    const hours = new Date().getHours();
    const user = useSelector(state => state.auth.user)
    const scrollRef = useRef();

    useFocusEffect(
        React.useCallback(() => {
            scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
            })
        })
    )

    const GreetingText = () => (
        <View style={{flex: 1}}>
            <Text style={styles.greetingText}>
                {hours && hours < 17 && hours > 4 ? 'Dzień Dobry' : 'Dobry Wieczór'}
                , <Text style={styles.greetingName}>
                    {user && user.name ? user.name.split(' ', 1) : null}
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
                title='Sprawdzaj statystyki'
                sub='Sprawdzaj swoje statystyki'
                navigation={navigation}
                navigate='AnalyticsScreen'
                image={AnalyticsImage}
            />
            <Pane
                title='Kalendarz'
                sub='Przeglądaj zadania we wbudowanym kalendarzu'
                navigation={navigation}
                navigate='CalendarScreen'
                image={CalendarImage}
            />
        </>

    )

    return (
        <ScrollView style={styles.mainContainer} ref={scrollRef}>
            <View style={styles.container}>
                <GreetingText/>
                <LogoutIcon navigation={navigation}/>
            </View>
            <Panes/>
        </ScrollView>

    )
}



export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.white,
    },
    container: {
        backgroundColor: Colors.white,
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
    },
})
