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
    listTasks, setLoading
} from "../../../../store/actions/tasksActions";
import {StackHeader} from "../../../../reusable/stackHeader";
import {Colors} from "../../../../reusable/utils/tools";
import {Loading} from "../../../../reusable/utils/loading";
import {useFocusEffect} from "@react-navigation/core";
import Error from "../../../../reusable/utils/error";
import Message from "../../../../reusable/utils/message";
import {clearAuthError, clearAuthMessage} from "../../../../store/actions/authActions";

export const CategoriesScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.app.categories)
    const loading = useSelector(state => state.app.loading)

    useEffect(() => {
        dispatch(setLoading())
        dispatch(listCategories(user))
    }, [dispatch, user])

    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <StackHeader type='categories' navigation={navigation} />
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
