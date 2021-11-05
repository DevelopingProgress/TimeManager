import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { List, Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AddFab } from '../../../../reusable/fab'
import { listCategories } from '../../../../store/actions/tasksActions'
import { styles } from '../../../home/index'


export const CategoriesScreen = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.tasks.categories)
    const user = useSelector(state => state.auth.user)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listCategories(user))
        }, [dispatch, user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10}}>
                {categories ? categories.map((item) => (
                    <Menu.Item
                    key={item.catID}
                    title={item.name}
                    icon={item.icon}
                    onPress={() => console.log('Kategoria nr ' + item.catID)}
                    />
                )): null}
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}