import React from 'react'
import { View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { styles } from '../home'
import { CategoriesScreen } from './screens/categories'
import { ProjectsScreen } from './screens/projects'
import { TaskScreen } from './screens/tasks'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export const TasksScreen = ({navigation}) => {
    return(
        <>
            <View style={styles.container}>
                <GreetingText title='Twoje zadania'/>
                <SettingsIcon navigation={navigation}/>
            </View>

            <Stack.Navigator
                initialRouteName="CategoriesScreen"
                screenOptions={{
                    //
                }}
            >
                <Stack.Screen
                    name="CategoriesScreen"
                    component={CategoriesScreen}
                    options={{
                        headerShown: true,
                        title: "Kategorie",
                    }}
                />
                <Stack.Screen
                    name="ProjectsScreen"
                    component={ProjectsScreen}
                    options={{
                        headerShown: true,
                        title: "Projekty",
                    }}
                />
                <Stack.Screen
                    name="TaskScreen"
                    component={TaskScreen}
                    options={{
                        headerShown: true,
                        title: "Zadania",
                    }}
                />
            </Stack.Navigator>
        </>
    )
}
