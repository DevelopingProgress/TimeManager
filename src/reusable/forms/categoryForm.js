import React from "react";
import {Input} from "react-native-elements";


const CategoryForm = (props) => {
    return(
        <>
            <Input
                placeholder='Nazwa kategorii'
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                value={props.values.name}
                renderErrorMessage={props.errors.name && props.touched.name}
                errorMessage={props.errors.name}
                errorStyle={props.errorStyle}
                maxLength={props.maxLength}
                containerStyle={props.containerStyle}
                inputStyle={props.inputStyle}
            />
        </>
    )
}

export default  CategoryForm