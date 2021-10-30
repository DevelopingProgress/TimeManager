import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { Colors } from '../../../reusable/tools'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../../store/actions/authActions'

export const AuthForm = () => {

    const dispatch = useDispatch()
    const [formType, setFormType] = useState('Login')
    const [showPass, setShowPass] = useState(true)
    const [showConfirmPass, setShowConfirmPass] = useState(true)
    const [loading, setLoading] = useState(false)
    const nameRegex =  /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
    const error = useSelector(state => state.auth.error)

    useEffect(() => {
        if(error) {
            //ERROR COMPONENT
            alert(error)
            setLoading(false)
        }
    }, [error])

    const handleSubmit = values => {
        setLoading(true)
        if(formType === 'Login') {
            dispatch(loginUser(values))
        } else {
            dispatch(registerUser(values))
        } 
    }

    const changeType = () => {
        if(formType === 'Login') {
            setFormType('Register')
        } else {
            setFormType('Login')
        }
    }

    return (
        <Formik 
            initialValues={
                formType === 'Login' ? {
                    email: '',
                    password: ''
                } : {
                    email: '',
                    password: '',
                    confirmPass: ''
                }
            }
            onSubmit={values => handleSubmit(values)}
            validationSchema={Yup.object(
                formType === 'Login' ? {
                    email: Yup
                    .string()
                    .email('Nieprawidłowy adres e-mail')
                    .required('Adres e-mail jest wymagany'),
                    password: Yup
                    .string()
                    .required('Hasło jest wymagane')
                    .min(8, 'Hasło musi zawierać co najmiej 6 znaków')
                    .max(16, 'Hasło musi zawierać maksymalnie 16 znaków')
                    .matches(passwordRegex, 'Hasło musi zawierać: 1 wielka litera, 1 mała litera, 1 cyfra, 1 znak specjalny, minimum 8 znaków'),
                } : {
                    email: Yup
                    .string()
                    .email('Nieprawidłowy adres e-mail')
                    .required('Adres e-mail jest wymagany'),
                    password: Yup
                    .string()
                    .required('Hasło jest wymagane')
                    .min(8, 'Hasło musi zawierać co najmiej 6 znaków')
                    .max(16, 'Hasło musi zawierać maksymalnie 16 znaków')
                    .matches(passwordRegex, 'Hasło musi zawierać: 1 wielka litera, 1 mała litera, 1 cyfra, 1 znak specjalny, minimum 8 znaków'),
                    confirmPass: Yup
                    .string()
                    .required('Wymagane potwierdzenie hasła')
                    .oneOf([Yup.ref('password'), null], 'Hasła muszą być identyczne')
                }
            )}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                <>   
                    <Input 
                        inputStyle={styles.input}
                        placeholder='Email'
                        containerStyle={styles.containerStyle}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        renderErrorMessage={errors.email && touched.email}
                        errorMessage={errors.email}
                        errorStyle={{color: Colors.red, fontSize: 15}}
                        maxLength={50}
                    />
                    

                    <Input 
                        inputStyle={styles.input}
                        placeholder='Hasło'
                        containerStyle={styles.containerStyle}
                        rightIcon={{
                            type:'entypo', 
                            name:'eye', 
                            color: showPass ? Colors.grey : Colors.black,
                            onPress: () => setShowPass(!showPass)
                        }}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        renderErrorMessage={errors.password && touched.password}
                        errorMessage={errors.password}
                        errorStyle={{color: Colors.red, fontSize: 15}}
                        secureTextEntry={showPass}
                        maxLength={16}
                    />

                    {formType === 'Register' && 
                    <Input 
                        inputStyle={styles.input}
                        placeholder='Potwierdź hasło'
                        containerStyle={styles.containerStyle}
                        rightIcon={{
                            type:'entypo', 
                            name:'eye', 
                            color: showConfirmPass ? Colors.grey : Colors.black,
                            onPress: () => setShowConfirmPass(!showConfirmPass)
                        }}
                        onChangeText={handleChange('confirmPass')}
                        onBlur={handleBlur('confirmPass')}
                        value={values.confirmPass}
                        renderErrorMessage={errors.confirmPass && touched.confirmPass}
                        errorMessage={errors.confirmPass}
                        errorStyle={{color: Colors.red, fontSize: 15}}
                        secureTextEntry={showConfirmPass}
                        maxLength={16}
                    />
                    }

                    <Button
                        title={ formType === 'Login' ? 'Zaloguj' : 'Zarejestruj'}
                        buttonStyle={{
                            backgroundColor: Colors.blue,
                            margin: 10,
                        }}
                        titleStyle={{width: '100%'}}
                        onPress={handleSubmit}
                        loading={loading}
                    />

                    <Button
                        title={`${
                            formType === 'Login' ? 'Nie masz konta? Zarejestruj się' 
                            : 'Masz konto? Zaloguj się'
                        }`}
                        buttonStyle={{
                            margin: 10,
                        }}
                        titleStyle={{width: '100%',  color: Colors.black2}}
                        onPress={changeType}
                        type='clear'
                    />
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 4
    }, 
    containerStyle:{
        paddingHorizontal: 25
    }
})
