import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listTasks } from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'

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
            <View style={{margin: 10}}>
                {tasks ? tasks.map((item) => (
                    <Menu.Item
                        key={item.taskID ? item.taskID : null}
                        title={item.name ? item.name : null}
                        onPress={() => console.log('Zadanie nr ' + item.taskID ? item.taskID : null)}
                    />
                )) : null}
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}