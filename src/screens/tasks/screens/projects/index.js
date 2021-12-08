import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { AddFab } from '../../../../reusable/addFab'
import {ScrollView, View} from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/tools";
import {clearStatus, listProjects, listTasks} from "../../../../store/actions/tasksActions";
import {useFocusEffect} from "@react-navigation/core";
import {Loading} from "../../../../reusable/loading";

export const ProjectsScreen = (props) => {
    const dispatch = useDispatch();
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    const user = useSelector(state => state.auth.user)
    const [loading, setLoading] = useState(true);
    const status = useSelector(state => state.tasks.status)

    useEffect (() => {
        dispatch(listProjects(user, category))
    }, [user,  loading])

    useEffect(() => {
        if(status === 'projects_listed') {
            dispatch(clearStatus())
            setLoading(false)
        }
    }, [status])


    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='projects' navigation={props.navigation} category={category} user={user}  setLoading={setLoading}/>
                {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                projects.length > 0  ?  <Tiles
                        array={projects}
                        navigation={props.navigation}
                        goToScreen='TaskStack'
                        category={category}
                        type='project'
                        setLoading={setLoading}
                    /> :
                    <View style={{alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: Colors.red}}>Brak projektów dla wybranej  kategorii</Text>
                    </View>
                }
            </ScrollView>
            <AddFab type={1} category={category}/>
        </>

    )
}
