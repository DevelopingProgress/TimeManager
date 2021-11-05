import React, { useState } from 'react'
import { Platform, View } from 'react-native'
import { Colors } from './tools';
import ModalForm from './modalForm';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addProject, addTask, listCategories, listProjects, listTasks } from '../store/actions/tasksActions';
import { FAB, Portal } from 'react-native-paper';

export const AddFab = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(0);
    const [open, setOpen] = useState(false);

    const handlePress = (value) => {
        switch (value) {
            case 0:
                setModalVisible(true)
                setOpen(false)
                setModalType(value)
                break;
            case 1:
                setModalVisible(true)
                setOpen(false)
                setModalType(value)
                break;
            case 2:
                setModalVisible(true)
                setOpen(false)
                setModalType(value)
                break;
            default:
                break;
        }
    }

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const categories = useSelector(state => state.tasks.categories)
    const projects = useSelector(state => state.tasks.projects)


    const handleSubmit = (values) => {
        if(modalType === 0) {
            setModalVisible(false)
            dispatch(addCategory(values.name, values.icon, user))
            console.log(user)
            dispatch(listCategories(user))
        } else if(modalType === 1) {
            setModalVisible(false)
            dispatch(addProject(values.name, values.category))
            console.log(categories)
            dispatch(listProjects(categories))
        } else if(modalType === 2) {
            setModalVisible(false)
            dispatch(addTask(values.name, values.project))
            console.log(projects)
            dispatch(listTasks(projects))
        } 
    }

    

    return (
        <>
            <ModalForm 
                modalVisible={modalVisible} 
                hideModal={() => setModalVisible(!modalVisible)}
                modalType={modalType}
                handleSubmit={handleSubmit}
            />
            
            <Portal>
                <FAB.Group
                style={{marginBottom: 60}}
                open={open}
                icon={open ? 'close' : 'plus'}
                fabStyle={{backgroundColor: Colors.blue}}
                color={Colors.black2}
                actions={[
                    {
                        icon: 'plus',
                        label: 'Dodaj Kategorię',
                        onPress: () => handlePress(0),
                        color: Colors.black2,
                        labelTextColor: Colors.black2
                    },
                    {
                        icon: 'plus',
                        label: 'Dodaj Projekt',
                        onPress: () => handlePress(1),
                        color: Colors.black2,
                        labelTextColor: Colors.black2
                    },
                    {
                        icon: 'plus',
                        label: 'Dodaj Zadanie',
                        onPress: () => handlePress(2),
                        color: Colors.black2,
                        labelTextColor: Colors.black2
                    },
                ]}
                onStateChange={() => setOpen(!open)}
                />
            </Portal>
        </>
    )
}


