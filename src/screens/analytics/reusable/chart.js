import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ChooseAble from "./chooseAble";
import {useDispatch, useSelector} from "react-redux";
import {PieChart} from "react-native-chart-kit";
import {Colors} from "../../../reusable/utils/tools";
import moment from "moment";
import Legend from "./legend";


const Chart = (props) => {
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.app.categories)
    const projects = useSelector(state => state.app.projects)
    const tasks = useSelector(state => state.app.tasks)
    const loading = useSelector(state => state.app.loading)
    const dispatch = useDispatch()
    const [category, setCategory] = useState(null);
    const [project, setProject] = useState(null);
    const [categoriesTrigger, setCategoriesTrigger] = useState('Wszystkie kategorie');
    const [projectsTrigger, setProjectsTrigger] = useState('Wszystkie projekty');
    const {day, week, month, navigation} = props

    useEffect(() => {}, [tasks]);


    const data = tasks && tasks.filter((item) => {
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
    }).filter((item) => item.timeSpent).filter((item) => {
            if (category !== null) {
                return item.catID === category.id
            } else return item
        }).filter(item => {
            if (project !== null) {
                return item.projID === project.id
            } else return item
        }).map((item) => {
        return {
            id: item.id,
            name: item.name,
            timeSpent: item.timeSpent,
            color: item.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    })

    return (
        tasks.length > 0 ?
        <View>
            <ChooseAble data={{
                user, categories, projects, tasks,
                loading, dispatch,
                category, setCategory,
                project, setProject,
                categoriesTrigger, setCategoriesTrigger,
                projectsTrigger, setProjectsTrigger,
            }}/>
            {data.length > 0 ?
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
                <Legend tasks={tasks} day={day} week={week} month={month} category={category} project={project}/>
            </View> :
                <View style={{alignContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Text style={{fontSize: 20, color: Colors.red}}>Brak zadań do analizy</Text>
                    <Text style={{fontSize: 17, color: Colors.black3}}>
                        Wybierz odpowiednią kategorię i projekt
                    </Text>
                </View>
            }
        </View> :
        <View style={{alignContent: 'center', alignItems: 'center', Top: 20}}>
            <Text style={{fontSize: 20, color: Colors.red}}>Brak zadań do analizy</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoriesScreen')}>
                <Text style={{fontSize: 17, color: Colors.black3}}>
                    Kliknij tutaj aby przejść do tworzenia zadań
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Chart;
