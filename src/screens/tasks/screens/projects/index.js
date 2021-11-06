import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listProjects } from '../../../../store/actions/tasksActions'
import {styles} from '../../../home/index'

export const ProjectsScreen = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.tasks.projects)
    const categories = useSelector(state => state.tasks.categories)


    useFocusEffect(
        React.useCallback(() => {
           dispatch(listProjects(categories))
        }, [dispatch, categories])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10}}>
                {projects ? projects.map((item) => (
                    <Menu.Item
                        key={item.projID ? item.projID : null}
                        title={item.name ? item.name : null}
                        icon={item.icon  ? item.icon : null}
                        theme={{dark: true}}
                        onPress={() => console.log('Projekt nr ' + item.projID ? item.projID : null)}
                    />
                )) : null}
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}