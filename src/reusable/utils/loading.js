import React from 'react'
import * as Progress from 'react-native-progress'
import {Colors} from './tools'

export const Loading = (props) => {
    return (
        <>
            {props && props.circlesnail ?
                <Progress.CircleSnail
                    style={{margin: 10, ...props.style}}
                    color={
                        props.style && props.style.color
                        ? props.style.color
                        : Colors.blue
                    }
                    spinDuration={500}
                /> : null
            }

        </>

    )
}



