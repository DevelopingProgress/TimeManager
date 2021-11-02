import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AddFab } from '../../../../reusable/fab'
import {styles} from '../../../home/index'

export const ProjectsScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Text>Projects Screen</Text>
            <AddFab/>
        </ScrollView>
    )
}