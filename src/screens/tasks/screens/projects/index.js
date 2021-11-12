import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import {clearTasksError, listCategories, listProjects} from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'
import {Icon} from "react-native-elements";
import {MenuItems} from "../../../../reusable/MenuItems";

export const ProjectsScreen = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.tasks.categories)
    const error = useSelector(state => state.tasks.error)


    useFocusEffect(
        React.useCallback(() => {
            dispatch(listCategories(user))
        }, [dispatch, user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <MenuItems array={categories} projects />
            <AddFab/>
        </ScrollView>
    )
}
