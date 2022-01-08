import React from 'react'
import {Alert, StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {Colors} from "./utils/tools";
import {useDispatch} from "react-redux";
import {deleteTask, listProjects, listTasks, listCategories, setLoading} from "../store/actions/tasksActions";
import {AddFab} from "./addFab";

export const StackHeader = (props) => {
    const dispatch = useDispatch()
    const {type, category, user, task, navigation, project, isPlaying} = props

    return (
        <>
            {
                type === 'categories' ? (
                    <View style={styles.container}>
                        <View style={styles.iconWrapper}>
                            <Icon
                                type='antdesign'
                                name='back'
                                style={styles.icon}
                                color={Colors.black}
                                size={30}
                                onPress={() => {
                                    navigation.goBack()
                                }}
                            />
                        </View>
                        <View  style={styles.textWrapper}>
                            <Text style={styles.text}>Kategorie</Text>
                        </View>
                        <AddFab type={0}/>
                    </View>
                ) : type === 'projects' ? (
                    <View style={styles.container}>
                        <View style={styles.iconWrapper}>
                            <Icon
                                type='antdesign'
                                name='back'
                                style={styles.icon}
                                color={Colors.black}
                                size={30}
                                onPress={() => {
                                    navigation.navigate('TasksScreen', {
                                        screen: 'CategoriesScreen',
                                    })
                                    dispatch(setLoading())
                                    dispatch(listCategories(user))
                                }}
                            />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>
                                Projekty
                            </Text>
                            <Text style={{color: Colors.black2, fontSize: 20, textAlign: 'center'}}> w kategorii {category.name}</Text>
                        </View>
                        <AddFab type={1} category={category}/>
                    </View>
                ) : type === 'tasks' ? (
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
                                        navigation.navigate('TasksScreen', {
                                            screen: 'ProjectsScreen',
                                            params: {
                                                item: category
                                            }
                                        })
                                        dispatch(setLoading())
                                        dispatch(listProjects(user))
                                    }}
                                />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.text}>
                                    Zadania
                                </Text>
                            </View>
                            <AddFab type={2} category={category} project={project}/>
                        </View>

                        <Text style={{color: Colors.black2, fontSize: 20, textAlign: 'center'}}> w projekcie {project && project.name}</Text>
                    </>
                ) : type === 'task' ? (
                <View style={styles.container}>
                    <View style={styles.iconWrapper}>
                        <Icon
                        type='antdesign'
                        name='back'
                        style={styles.icon}
                        color={!isPlaying ? Colors.black : Colors.grey }
                        size={30}
                        onPress={() => {
                            dispatch(setLoading())
                            dispatch(listTasks(user))
                            navigation.navigate('TasksScreen', {
                                screen: 'TaskStack',
                                params: {
                                    screen: 'TaskScreen',
                                    user: user,
                                    category: category,
                                    item: project,
                                }
                            })
                        }}
                        disabled={isPlaying}
                        disabledStyle={{backgroundColor: 'transparent'}}
                        />
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={[styles.text, {color: task.color}]}>
                            {task.name}
                        </Text>
                    </View>

                    <View style={styles.iconWrapper}>
                        <Icon
                            type='entypo'
                            name='trash'
                            style={styles.icon}
                            color={!isPlaying ? Colors.red : Colors.grey}
                            disabled={isPlaying}
                            disabledStyle={{backgroundColor: 'transparent'}}
                            size={30}
                            onPress={() => {
                                Alert.alert(
                                    'Usuwanie zadania '  +  task.name,
                                    'Czy chcesz usunąć zadanie?' ,
                                    [
                                        {
                                            text: 'Anuluj',
                                        },
                                        {
                                            text: 'Usuń',
                                            onPress: () => {
                                                dispatch(setLoading())
                                                dispatch(deleteTask(user, category, project, task))
                                                dispatch(setLoading())
                                                dispatch(listTasks(user))
                                                navigation.navigate('TasksScreen', {
                                                    screen: 'TaskStack',
                                                    params: {
                                                        screen: 'TaskScreen',
                                                        user: user,
                                                        category: category,
                                                        item: project,
                                                    }
                                                })
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
