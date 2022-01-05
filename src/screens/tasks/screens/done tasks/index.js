import React, {useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from "../../../home";
import {ListItem} from "react-native-elements";
import {Colors, polishShortMonths} from "../../../../reusable/utils/tools";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/core";
import {listAllTasks, setLoading} from "../../../../store/actions/tasksActions";
import {Loading} from "../../../../reusable/utils/loading";
import {StackHeader} from "../../../../reusable/stackHeader";

export const DoneTasksScreen = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const project  = props.route.params.route.params.item
    const category = props.route.params.route.params.category
    const tasks  = useSelector(state => state.app.tasks)
    const loading  = useSelector(state => state.app.loading)
    const scrollRef = useRef();

    useFocusEffect (
        React.useCallback(() => {
            dispatch(setLoading())
            dispatch(listAllTasks(user))
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            })
        }, [dispatch, category, project])
    );

    const getPolishMonths = (item) => {
        return category && category.id === item.catID && project && project.id === item.projID &&
        item.dueDate && item.dueDate ? item.dueDate.toDate().getDate().toString()
            + ' ' + polishShortMonths(item.dueDate && item.dueDate.toDate().getUTCMonth() + 1) : 'brak'
    }

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                    tasks.filter((item) =>  category && category.id === item.catID && project && project.id === item.projID &&
                        item.done === true).length > 0 ?
                        tasks
                            .filter((item) =>  category && category.id === item.catID && project && project.id === item.projID && item.done === true)
                            .map((item) => (
                                <View key={item.id}>
                                    <ListItem onPress={() => {
                                        props.navigation.navigate('TaskDetailsScreen', {
                                            task: item,
                                            user: user,
                                            category: category,
                                            project: project,
                                        })
                                    }}>
                                        <ListItem.Title style={{color: item.color, fontWeight: 'bold', flex: 5}}>{item.name}</ListItem.Title>
                                        <ListItem.Content><Text style={{alignSelf: 'flex-end'}}>{item.dueDate && getPolishMonths(item)}</Text></ListItem.Content>
                                        <ListItem.Chevron color={Colors.black2} iconStyle={{alignSelf: 'flex-end'}}/>
                                    </ListItem>
                                </View>
                            )) : (
                            <View style={{alignContent: 'center', alignItems: 'center', marginTop: 10}}>
                                <Text style={{fontSize: 20, color: Colors.red}}>Brak ukończonych zadań</Text>
                            </View>
                        )
                }
            </ScrollView>
        </>

    );
};

