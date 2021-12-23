import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Colors} from "../reusable/utils/tools";
import {HomeScreen} from "../screens/home";
import {AnalyticsScreen} from "../screens/analytics";
import {CalendarScreen} from "../screens/calendar";
import {Icon} from "react-native-elements";
import {TasksScreen} from "../screens/tasks";
import {TouchableOpacity} from "react-native";


const Tab = createBottomTabNavigator();

const tabOptions = {
    tabBarActiveTintColor: Colors.blue
}

export const HomeStack = (props) => {

    return (
        <>
            <Tab.Navigator
                initialRouteName="TasksScreen"
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
                        tabBarButton: (props) => <TouchableOpacity {...props}  />
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
                        tabBarButton: ({ children, ...rest }) => {
                            return (
                                <TouchableOpacity {...rest} onPress={() => {props.navigation.navigate('TasksScreen')}}>
                                    {children}
                                </TouchableOpacity>
                            );
                        }
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
                        tabBarButton: (props) => <TouchableOpacity {...props}  />
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
                        tabBarButton: (props) => <TouchableOpacity {...props}  />
                    }}
                />
            </Tab.Navigator>
        </>
    )
}



