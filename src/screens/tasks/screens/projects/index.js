import React from 'react'
import {useSelector} from "react-redux";
import { AddFab } from '../../../../reusable/fab'
import { ScrollView } from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";

export const ProjectsScreen = (props) => {
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    
    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='projects' navigation={props.navigation}/>
                {projects.length > 0  ?  <Tiles
                        array={projects}
                        navigation={props.navigation}
                        goToScreen='TaskScreen'
                        category={category}
                        type='project'/> :
                    <Text>Brak projektów dla wybranej kategorii</Text>
                }
            </ScrollView>
            <AddFab type={1} category={category}/>
        </>

    )
}
