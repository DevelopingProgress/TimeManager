import { firebase, usersCollection } from "../../database/firebase";



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