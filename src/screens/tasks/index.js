import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { GreetingText } from '../../reusable/greetingText'
import { SettingsIcon } from '../../reusable/settingsIcon'
import { Colors } from '../../reusable/tools'
import { styles } from '../home'
import { CategoriesScreen } from './screens/categories'
import { ProjectsScreen } from './screens/projects'
import { TaskScreen } from './screens/tasks'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

export const TasksScreen = ({navigation}) => (
        <>
            <View style={styles.container}>
                <GreetingText title='Twoje zadania'/>
                <SettingsIcon navigation={navigation}/>
            </View>
            
            <TopTab.Navigator 
                initialRouteName="CategoriesScreen"
                screenOptions={{
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.grey,
                    tabBarLabelStyle: { fontSize: Platform.OS === 'android' ? 16 : 12, fontWeight: 'bold' },
                    tabBarIndicatorContainerStyle: {
                        backgroundColor: Colors.white,
                    },
                    tabBarIndicatorStyle: { 
                        backgroundColor: Colors.blue
                    }
                }}
            >
                <TopTab.Screen 
                    name="CategoriesScreen" 
                    component={CategoriesScreen}
                    options={{
                        headerShown: false,
                        title: "Kategorie",
                    }}
                />
                <TopTab.Screen 
                    name="ProjectsScreen" 
                    component={ProjectsScreen}
                    options={{
                        headerShown: false,
                        title: "Projekty",
                    }}
                />
                <TopTab.Screen 
                    name="TaskScreen" 
                    component={TaskScreen}
                    options={{
                        headerShown: false,
                        title: "Zadania",
                    }}
                />
            </TopTab.Navigator>
        </>
)
