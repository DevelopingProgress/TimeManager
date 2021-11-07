import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import {clearTasksError, listProjects} from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'
import {Icon} from "react-native-elements";

export const ProjectsScreen = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.tasks.projects)
    const categories = useSelector(state => state.tasks.categories)
    const error = useSelector(state => state.tasks.error)


    useFocusEffect(
        React.useCallback(() => {
            if(categories) {
                dispatch(listProjects(categories))
            } else if(error) {
                //ERROR COMPONENT TODO
                alert(error)
                dispatch(clearTasksError())
            }
        }, [dispatch, categories, error])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10, flex: 1}}>
                {projects ? projects.map((item) => (
                    <Menu.Item
                        key={item.projID ? item.projID : null}
                        title={item.name ? item.name : null}
                        icon={() => <Icon name={item.icon  ? item.icon : null} type='antdesign' />}
                        onPress={() => console.log('Projekt nr ' + item.projID ? item.projID : null)}
                    />
                )) : null}
            </View>

            <AddFab/>
        </ScrollView>
    )
}
