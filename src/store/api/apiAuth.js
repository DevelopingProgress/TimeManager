import { firebase, usersCollection } from "../../database/firebase";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';


export const register = async({email, name, password}) => {
    try {
        const res = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);

        const {user} = res;

        const userProfile = {
            uid: user.uid,
            email: email,
            name: name,
            categories: []
        } 

        await usersCollection.doc(user.uid).set(userProfile);

        await res.user.sendEmailVerification();

        await firebase.auth().signOut()

        return {isAuth: false, isVerified: false, message: 'Wysłano wiadomość e-mail z potwierdzeniem.'}

    } catch (error) {
        return {error: error.message}
    }
}

export const login = async({email, password}) => {
    try {
        const res = await firebase.auth()
        .signInWithEmailAndPassword(email, password);

        const userProfile = await usersCollection.doc(res.user.uid).get();
        const data = userProfile.data();
        if(res.user.emailVerified) {
            return {isAuth: true, isVerified: true, user: data}
        } else {
            return {
                isAuth: false, 
                isVerified: false, 
                error: 'Proszę zweryfikować konto poprzez automatycznie wysłaną wiadomość e-mail.'}
        }
        
    } catch (error) {
        return {error: 'Nie udało się zalogować, proszę sprawdzić swoje dane logowania.'}
    }
}

export const loginFacebook = async() => {
    try {
        await Facebook.initializeAsync({
            appId: '925013148223465',
            appName: 'TimeManager'
        })
        const {type, token} = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email']
        })
        
        if(type === 'success') {

            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            const res = await firebase.auth().signInWithCredential(credential)
            await firebase.auth().updateCurrentUser(res.user)
            const userProfile = {
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName,
                categories: []
            } 
            const ActiveUser = await usersCollection.doc(res.user.uid).get();

            if(ActiveUser.exists) {
                const data = ActiveUser.data();
                return {isAuth: true, isVerified: true, user: data}
            } else {
                await usersCollection.doc(res.user.uid).set(userProfile);
                return {isAuth: true, isVerified: true, user: userProfile}
            }
        } 
    } catch (error) {
        return {error: error.message}
    }
    
}

export const loginGoogle = async() => {
    try {
        const { type, idToken} = await Google.logInAsync({
            androidClientId: `148201193183-45607r93v6vlvtkr4u8gcec95l7tc9rm.apps.googleusercontent.com`,
            iosClientId: `148201193183-tc11ghq6ecuvlbb4blcslvg6oustjod9.apps.googleusercontent.com`,
            expoClientId: ``,
            scopes: ['profile', 'email'],
          });
        if(type === 'success') {
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken)
            const res = await firebase.auth().signInWithCredential(credential)

            const userProfile = {
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName,
                categories: []
            } 
            const ActiveUser = await usersCollection.doc(res.user.uid).get();

            if(ActiveUser.exists) {
                const data = ActiveUser.data();
                return {isAuth: true, isVerified: true, user: data}
            } else {
                await usersCollection.doc(res.user.uid).set(userProfile);
                return {isAuth: true, isVerified: true, user: userProfile}
            }
        }
    } catch (error) {
        return {error: 'Nie udało się zalogować, błąd logowania poprzez Google'}
    }
    
}

export const autoLogin = () => (
    new Promise((resolve,reject)=>{
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                usersCollection.doc(user.uid).get().then( snapshot =>{
                    if(user.emailVerified) {
                        resolve({ isAuth: true, isVerified: true, user: snapshot.data() })
                    } else {
                        resolve({ isAuth: false, isVerified: false, user:[], error: 'Proszę zweryfikować konto poprzez automatycznie wysłaną wiadomość e-mail.' })
                    }
                })
            } else {
                resolve({ isAuth: false, user:[] })
            }
        })
    })
)

export const logout = () => {
    firebase.auth().signOut()
}

export const passwordReset = async(email) => {
    try {
        await firebase.auth().sendPasswordResetEmail(email)
        return {message: 'Wysłano e-mail do resetu hasła.'}
    } catch (error) {
        return {error: error.message}
    }
}