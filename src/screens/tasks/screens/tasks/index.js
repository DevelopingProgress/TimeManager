import {Button, Divider, Icon, ListItem} from "react-native-elements";
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import { AddFab } from '../../../../reusable/addFab'
import {Alert, BackHandler, ScrollView, Text, View} from 'react-native'
import {clearTasks, deleteTask, listProjects, listTasks} from "../../../../store/actions/tasksActions";
import {styles} from '../../../home/index'
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors, getTodayDate, polishShortMonths} from "../../../../reusable/tools";
import TasksItems from "./tasksItems";
import moment from "moment";
import {useFocusEffect} from "@react-navigation/core";

export const TaskScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const project  = props.route.params.item
    const category = props.route.params.category
    const tasks  = useSelector(state => state.tasks.tasks)
    const [todayExpanded, setTodayExpanded] = useState(false)
    const [overdueExpanded, setOverdueExpanded] = useState(false);
    const [nextExpanded, setNextExpanded] = useState(false)
    const [noDateExpanded, setNoDateExpanded] = useState(false);

    useFocusEffect (
        React.useCallback(() => {
            dispatch(listTasks(user, category, project))
        }, [dispatch, category, project])
    );

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='tasks' navigation={props.navigation}  user={user} category={category} project={project}/>
                <View style={{margin: 20}}>
                    {tasks.length > 0 ?  (
                        <>
                            <ListItem.Accordion
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title h4>
                                                Dzisiaj ({
                                                    tasks.filter((item) =>
                                                        item.dueDate &&
                                                        moment(item.dueDate.toDate()).format("YYYY-MM-DD") === getTodayDate()).length
                                                })
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={todayExpanded}
                                onPress={() => {
                                    setTodayExpanded(!todayExpanded);
                                    setNoDateExpanded(false)
                                    setNextExpanded(false)
                                    setOverdueExpanded(false)
                                }}
                            >
                                <TasksItems
                                    tasks={tasks}
                                    user={user}
                                    category={category}
                                    project={project}
                                    filter='today'
                                    navigation={props.navigation}
                                />
                            </ListItem.Accordion>

                            <Divider />

                            <ListItem.Accordion
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title h4>Zaległe ({
                                                tasks.filter((item) =>
                                                    item.dueDate &&
                                                    moment(item.dueDate.toDate()).format("YYYY-MM-DD") <  getTodayDate()).length
                                            })</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={overdueExpanded}
                                onPress={() => {
                                    setOverdueExpanded(!overdueExpanded);
                                    setTodayExpanded(false);
                                    setNoDateExpanded(false)
                                    setNextExpanded(false)
                                }}
                            >
                                <TasksItems
                                    tasks={tasks}
                                    user={user}
                                    category={category}
                                    project={project}
                                    filter='overdue'
                                    navigation={props.navigation}
                                />
                            </ListItem.Accordion>

                            <Divider />

                            <ListItem.Accordion
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title h4>Następne ({
                                                tasks.filter((item) =>
                                                    item.dueDate &&
                                                    moment(item.dueDate.toDate()).format("YYYY-MM-DD") >  getTodayDate()).length
                                            })</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={nextExpanded}
                                onPress={() => {
                                    setNextExpanded(!nextExpanded);
                                    setOverdueExpanded(false);
                                    setTodayExpanded(false);
                                    setNoDateExpanded(false)
                                }}
                            >
                                <TasksItems
                                    tasks={tasks}
                                    user={user}
                                    category={category}
                                    project={project}
                                    filter='next'
                                    navigation={props.navigation}
                                />
                            </ListItem.Accordion>

                            <Divider />

                            <ListItem.Accordion
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title h4>Bez daty ({
                                                tasks.filter((item) =>
                                                    !item.dueDate).length
                                            })</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={noDateExpanded}
                                onPress={() => {
                                    setNoDateExpanded(!noDateExpanded);
                                    setNextExpanded(false);
                                    setOverdueExpanded(false);
                                    setTodayExpanded(false);
                                }}
                            >
                                <TasksItems
                                    tasks={tasks}
                                    filter='nodate'
                                    user={user}
                                    category={category}
                                    project={project}
                                    navigation={props.navigation}
                                />
                            </ListItem.Accordion>
                        </>

                    )   : (
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, color: Colors.red}}>Brak zadań dla wybranego projektu</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <AddFab type={2} category={category} project={project}/>
        </>

    )
}
