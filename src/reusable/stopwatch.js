import React, {useState, useEffect} from 'react';

import {Text, View} from 'react-native';
import {useDispatch} from "react-redux";
import {clockify, Colors, sleep} from "./tools";
import {Icon} from "react-native-elements";
import AwesomeAlert from "react-native-awesome-alerts";
import {endNoDateTask, listTasks} from "../store/actions/tasksActions";
import {endNoDateTsk} from "../store/api/apiTasks";

const StopWatch = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [counter, setCounter] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const {user, category, project, task} = props.data
    const dispatch = useDispatch()
    const timeSpent = clockify(counter).displayHours+':'+clockify(counter).displayMinutes+':'+clockify(counter).displaySeconds

    useEffect(() => {
        if(isPlaying) startTimer();
        return () => clearTimeout(timer);
    });

    let timer = () => {};
    const startTimer = () => {
        timer = setTimeout(() => {
            setCounter((counter) => counter + 1);
        }, 1000)
    }

    return (
        <>
            <View style={{flexDirection: 'row', marginRight: 13}}>
                <View style={{flexDirection: 'row', marginRight: 5}}>
                    <View style={{ marginRight: 5}}>
                        <View style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(counter).displayHours}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Godz</Text>
                    </View>
                    <View style={{ marginRight: 5}}>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(counter).displayMinutes}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Min</Text>
                    </View>
                    <View>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify(counter).displaySeconds}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Sek</Text>
                    </View>
                </View>
                {!isPlaying ?
                    <Icon
                        name='play-circle-outline'
                        type='iconicon'
                        onPress={() => setIsPlaying(true)}
                        size={60}
                        containerStyle={{marginHorizontal: 10}}
                    /> :
                    <Icon
                        name='stop-circle-outline'
                        type='ionicon'
                        onPress={() => {
                            setIsPlaying(false)
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
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Nie, Potrzebuję więcej czasu"
                confirmText="Tak, Ukończ zadanie"
                confirmButtonColor={Colors.lightgreen}
                actionContainerStyle={{flexDirection: 'column', alignItems: 'center'}}
                onCancelPressed={() => {
                    setShowAlert(false)
                    setIsPlaying(true)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                    dispatch(endNoDateTask(user, category, project, task, new Date(Date.now()), timeSpent))
                    dispatch(listTasks(user, category, project))
                    sleep(1000).then(
                        props.navigation.navigate('DoneTasksScreen', {
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