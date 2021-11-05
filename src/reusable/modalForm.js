import { Formik } from 'formik';
import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Colors } from './tools';
import * as Yup from "yup";
import { Input } from 'react-native-elements';

const ModalForm = (props) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Formik
                    initialValues={{
                        name: '',
                        icon: ''
                    }}
                    onSubmit={values => props.handleSubmit(values)}
                    validationSchema={Yup.object(
                        {
                            name: Yup
                            .string()
                            .required(),
                            icon: Yup
                            .string()
                            .required(),
                        } 
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
                                <Input 
                                    
                                    placeholder='Ikona kategorii'
                                    onChangeText={handleChange('icon')}
                                    onBlur={handleBlur('icon')}
                                    value={values.icon}
                                    renderErrorMessage={errors.icon && touched.icon}
                                    errorMessage={errors.icon}
                                    errorStyle={{color: Colors.red, fontSize: 15}}
                                    maxLength={50}
                                    containerStyle={{paddingHorizontal: 35}}
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
                                    
                                    placeholder='Ikona projektu'
                                    onChangeText={handleChange('icon')}
                                    onBlur={handleBlur('icon')}
                                    value={values.icon}
                                    renderErrorMessage={errors.icon && touched.icon}
                                    errorMessage={errors.icon}
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
                                    
                                    placeholder='Ikona zadania'
                                    onChangeText={handleChange('icon')}
                                    onBlur={handleBlur('icon')}
                                    value={values.icon}
                                    renderErrorMessage={errors.icon && touched.icon}
                                    errorMessage={errors.icon}
                                    errorStyle={{color: Colors.red, fontSize: 15}}
                                    maxLength={50}
                                    containerStyle={{paddingHorizontal: 35}}
                                    inputStyle={{width: '100%'}}
                                />
                                </>
                            ) : null }
                                
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.textStyle}>Dodaj {
                                        props.modalType === 0 ? 'Kategorię' :
                                        props.modalType === 1 ? 'Projekt' :
                                        props.modalType === 2 ? 'Zadanie' : null
                                    }</Text>
                                </Pressable>
                            </>
                        )}
                    </Formik>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={props.hideModal}>
                    <Text style={styles.textStyle}>Anuluj</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
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
    fontSize: 16
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalForm;