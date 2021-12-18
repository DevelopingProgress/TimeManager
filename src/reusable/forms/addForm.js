import { Formik } from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Modal, Text, View} from 'react-native';
import {Colors, getHours, getMinutes, getSeconds} from '../utils/tools';
import * as Yup from "yup";
import {Button} from 'react-native-elements';
import CategoryForm from "./categoryForm";
import ProjectForm from "./projectForm";
import TaskForm from "./taskForm";


const AddForm = (props) => {
    const hoursRegex = /^(((0|1)[0-9])|2[0-3])$/
    const minsecsRegex = /\b([0-5]){1}([0-9]){1}/gm
    const [withoutDate, setWithoutDate] = useState(false );
    const {hideModal, modalVisible, modalType, edit, handleSubmit, loading} = props

    useEffect(() => {
        if(hideModal) setWithoutDate(false)
    }, [hideModal]);


    return (
            <Modal
            visible={modalVisible}
            onDismiss={() => hideModal}
            onRequestClose={() => hideModal}
            contentContainerStyle={styles.modalView}
            animationType={'slide'}
            collapsable={true}
            statusBarTranslucent={true}
            >
                <View style={styles.centeredView}>
                    {
                        modalType === 0 ?
                            <Text style={styles.modalText}>Dodaj Kategorię</Text> :
                            modalType === 1 ?
                                <Text style={styles.modalText}>Dodaj Projekt</Text>:
                                modalType === 2 ?
                                    <Text style={styles.modalText}>Dodaj zadanie</Text>:
                                    modalType === 'category' ?
                                        <Text style={styles.modalText}>Edytuj Kategorię</Text> :
                                        modalType === 'project' ?
                                            <Text style={styles.modalText}>Edytuj Projekt</Text>:
                                            modalType === 'task' ?
                                                <Text style={styles.modalText}>Edytuj zadanie</Text>: null
                    }
                    <Formik
                        initialValues={
                            modalType === 0 || modalType === 'category' ?
                            {
                                name: !edit ? '' : item && item.name
                            } : modalType === 1 || modalType === 'project' ?
                            {
                                name: !edit ? '' : item && item.name,
                            } : modalType === 2 || modalType === 'task' ?
                            {
                                name: !edit ? '' : item && item.name,
                                date: !edit  ? new Date(Date.now()) : item &&  item.dueDate ? item.dueDate.toDate() : new Date(Date.now()),
                                hours: !edit ? '01' : item && item.timer ?
                                parseInt(getHours(item)) < 10
                                    ? `0${parseInt(getHours(item)).toString()}`
                                    : parseInt(getHours(item)).toString() : '01',
                                minutes: !edit ? '00' : item && item.timer ?
                                parseInt(getMinutes(item)) < 10
                                    ? `0${parseInt(getMinutes(item)).toString()}`
                                    : parseInt(getMinutes(item)).toString() : '00',
                                seconds: !edit ? '00' : item && item.timer ?
                                parseInt(getSeconds(item))< 10
                                    ? `0${parseInt(getSeconds(item)).toString()}`
                                    : parseInt(getSeconds(item)).toString() : '00',
                                withoutDate: false
                            } : null
                        }
                        onSubmit={values => handleSubmit(values)}
                        validationSchema={Yup.object(
                            modalType === 0 || modalType === 'category' ?
                            {
                                name: Yup
                                    .string()
                                    .required('Nazwa kategorii jest wymagana.'),
                            } : modalType === 1 || modalType === 'project' ?
                            {
                                name: Yup
                                    .string()
                                    .required('Nazwa projektu jest wymagana.'),
                            } : modalType === 2 || modalType === 'task' ? {
                                name: Yup
                                    .string()
                                    .required('Nazwa zadania jest wymagana.'),
                                date: Yup
                                    .date()
                                    .required('Data jest wymagana.'),
                                hours: Yup
                                    .string()
                                    .matches(hoursRegex, 'Nieprawidłowe.')
                                    .required('Wymagane'),
                                minutes: Yup
                                    .string()
                                    .matches(minsecsRegex, 'Nieprawidłowe.')
                                    .required('Wymagane'),
                                seconds: Yup
                                    .string()
                                    .matches(minsecsRegex, 'Nieprawidłowe.')
                                    .required('Wymagane'),
                                withoutDate: Yup.boolean().required()
                            } : null
                        )}
                    >
                            {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  values,
                                  errors,
                                  touched,
                                  setFieldValue
                            }) => (
                                <>
                                {modalType === 0  || modalType === 'category' ? (
                                    <CategoryForm
                                        handleChange={(item) => handleChange(item)}
                                        handleBlur={(item) => handleBlur(item)}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        errorStyle={{color: Colors.red, fontSize: 15}}
                                        maxLength={50}
                                        containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                        inputStyle={{width: '100%'}}
                                    />
                                ) :
                                modalType === 1 || modalType === 'project' ? (
                                    <ProjectForm
                                        handleChange={(item) => handleChange(item)}
                                        handleBlur={(item) => handleBlur(item)}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        errorStyle={{color: Colors.red, fontSize: 15}}
                                        maxLength={50}
                                        containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                        inputStyle={{width: '100%'}}
                                    />
                                ) :
                                modalType === 2 || modalType === 'task' ? (
                                    <TaskForm
                                        handleChange={(item) => handleChange(item)}
                                        handleBlur={(item) => handleBlur(item)}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        errorStyle={{color: Colors.red, fontSize: 15}}
                                        maxLength={50}
                                        containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                        inputStyle={{width: '100%'}}
                                        setFieldValue={(item, value) => setFieldValue(item, value)}
                                        withoutDate={withoutDate}
                                        setWithoutDate={(item) => setWithoutDate(item)}
                                    />
                                ) : null }
                                    <Button
                                        containerStyle={[styles.button, styles.buttonOpen]}
                                        buttonStyle={{backgroundColor: 'transparent'}}
                                        onPress={handleSubmit}
                                        title={!edit ? `Dodaj ${
                                            modalType === 0 ? 'Kategorię' :
                                            modalType === 1 ? 'Projekt' :
                                            modalType === 2 ? 'Zadanie' : null
                                        }`:
                                            `Edytuj ${
                                                modalType === 'category' ? 'Kategorię' :
                                                    modalType === 'project' ? 'Projekt' :
                                                        modalType === 'task' ? 'Zadanie' : null
                                            }`
                                        }
                                        loading={loading}
                                    />
                                </>
                            )}
                    </Formik>
                    <Button
                        containerStyle={[styles.button, styles.buttonClose]}
                        buttonStyle={{backgroundColor: 'transparent'}}
                        onPress={hideModal}
                        title='Anuluj'
                    />
                </View>
            </Modal>


    );
};

const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    },
    modalView: {
    margin: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    button: {
        borderRadius: 20,
        margin: 10,
        marginHorizontal: 40,
        padding: 5,
        elevation: 2
    },
    buttonOpen: {
    backgroundColor: Colors.blue,
    },
    buttonClose: {
    backgroundColor: Colors.red,
    },
    modalText: {
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 40
    },
});

export default AddForm;
