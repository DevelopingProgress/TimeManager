import { useFocusEffect } from '@react-navigation/core'
import React, {useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import {clearTasksError, listTasks} from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'
import {Icon, ListItem} from "react-native-elements";

export const TaskScreen = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.tasks.projects)
    const tasks = useSelector(state => state.tasks.tasks)
    const error = useSelector(state => state.tasks.error)

    const [state, setState] = useState({
        items: []
    });


    useFocusEffect(
        React.useCallback(() => {
            const items = projects.map((project,idx) => ({
                idx: idx,
                projID: project.projID,
                name: project.name,
                icon: project.icon,
            }))
            setState({
                items: items.map((item) => ({
                    ...item,
                    expanded: false
                }))
            })
        }, [projects])
    )



    const toggleExpand = (id, project) => {
        const nextItems = [...state.items].map(item => {
            if(item.idx === id) {
                return {
                    ...item,
                    expanded: !item.expanded
                }
            }
            return item
        })
        setState({
            items: nextItems
        })

        dispatch(listTasks(project))
    }


    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10}}>
                {/*<Text onPress={() => console.log(state.items)}>Pokaż itemy</Text>*/}
                {state.items ? state.items.map((item) => (
                <ListItem.Accordion
                    key={item.idx}
                    content={
                        <>
                            <Icon name={item.icon} type='antdesign' size={30} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={item.expanded}
                    onPress={() => toggleExpand(item.idx, item.projID)}
                >
                    {tasks ? tasks.map(task => (
                        <ListItem key={task.taskID} onPress={() => console.log(task.taskID)} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{task.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )): null}
                </ListItem.Accordion>
                        )): null}
            </View>

            <AddFab/>
        </ScrollView>
    )
}
