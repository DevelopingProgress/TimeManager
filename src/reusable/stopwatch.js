import React, {useState, useEffect} from 'react';

import {Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {clockify, Colors, sleep} from "./utils/tools";
import {Icon} from "react-native-elements";
import AwesomeAlert from "react-native-awesome-alerts";
import {endNoDateTask, listTasks} from "../store/actions/tasksActions";
import ReactNativeBackgroundTimer from "react-native-background-timer";
import {toggleTimer, updateStopwatch, updateStopWatchDatabase} from "../store/actions/timerActions";

const StopWatch = (props) => {

    const {data, navigation, isPlaying, taskTimer} = props
    const tasks = useSelector(state => state.app.tasks)
    const [showAlert, setShowAlert] = useState(false);
    const {user, category, project, task} = data
    const dispatch = useDispatch()

    useEffect(() => {
        if(isPlaying) startTimer();
        return () => ReactNativeBackgroundTimer.clearTimeout(timer);
    });

    let timer = () => {};
    const startTimer = () => {
        timer = ReactNativeBackgroundTimer.setTimeout(() => {
            dispatch(updateStopwatch(tasks, task))
        }, 1000)
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
                        containerStyle={{marginHorizontal: 10}}
                    /> :
                    <Icon
                        name='stop-circle-outline'
                        type='ionicon'
                        onPress={() => {
                            dispatch(toggleTimer(user, category, project, tasks,  task, false))
                            dispatch(updateStopWatchDatabase(user, category, project, tasks,  task, parseInt(taskTimer)))
                            setShowAlert(true)
                        }}
                        size={60}
                        containerStyle={{marginHorizontal: 10}}
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
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                    dispatch(endNoDateTask(user, category, project, task, new Date(Date.now()), parseInt(taskTimer)))
                    dispatch(listTasks(user, category, project))
                    sleep(1000).then(
                        navigation.navigate('DoneTasksScreen', {
                            item: project,
                            category: category
                        })
                    )
                }}
            />
        </>
    )
}

export default StopWatch
