import React, {useEffect, useState} from 'react';
import AwesomeAlert from "react-native-awesome-alerts";
import {Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import {Colors} from "./tools";

const Timer = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [counter, setCounter] = useState(props.count);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if(isPlaying) startTimer();
        return () => clearTimeout(timer);
    });

    let timer = () => {};
    const startTimer = () => {
        timer = setTimeout(() => {
            if(counter <= 0){
                setIsPlaying(false)
                setCounter(props.count)
                setShowAlert(true)
                clearTimeout(timer);
                return false;
            }
            setCounter(counter-1);
        }, 1000)
    }

    const clockify = () => {
        let hours = Math.floor(counter / 60 / 60)
        let minutes = Math.floor(counter / 60 % 60)
        let seconds  = Math.floor(counter % 60)

        let displayHours = hours < 10 ? `0${hours}` : hours
        let displayMinutes = minutes < 10 ? `0${minutes}` : minutes
        let displaySeconds = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayHours, displayMinutes, displaySeconds
        }
    }


    return (
        <>
            <View style={{flexDirection: 'row', marginRight: 13}}>
                <View style={{flexDirection: 'row', marginRight: 5}}>
                    <View style={{ marginRight: 5}}>
                        <View style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displayHours}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Godz</Text>
                    </View>
                    <View style={{ marginRight: 5}}>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displayMinutes}</Text>
                        </View>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Min</Text>
                    </View>
                    <View>
                        <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displaySeconds}</Text>
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
                        onPress={() => setIsPlaying(false)}
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
                    console.log('cancel')
                }}
                onConfirmPressed={() => {
                    console.log('confirm')
                    //dispatch(endTask(task))
                }}
            />
        </>

    );
};

export default Timer;
