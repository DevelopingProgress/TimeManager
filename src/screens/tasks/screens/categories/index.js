import { useFocusEffect } from '@react-navigation/core'
import { Icon, List, ListItem, ListSection } from 'material-bread'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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
                <List style={{ maxWidth: 300 }}>
                    {categories ? categories.map((item) => (
                        <ListItem
                        text={item.name}
                        icon={<Icon name={item.icon} size={24} />}
                        />
                    )): null}
                </List>
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}