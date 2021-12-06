import { Icon, Button } from 'react-native-elements'
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from './tools'
import React, {useEffect, useState} from 'react'
import {
    clearStatus,
    deleteCategory,
    deleteProject,
    listCategories,
    listProjects, listTasks, updateCategory, updateProject
} from '../store/actions/tasksActions'
import ModalAdd from "./modalAdd";

export const ItemOptions = (props) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [loading, setLoading] = useState(false)
    const status = useSelector(state => state.tasks.status)

    const handlePress = (value) => {
        switch (value) {
            case 'category':
                setModalVisible(true)
                setModalType(value)
                break;
            case 'project':
                setModalVisible(true)
                setModalType(value)
                break;
            case 'task':
                setModalVisible(true)
                setModalType(value)
                break;
            default:
                break;
        }
    }
    const handleSubmit = (values) => {
        if(modalType === 'category') {
            setLoading(true)
            dispatch(updateCategory(values.name, user, props.item))
        } else if(modalType === 'project') {
            setLoading(true)
            dispatch(updateProject(user, values.name, props.category, props.item))
        }
    }

    useEffect(() => {
        if(status === 'category_updated') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            dispatch(listCategories(user))
        }
        if(status === 'project_updated') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            dispatch(listProjects(user, props.category))
        }

    }, [status]);

    return (
        <>
            <ModalAdd
                modalVisible={modalVisible}
                hideModal={() => {
                    setModalVisible(!modalVisible)
                    setLoading(false)
                }}
                modalType={modalType}
                handleSubmit={handleSubmit}
                loading={loading}
                item={props.item}
                edit
            />
            <View style={{marginHorizontal: 20, alignContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex: 0.15}}>
                    <TouchableOpacity
                        onPress={() => handlePress(props.type)}
                    >
                        <Icon type='ionicons' name='edit' size={35} style={{marginTop: 16,}} color={Colors.black2}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.8}}>
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
                            width: '100%',
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
                <View style={{marginLeft: 10, flex: 0.1}}>
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
        </>


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
