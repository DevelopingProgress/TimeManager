import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import ChooseAble from "./chooseAble";
import {useDispatch, useSelector} from "react-redux";
import {PieChart} from "react-native-chart-kit";
import {listProjects, listTasks, setLoading} from "../../../store/actions/tasksActions";
import {Colors, getTodayDate} from "../../../reusable/utils/tools";
import moment from "moment";
import Legend from "./legend";


const Chart = (props) => {
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.app.categories)
    const projects = useSelector(state => state.app.projects)
    const tasks = useSelector(state => state.app.tasks)
    const loading = useSelector(state => state.app.loading)
    const dispatch = useDispatch()
    const [categoriesTrigger, setCategoriesTrigger] = useState('');
    const [projectsTrigger, setProjectsTrigger] = useState('');
    const {day, week, month} = props

    useEffect(() => {
        dispatch(setLoading())
        dispatch(listProjects(user, categories[0]))
        dispatch(setLoading())
        dispatch(listTasks(user, categories[0], projects[0]))
    }, [])

    const data = tasks.filter((item) => {
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
    }).filter((item) => item.timeSpent).map((item) => {
        return {
            name: item.name,
            timeSpent: item.timeSpent,
            color: item.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    })


    return (
        <View>
            <ChooseAble data={{
                user, categories, projects, tasks,
                loading, dispatch,
                categoriesTrigger, setCategoriesTrigger,
                projectsTrigger, setProjectsTrigger
            }}/>
            {data !== [] ?
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <PieChart
                    hasLegend={false}
                    data={data}
                    width={350}
                    height={350}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                    accessor={"timeSpent"}
                    backgroundColor={"transparent"}
                    paddingLeft={"85"}
                />
                <Legend tasks={tasks} day={day} week={week} month={month}/>
            </View> :
                <View style={{alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, color: Colors.red}}>Brak analityki dla wybranego projektu</Text>
                </View>
            }
        </View>
    );
};

export default Chart;
