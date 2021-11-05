import { useFocusEffect } from '@react-navigation/core'
import { Icon, List, ListItem } from 'material-bread'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listProjects } from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'

export const ProjectsScreen = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.tasks.projects)
    const user = useSelector(state => state.auth.user)

    useFocusEffect(
        React.useCallback(() => {
           dispatch(listProjects(user))
        }, [dispatch, listProjects,user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10}}>
                <List style={{ maxWidth: 300 }}>
                    {projects ? projects.map((item) => (
                        <ListItem
                            key={item.projID}
                            text={item.name}
                            icon={<Icon name={item.icon} size={24} />}
                        />
                    )) : null}
                </List>
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}