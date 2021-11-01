import React from 'react'
import { HomeScreen } from '../screens/home'
import { Colors } from '../reusable/tools'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksScreen } from '../screens/tasks';
import { TimeMeasurementScreen } from '../screens/timemeasurement';
import { AnalyticsScreen } from '../screens/analytics';
import { CalendarScreen } from '../screens/calendar';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const tabOptions = {
    tabBarActiveTintColor: Colors.blue
}


export const HomeStack = () => (
    <Tab.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: Colors.lightgrey,
                borderTopColor: Colors.lightgrey,
                borderTopWidth: 1,
                height: 60,
            },
        }}
    >
        <Tab.Screen 
            name="HomeScreen" 
            component={HomeScreen}
            options={{
                ...tabOptions,
                tabBarIcon: ({focused}) => {
                    return ( 
                    <Icon 
                        type='materialcommunityicons' 
                        name='home'
                        color={focused ? Colors.blue : Colors.grey }  
                        size={45}
                    />
                    )
                },
            }}
        />
        <Tab.Screen 
            name="TasksScreen" 
            component={TasksScreen}
            options={{
                ...tabOptions,
                tabBarIcon: ({focused}) => {
                    return ( 
                    <Icon 
                        type='feather' 
                        name='list'
                        color={focused ? Colors.blue : Colors.grey }  
                        size={45}
                    />
                    )
                },
            }}
        />
        <Tab.Screen 
            name="TimeMeasurementScreen" 
            component={TimeMeasurementScreen}
            options={{
                ...tabOptions,
                tabBarIcon: ({focused}) => {
                    return ( 
                    <Icon 
                        type='materialcommunityicons' 
                        name='timer'
                        color={focused ? Colors.blue : Colors.grey }  
                        size={45}
                    />
                    )
                },
            }}
        />
        <Tab.Screen 
            name="AnalyticsScreen" 
            component={AnalyticsScreen}
            options={{
                ...tabOptions,
                tabBarIcon: ({focused}) => {
                    return ( 
                    <Icon 
                        type='antdesign' 
                        name='barchart'
                        color={focused ? Colors.blue : Colors.grey }  
                        size={40}
                    />
                    )
                },
            }}
        />
        <Tab.Screen 
            name="CalendarScreen" 
            component={CalendarScreen}
            options={{
                ...tabOptions,
                tabBarIcon: ({focused}) => {
                    return ( 
                    <Icon 
                        type='antdesign' 
                        name='calendar'
                        color={focused ? Colors.blue : Colors.grey }  
                        size={45}
                    />
                    )
                },
            }}
        />
    </Tab.Navigator>
)
