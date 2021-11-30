import React from 'react'
import {FlatList} from "react-native";
import {ModalOptions} from "./modalOptions";

export const Tiles = (props) => {
    return (
        <>
            {props.array ? props.array.map((item) => (
                <ModalOptions
                    item={item}
                    navigation={props.navigation}
                    goToScreen={props.goToScreen}
                    category={props.category}
                    type={props.type}
                />)): null}
        </>
    )
}

