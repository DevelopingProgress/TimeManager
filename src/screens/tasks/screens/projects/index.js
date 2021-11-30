import React from 'react'
import {useSelector} from "react-redux";
import { AddFab } from '../../../../reusable/fab'
import {ScrollView, View} from 'react-native'
import {Text} from "react-native";
import {Tiles} from "../../../../reusable/tiles";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/tools";

export const ProjectsScreen = (props) => {
    const category = props.route.params.item
    const projects = useSelector(state => state.tasks.projects)
    
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
