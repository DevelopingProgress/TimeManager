import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {styles} from "../../../home";
import {Button, Icon, Text} from "react-native-elements";
import {Colors, getHours, getMinutes, getSeconds} from "../../../../reusable/tools";
import CountDown from "react-native-countdown-component";
import Timer from "../../../../reusable/timer";
import ModalAdd from "../../../../reusable/modalAdd";
import {clearStatus, listTasks, updateTask} from "../../../../store/actions/tasksActions";
import {useDispatch, useSelector} from "react-redux";
import {StackActions} from "@react-navigation/native";

export const TaskDetailsScreen = (props) => {
    const task = props.route.params.task
    const user = props.route.params.user
    const category = props.route.params.category
    const project = props.route.params.project
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [loading, setLoading] = useState(false)
    const status = useSelector(state => state.tasks.status)
    const dispatch = useDispatch()

    const handlePress = (value) => {
        switch (value) {
            case 'task':
                setModalVisible(true)
                setModalType(value)
                break;
            default:
                break;
        }
    }
    const handleSubmit = (values) => {
       if(modalType === 'task') {
            setLoading(true)
           dispatch(updateTask(user, values.name, category, project, task, values.date, values.hours + ':'+values.minutes+':'+values.seconds))
        }
    }

    useEffect(() => {
        if(status === 'task_updated') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            props.navigation.goBack()
        }
    }, [status]);



    const [overallTime, setOverallTime] = useState(
        parseInt(getHours(task)) * 60 * 60 + parseInt(getMinutes(task)) * 60 + parseInt(getSeconds(task)));


    return (
        <>
            <ModalAdd
                modalVisible={modalVisible}
                hideModal={() => {
                    setModalVisible(!modalVisible)
                    setLoading(false)
                }}
                modalType={modalType}
                handleSubmit={handleSubmit}
                loading={loading}
                item={task}
                edit
            />
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='task' navigation={props.navigation}  user={user} category={category} project={project} task={task}/>
                <View style={stylesTask.taskContainer}>
                    <Text h4 style={{flex: 1}}>
                        Status
                    </Text>
                    <Button
                        style={{flex: 0.1}}
                        title='Do zrobienia'
                        buttonStyle={stylesTask.statusButtonStyle}
                        onPress={() => console.log('Change status')}
                    />
                </View>
                <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                    <Text h4 style={{flex: 1}}>
                        Czas
                    </Text>
                    <View style={{flexDirection: 'row', marginRight: 13}}>
                       <Timer count={overallTime}/>
                    </View>
                </View>
                <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                    <Text h4>
                        Opis
                    </Text>
                    {task && task.description ?
                    <Text style={{fontSize: 18}}>
                        {task.description}
                    </Text>:
                    <Text style={{fontSize: 18}}>
                        Brak opisu
                    </Text>
                    }
                </View>
            </ScrollView>
            <Button
                icon={<Icon
                    name='edit'
                    type='materialcions'
                    color={Colors.white}
                    size={30}
                />}
                buttonStyle={{
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    backgroundColor: Colors.black
                }}
                containerStyle={{
                    position: "absolute",
                    right: 15,
                    bottom: 20
                }}
                onPress={() => handlePress('task')}
            />
        </>

    );
};

const stylesTask = StyleSheet.create({
    taskContainer: {
        marginHorizontal: 40,
        marginTop:  30,
        padding: 20,
        borderWidth: 1,
        flexDirection: 'row'
    },
    statusButtonStyle: {
        borderColor: Colors.black,
        borderWidth: 0.5,
        alignSelf: 'flex-end',
        backgroundColor: Colors.blue
    }
})


