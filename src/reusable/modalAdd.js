import { Formik } from 'formik';
import React, {useState} from 'react';
import {StyleSheet, Modal, Text, View} from 'react-native';
import {Colors, getHours, getMinutes, getSeconds} from './tools';
import * as Yup from "yup";
import {Button} from 'react-native-elements';
import CategoryForm from "./forms/categoryForm";
import ProjectForm from "./forms/projectForm";
import TaskForm from "./forms/taskForm";


const ModalAdd = (props) => {
    const hoursRegex = /^(((0|1)[0-9])|2[0-3])$/
    const minsecsRegex = /\b([0-5]){1}([0-9]){1}/gm
    const [withoutDate, setWithoutDate] = useState(false );


    return (
            <Modal
            visible={props.modalVisible}
            onDismiss={() => props.hideModal}
            onRequestClose={() => props.hideModal}
            contentContainerStyle={styles.modalView}
            animationType={'slide'}
            collapsable={true}
            statusBarTranslucent={true}
            >
                <View style={styles.centeredView}>
                    {
                        props.modalType === 0 ?
                            <Text style={styles.modalText}>Dodaj Kategorię</Text> :
                            props.modalType === 1 ?
                                <Text style={styles.modalText}>Dodaj Projekt</Text>:
                                props.modalType === 2 ?
                                    <Text style={styles.modalText}>Dodaj zadanie</Text>:
                                    props.modalType === 'category' ?
                                        <Text style={styles.modalText}>Edytuj Kategorię</Text> :
                                        props.modalType === 'project' ?
                                            <Text style={styles.modalText}>Edytuj Projekt</Text>:
                                            props.modalType === 'task' ?
                                                <Text style={styles.modalText}>Edytuj zadanie</Text>: null
                    }
                    <Formik
                        initialValues={
                            props.modalType === 0 || props.modalType === 'category' ?
                            {
                                name: !props.edit ? '' : props.item && props.item.name
                            } : props.modalType === 1 || props.modalType === 'project' ?
                            {
                                name: !props.edit ? '' : props.item && props.item.name,
                            } : props.modalType === 2 || props.modalType === 'task' ?
                            {
                                name: !props.edit ? '' : props.item && props.item.name,
                                date: !props.edit  ? new Date(Date.now()) : props.item &&  props.item.dueDate ? props.item.dueDate.toDate() : new Date(Date.now()),
                                hours: !props.edit ? '01' : props.item && props.item.timer ?
                                parseInt(getHours(props.item)) < 10
                                    ? `0${parseInt(getHours(props.item)).toString()}`
                                    : parseInt(getHours(props.item)).toString() : '01',
                                minutes: !props.edit ? '00' : props.item && props.item.timer ?
                                parseInt(getMinutes(props.item)) < 10
                                    ? `0${parseInt(getMinutes(props.item)).toString()}`
                                    : parseInt(getMinutes(props.item)).toString() : '00',
                                seconds: !props.edit ? '00' : props.item && props.item.timer ?
                                parseInt(getSeconds(props.item))< 10
                                    ? `0${parseInt(getSeconds(props.item)).toString()}`
                                    : parseInt(getSeconds(props.item)).toString() : '00',
                                withoutDate: withoutDate
                            } : null
                        }
                        onSubmit={values => props.handleSubmit(values)}
                        validationSchema={Yup.object(
                            props.modalType === 0 || props.modalType === 'category' ?
                            {
                                name: Yup
                                    .string()
                                    .required(),
                            } : props.modalType === 1 || props.modalType === 'project' ?
                            {
                                name: Yup
                                    .string()
                                    .required(),
                            } : props.modalType === 2 || props.modalType === 'task' ? {
                                name: Yup
                                    .string()
                                    .required(),
                                date: Yup
                                    .date()
                                    .required('Wymagane'),
                                hours: Yup
                                    .string()
                                    .matches(hoursRegex, 'Nieprawidłowe')
                                    .required('Wymagane'),
                                minutes: Yup
                                    .string()
                                    .matches(minsecsRegex, 'Nieprawidłowe')
                                    .required('Wymagane'),
                                seconds: Yup
                                    .string()
                                    .matches(minsecsRegex, 'Nieprawidłowe')
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
                                {props.modalType === 0  || props.modalType === 'category' ? (
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
                                props.modalType === 1 || props.modalType === 'project' ? (
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
                                props.modalType === 2 || props.modalType === 'task' ? (
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
                                        title={!props.edit ? `Dodaj ${
                                            props.modalType === 0 ? 'Kategorię' :
                                            props.modalType === 1 ? 'Projekt' :
                                            props.modalType === 2 ? 'Zadanie' : null
                                        }`:
                                            `Edytuj ${
                                                props.modalType === 'category' ? 'Kategorię' :
                                                    props.modalType === 'project' ? 'Projekt' :
                                                        props.modalType === 'task' ? 'Zadanie' : null
                                            }`
                                        }
                                        loading={props.loading}
                                    />
                                </>
                            )}
                    </Formik>
                    <Button
                        containerStyle={[styles.button, styles.buttonClose]}
                        buttonStyle={{backgroundColor: 'transparent'}}
                        onPress={props.hideModal}
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

export default ModalAdd;