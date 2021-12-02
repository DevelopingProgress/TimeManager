import { Formik } from 'formik';
import React from 'react';
import {StyleSheet, Modal, Text, View} from 'react-native';
import { Colors } from './tools';
import * as Yup from "yup";
import {Button} from 'react-native-elements';
import CategoryForm from "./forms/categoryForm";
import ProjectForm from "./forms/projectForm";
import TaskForm from "./forms/taskForm";
import moment from "moment";



const ModalAdd = (props) => {
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
                                    null
                    }
                    <Formik
                        initialValues={
                            props.modalType === 0 ?
                            {
                                name: ''
                            } : props.modalType === 1 ?
                            {
                                name: '',
                            } : props.modalType === 2 ?
                            {
                                name: '',
                            } : null
                        }
                        onSubmit={values => props.handleSubmit(values)}
                        validationSchema={Yup.object(
                            props.modalType === 0 ?
                            {
                                name: Yup
                                    .string()
                                    .required(),
                            } : props.modalType === 1 ?
                            {
                                name: Yup
                                    .string()
                                    .required(),
                            } : props.modalType === 2 ? {
                                name: Yup
                                    .string()
                                    .required(),
                                date: Yup
                                    .date()
                                    .required(),
                                timer: Yup
                                    .string()
                                    .required()
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
                                {props.modalType === 0 ? (
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
                                props.modalType === 1 ? (
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
                                props.modalType === 2 ? (
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
                                    />
                                ) : null }
                                    <Button
                                        containerStyle={[styles.button, styles.buttonOpen]}
                                        buttonStyle={{backgroundColor: 'transparent'}}
                                        onPress={handleSubmit}
                                        title={`Dodaj ${
                                            props.modalType === 0 ? 'Kategorię' :
                                            props.modalType === 1 ? 'Projekt' :
                                            props.modalType === 2 ? 'Zadanie' : null
                                        }`}
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