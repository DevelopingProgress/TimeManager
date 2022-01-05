import React from 'react'
import { View } from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { LogoutIcon } from '../../reusable/logoutIcon'
import { styles } from '../home'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MonthAnalytics from "./screens/MonthAnalytics";
import WeekAnalytics from "./screens/WeekAnalytics";
import DayAnalytics from "./screens/DayAnalytics";
import { Colors } from "../../reusable/utils/tools";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/core";
import {listAllProjects, listAllTasks, setLoading} from "../../store/actions/tasksActions";

const Tab = createMaterialTopTabNavigator();

export const AnalyticsScreen = ({navigation}) => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useFocusEffect(React.useCallback(() => {
        dispatch(setLoading())
        dispatch(listAllTasks(user))
        dispatch(setLoading())
        dispatch(listAllProjects(user))
    }, []))

    return (
        <>
                <View style={styles.container}>
                    <GreetingText title='Analityka'/>
                    <LogoutIcon navigation={navigation}/>
                </View>
                <Tab.Navigator initialRouteName='DayAnalytics'>
                    <Tab.Screen
                        name='DayAnalytics'
                        component={DayAnalytics}
                        options={{
                            title: 'dzien',
                            tabBarActiveTintColor: Colors.black,
                            tabBarIndicatorStyle: {backgroundColor: Colors.blue, height: 3},
                            tabBarLabelStyle: {fontSize: 16}
                        }}
                    />
                    <Tab.Screen
                        name='WeekAnalytics'
                        component={WeekAnalytics}
                        options={{
                            title: 'tydzien',
                            tabBarActiveTintColor: Colors.black,
                            tabBarIndicatorStyle: {backgroundColor: Colors.blue, height: 3},
                            tabBarLabelStyle: {fontSize: 16}
                        }}
                    />
                    <Tab.Screen
                        name='MonthAnalytics'
                        component={MonthAnalytics}
                        options={{
                            title: 'miesiąc',
                            tabBarActiveTintColor: Colors.black,
                            tabBarIndicatorStyle: {backgroundColor: Colors.blue, height: 3},
                            tabBarLabelStyle: {fontSize: 16}
                        }}
                    />
                </Tab.Navigator>
        </>

    )
}
