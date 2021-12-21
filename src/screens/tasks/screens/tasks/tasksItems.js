import React from 'react';
import {Text, View} from 'react-native';
import {Divider, ListItem} from "react-native-elements";
import {Colors, getTodayDate, polishShortMonths} from "../../../../reusable/utils/tools";
import moment from "moment";

const TasksItems = (props) => {

    const {user, category, project, filter, tasks, navigation} = props

    const getPolishMonths = (item) => {
        return item.dueDate && item.dueDate ? item.dueDate.toDate().getDate().toString()
            + ' ' + polishShortMonths(item.dueDate && item.dueDate.toDate().getUTCMonth() + 1) : 'brak'
    }

    const compareDates = (item) => {
        if(filter === 'today')
            return item.dueDate && !item.done && moment(item.dueDate.toDate()).format("YYYY-MM-DD") === getTodayDate()
        if(filter === 'overdue')
            return item.dueDate && !item.done && moment(item.dueDate.toDate()).format("YYYY-MM-DD") < getTodayDate()
        if(filter === 'next')
            return item.dueDate && !item.done && moment(item.dueDate.toDate()).format("YYYY-MM-DD") > getTodayDate()
        if(filter === 'nodate')
            return !item.done && !item.dueDate
    }

    return (
                tasks ?
                    tasks
                        .filter((item) => compareDates(item))
                        .map((item) => (
                        <View key={item.id}>
                            <Divider style={{width: '100%', borderWidth: 1, borderColor: Colors.grey}}/>
                            <ListItem onPress={() => {
                                navigation.navigate('TaskDetailsScreen', {
                                    task: item,
                                    user: user,
                                    category: category,
                                    project: project,
                                })
                            }}>
                                <ListItem.Title style={{color: item.color, fontWeight: 'bold', flex: item.timer ? 1 : 3}}>{item.name}</ListItem.Title>
                                <ListItem.Content><Text style={{alignSelf: 'flex-end'}}>{item.dueDate && getPolishMonths(item)}</Text></ListItem.Content>
                                <ListItem.Chevron color={Colors.black2} iconStyle={{alignSelf: 'flex-end'}}/>
                            </ListItem>
                        </View>
                    )) : null
        )
};

export default TasksItems;
