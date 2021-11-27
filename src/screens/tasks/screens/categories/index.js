import { AddFab } from '../../../../reusable/fab'
import React, {useEffect} from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from '../../../home/index'
import {Tiles} from "../../../../reusable/tiles";
import {useDispatch, useSelector} from "react-redux";
import {listCategories} from "../../../../store/actions/tasksActions";
import {StackHeader} from "../../../../reusable/stackHeader";

export const CategoriesScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.tasks.categories)
    useEffect(() => {
        dispatch(listCategories(user))
    }, [user])

    return (
        <ScrollView style={styles.mainContainer}>
            <StackHeader type='categories' navigation={navigation}/>
            <Tiles
                array={categories}
                navigation={navigation}
                goToScreen='ProjectsScreen'
            />
            <AddFab/>
        </ScrollView>
    )
}
