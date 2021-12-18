import React from "react";
import {Input} from "react-native-elements";

const ProjectForm  = (props) => {

    const {handleChange, handleBlur, values, errors, containerStyle, inputStyle, errorStyle, touched, maxLength} = props

    return(
        <>
            <Input
                placeholder='Nazwa projektu'
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

export default  ProjectForm
