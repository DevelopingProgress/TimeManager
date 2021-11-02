import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from './tools'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { Divider, Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/authActions'

export const SettingsIcon = ({navigation}) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
            <View>
            <Menu>
                <MenuTrigger> 
                    <Icon
                        type='entypo' 
                        name='dots-three-vertical' 
                        size={25} 
                        style={{
                            marginTop: 5,
                            color: Colors.black2,
                        }}
                    />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsContainer: styles.optionsContainer}}>
                    <MenuOption 
                        style={{flexDirection: 'row'}}
                        onSelect={() => navigation.navigate('SettingsScreen')}
                    > 
                        <Icon 
                            type='ionicons' 
                            name='settings'
                            size={20} 
                            style={{
                                marginTop: 13,
                                color: Colors.blue,
                            }}
                        /> 
                        <Text style={styles.option}>
                            Ustawienia
                        </Text>
                    </MenuOption>
                    <Divider  orientation="horizontal" width={1}/>
                    <MenuOption 
                        style={{flexDirection: 'row'}} 
                        onSelect={handleLogout}
                    > 
                        <Icon 
                            type='entypo' 
                            name='log-out'
                            size={20} 
                            style={{
                                marginTop: 13,
                                color: Colors.blue,
                            }}
                        /> 
                        <Text style={styles.option}>
                            Wyloguj
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
    }
})
