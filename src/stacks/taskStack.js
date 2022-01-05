import React from 'react'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {DoneTasksScreen} from "../screens/tasks/screens/done tasks";
import {TaskScreen} from "../screens/tasks/screens/tasks";
import {Colors} from "../reusable/utils/tools";
import {StackHeader} from "../reusable/stackHeader";
import {useSelector} from "react-redux";
import {View} from "react-native";

const Tab = createMaterialTopTabNavigator();

export  const TaskStack = (props) => {
    return (
        <>
            <Tab.Navigator
                initialRouteName='TaskScreen'
            >
                <Tab.Screen
                    name="TaskScreen"
                    component={TaskScreen}
                    initialParams={props}
                    options={{
                        title: 'do zrobienia',
                        tabBarActiveTintColor: Colors.black,
                        tabBarIndicatorStyle: {backgroundColor: Colors.blue, height: 3},
                        tabBarLabelStyle: {fontSize: 16}
                    }}
                />
                <Tab.Screen
                    name="DoneTasksScreen"
                    component={DoneTasksScreen}
                    initialParams={props}
                    options={{
                        title: 'ukonczone',
                        tabBarActiveTintColor: Colors.black,
                        tabBarIndicatorStyle: {backgroundColor: Colors.blue, height: 3},
                        tabBarLabelStyle: {fontSize: 16}
                    }}
                />
            </Tab.Navigator>
        </>
        )

}

