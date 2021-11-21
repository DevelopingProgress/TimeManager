import React, {useEffect} from 'react'
import { ScrollView } from 'react-native'
import { AddFab } from '../../../../reusable/fab'
import {styles} from '../../../home/index'
import {useDispatch, useSelector} from "react-redux";
import {listProjects} from "../../../../store/actions/tasksActions";
import {Tiles} from "../../../../reusable/tiles";
import {Text} from "react-native";

export const ProjectsScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    useEffect(() => {
        dispatch(listProjects(user, category))
    }, [dispatch, user, category])

    return (
        <ScrollView style={styles.mainContainer}>
            {projects.length > 0  ?  <Tiles array={projects} navigation={props.navigation} goToScreen='TaskScreen' category={category}/> :
                <Text>Brak projektów dla wybranej kategorii</Text>
            }
            <AddFab/>
        </ScrollView>
    )
}
