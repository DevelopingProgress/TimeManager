import React, {useEffect, useState} from 'react';
import AwesomeAlert from "react-native-awesome-alerts";
import {Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import {clockify, Colors, parseSeconds, sleep} from "./utils/tools";
import {useDispatch} from "react-redux";
import {endTask, listTasks} from "../store/actions/tasksActions";
import ReactNativeBackgroundTimer from "react-native-background-timer";
import AddTimeForm from "./forms/addTimeForm";
import {addTime, toggleTimer, updateTimer, updateTimerDatabase} from "../store/actions/timerActions";

const CountdownTimer = (props) => {
    const {data, navigation, isPlaying, taskTimer, tasks, additionalTime, setAdditionalTime} = props
    const [showAlert, setShowAlert] = useState(false);
    const {user, category, project, task} = data
    const dispatch = useDispatch()
    const [addTimeModalVisible, setAddTimeModalVisible] = useState(false);


    useEffect(() => {
        if(isPlaying) startTimer();
        return () => ReactNativeBackgroundTimer.clearTimeout(timer);
    }, [isPlaying, taskTimer]);

    let timer = () => {};
    const startTimer = () => {
        timer = ReactNativeBackgroundTimer.setTimeout(() => {
            if(taskTimer <= 0){
                dispatch(toggleTimer(user, category, project, tasks,  task, false))
                setShowAlert(true)
                dispatch(updateTimerDatabase(user, category, project, tasks, task, parseInt(task.timer), additionalTime))
                ReactNativeBackgroundTimer.clearTimeout(timer);
                return false;
            }
            dispatch(updateTimer(tasks, task))
        }, 1000)
    }

    const handleSubmit = (values) => {
        setAddTimeModalVisible(false)
        setShowAlert(false)
        setAdditionalTime(parseSeconds(values.hours, values.minutes, values.seconds))
        dispatch(addTime(user, category, project, tasks, task, additionalTime))
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
                    setAddTimeModalVisible(true)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                    dispatch(endTask(user, category, project, task, new Date(Date.now())))
                    dispatch(listTasks(user, category, project))
                    sleep(1000).then(
                        navigation.navigate('DoneTasksScreen', {
                            item: project,
                            category: category
                        })
                    )
                }}
            />
            <AddTimeForm modalVisible={addTimeModalVisible} hideModal={() => setAddTimeModalVisible(false)} handleSubmit={handleSubmit}/>
        </>

    );
};

export default CountdownTimer;
