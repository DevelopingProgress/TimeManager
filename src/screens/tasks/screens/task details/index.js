import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, StyleSheet, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {styles} from "../../../home";
import {Button, Icon, Text} from "react-native-elements";
import {clockify, Colors, getHours, getMinutes, getSeconds, parseSeconds} from "../../../../reusable/utils/tools";
import CountdownTimer  from "../../../../reusable/countdownTimer";
import AddForm from "../../../../reusable/forms/addForm";
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
    const status = useSelector(state => state.app.status)
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.app.tasks)
    const taskTimer = tasks.find(function(item) {
        return item.id === task.id
    }).timer
    const isPlaying  = tasks.find(function(item) {
        return item.id === task.id
    }).isPlaying
    const [additionalTime, setAdditionalTime] = useState(0);

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
               dispatch(updateTask(user, values.name, category, project, task, null, 0))
           else dispatch(updateTask(user, values.name, category, project, task, values.date, parseSeconds(values.hours, values.minutes, values.seconds)))
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

    useEffect(() => {
        if(isPlaying) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
            return () => backHandler.remove()
        }
    }, [isPlaying])


    return (
        <>
            <AddForm
                modalVisible={modalVisible}
                hideModal={() => {
                    setModalVisible(!modalVisible)
                    setLoading(false)
                }}
                modalType={modalType}
                handleSubmit={handleSubmit}
                loading={loading}
                item={task}
                taskTimer={taskTimer}
                edit
            />
            <ScrollView style={styles.mainContainer}>
                <StackHeader
                    type='task'
                    navigation={props.navigation}
                    user={user}
                    category={category}
                    project={project}
                    task={task}
                    isPlaying={isPlaying}
                    taskTimer={taskTimer}
                    tasks={tasks}
                />
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
                {!task.done ?
                    <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                        <Text h4 style={{flex: 1}}>
                            Czas
                        </Text>
                        {task.dueDate ?
                            <View style={{flexDirection: 'row', marginRight: 13}}>
                                <CountdownTimer
                                    data={{user, category, project, task}}
                                    navigation={props.navigation}
                                    isPlaying={isPlaying}
                                    // setIsPlaying={setIsPlaying}
                                    taskTimer={taskTimer}
                                    tasks={tasks}
                                    additionalTime={additionalTime}
                                    setAdditionalTime={setAdditionalTime}
                                />
                            </View>
                            :
                            <View style={{flexDirection: 'row', marginRight: 13}}>
                                <StopWatch
                                    data={{user, category, project, task}}
                                    navigation={props.navigation}
                                    isPlaying={isPlaying}
                                    taskTimer={taskTimer}
                                />
                            </View>
                        }
                    </View> :
                    <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                        <Text h4 style={{flex: 1}}>
                            Spędzony czas
                        </Text>
                        <View style={{flexDirection: 'row', marginRight: 13}}>
                            <Text style={{fontSize: 18}}>
                                {clockify(task.timeSpent).displayHours
                                    + ' godzin, '+clockify(task.timeSpent).displayMinutes
                                    + ' minut, '+clockify(task.timeSpent).displaySeconds+ ' sekund'
                                }
                            </Text>
                        </View>
                    </View>
                }
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
                disabled={task.done || isPlaying}
            />
        </>

    );
};



