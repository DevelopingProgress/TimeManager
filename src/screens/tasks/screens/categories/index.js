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
    const categories = useSelector(state => state.tasks.categories.categories)
    const user = useSelector(state => state.auth.user)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listCategories(user))
        }, [dispatch, listCategories, user])
    )

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{margin: 10}}>
                <List style={{ maxWidth: 300 }}>
                    {categories ? categories.map((item) => (
                        <ListItem
                        text={item}
                        icon={<Icon name={'local-movies'} size={24} />}
                        />
                    )) : null}
                        
                        {/* <ListItem
                        text={'Dining'}
                        icon={<Icon name={'local-dining'} size={24} />}
                        />
                        <ListItem
                        text={'Health'}
                        icon={<Icon name={'favorite'} size={24} />}
                        />
                        <ListItem text={'Family'} icon={<Icon name={'group'} size={24} />} />
                        <ListItem
                        text={'Education'}
                        icon={<Icon name={'edit'} size={24} />}
                        />
                        <ListItem
                        text={'Office'}
                        icon={<Icon name={'content-cut'} size={24} />}
                        /> */}

                </List>
            </View>
            
            <AddFab/>
        </ScrollView>
    )
}