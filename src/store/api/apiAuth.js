import { firebase, usersCollection } from "../../database/firebase";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';


export const register = async({email, password}) => {
    try {
        const res = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);

        const {user} = res;

        const userProfile = {
            uid: user.uid,
            email: email,
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
        const { type, token, user } = await Google.logInAsync({
            expoClientId: `148201193183-rq1ttebsi3oaub2hbij2misj6n1uum8b.apps.googleusercontent.com`,
            iosClientId: `148201193183-7cjvnn24d2a5pkvd0162uignadheb8ig.apps.googleusercontent.com`,
            androidClientId: `148201193183-b2jp16kn90lc9u02v1ipl51up89pkrr1.apps.googleusercontent.com`,
          });
    } catch (error) {
        
    }
    
}

// export const autoLogin = () => (
//     new Promise((resolve,reject)=>{
//         firebase.auth().onAuthStateChanged( user => {
//             if(user){
//                 usersCollection.doc(user.uid).get().then( snapshot =>{
//                     resolve({ isAuth: true, user: snapshot.data() })
//                 })
//             } else {
//                 resolve({ isAuth: false, user:[] })
//             }
//         })
//     })
// )