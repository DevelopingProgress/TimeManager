// import React, {useEffect, useState} from 'react';
//
// import {Text, View} from 'react-native';
// import {Icon} from "react-native-elements";
// import BackgroundTimer from "react-native-background-timer";
//
// export const Timer = (props) => {
//
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [secondsLeft, setSecondsLeft] = useState(props.secondsLeft);
//
//     useEffect(() => {
//         if(isPlaying) startTimer()
//         else BackgroundTimer.stopBackgroundTimer()
//
//         return () => {
//             BackgroundTimer.stopBackgroundTimer()
//         }
//     }, [isPlaying]);
//
//     useEffect(() => {
//         if(secondsLeft === 0 ) BackgroundTimer.stopBackgroundTimer()
//     }, [secondsLeft]);
//
//
//     const startTimer = () => {
//         BackgroundTimer.runBackgroundTimer(() => {
//             setSecondsLeft(secs => {
//                 if(secs > 0 ) return secs - 1
//                 else return 0
//             })
//         }, 1000)
//     }
//
//     const clockify = () => {
//         let hours = Math.floor(secondsLeft / 60 / 60 )
//         let minutes = Math.floor(secondsLeft / 60 % 60)
//         let seconds = Math.floor(secondsLeft % 60)
//
//         let displayHours = hours < 10 ? `0${hours}` : hours
//         let displayMinutes = minutes < 10 ? `0${minutes}` : minutes
//         let displaySeconds = seconds < 10 ? `0${seconds}` : seconds
//
//         return {
//             displayHours, displayMinutes, displaySeconds
//         }
//     }
//
//     return (
//         <View style={{flexDirection: 'row', marginRight: 5}}>
//             <View style={{ marginRight: 5}}>
//                 <View style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
//                     <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displayHours}</Text>
//                 </View>
//                 <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Godz</Text>
//             </View>
//             <View style={{ marginRight: 5}}>
//                 <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
//                     <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displayMinutes}</Text>
//                 </View>
//                 <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Min</Text>
//             </View>
//             <View>
//                 <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
//                     <Text style={{fontSize: 25, fontWeight: 'bold'}}>{clockify().displaySeconds}</Text>
//                 </View>
//                 <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Sek</Text>
//             </View>
//             {!isPlaying ?
//                 <Icon
//                     name='play-circle-outline'
//                     type='iconicon'
//                     onPress={() => setIsPlaying(true)}
//                     size={60}
//                     containerStyle={{marginHorizontal: 10}}
//                 /> :
//                 <Icon
//                     name='stop-circle-outline'
//                     type='ionicon'
//                     onPress={() => setIsPlaying(false)}
//                     size={60}
//                     containerStyle={{marginHorizontal: 10}}
//                 />
//             }
//         </View>
//
//     );
// };
//
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    alert(now)
    // alert(`Got background fetch call at date: ${new Date(now).toISOString()}`);

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 15, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);

    React.useEffect(() => {
        checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        checkStatusAsync();
    };

    return (
        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <Text>
                    Background fetch status:{' '}
                    <Text style={styles.boldText}>
                        {status && BackgroundFetch.BackgroundFetchStatus[status]}
                    </Text>
                </Text>
                <Text>
                    Background fetch task name:{' '}
                    <Text style={styles.boldText}>
                        {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
                    </Text>
                </Text>
            </View>
            <View style={styles.textContainer}></View>
            <Button
                title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
                onPress={toggleFetchTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {

    },
    textContainer: {

    },
    boldText: {

    }

})
