import React from 'react'
import {ItemOptions} from "./itemOptions";

export const Tiles = (props) => {
    const {array, type, navigation, category, setLoading, goToScreen} = props
    return (
        <>
            {array ? array.map((item) => (
                <ItemOptions
                    key={item.id}
                    item={item}
                    navigation={navigation}
                    goToScreen={goToScreen}
                    category={category}
                    type={type}
                    setLoading={setLoading}
                />)): null}
        </>
    )
}

