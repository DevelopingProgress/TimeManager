import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {Divider, ListItem} from "react-native-elements";
import {Colors, getTodayDate, polishShortMonths} from "../../../../reusable/tools";
import moment from "moment";




const TasksItems = (props) => {

    const getPolishMonths = (item) => {
        return item.dueDate ? item.dueDate.toDate().getDate().toString()
            + ' ' + polishShortMonths(item.dueDate.toDate().getUTCMonth() + 1) : 'brak'
    }

    const compareDates = (item) => {
        if(props.filter === 'today')
            return moment(item.dueDate.toDate()).format("YYYY-MM-DD") === getTodayDate()
        if(props.filter === 'overdue')
            return moment(item.dueDate.toDate()).format("YYYY-MM-DD") < getTodayDate()
    }

    return (
                props.tasks ?
                    props.tasks
                        .filter((item) => compareDates(item))
                        .map((item) => (
                        <View key={item.id}>
                            <Divider style={{width: '100%', borderWidth: 1, borderColor: Colors.grey}}/>
                            <ListItem onPress={() => console.log('go to task Screen')}>
                                <ListItem.Title style={{color: item.color, fontWeight: 'bold'}}>{item.name}</ListItem.Title>
                                <ListItem.Content><Text style={{alignSelf: 'flex-end'}}>{getPolishMonths(item)}</Text></ListItem.Content>
                                <ListItem.Chevron color={Colors.black2} iconStyle={{alignSelf: 'flex-end'}}/>
                            </ListItem>
                        </View>
                    )) : null
        )
};

export default TasksItems;
