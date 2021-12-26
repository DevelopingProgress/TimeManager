import React, {useEffect, useState} from 'react'
import { Colors} from './utils/tools';
import AddForm from './forms/addForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    addProject,
    addTask,
    clearStatus,
    listCategories, listProjects, listTasks, setLoading,
} from '../store/actions/tasksActions';
import {Button, Icon} from "react-native-elements";

export const AddFab = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(0);
    const {category, project, type} = props
    const loading = useSelector(state => state.app.loading)

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
    const status = useSelector(state => state.app.status)


    const handleSubmit = (values) => {
        if(modalType === 0) {
            dispatch(setLoading())
            dispatch(addCategory(values.name, user))
        } else if(modalType === 1) {
            dispatch(setLoading())
            dispatch(addProject(user, values.name, category))
        } else if(modalType === 2) {
            dispatch(setLoading())
            if(values.withoutDate)
                dispatch(addTask(
                    user,
                    values.name,
                    category,
                    project,
                    null,
                    null,
                    values.description
                ))
            else dispatch(addTask(
                user,
                values.name,
                category,
                project,
                values.date,
                parseInt(values.hours) * 3600 + parseInt(values.minutes) * 60 + parseInt(values.seconds),
                values.description
            ))
        }
    }

    useEffect(() => {
        if(status === 'category_added') {
            setModalVisible(false)
            dispatch(clearStatus())
            dispatch(listCategories(user))
        }
        if(status === 'project_added') {
            setModalVisible(false)
            dispatch(clearStatus())
            dispatch(listProjects(user, category))
        }
        if(status === 'task_added') {
            setModalVisible(false)
            dispatch(clearStatus())
            dispatch(listTasks(user, category, project))
        }
    }, [status]);

    return (
        <>
            <AddForm
                modalVisible={modalVisible}
                hideModal={() => {
                    setModalVisible(!modalVisible)
                }}
                modalType={modalType}
                handleSubmit={handleSubmit}
                loading={loading}
            />

            <Button
                icon={<Icon type='ionicons' name='add' size={25}/>}
                onPress={() => {
                    handlePress(type)
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

