import React from 'react';
import {Formik} from 'formik';
import {Modal, Text, View} from 'react-native';
import {styles} from "../../screens/home";
import {Colors, hoursRegex, minsecsRegex} from "../utils/tools";
import * as Yup from "yup";
import {Button, Input} from "react-native-elements";

const AddTimeForm = (props) => {
    const {modalVisible, hideModal, handleSubmit} = props
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
                <Formik
                    initialValues={
                        {
                            hours: '01',
                            minutes: '00',
                            seconds: '00'
                        }
                    }
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={
                        Yup.object({
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
                        })
                    }
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
                              <View style={{marginHorizontal: 50, alignContent: 'center', justifyContent: 'center', marginTop: 300}}>
                                  <View style={{flexDirection: 'row', marginVertical: 50}}>
                                      <View style={{flex: 0.33, flexDirection: 'column'}}>
                                          <Text style={{textAlign: 'center'}}>
                                              Godziny
                                          </Text>
                                          <Input
                                              value={values.hours}
                                              textAlign='center'
                                              style={{fontSize: 50}}
                                              keyboardType="numeric"
                                              onChangeText={handleChange('hours')}
                                              maxLength={2}
                                              renderErrorMessage={errors.hours && touched.hours}
                                              errorMessage={errors.hours}
                                              errorStyle={{color: Colors.red, fontSize: 15, textAlign: 'center'}}
                                          />
                                      </View>
                                      <View style={{flex: 0.33, flexDirection: 'column'}}>
                                          <Text style={{textAlign: 'center'}}>
                                              Minuty
                                          </Text>
                                          <Input
                                              value={values.minutes}
                                              textAlign='center'
                                              style={{fontSize: 50 }}
                                              keyboardType="numeric"
                                              onChangeText={handleChange('minutes')}
                                              maxLength={2}
                                              renderErrorMessage={errors.minutes && touched.minutes}
                                              errorMessage={errors.minutes}
                                              errorStyle={{color: Colors.red, fontSize: 15, textAlign: 'center'}}
                                          />
                                      </View>
                                      <View style={{flex: 0.33, flexDirection: 'column'}}>
                                          <Text style={{textAlign: 'center'}}>
                                              Sekundy
                                          </Text>
                                          <Input
                                              value={values.seconds}
                                              textAlign='center'
                                              style={{fontSize: 50}}
                                              keyboardType="numeric"
                                              onChangeText={handleChange('seconds')}
                                              maxLength={2}
                                              renderErrorMessage={errors.seconds && touched.seconds}
                                              errorMessage={errors.seconds}
                                              errorStyle={{color: Colors.red, fontSize: 15, textAlign: 'center'}}
                                          />
                                      </View>
                                  </View>
                                  <Button
                                      onPress={handleSubmit}
                                      buttonStyle={{backgroundColor: Colors.blue, borderRadius: 20, margin: 10}}
                                      title='Zatwierdź'
                                  />
                                  <Button
                                      onPress={hideModal}
                                      buttonStyle={{backgroundColor: Colors.red, borderRadius: 20, margin: 10}}
                                      title='Anuluj'
                                  />
                              </View>
                          </>
                    )}
                </Formik>
            </View>
        </Modal>
    );
};


export default AddTimeForm;
