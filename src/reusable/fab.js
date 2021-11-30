import React, {useEffect, useState} from 'react'
import { Colors} from './tools';
import ModalAdd from './modalAdd';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    addProject,
    addTask,
    clearStatus,
    listCategories, listProjects, listTasks,
} from '../store/actions/tasksActions';
import {Button, Icon} from "react-native-elements";

export const AddFab = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(0);
    const [loading, setLoading] = useState(false)


    const handlePress = (value) => {
        switch (value) {
            case 0:
                setModalVisible(true)
                setModalType(value)
                break;
            case 1:
                setModalVisible(true)
                setModalType(value)
                break;
            case 2:
                setModalVisible(true)
                setModalType(value)
                break;
            default:
                break;
        }
    }

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const status = useSelector(state => state.tasks.status)


    const handleSubmit = (values) => {
        if(modalType === 0) {
            setLoading(true)
            dispatch(addCategory(values.name, user))
        } else if(modalType === 1) {
            setLoading(true)
            dispatch(addProject(user, values.name, props.category))
        } else if(modalType === 2) {
            setLoading(true)
            dispatch(addTask(user, values.name, props.category, props.project))
        }
    }

    useEffect(() => {
        if(status === 'category_added') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            dispatch(listCategories(user))
        }
        if(status === 'project_added') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            dispatch(listProjects(user, props.category))
        }
        if(status === 'task_added') {
            dispatch(clearStatus())
            setLoading(false)
            setModalVisible(false)
            dispatch(listTasks(user, props.category, props.project))
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
            />

            <Button
                icon={<Icon type='ionicons' name='add' size={25}/>}
                onPress={() => {
                    handlePress(props.type)
                }}
                buttonStyle={{
                    backgroundColor: Colors.blue,
                    borderRadius: 50,
                    width: 55,
                    height: 55,
                    borderStyle: "solid",
                    borderColor: Colors.lightgrey,
                    borderWidth: 1
                }}
                containerStyle={{
                    position: "absolute",
                    right: 15,
                    bottom: 20
                }}
            />
        </>
    )
}

