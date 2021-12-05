import React, {useEffect, useState} from 'react';

import {Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import BackgroundTimer from "react-native-background-timer";

export const Timer = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(props.secondsLeft);

    useEffect(() => {
        if(isPlaying) startTimer()
        else BackgroundTimer.stopBackgroundTimer()

        return () => {
            BackgroundTimer.stopBackgroundTimer()
        }
    }, [isPlaying]);

    useEffect(() => {
        if(secondsLeft === 0 ) BackgroundTimer.stopBackgroundTimer()
    }, [secondsLeft]);


    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setSecondsLeft(secs => {
                if(secs > 0 ) return secs - 1
                else return 0
            })
        }, 1000)
    }

    const clockify = () => {
        let hours = Math.floor(secondsLeft / 60 / 60 )
        let minutes = Math.floor(secondsLeft / 60 % 60)
        let seconds = Math.floor(secondsLeft % 60)

        let displayHours = hours < 10 ? `0${hours}` : hours
        let displayMinutes = minutes < 10 ? `0${minutes}` : minutes
        let displaySeconds = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayHours, displayMinutes, displaySeconds
        }
    }

    return (
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

    );
};

