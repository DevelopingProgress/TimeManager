import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { AddFab } from '../../../../reusable/addFab'
import {ScrollView, View} from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/utils/tools";
import {clearStatus, listProjects, listTasks, setLoading} from "../../../../store/actions/tasksActions";
import {Loading} from "../../../../reusable/utils/loading";
import {useFocusEffect} from "@react-navigation/core";

export const ProjectsScreen = (props) => {
    const dispatch = useDispatch();
    const category = props.route.params.item
    const projects = useSelector(state => state.app.projects)
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.app.loading)
    const scrollRef = useRef();

    useFocusEffect (
        React.useCallback(() => {
            dispatch(setLoading())
            dispatch(listProjects(user, category))
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            })
        }, [dispatch, user, category])
    );



    return (
        <>
            <ScrollView style={styles.mainContainer} ref={scrollRef}>
                <StackHeader type='projects' navigation={props.navigation} category={category} user={user}/>
                {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                projects.length > 0  ?  <Tiles
                        array={projects}
                        navigation={props.navigation}
                        goToScreen='TaskStack'
                        category={category}
                        type='project'
                    /> :
                    <View style={{alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: Colors.red}}>Brak projektów dla wybranej  kategorii</Text>
                    </View>
                }
            </ScrollView>
        </>

    )
}
