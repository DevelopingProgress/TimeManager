import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listCategories, listTasks } from '../../../../store/actions/tasksActions'
import { styles } from '../../../home/index'
import {Icon} from "react-native-elements";


export const CategoriesScreen = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.tasks.categories)
    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.tasks.projects)

     useEffect(() => {
        if(categories) {
            dispatch(listCategories(categories))
        }
        if(projects) {
            dispatch(listTasks(projects))
        }
    }, [categories])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listCategories(user))
        }, [dispatch, user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10, flex: 1}}>
                {categories ? categories.map((item) => (
                    <Menu.Item
                        key={item.catID ? item.catID : null}
                        title={item.name ? item.name : null}
                        icon={() => <Icon name={item.icon  ? item.icon : null} type='antdesign' />}
                        onPress={() => console.log('Kategoria nr ' + item.catID ? item.catID : null)}
                    />
                )): null}
            </View>

            <AddFab/>
        </ScrollView>
    )
}
