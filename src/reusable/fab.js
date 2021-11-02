import React from 'react'
import { FabSpeedDial, Fab } from 'material-bread';
import { Platform, View } from 'react-native'
import { Colors } from './tools';

export const AddFab = () => {
    return (
        <View style={{marginTop: Platform.OS === 'android' ? 520 : 430, margin: 10}}>
            <FabSpeedDial
                actions={[
                    <Fab 
                        key={1} 
                        backgroundColor={Colors.darkgrey} 
                        label='Kategoria'
                        rippleColor={Colors.white}
                    />,
                    <Fab 
                        key={2}  
                        backgroundColor={Colors.darkgrey} 
                        label='Projekt'
                        rippleColor={Colors.white}
                    />,
                    <Fab 
                        key={3} 
                        backgroundColor={Colors.darkgrey} 
                        label='Zadanie'
                        rippleColor={Colors.white}
                    />,
                ]}
                fab={<Fab 
                    key={1} 
                    backgroundColor={Colors.blue} 
                    rippleColor={Colors.white}
                />}
            />         
        </View>  
    )
}


