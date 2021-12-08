import { AddFab } from '../../../../reusable/addFab'
import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import { styles } from '../../../home/index'
import {Tiles} from "../../../../reusable/tiles";
import {useDispatch, useSelector} from "react-redux";
import {
    clearError,
    clearMessage,
    clearStatus,
    listCategories,
    listProjects,
    listTasks
} from "../../../../store/actions/tasksActions";
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/tools";
import {Loading} from "../../../../reusable/loading";
import {useFocusEffect} from "@react-navigation/core";
import Error from "../../../../reusable/error";
import Message from "../../../../reusable/message";
import {clearAuthError, clearAuthMessage} from "../../../../store/actions/authActions";

export const CategoriesScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.tasks.categories)
    const [loading, setLoading] = useState(true);
    const status = useSelector(state => state.tasks.status)

    useEffect(() => {
        dispatch(listCategories(user))
    }, [user, loading])

    useEffect(() => {
        if(status === 'categories_listed') {
            dispatch(clearStatus())
            setLoading(false)
        }
    }, [status])

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='categories' navigation={navigation} setLoading={(loading) => setLoading(loading)}/>
                {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                categories.length > 0  ?  <Tiles
                        array={categories}
                        navigation={navigation}
                        goToScreen='ProjectsScreen'
                        type='category'
                    /> :
                    <View style={{alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: Colors.red}}>Brak kategorii</Text>
                    </View>
                }
            </ScrollView>
            <AddFab type={0}/>
        </>

    )
}
