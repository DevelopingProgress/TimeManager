import { useFocusEffect } from '@react-navigation/core'
import React, {useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import {clearTasksError, listCategories, listTasks} from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'
import {Icon, ListItem} from "react-native-elements";
import {MenuItems} from "../../../../reusable/MenuItems";

export const TaskScreen = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.tasks.projects)
    const tasks = useSelector(state => state.tasks.tasks)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listTasks(projects))
        }, [dispatch, projects])
    )



    return (
        <ScrollView style={styles.mainContainer}>
            <MenuItems array={tasks} />
            <AddFab/>
        </ScrollView>
    )
}
