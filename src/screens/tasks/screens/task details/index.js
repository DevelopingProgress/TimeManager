import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackHeader} from "../../../../reusable/stackHeader";
import {styles} from "../../../home";
import {Button, Icon, Text} from "react-native-elements";
import {Colors} from "../../../../reusable/tools";
import CountDown from "react-native-countdown-component";

export const TaskDetailsScreen = (props) => {
    const task = props.route.params.task
    const user = props.route.params.user
    const category = props.route.params.category
    const project = props.route.params.project
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='task' navigation={props.navigation}  user={user} category={category} project={project} task={task}/>
                <View style={stylesTask.taskContainer}>
                    <Text h4 style={{flex: 1}}>
                        Status
                    </Text>
                    <Button
                        style={{flex: 0.1}}
                        type='outline'
                        title='Do zrobienia'
                        buttonStyle={stylesTask.statusButtonStyle}
                        titleStyle={{color: Colors.blue}}
                    />
                </View>
                <View style={{marginHorizontal: 40, marginTop:  20, padding: 20, borderWidth: 1}}>
                    <Text h4 style={{flex: 1}}>
                        Czas
                    </Text>
                    <View style={{flexDirection: 'row', marginRight: 13}}>
                        {isPlaying ?
                            <View>
                                <CountDown
                                    size={25}
                                    until={10}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{h: 'Godz', m: 'Min', s: 'Sek'}}
                                    digitTxtStyle={{fontSize: 25, color: Colors.black}}
                                    timeLabelStyle={{fontSize: 20, color: Colors.black}}
                                    digitStyle={{borderWidth: 1}}
                                    onFinish={() => {
                                        alert('Czas przenaczony na zadanie "' + task.name + '" upłynął')
                                        setIsPlaying(false)
                                    }}
                                    />
                            </View>:
                            <View style={{flexDirection: 'row', marginRight: 5}}>
                                <View style={{ marginRight: 5}}>
                                    <View style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>00</Text>
                                    </View>
                                    <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Godz</Text>
                                </View>
                                <View style={{ marginRight: 5}}>
                                    <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>00</Text>
                                    </View>
                                    <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Min</Text>
                                </View>
                                <View>
                                    <View  style={{borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 13}}>
                                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>10</Text>
                                    </View>
                                    <Text style={{fontSize: 20, textAlign: 'center', padding: 2}}>Sek</Text>
                                </View>
                            </View>
                        }

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
                    <Text style={{fontSize: 18}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab cupiditate delectus deserunt, distinctio dolor dolores exercitationem expedita ipsum laboriosam natus odio perferendis quam quibusdam reiciendis reprehenderit, sed, vero voluptas!
                    </Text>
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
        borderColor: Colors.black, alignSelf: 'flex-end'
    }
})


