import React from 'react'
import {FlatList, Text} from "react-native";
import {ModalOptions} from "./modalOptions";

export const Tiles = (props) => {
    return (
        <FlatList
            style={{width: '100%', }}
            contentContainerStyle={{alignContent: 'center', alignItems: 'center'}}
            data={
                props.array ? props.array.map((item) => {
                    return item
                }) : null
            }
            renderItem={({item}) => (
                item ? (
                    <ModalOptions
                    item={item}
                    navigation={props.navigation}
                    goToScreen={props.goToScreen}
                    category={props.category}
                    type={props.type}
                    />) : null
            )}
            numColumns={2}
        />
    )
}

