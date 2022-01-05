import React from 'react'
import {ItemOptions} from "./itemOptions";

export const Tiles = (props) => {
    const {array, type, navigation, category, goToScreen} = props
    return (
        <>
            {array && category ? array.filter((item) => category.id === item.catID).map((item) => (
                <ItemOptions
                    key={item.id}
                    item={item}
                    navigation={navigation}
                    goToScreen={goToScreen}
                    category={category}
                    type={type}
                />)): array ? array.map((item) => (
                <ItemOptions
                    key={item.id}
                    item={item}
                    navigation={navigation}
                    goToScreen={goToScreen}
                    category={category}
                    type={type}
                />)) : null}
        </>
    )
}

