import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {Colors} from "./tools";
import {useDispatch} from "react-redux";
import {clearProjects, clearTasks, listProjects} from "../store/actions/tasksActions";

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
                                    props.navigation.goBack()
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
                                    props.navigation.goBack()
                                    dispatch(clearProjects());
                                }}
                            />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>
                                Projekty
                                <Text style={{color: Colors.black2, fontSize: 16}}> w kategorii {props.category.name}</Text>
                            </Text>
                        </View>
                    </View>
                ) : props.type === 'tasks' ? (
                    <View style={styles.container}>
                        <View style={styles.iconWrapper}>
                            <Icon
                                type='antdesign'
                                name='back'
                                style={styles.icon}
                                color={Colors.black}
                                size={30}
                                onPress={() => {
                                    props.navigation.goBack()
                                    dispatch(listProjects(props.user, props.category))
                                    dispatch(clearTasks());
                                }}
                            />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>
                                Zadania
                                <Text style={{color: Colors.black2, fontSize: 16}}> w projekcie {props.project.name}</Text>
                            </Text>
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
