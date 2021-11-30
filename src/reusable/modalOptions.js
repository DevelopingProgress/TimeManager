import { Divider, Icon, Button } from 'react-native-elements'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from './tools'
import React from 'react'
import {deleteCategory, deleteProject, listCategories, listProjects} from '../store/actions/tasksActions'

export const ModalOptions = (props) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    
    return (
        <View style={{marginHorizontal: 20, alignContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
                <TouchableOpacity
                    onPress={() => console.log('nic')}
                >
                    <Icon type='ionicons' name='settings' size={35} style={{marginTop: 16,}} color={'green'}/>
                </TouchableOpacity>
            </View>
            <View>
                <Button
                    title={<Text numberOfLines={1} style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 20,
                        width: '100%'
                    }}>{props.item.name}</Text>}
                    buttonStyle={{
                        marginTop: 20,
                        padding: 20,
                        backgroundColor: props.goToScreen === 'ProjectsScreen' ? props.item.color :  props.category.color,
                        width: 230,
                        borderRadius: 100,}}
                    onPress={() => {
                        dispatch(listProjects(user, props.item))
                        props.navigation.navigate(props.goToScreen, {
                            item: props.item,
                            category: props.category
                        })
                    }}
                />
            </View>
            <View style={{margin: 10}}>
                <TouchableOpacity
                    onPress={() =>
                    {
                        const typeTitle = props.type === 'category' ? 'kategorii ' : 'projektu '
                        const typeMessage = props.type === 'category' ? 'kategorię oraz wszystkie projekty i zadania z tej kategorii'
                            : 'projekt oraz wszystkie zadania z tego projektu'
                        Alert.alert(
                            'Usuwanie ' +  typeTitle  +  props.item.name,
                            'Czy chcesz usunąć ' + typeMessage +  '?' ,
                            [
                                {
                                    text: 'Anuluj',
                                },
                                {
                                    text: 'Usuń',
                                    onPress: () => {
                                        props.type === 'category' ?
                                            dispatch(deleteCategory(user, props.item)) &&
                                            dispatch(listCategories(user)) :
                                            dispatch(deleteProject(user, props.category, props.item)) &&
                                            dispatch(listProjects(user, props.category))
                                    }
                                }
                            ], {cancelable: true})
                    }}
                >
                    <Icon type='entypo' name='trash' size={30} style={{marginTop: 13,}} color={Colors.red}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        marginTop: 40,
        borderRadius: 3,
        alignItems: 'center',
        textAlign: 'center',
    },
    option: {
        margin: 10,
        color: Colors.black,
        fontSize: 20
    },
    deleteOption: {
        color: Colors.red
    }
})
