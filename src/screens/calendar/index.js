import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import { GreetingText } from '../../reusable/utils/greetingText'
import { styles } from '../home'
import { LogoutIcon } from '../../reusable/logoutIcon'
import {Agenda} from "react-native-calendars";
import moment from "moment";
import {Colors} from "../../reusable/utils/tools";
import {useDispatch, useSelector} from "react-redux";
import {listAllTasks, setLoading} from "../../store/actions/tasksActions";
import {useFocusEffect} from "@react-navigation/core";
import {Loading} from "../../reusable/utils/loading";


export const CalendarScreen = ({navigation}) => {
    const [items, setItems] = useState({});
    const user = useSelector(state => state.auth.user)
    const tasks = useSelector(state => state.app.tasks)
    const loading = useSelector(state => state.app.loading)
    const dispatch = useDispatch()

    useFocusEffect(React.useCallback(() => {
        dispatch(setLoading())
        dispatch(listAllTasks(user))
    }, []))

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: item.color,
                    padding: 20,
                    marginTop: 30,
                    marginRight: 20
                }}
                onPress={() => navigation.navigate('TaskDetailsScreen',
                    {task: item, user: user, category: item.catID, project: item.projID})}
            >
                <Text style={{color: Colors.white}}>{item.name}</Text>
            </TouchableOpacity>

        );
    };

    const compareDays = (day1, day2) => {
        return moment(day1.toDate(), "YYYY-MM-DD").day() === moment(day2.toDate(), "YYYY-MM-DD").day()
    }

    // {'2021-12-26': [{taskObject1}, {taskObject2}, ...]
    const obj = Object.fromEntries(tasks.filter(task => task.dueDate && !task.endDate && !task.done).map(task =>
        [
            moment(task.dueDate.toDate()).format("YYYY-MM-DD"),
            tasks.filter(item => item.dueDate && !item.endDate && !item.done &&
                compareDays(task.dueDate, item.dueDate)).map(item => item)
        ]))

    const loadItems = (day) => {
            setItems(obj);
    };

    return (
        <>
            <View style={styles.container}>
                <GreetingText title='Kalendarz'/>
                <LogoutIcon navigation={navigation}/>
            </View>
            {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                <View style={{flex: 1}}>
                    <Agenda
                        items={items}
                        loadItemsForMonth={loadItems}
                        selected={moment(new Date(Date.now()), 'YYYY-MM-DD').toString()}
                        renderItem={renderItem}
                        minDate={'2012-05-10'}
                    />
                </View>
            }
        </>
    )
}
