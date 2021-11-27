import { Button, Icon } from 'react-native-elements'
import { CategoriesScreen } from './screens/categories'
import { GreetingText } from '../../reusable/greetingText'
import { ProjectsScreen } from './screens/projects'
import React from 'react'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { TaskScreen } from './screens/tasks'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { styles } from '../home'

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
                    name="TaskScreen"
                    component={TaskScreen}
                    options={{
                        headerShown: false,
                        title: "Zadania",
                    }}
                />
            </Stack.Navigator>
        </>
    )
}
