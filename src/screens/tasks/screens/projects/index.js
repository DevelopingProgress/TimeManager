import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { AddFab } from '../../../../reusable/fab'
import {ScrollView, View} from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/tools";
import {listProjects, listTasks} from "../../../../store/actions/tasksActions";
import {useFocusEffect} from "@react-navigation/core";

export const ProjectsScreen = (props) => {
    const dispatch = useDispatch();
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    const user = useSelector(state => state.auth.user)

    useFocusEffect (
        React.useCallback(() => {
            dispatch(listProjects(user, category))
        }, [user, category])
    );

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='projects' navigation={props.navigation} category={category}/>
                {projects.length > 0  ?  <Tiles
                        array={projects}
                        navigation={props.navigation}
                        goToScreen='TaskScreen'
                        category={category}
                        type='project'/> :
                    <View style={{alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: Colors.red}}>Brak projektów dla wybranej  kategorii</Text>
                    </View>
                }
            </ScrollView>
            <AddFab type={1} category={category}/>
        </>

    )
}
