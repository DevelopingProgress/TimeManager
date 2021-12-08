import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {styles} from "../../../home";
import {Button, Icon, Text} from "react-native-elements";
import {Colors, getHours, getMinutes, getSeconds} from "../../../../reusable/tools";
import Timer from "../../../../reusable/timer";
import ModalAdd from "../../../../reusable/modalAdd";
import {clearStatus, updateTask} from "../../../../store/actions/tasksActions";
import {useDispatch, useSelector} from "react-redux";
import StopWatch from "../../../../reusable/stopwatch";
import moment from "moment";

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
           if(values.withoutDate)
               dispatch(updateTask(user, values.name, category, project, task, null, null))
           else dispatch(updateTask(user, values.name, category, project, task, values.date, values.hours + ':'+values.minutes+':'+values.seconds))
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
                    <Text h4>
                        Data i godzina
                    </Text>
                    {task && task.dueDate ?
                        <Text style={{fontSize: 18}}>
                            {moment(task.dueDate.toDate()).format('LLL')}
                        </Text>:
                        <Text style={{fontSize: 18}}>
                            Zadanie bez daty
                        </Text>
                    }
                </View>
                {!task.done &&
                    <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                        <Text h4 style={{flex: 1}}>
                            Czas
                        </Text>
                        {task.dueDate ?
                            <View style={{flexDirection: 'row', marginRight: 13}}>
                                <Timer count={overallTime} data={{user, category, project, task}} navigation={props.navigation}/>
                            </View>
                            :
                            <View style={{flexDirection: 'row', marginRight: 13}}>
                                <StopWatch data={{user, category, project, task}} navigation={props.navigation}/>
                            </View>
                        }
                    </View>
                }
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
                disabled={task.done}
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


