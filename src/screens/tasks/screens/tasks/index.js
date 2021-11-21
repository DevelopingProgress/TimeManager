import React, {useEffect} from 'react'
import {ScrollView} from 'react-native'
import { AddFab } from '../../../../reusable/fab'
import {styles} from '../../../home/index'
import {useDispatch, useSelector} from "react-redux";
import {listTasks} from "../../../../store/actions/tasksActions";
import {ListItem, Button, Icon} from "react-native-elements";
import {Colors} from "../../../../reusable/tools";

export const TaskScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const project  = props.route.params.item.id
    const category = props.route.params.category
    const tasks  = useSelector(state => state.tasks.tasks)

    useEffect(() => {
        dispatch(listTasks(user, category, project))
    }, [dispatch, project])

    return (
        <ScrollView style={styles.mainContainer}>
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
                        title="Delete"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    />
                }
            >
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        ))}
            <AddFab/>
        </ScrollView>
    )
}
