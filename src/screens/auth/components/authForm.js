import React, {useCallback, useEffect, useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Button, Input} from 'react-native-elements'
import {Platform, StyleSheet} from 'react-native'
import {Colors} from '../../../reusable/utils/tools'
import {useDispatch, useSelector} from 'react-redux'
import {
    clearAuthError,
    clearAuthMessage,
    loginFacebookUser,
    loginGoogleUser,
    loginUser,
    passwordResetUser,
    registerUser
} from '../../../store/actions/authActions'
import {useFocusEffect} from '@react-navigation/core'
import Error from "../../../reusable/utils/error";
import Message from "../../../reusable/utils/message";

export const AuthForm = () => {

    const dispatch = useDispatch()
    const [formType, setFormType] = useState('Login')
    const [showPass, setShowPass] = useState(true)
    const [showConfirmPass, setShowConfirmPass] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingFacebook, setLoadingFacebook] = useState(false)
    // const [loadingGoogle, setLoadingGoogle] = useState(false)
    const nameRegex =  /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
    const error = useSelector(state => state.auth.error)
    const message = useSelector(state => state.auth.message)
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showMessageAlert, setShowMessageAlert] = useState(false);

    useEffect(() => {
        if(error !== null) {
            setShowErrorAlert(true)
            setLoading(false)
            setLoadingFacebook(false)
            // setLoadingGoogle(false)
        }
        if(message !== null) {
            setShowMessageAlert(true)
            setLoading(false)
            setLoadingFacebook(false)
            // setLoadingGoogle(false)
        }
    }, [error, message])

    useFocusEffect(
        useCallback(() => {
            return () => dispatch(clearAuthError())
        },[],)
    )

    const handleSubmit = values => {
        setLoading(true)
        if(formType === 'Login') {
            dispatch(loginUser(values))
        } else if(formType === 'Register') {
            dispatch(registerUser(values))
        } else if(formType === 'RemindPass') {
            dispatch(passwordResetUser(values.email))
        }
    }

    const handleFacebookLogin = () => {
        setLoadingFacebook(true)
        dispatch(loginFacebookUser())
    }

    // const handleGoogleLogin = () => {
    //     setLoadingGoogle(true)
    //     dispatch(loginGoogleUser())
    // }

    const changeType = () => {
        if(formType === 'Login') {
            setFormType('Register')
        } else {
            setFormType('Login')
        }
    }

    const remindPassType = () => {
        if(formType === 'Login') {
            setFormType('RemindPass')
        } else {
            setFormType('Login')
        }
    }

    const handleErrorDismiss = () => {
        setShowErrorAlert(false)
        dispatch(clearAuthError())
    }

    const handleMessageDismiss = () => {
        setShowMessageAlert(false)
        dispatch(clearAuthMessage())
    }

    return (
        <>
       <Error showAlert={showErrorAlert} error={error} handleDismiss={handleErrorDismiss}/>
       <Message showAlert={showMessageAlert} message={message} handleDismiss={handleMessageDismiss}/>
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
                    .email('Nieprawid??owy adres e-mail')
                    .required('Adres e-mail jest wymagany'),
                    password: Yup
                    .string()
                    .required('Has??o jest wymagane')
                    .min(8, 'Has??o musi zawiera?? co najmiej 6 znak??w')
                    .max(16, 'Has??o musi zawiera?? maksymalnie 16 znak??w')
                    .matches(passwordRegex, 'Has??o musi zawiera??: 1 wielka litera, 1 ma??a litera, 1 cyfra, 1 znak specjalny, minimum 8 znak??w'),
                } : formType === 'Register' ? {
                    email: Yup
                    .string()
                    .email('Nieprawid??owy adres e-mail')
                    .required('Adres e-mail jest wymagany'),
                    name: Yup
                    .string()
                    .required('Imi?? jest wymagane')
                    .matches(nameRegex),
                    password: Yup
                    .string()
                    .required('Has??o jest wymagane')
                    .min(8, 'Has??o musi zawiera?? co najmiej 6 znak??w')
                    .max(16, 'Has??o musi zawiera?? maksymalnie 16 znak??w')
                    .matches(passwordRegex, 'Has??o musi zawiera??: 1 wielka litera, 1 ma??a litera, 1 cyfra, 1 znak specjalny, minimum 8 znak??w'),
                    confirmPass: Yup
                    .string()
                    .required('Wymagane potwierdzenie has??a')
                    .oneOf([Yup.ref('password'), null], 'Has??a musz?? by?? identyczne')
                } : formType === 'RemindPass' ? {
                    email: Yup
                    .string()
                    .email('Nieprawid??owy adres e-mail')
                    .required('Adres e-mail jest wymagany'),
                } : null
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
                    {formType === 'Register' &&
                    <Input
                        inputStyle={styles.input}
                        placeholder='Imi??'
                        containerStyle={styles.containerStyle}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        renderErrorMessage={errors.name && touched.name}
                        errorMessage={errors.name}
                        errorStyle={{color: Colors.red, fontSize: 15}}
                        maxLength={50}
                    />
                    }
                    {formType !== 'RemindPass' &&
                    <Input
                        inputStyle={styles.input}
                        placeholder='Has??o'
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
                    }

                    {formType === 'Register' &&
                    <Input
                        inputStyle={styles.input}
                        placeholder='Potwierd?? has??o'
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
                    {
                        formType !== 'RemindPass' &&
                        <Button
                            title={ formType === 'Login' ? 'Zaloguj' : 'Zarejestruj'}
                            buttonStyle={{
                                backgroundColor: Colors.blue,
                                marginBottom: 10,
                            }}
                            titleStyle={{
                                width: '100%',
                                fontSize: Platform.OS === 'ios' ? 14 : 15
                            }}
                            onPress={handleSubmit}
                            loading={loading}
                        />
                    }
                    {
                        formType === 'RemindPass' &&
                        <Button
                            title='Zmie?? has??o'
                            buttonStyle={{
                                backgroundColor: Colors.blue,
                                marginBottom: 10,
                            }}
                            titleStyle={{
                                width: '100%',
                                fontSize: Platform.OS === 'ios' ? 14 : 15
                            }}
                            onPress={handleSubmit}
                            loading={loading}
                        />
                    }

                </>
            )}
        </Formik>
        {formType === 'Login' &&
        <>
        <Button
            title="Zaloguj za pomoc?? Facebook"
            buttonStyle={{
                backgroundColor: Colors.fbblue,
                margin: 10,
                padding: 10,
            }}
            onPress={handleFacebookLogin}
            loading={loadingFacebook}
            titleStyle={{
                marginEnd: 5,
                fontSize: Platform.OS === 'ios'  ? 12 : 15
            }}
            icon={{
                type: "fontawesome",
                name: "facebook",
                color: Colors.white,
            }}
        />

        {/*<Button*/}
        {/*    title="Zaloguj za pomoc?? Google"*/}
        {/*    buttonStyle={{*/}
        {/*        backgroundColor: Colors.red,*/}
        {/*        margin: 10,*/}
        {/*        padding: 10*/}
        {/*    }}*/}
        {/*    titleStyle={{*/}
        {/*        marginLeft: 6,*/}
        {/*        fontSize: Platform.OS === 'ios' ? 12 : 15*/}
        {/*    }}*/}
        {/*    onPress={handleGoogleLogin}*/}
        {/*    loading={loadingGoogle}*/}
        {/*    icon={{*/}
        {/*        type: "fontisto",*/}
        {/*        name: "google",*/}
        {/*        color: Colors.white,*/}
        {/*        style: {marginStart: 0}*/}
        {/*    }}*/}
        {/*/>*/}
        </>
        }

        <Button
            title={`${
                formType === 'Login' ? 'Nie masz konta? Zarejestruj si??' 
                : formType === 'Register' ? 'Masz konto? Zaloguj si??' : ''
            }`}
            buttonStyle={{
                marginTop: Platform.OS === 'ios' ? 0 : 5
            }}
            titleStyle={{
                width: '100%',
                color: Colors.black2,
                fontSize: Platform.OS === 'ios' ? 12 : 15
            }}
            onPress={changeType}
            type='clear'
        />
        <Button
            title={`${
                formType === 'Login' ? 'Zapomnia??e?? has??a?' 
                : formType === 'RemindPass' ? 'Powr??t do logowania' : ''
            }`}
            titleStyle={{
                width: '100%',
                color: Colors.black2,
                fontSize: Platform.OS === 'ios' ? 12 : 15
            }}
            onPress={remindPassType}
            type='clear'
        />
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        paddingHorizontal: 25
    }
})
