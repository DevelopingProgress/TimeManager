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
    }

    const hideTimerPicker = () => {
        setTimerPicker(false)
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
                        {values.hours + ':'+values.minutes+':'+values.seconds}
                    </Text>
                    <Icon type='fontisto' name='stopwatch' color={Colors.black} size={27}/>
                </View>
                <Divider color={Colors.black2} style={{borderWidth: 0.3}}/>
            </TouchableOpacity>
            {/*{errors.hours &&  <Text style={[errorStyle, {textAlign: 'center'}]}>{errors.hours}</Text>}*/}
            {/*{errors.minutes &&  <Text style={[errorStyle, {textAlign: 'center'}]}>{errors.minutes}</Text>}*/}
            {/*{errors.seconds &&  <Text style={[errorStyle, {textAlign: 'center'}]}>{errors.seconds}</Text>}*/}



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
                                value={values.hours}
                                textAlign='center'
                                style={{fontSize: 50}}
                                keyboardType="numeric"
                                onChangeText={handleChange('hours')}
                                maxLength={2}
                            />
                        </View>
                        <View style={{flex: 0.33, flexDirection: 'column'}}>
                            <Text style={{textAlign: 'center'}}>
                                Minuty
                            </Text>
                            <TextInput
                                value={values.minutes}
                                textAlign='center'
                                style={{fontSize: 50 }}
                                keyboardType="numeric"
                                onChangeText={handleChange('minutes')}
                                maxLength={2}
                            />
                        </View>
                        <View style={{flex: 0.33, flexDirection: 'column'}}>
                            <Text style={{textAlign: 'center'}}>
                                Sekundy
                            </Text>
                            <TextInput
                                value={values.seconds}
                                textAlign='center'
                                style={{fontSize: 50}}
                                keyboardType="numeric"
                                onChangeText={handleChange('seconds')}
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
                        minimumDate={new Date(Date.now())}
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