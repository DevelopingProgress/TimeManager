import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import { AddFab } from '../../../../reusable/fab'
import { ScrollView } from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {listProjects} from "../../../../store/actions/tasksActions";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";

export const ProjectsScreen = (props) => {
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    
    return (
        <ScrollView style={styles.mainContainer}>
            <StackHeader type='projects' navigation={props.navigation}/>
            {projects.length > 0  ?  <Tiles array={projects} navigation={props.navigation} goToScreen='TaskScreen' category={category}/> :
                <Text>Brak projektów dla wybranej kategorii</Text>
            }
            <AddFab/>
        </ScrollView>
    )
}
