import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from './utils/tools'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/authActions'
import { clearCategories } from '../store/actions/tasksActions'

export const LogoutIcon = ({navigation}) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(clearCategories())
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
