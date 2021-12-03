import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {useDispatch, useSelector} from "react-redux";
import {styles} from "../../../home";
import {Button, Text} from "react-native-elements";
import {Colors} from "../../../../reusable/tools";

const TaskDetailsScreen = (props) => {
    const task = props.route.params.task
    const user = props.route.params.user
    const category = props.route.params.category
    const project = props.route.params.project

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='task' navigation={props.navigation}  user={user} category={category} project={project} task={task}/>
                <View style={{marginHorizontal: 40, marginTop:  30, padding: 20, borderWidth: 1, flexDirection: 'row'}}>
                    <Text h4 style={{flex: 1}}>
                        Status
                    </Text>
                    <Button
                        style={{flex: 0.1}}
                        type='outline'
                        title='Do zrobienia'
                        buttonStyle={{borderColor: Colors.black, alignSelf: 'flex-end'}}
                        titleStyle={{color: Colors.blue}}
                    />
                </View>
                <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1, flexDirection: 'row'}}>
                    <Text h4 style={{flex: 1}}>
                        Czas
                    </Text>
                    <Button
                        style={{flex: 0.1}}
                        type='outline'
                        title='Do zrobienia'
                        buttonStyle={{borderColor: Colors.black, alignSelf: 'flex-end'}}
                        titleStyle={{color: Colors.blue}}
                    />
                </View>
            </ScrollView>
        </>

    );
};

export default TaskDetailsScreen;
