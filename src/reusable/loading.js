import React from 'react'
import { Text } from 'react-native'
import * as Progress from 'react-native-progress'
import { Colors } from './tools'

export const Loading = () => {
    return (
        <>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Ładowanie
            </Text>
            <Progress.CircleSnail
                style={{margin: 10}}
                color={Colors.blue} 
                spinDuration={500}
            />
        </>
       
    )
}



