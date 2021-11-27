import {Button, Icon, ListItem} from "react-native-elements";
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import { AddFab } from '../../../../reusable/fab'
import {Colors} from "../../../../reusable/tools";
import {Alert, ScrollView} from 'react-native'
import {
    deleteCategory,
    deleteProject,
    deleteTask,
    listCategories, listProjects,
    listTasks
} from "../../../../store/actions/tasksActions";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";

export const TaskScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const project  = props.route.params.item
    const category = props.route.params.category
    const tasks  = useSelector(state => state.tasks.tasks)

    useEffect(() => {
        dispatch(listTasks(user, category, project))
    }, [dispatch, project])

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='tasks' navigation={props.navigation}  user={user} category={category}/>
                {tasks.map((item) => (
                    <ListItem.Swipeable
                        leftContent={
                            <Button
                                title="Info"
                                icon={{ name: 'info', color: 'white' }}
                                buttonStyle={{ minHeight: '100%' }}
                            />
                        }
                        rightContent={
                            <Button
                                title="Usuń"
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                onPress={() => {
                                    Alert.alert(
                                        'Usuwanie zadania '  +  item.name,
                                        'Czy chcesz usunąć zadanie?' ,
                                        [
                                            {
                                                text: 'Anuluj',
                                            },
                                            {
                                                text: 'Usuń',
                                                onPress: () => {
                                                    dispatch(deleteTask(user, category, project, item))
                                                    dispatch(listTasks(user, category, project))
                                                }
                                            }
                                        ], {cancelable: true})

                                }
                                }
                            />
                        }
                    >
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>
                ))}
            </ScrollView>
            <AddFab type={2} category={category} project={project}/>
        </>

    )
}
