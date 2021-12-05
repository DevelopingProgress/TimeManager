import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {styles} from "../../../home";
import {Button, Icon, Text} from "react-native-elements";
import {Colors} from "../../../../reusable/tools";
import CountDown from "react-native-countdown-component";
import {Timer} from "../../../../reusable/timer";
import AwesomeAlert from "react-native-awesome-alerts";

export const TaskDetailsScreen = (props) => {
    const task = props.route.params.task
    const user = props.route.params.user
    const category = props.route.params.category
    const project = props.route.params.project
    const [isPlaying, setIsPlaying] = useState(
        props.route.params.isPlaying &&
        props.route.params.isPlaying ?
            props.route.params.isPlaying :
            false
    );

    const getHours = () => {
        const separatedTime = task.timer.split(':')
        const digits = separatedTime[0].split()
        if(digits[0] === '0' || digits.length === 1)
            return '0' + separatedTime[0]
        else return separatedTime[0]
    }
    const getMinutes = () => {
        const separatedTime = task.timer.split(':')
        const digits = separatedTime[1].split()
        if(digits[0] === '0')
        return '0' + separatedTime[1]
        else return separatedTime[1]
    }
    const getSeconds= () => {
        const separatedTime = task.timer.split(':')
        const digits = separatedTime[2].split()
        if(digits[0] === '0')
            return '0' + separatedTime[2]
        else return separatedTime[2]
    }

    const [overallTime, setOverallTime] = useState(parseInt(getHours()) * 60 * 60 + parseInt(getMinutes()) * 60 + parseInt(getSeconds()));
    const [showAlert, setShowAlert] = useState(false);


    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='task' navigation={props.navigation}  user={user} category={category} project={project} task={task} isPlaying={isPlaying}/>
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
                        {/*<Timer secondsLeft={overallTime} />*/}
                        <CountDown
                            size={25}
                            until={overallTime}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{h: 'Godz', m: 'Min', s: 'Sek'}}
                            digitTxtStyle={{fontSize: 25, color: Colors.black}}
                            timeLabelStyle={{fontSize: 20, color: Colors.black}}
                            digitStyle={{borderWidth: 1}}
                            onFinish={() => {
                                // alert('Czas przenaczony na zadanie "' + task.name + '" upłynął')
                                setShowAlert(true)
                                setIsPlaying(false)
                            }}
                            running={isPlaying}
                        />
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
                onPress={() => console.log('edit')}
            />
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


