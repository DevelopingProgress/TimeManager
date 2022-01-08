import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {GreetingText} from '../../reusable/utils/greetingText'
import {styles} from '../home'
import {LogoutIcon} from '../../reusable/logoutIcon'
import {Agenda} from "react-native-calendars";
import moment from "moment";
import {Colors} from "../../reusable/utils/tools";
import {useDispatch, useSelector} from "react-redux";
import {listProjects, listTasks, listCategories, setLoading} from "../../store/actions/tasksActions";
import {useFocusEffect} from "@react-navigation/core";
import {Loading} from "../../reusable/utils/loading";


export const CalendarScreen = ({navigation}) => {
    const [items, setItems] = useState({});
    const user = useSelector(state => state.auth.user)
    const tasks = useSelector(state => state.app.tasks)
    const categories = useSelector(state => state.app.categories)
    const projects = useSelector(state => state.app.projects)
    const loading = useSelector(state => state.app.loading)
    const dispatch = useDispatch()

    useFocusEffect(React.useCallback(() => {
        dispatch(setLoading())
        dispatch(listTasks(user))
        dispatch(listCategories(user))
        dispatch(listProjects(user))
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
                    {
                        task: item,
                        user: user,
                        category: categories && categories.find(function (category) {
                            return category.id === item.catID
                        }),
                        project: projects && projects.find(function (project) {
                            return project.id === item.projID
                        }),
                        navigation: navigation
                    })}
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
            {
                tasks.length !== 0 ?
                    loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                        <View style={{flex: 1}}>
                            <Agenda
                                items={items}
                                loadItemsForMonth={loadItems}
                                selected={moment(new Date(Date.now()), 'YYYY-MM-DD').toString()}
                                renderItem={renderItem}
                                minDate={'2012-05-10'}
                            />
                        </View>
                    :
                    <View style={{alignContent: 'center', alignItems: 'center', margin: 20}}>
                        <Text style={{fontSize: 20, color: Colors.red}}>Brak zadań w kalendarzu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoriesScreen')}>
                            <Text style={{fontSize: 17, color: Colors.black3}}>
                                Kliknij tutaj aby przejść do tworzenia zadań
                            </Text>
                        </TouchableOpacity>
                    </View>
            }
        </>
    )
}
