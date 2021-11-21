import { Formik } from 'formik';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Colors } from './tools';
import * as Yup from "yup";
import {Input, Button} from 'react-native-elements';
import { Modal, Portal } from 'react-native-paper';
import { Loading } from './loading';



const ModalForm = (props) => {

    const [showIconPicker, setShowIconPicker] = useState(false);
    const [icon, setIcon] = useState('');

    return (
        <Portal>
            <Modal
            visible={props.modalVisible}
            onDismiss={props.hideModal}
            contentContainerStyle={styles.modalView}
        >
            <Formik
                initialValues={
                    props.modalType === 0 ?
                    {
                        name: '',
                        icon: '',
                    } : props.modalType === 1 ?
                    {
                        name: '',
                        category: '',
                    } : props.modalType === 2 ?
                    {
                        name: '',
                        project: '',
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
                        category: Yup
                        .string()
                        .required(),
                    } : props.modalType === 2 ? {
                        name: Yup
                        .string()
                        .required(),
                        project: Yup
                        .string()
                        .required(),
                    } : null
                )}
            >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <>
                        {props.modalType === 0 ? (
                            <>
                            <Input
                                placeholder='Nazwa kategorii'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                renderErrorMessage={errors.name && touched.name}
                                errorMessage={errors.name}
                                errorStyle={{color: Colors.red, fontSize: 15}}
                                maxLength={50}
                                containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                inputStyle={{width: '100%'}}
                            />
                            </>
                        ) :
                        props.modalType === 1 ? (
                            <>
                            <Input

                                placeholder='Nazwa projektu'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                renderErrorMessage={errors.name && touched.name}
                                errorMessage={errors.name}
                                errorStyle={{color: Colors.red, fontSize: 15}}
                                maxLength={50}
                                containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                inputStyle={{width: '100%'}}
                            />
                            <Input

                                placeholder='Kategoria'
                                onChangeText={handleChange('category')}
                                onBlur={handleBlur('category')}
                                value={values.category}
                                renderErrorMessage={errors.category && touched.category}
                                errorMessage={errors.category}
                                errorStyle={{color: Colors.red, fontSize: 15}}
                                maxLength={50}
                                containerStyle={{paddingHorizontal: 35}}
                                inputStyle={{width: '100%'}}
                            />
                            </>
                        ) :
                        props.modalType === 2 ? (
                            <>
                            <Input
                                placeholder='Nazwa zadania'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                renderErrorMessage={errors.name && touched.name}
                                errorMessage={errors.name}
                                errorStyle={{color: Colors.red, fontSize: 15}}
                                maxLength={50}
                                containerStyle={{paddingHorizontal: 35, marginTop: 20}}
                                inputStyle={{width: '100%'}}
                            />
                            <Input
                                placeholder='Projekt'
                                onChangeText={handleChange('project')}
                                onBlur={handleBlur('project')}
                                value={values.project}
                                renderErrorMessage={errors.project && touched.project}
                                errorMessage={errors.project}
                                errorStyle={{color: Colors.red, fontSize: 15}}
                                maxLength={50}
                                containerStyle={{paddingHorizontal: 35}}
                                inputStyle={{width: '100%'}}
                            />
                            </>
                        ) : null }
                            {props.loading ? <Loading circlesnail/> :
                                <Button
                                    containerStyle={[styles.button, styles.buttonOpen]}
                                    buttonStyle={{backgroundColor: 'transparent'}}
                                    onPress={handleSubmit}
                                    title={`Dodaj ${
                                        props.modalType === 0 ? 'Kategorię' :
                                        props.modalType === 1 ? 'Projekt' :
                                        props.modalType === 2 ? 'Zadanie' : null
                                    }`}
                                />
                            }
                        </>
                    )}
                </Formik>
                <Button
                    containerStyle={[styles.button, styles.buttonClose]}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={props.hideModal}
                    title='Anuluj'
                />
            </Modal>
        </Portal>

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
    padding: 10,
    elevation: 2
    },
    buttonOpen: {
    backgroundColor: Colors.blue,
    },
    buttonClose: {
    backgroundColor: Colors.red,
    },
    textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
    },
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
    },
});

export default ModalForm;
