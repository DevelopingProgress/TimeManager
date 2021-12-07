import React from 'react'
import {Alert, StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {Colors, sleep} from "./tools";
import {useDispatch} from "react-redux";
import {clearProjects, clearTasks, deleteTask, listProjects} from "../store/actions/tasksActions";

export const StackHeader = (props) => {
    const dispatch = useDispatch()

    return (
        <>
            {
                props.type === 'categories' ? (
                    <View style={styles.container}>
                        <View style={styles.iconWrapper}>
                            <Icon
                                type='antdesign'
                                name='back'
                                style={styles.icon}
                                color={Colors.black}
                                size={30}
                                onPress={() => {
                                    sleep(1000).then(props.navigation.goBack())
                                }}
                            />
                        </View>
                        <View  style={styles.textWrapper}>
                            <Text style={styles.text}>Kategorie</Text>
                        </View>
                    </View>
                ) : props.type === 'projects' ? (
                    <View style={styles.container}>
                        <View style={styles.iconWrapper}>
                            <Icon
                                type='antdesign'
                                name='back'
                                style={styles.icon}
                                color={Colors.black}
                                size={30}
                                onPress={() => {
                                    sleep(1000).then(props.navigation.goBack())
                                    dispatch(clearProjects());
                                }}
                            />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>
                                Projekty
                            </Text>
                            <Text style={{color: Colors.black2, fontSize: 20, textAlign: 'center'}}> w kategorii {props.category.name}</Text>
                        </View>
                    </View>
                ) : props.type === 'tasks' ? (
                    <>
                        <View style={styles.container}>
                            <View style={styles.iconWrapper}>
                                <Icon
                                    type='antdesign'
                                    name='back'
                                    style={styles.icon}
                                    color={Colors.black}
                                    size={30}
                                    onPress={() => {
                                        sleep(1000).then(props.navigation.goBack())
                                        dispatch(listProjects(props.user, props.category))
                                        dispatch(clearTasks());
                                    }}
                                />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.text}>
                                    Zadania
                                </Text>
                            </View>
                        </View>
                        <Text style={{color: Colors.black2, fontSize: 20, textAlign: 'center'}}> w projekcie {props.project.name}</Text>
                    </>
                ) : props.type === 'task' ? (
                <View style={styles.container}>
                    <View style={styles.iconWrapper}>
                        <Icon
                        type='antdesign'
                        name='back'
                        style={styles.icon}
                        color={Colors.black}
                        size={30}
                        onPress={() => {
                            sleep(1000).then(props.navigation.goBack())
                        }}
                        />
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={[styles.text, {color: props.task.color}]}>
                            {props.task.name}
                        </Text>
                    </View>

                    <View style={styles.iconWrapper}>
                        <Icon
                            type='entypo'
                            name='trash'
                            style={styles.icon}
                            color={Colors.red}
                            size={30}
                            onPress={() => {
                                Alert.alert(
                                    'Usuwanie zadania '  +  props.task.name,
                                    'Czy chcesz usunąć zadanie?' ,
                                    [
                                        {
                                            text: 'Anuluj',
                                        },
                                        {
                                            text: 'Usuń',
                                            onPress: () => {
                                                dispatch(deleteTask(props.user, props.category, props.project, props.task))
                                                sleep(1000).then(props.navigation.goBack())
                                            }
                                        }
                                    ], {cancelable: true})
                            }}
                        />
                    </View>
                </View>
                ) : null
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15
    },
    iconWrapper: {
        flex: 0.15,
        marginTop: 5
    },
    textWrapper: {
        flex: 0.75
    },
    icon: {

    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: Colors.blue,
        fontWeight: "700"
    }
})
