import React, {useEffect, useState} from 'react';
import AwesomeAlert from "react-native-awesome-alerts";
import {Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import {clockify, Colors, getTodayDate, parseSeconds, sleep} from "./utils/tools";
import {useDispatch} from "react-redux";
import {endTask, listTasks, setLoading} from "../store/actions/tasksActions";
import ReactNativeBackgroundTimer from "react-native-background-timer";
import AddTimeForm from "./forms/addTimeForm";
import {addTime, preserveTimer, toggleTimer, updateTimer, updateTimerDatabase} from "../store/actions/timerActions";
import moment from "moment";
import {displayEndTaskNotification, displayStartTaskNotification} from "./notifications";


const CountdownTimer = (props) => {
    const {data, navigation, isPlaying, taskTimer, tasks, additionalTime, timeSpent} = props
    const [showAlert, setShowAlert] = useState(false);
    const {user, category, project, task} = data
    const dispatch = useDispatch()
    const [addTimeModalVisible, setAddTimeModalVisible] = useState(false);

    useEffect(() => {
        if(isPlaying) startTimer();
        return () => ReactNativeBackgroundTimer.clearTimeout(timer);
    }, [isPlaying, taskTimer, tasks, task, additionalTime, timeSpent]);

    useEffect(() => {
        if(moment(task.dueDate.toDate()).diff(Date.now(), "m") === 15) {
            displayStartTaskNotification(task)
        }
    }, [task]);

    let timer = () => {};
    const startTimer = () => {
        timer = ReactNativeBackgroundTimer.setTimeout(() => {
            if(taskTimer === 0){
                dispatch(toggleTimer(user, category, project, tasks,  task, false))
                if(additionalTime === 0) {
                    dispatch(updateTimerDatabase(user, category, project, tasks, task, 0))
                } else {
                    dispatch(updateTimerDatabase(user, category, project, tasks, task, additionalTime))
                }
                setShowAlert(true)
                ReactNativeBackgroundTimer.clearTimeout(timer);
                displayEndTaskNotification(task)
            }
            dispatch(updateTimer(tasks, task))
        }, 1000)
    }

    const handleSubmit = (values) => {
        dispatch(addTime(user, category, project, tasks, task, parseSeconds(values.hours, values.minutes, values.seconds)))
        setAddTimeModalVisible(false)
        setShowAlert(false)
    }

    return (
        <>
            <View style={{flexDirection: 'row', marginRight: 13}}>
                <View style={{flexDirection: 'row', marginRight: 5}}>
                    <View style={{ marginRight: 5}}>
                        <View style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(taskTimer).displayHours}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Godz</Text>
                    </View>
                    <View style={{ marginRight: 5}}>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(taskTimer).displayMinutes}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Min</Text>
                    </View>
                    <View>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(taskTimer).displaySeconds}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Sek</Text>
                    </View>
                </View>
                {!isPlaying ?
                    <Icon
                        name='play-circle-outline'
                        type='iconicon'
                        onPress={() => {
                            dispatch(toggleTimer(user, category, project, tasks,  task, true))
                        }}
                        size={60}
                        color={moment(task.dueDate.toDate()).format("YYYY-MM-DD") > getTodayDate() ? Colors.grey : Colors.black}
                        disabled={moment(task.dueDate.toDate()).format("YYYY-MM-DD") > getTodayDate()}
                        disabledStyle={{backgroundColor: 'transparent'}}
                    /> :
                    <Icon
                        name='stop-circle-outline'
                        type='ionicon'
                        onPress={() => {
                            dispatch(toggleTimer(user, category, project, tasks,  task, false))
                            dispatch(preserveTimer(user, category, project, tasks, task, parseInt(taskTimer), additionalTime, timeSpent))
                        }}
                        size={60}
                    />
                }
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Czas się skończył"
                message="Czy chcesz ukończyć zadanie?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Nie, Potrzebuję więcej czasu"
                confirmText="Tak, Ukończ zadanie"
                confirmButtonColor={Colors.lightgreen}
                actionContainerStyle={{flexDirection: 'column', alignItems: 'center'}}
                onCancelPressed={() => {
                    setAddTimeModalVisible(true)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                    dispatch(endTask(user, category, project, task, new Date(Date.now())))
                    dispatch(setLoading())
                    dispatch(listTasks(user))
                    sleep(1000).then(
                        navigation.navigate('DoneTasksScreen', {
                            item: project,
                            category: category
                        })
                    )
                }}
            />
            <AddTimeForm
                modalVisible={addTimeModalVisible}
                hideModal={() => setAddTimeModalVisible(false)}
                handleSubmit={handleSubmit}
            />
        </>

    );
};

export default CountdownTimer;
