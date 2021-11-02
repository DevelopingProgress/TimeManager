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
            name: name
        } 

        await usersCollection.doc(user.uid).set(userProfile);

        return {isAuth: true, user: userProfile}

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

        return {isAuth: true, user: data}

    } catch (error) {
        return {error: error.message}
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
            const userProfile = {
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName
            } 
            const ActiveUser = await usersCollection.doc(res.user.uid).get();

            if(ActiveUser.exists) {
                const data = ActiveUser.data();
                return {isAuth: true, user: data}
            } else {
                await usersCollection.doc(res.user.uid).set(userProfile);
                return {isAuth: true, user: userProfile}
            }
        } 
    } catch (error) {
        console.log(error)
        return {error: error.message}
    }
    
}

export const loginGoogle = async() => {
    try {
        const { type, user, idToken} = await Google.logInAsync({
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
                name: res.user.displayName
            } 
            const ActiveUser = await usersCollection.doc(res.user.uid).get();

            if(ActiveUser.exists) {
                const data = ActiveUser.data();
                return {isAuth: true, user: data}
            } else {
                await usersCollection.doc(res.user.uid).set(userProfile);
                return {isAuth: true, user: userProfile}
            }
        }
    } catch (error) {
        console.log(error)
        return {error: error.message}
    }
    
}

export const autoLogin = () => (
    new Promise((resolve,reject)=>{
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                usersCollection.doc(user.uid).get().then( snapshot =>{
                    resolve({ isAuth: true, user: snapshot.data() })
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