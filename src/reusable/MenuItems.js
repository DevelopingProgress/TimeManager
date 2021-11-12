import React from 'react'
import { Colors } from "./tools";
import { View } from "react-native";
import { MenuTasks } from './menuTasks';

export const MenuItems = (props) => {
    return (
        <View style={{margin: 10, flex: 1}}>
            {props.categories ? 
            (props.array ? props.array.map(item => (
                <MenuTasks 
                    id={item.id}
                    name={item.name}
                />
            )) : null) : props.projects ? 
            (props.array ? props.array.map(item => (
                <MenuTasks 
                    id={item.id}
                    name={item.name}
                    category={item}
                    accordion
                />
            )) : null)  : props.tasks ? 
            (props.array ? props.array.map(item => (
                <MenuTasks 
                    id={item.id}
                    name={item.name}
                />
            )) : null) : null}
        </View>
    )
}



