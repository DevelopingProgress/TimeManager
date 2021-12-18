import React from 'react'
import { CategoriesScreen } from './screens/categories'
import { GreetingText } from '../../reusable/utils/greetingText'
import { ProjectsScreen } from './screens/projects'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { styles } from '../home'
import {TaskDetailsScreen} from "./screens/task details";
import {TaskStack} from "../../stacks/taskStack";

const Stack = createStackNavigator();

export const TasksScreen = ({navigation, route}) => {
    return(
        <>
            <View style={styles.container}>
                <GreetingText title='Twoje zadania'/>
                <SettingsIcon navigation={navigation}/>
            </View>

            <Stack.Navigator
                initialRouteName="CategoriesScreen"
                screenOptions={{

                }}
            >
                <Stack.Screen
                    name="CategoriesScreen"
                    component={CategoriesScreen}
                    options={{
                        headerShown: false,
                        title: "Kategorie",
                    }}
                />
                <Stack.Screen
                    name="ProjectsScreen"
                    component={ProjectsScreen}
                    options={{
                        headerShown: false,
                        title: "Projekty",

                    }}
                />
                <Stack.Screen
                    name="TaskStack"
                    component={TaskStack}
                    options={{
                        headerShown: false,
                        title: "Zadania",
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="TaskDetailsScreen"
                    component={TaskDetailsScreen}
                    options={{
                        headerShown: false,
                        title: route.params && route.params.task ? route.params.task.name : '',
                        gestureEnabled: false
                    }}
                />
            </Stack.Navigator>
        </>
    )
}
