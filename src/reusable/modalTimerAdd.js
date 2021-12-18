import React from 'react';

import {Modal, Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import {Colors} from "./utils/tools";

const ModalTimerAdd = (props) => {

    const {timerPicker, hideTimerPicker, errors, errorStyle, values, touched, handleChange, confirmChanges} = props

    return (
        <Modal
            animationType='slide'
            visible={timerPicker}
            style={{}}
            collapsable={true}
            onRequestClose={hideTimerPicker}
        >
            <View style={{flex: 1, marginHorizontal: 50, alignContent: 'center', justifyContent: 'center',}}>
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
                            errorStyle={[errorStyle, {textAlign: 'center'}]}
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
                            errorStyle={[errorStyle, {textAlign: 'center'}]}
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
                            errorStyle={[errorStyle, {textAlign: 'center'}]}
                        />
                    </View>
                </View>
                <Button
                    onPress={confirmChanges}
                    buttonStyle={{backgroundColor: Colors.blue, borderRadius: 20, margin: 10}}
                    title='Zatwierdź'
                />
            </View>
        </Modal>
    );
};

export default ModalTimerAdd;
