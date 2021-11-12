import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listCategories, listTasks } from '../../../../store/actions/tasksActions'
import { styles } from '../../../home/index'
import {MenuItems} from "../../../../reusable/MenuItems";



export const CategoriesScreen = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.tasks.categories)
    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.tasks.projects)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listCategories(user))
        }, [dispatch, user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <MenuItems array={categories} categories />
            <AddFab/>
        </ScrollView>
    )
}
