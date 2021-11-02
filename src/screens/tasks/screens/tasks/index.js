import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AddFab } from '../../../../reusable/fab'
import {styles} from '../../../home/index'

export const TaskScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Text>Task Screen</Text>
            <AddFab/>
        </ScrollView>
    )
}