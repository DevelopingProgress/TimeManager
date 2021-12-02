import React, {useState} from "react";
import {Button, Divider, Icon, Input} from "react-native-elements";
import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {Colors} from "../tools";



const TaskForm  = (props) => {
    const {handleChange, handleBlur, values, containerStyle, setFieldValue, errors, errorStyle, inputStyle, maxLength, touched} = props
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [timerPicker, setTimerPicker] = useState(false);
    const [hours, setHours] = useState('1');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };

    const showTimerPicker = () => {
        setTimerPicker(true)
    };

    const confirmChanges = () => {
        setTimerPicker(false)
        setFieldValue('timer',  hours + ':'+minutes+':'+seconds)
    }

    const hideTimerPicker = () => {
        setTimerPicker(false)
        setHours('1')
        setMinutes('0')
        setSeconds('0')
    }


    return(
        <>
            <View style={{marginHorizontal: 5}}>
                <Input
                    placeholder='Nazwa zadania'
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    renderErrorMessage={errors.name && touched.name}
                    errorMessage={errors.name}
                    errorStyle={[errorStyle, {textAlign: 'center'}]}
                    maxLength={maxLength}
                    containerStyle={containerStyle}
                    inputStyle={[inputStyle, {fontSize: 25}]}
                    placeholderTextColor={Colors.grey}
                    selectionColor={Colors.grey}
                />
            </View>
            <TouchableOpacity style={{marginHorizontal: 40}} onPress={showDatePicker}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{color: Colors.grey}}>Data</Text>
                    <Text  style={{color: Colors.grey, fontSize: 25, marginBottom: 5, flex: 1, textAlign: 'center'}}>
                        {moment(values.date).format('DD-MM-YYYY')}
                    </Text>
                    <Icon type='antdesign' name='calendar' color={Colors.black}/>
                </View>
                <Divider color={Colors.black2} style={{borderWidth: 0.3}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 40, marginTop: 30}} onPress={showTimePicker}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{color: Colors.grey}}>Godzina</Text>
                    <Text  style={{color: Colors.grey, fontSize: 25, marginBottom: 5, flex: 1, textAlign: 'center'}}>
                        {moment(values.date).format('HH:mm')}
                    </Text>
                    <Icon type='antdesign' name='clockcircleo' color={Colors.black}/>
                </View>
                <Divider color={Colors.black2} style={{borderWidth: 0.3}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 40, marginVertical: 30, marginBottom: 40}} onPress={showTimerPicker}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{color: Colors.grey, flex: 0.23}}>Czas</Text>
                    <Text  style={{color: Colors.grey, fontSize: 25, marginBottom: 5, flex: 1, textAlign: 'center'}}>
                        {hours + ':'+minutes+':'+seconds}
                    </Text>
                    <Icon type='fontisto' name='stopwatch' color={Colors.black} size={27}/>
                </View>
                <Divider color={Colors.black2} style={{borderWidth: 0.3}}/>
            </TouchableOpacity>

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
                            <TextInput
                                value={hours.toString() || null}
                                textAlign='center'
                                style={{fontSize: 50}}
                                keyboardType="numeric"
                                onChangeText={setHours}
                                maxLength={2}
                            />
                        </View>
                        <View style={{flex: 0.33, flexDirection: 'column'}}>
                            <Text style={{textAlign: 'center'}}>
                                Minuty
                            </Text>
                            <TextInput
                                value={minutes.toString() || null}
                                textAlign='center'
                                style={{fontSize: 50 }}
                                keyboardType="numeric"
                                onChangeText={setMinutes}
                                maxLength={2}
                            />
                        </View>
                        <View style={{flex: 0.33, flexDirection: 'column'}}>
                            <Text style={{textAlign: 'center'}}>
                                Sekundy
                            </Text>
                            <TextInput
                                value={seconds.toString() || null}
                                textAlign='center'
                                style={{fontSize: 50}}
                                keyboardType="numeric"
                                onChangeText={setSeconds}
                                maxLength={2}
                            />
                        </View>
                    </View>
                    <Button
                        onPress={confirmChanges}
                        buttonStyle={{backgroundColor: Colors.blue, borderRadius: 20, margin: 10}}
                        title='Zatwierdź'
                    />
                    <Button
                        onPress={hideTimerPicker}
                        buttonStyle={{backgroundColor: Colors.red, borderRadius: 20, margin: 10}}
                        title='Anuluj'
                    />
                </View>
            </Modal>

            <View>
                {show && (
                    <DateTimePicker
                        value={values.date || new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={(e, date) => {
                            setShow(false)
                            setFieldValue('date', date)
                        }}
                    />
                )}
            </View>
        </>
    )
}

export default  TaskForm