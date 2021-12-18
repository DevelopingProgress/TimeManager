import React from "react";
import {Input} from "react-native-elements";


const CategoryForm = (props) => {
    const {handleChange, handleBlur, values, errors, errorStyle, maxLength, containerStyle, inputStyle, touched} = props
    return(
        <>
            <Input
                placeholder='Nazwa kategorii'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                renderErrorMessage={errors.name && touched.name}
                errorMessage={errors.name}
                errorStyle={errorStyle}
                maxLength={maxLength}
                containerStyle={containerStyle}
                inputStyle={inputStyle}
            />
        </>
    )
}

export default  CategoryForm
