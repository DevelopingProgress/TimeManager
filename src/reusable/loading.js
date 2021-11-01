import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress'
import { Colors } from './tools'

export const Loading = (props) => {


    const [progress, setProgress] = useState(0)

    const animate = () => {
        let animProgress = 0
        setTimeout(() => {
            setInterval(() => {
              animProgress += 0.1
              setProgress(animProgress)
            }, 500);
          }, 1500);
    }

    useEffect(() => {
        animate()
    }, [])

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
                /> :
                props.pie ?
                <Progress.Pie
                    style={{margin: 10, ...props.style}}
                    color={
                        props.style && props.style.color 
                        ? props.style.color 
                        : Colors.blue 
                    }
                    progress={progress}
                /> :
                props.bar ?
                <Progress.Bar
                    style={{margin: 10, ...props.style}}
                    color={
                        props.style && props.style.color 
                        ? props.style.color 
                        : Colors.blue 
                    } 
                    progress={progress}
                />:
                props.circle ?
                <Progress.Circle
                    style={{margin: 10, ...props.style}}
                    color={
                        props.style && props.style.color 
                        ? props.style.color 
                        : Colors.blue 
                    }
                    progress={progress}
                /> :
                null
            }
            
        </>
       
    )
}



