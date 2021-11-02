import React from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AddFab } from '../../../../reusable/fab'
import { styles } from '../../../home/index'


export const CategoriesScreen = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Text>Categories Screen</Text>
            <AddFab/>
        </ScrollView>
    )
}