import { Icon, Button } from 'react-native-elements'
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from './utils/tools'
import React, {useEffect, useState} from 'react'
import {
    clearError, clearMessage,
    clearStatus,
    deleteCategory,
    deleteProject,
    listCategories,
    listProjects, listTasks, setLoading, updateCategory, updateProject
} from '../store/actions/tasksActions'
import AddForm from "./forms/addForm";
import {Loading} from "./utils/loading";
import Error from "./utils/error";
import Message from "./utils/message";

export const ItemOptions = (props) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const status = useSelector(state => state.app.status)
    const error = useSelector(state => state.auth.error)
    const message = useSelector(state => state.auth.message)
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showMessageAlert, setShowMessageAlert] = useState(false);
    const {item, category, goToScreen, type, navigation} = props
    const loading = useSelector(state => state.app.loading)

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
            dispatch(setLoading())
            dispatch(updateCategory(values.name, user, item))
        } else if(modalType === 'project') {
            dispatch(setLoading())
            dispatch(updateProject(user, values.name, category, item))
        }
    }

    useEffect(() => {
        if(status === 'categories_listed') {
            dispatch(clearStatus())
        }
        if(status === 'projects_listed') {
            dispatch(clearStatus())
        }
        if(status === 'category_updated') {
            dispatch(clearStatus())
            setModalVisible(false)
            dispatch(listCategories(user))
        }
        if(status === 'project_updated') {
            dispatch(clearStatus())
            setModalVisible(false)
            dispatch(listProjects(user, category))
        }

        if(error !== null) {
            setShowErrorAlert(true)
        }
        if(message !== null) {
            setShowMessageAlert(true)
        }
    }, [status, error, message]);


    const handleErrorDismiss = () => {
        setShowErrorAlert(false)
        dispatch(clearError())
    }

    const handleMessageDismiss = () => {
        setShowMessageAlert(false)
        dispatch(clearMessage())
    }

    return (
        <>
            <Error showAlert={showErrorAlert} error={error} handleDismiss={handleErrorDismiss}/>
            <Message showAlert={showMessageAlert} message={message} handleDismiss={handleMessageDismiss}/>
            <AddForm
                modalVisible={modalVisible}
                hideModal={() => {
                    setModalVisible(!modalVisible)
                }}
                modalType={modalType}
                handleSubmit={handleSubmit}
                loading={loading}
                item={item}
                edit
            />
            {loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
            <View style={{marginHorizontal: 20, alignContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex: 0.15}}>
                    <TouchableOpacity
                        onPress={() => handlePress(type)}
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
                        }}>{item.name}</Text>}
                        buttonStyle={{
                            marginTop: 20,
                            padding: 20,
                            backgroundColor: goToScreen === 'ProjectsScreen' ? item.color :  category.color,
                            width: '100%',
                            borderRadius: 100,}}
                        onPress={() => {
                            navigation.navigate(goToScreen, {
                                item: item,
                                category: category,
                            })
                        }}
                    />
                </View>
                <View style={{marginLeft: 10, flex: 0.1}}>
                    <TouchableOpacity
                        onPress={() =>
                        {
                            const typeTitle = type === 'category' ? 'kategorii ' : 'projektu '
                            const typeMessage = type === 'category' ? 'kategorię oraz wszystkie projekty i zadania z tej kategorii'
                                : 'projekt oraz wszystkie zadania z tego projektu'
                            Alert.alert(
                                'Usuwanie ' +  typeTitle  +  item.name,
                                'Czy chcesz usunąć ' + typeMessage +  '?' ,
                                [
                                    {
                                        text: 'Anuluj',
                                    },
                                    {
                                        text: 'Usuń',
                                        onPress: () => {
                                            type === 'category' ?
                                                dispatch(deleteCategory(user, item)) &&
                                                dispatch(setLoading()) &&
                                                dispatch(listCategories(user)) :
                                                dispatch(deleteProject(user, category, item)) &&
                                                dispatch(setLoading()) &&
                                                dispatch(listProjects(user, category))
                                        }
                                    }
                                ], {cancelable: true})
                        }}
                    >
                        <Icon type='entypo' name='trash' size={30} style={{marginTop: 13,}} color={Colors.red}/>
                    </TouchableOpacity>
                </View>
            </View>
            }
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
