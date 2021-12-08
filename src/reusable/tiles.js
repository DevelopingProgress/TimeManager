import React from 'react'
import {FlatList} from "react-native";
import {ItemOptions} from "./itemOptions";

export const Tiles = (props) => {
    return (
        <>
            {props.array ? props.array.map((item) => (
                <ItemOptions
                    key={item.id}
                    item={item}
                    navigation={props.navigation}
                    goToScreen={props.goToScreen}
                    category={props.category}
                    type={props.type}
                    setLoading={props.setLoading}
                />)): null}
        </>
    )
}

