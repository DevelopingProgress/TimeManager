import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { Colors } from './tools'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { Divider, Icon } from 'react-native-elements'

export const ModalOptions = (props) => {
    return (
        <>
            <View>
            <Menu>
                <MenuTrigger style={{
                    margin:  20, backgroundColor: Colors.lightgrey, padding: 40,
                    borderColor: Colors.black,
                    borderSize: 1, borderWidth: 1, width: 150}}>
                        <Icon name={'house'} size={50}/>
                        <Text style={{textAlign: 'center',  fontWeight: 'bold'}} adjustsFontSizeToFit>{props.item.name}</Text>
                </MenuTrigger>
                <MenuOptions customStyles={{optionsContainer: styles.optionsContainer}}>
                    <MenuOption 
                        style={{flexDirection: 'row'}}
                        onSelect={() => props.navigation.navigate(props.goToScreen, {
                            item: props.item,
                            category: props.category
                        })}
                    >
                        <Text style={styles.option}>
                            {props.goToScreen === 'ProjectsScreen' ? 'Projekty' : 'Zadania'}
                        </Text>
                        <Icon 
                            type='feather'
                            name='arrow-right'
                            size={22}
                            style={{
                                marginTop: 13,
                                color: Colors.blue,
                            }}
                        />
                    </MenuOption>
                    <Divider  orientation="horizontal" width={1}/>
                    <MenuOption 
                        style={{flexDirection: 'row'}} 
                        onSelect={() => console.log('nic')}
                    > 
                        <Icon 
                            type='entypo' 
                            name='edit'
                            size={20} 
                            style={{
                                marginTop: 13,
                                color: Colors.blue,
                            }}
                        /> 
                        <Text style={styles.option}>
                            Edytuj
                        </Text>
                    </MenuOption>
                    <Divider  orientation="horizontal" width={1}/>
                    <MenuOption
                        style={{flexDirection: 'row'}}
                        onSelect={() => console.log('nic')}
                    >
                        <Icon
                            type='entypo'
                            name='trash'
                            size={20}
                            style={{
                                marginTop: 13,
                            }}
                            color={Colors.red}
                        />
                        <Text style={[styles.option, styles.deleteOption]}>
                            Usuń
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        marginTop: 40,
        borderRadius: 3,
        alignItems: 'center',
        textAlign: 'center',
    },
    option: {
        margin: 10,
        color: Colors.black,
        fontSize: 20
    },
    deleteOption: {
        color: Colors.red
    }
})
