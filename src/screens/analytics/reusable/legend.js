import React from 'react';

import {Text, View} from 'react-native';
import moment from "moment";
import {clockify} from "../../../reusable/utils/tools";
import {Divider, Icon} from "react-native-elements";

const Legend = (props) => {

    const {tasks, day, week, month, category, project} = props
    return (
        <View style={{paddingHorizontal: 20}}>
            {
                tasks ? tasks.filter((item) => {
                    if(day) {
                        return moment(item.endDate && item.endDate.toDate(),"YYYY-MM-DD").dayOfYear() ===
                            moment(new Date(Date.now()), "YYYY-MM-DD").dayOfYear()
                    } else if(week) {
                        return  moment(item.endDate && item.endDate.toDate(), "YYYY-MM-DD").isoWeek() ===
                            moment(new Date(Date.now()), "YYYY-MM-DD").isoWeek()
                    } else if(month) {
                        return moment(item.endDate && item.endDate.toDate(), "YYYY-MM-DD").month() ===
                            moment(new Date(Date.now()), "YYYY-MM-DD").month()
                    }
                }).filter((item) => {
                    if (category !== null) {
                        return item.catID === category.id
                    } else return item
                }).filter(item => {
                    if (project !== null) {
                        return item.projID === project.id
                    } else return item
                }).map((item) => (
                <>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='circle' color={item.color} size={30} style={{marginTop: 10}}/>
                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                            <Text>{item.name}</Text>
                            <Text> {clockify(item.timeSpent).displayHours
                                + ' g, '+clockify(item.timeSpent).displayMinutes
                                + ' m, '+clockify(item.timeSpent).displaySeconds+ ' s'
                            }</Text>
                        </View>
                    </View>
                    <Divider />
                </>

           )) : null}
        </View>

    );
};

export default Legend;
