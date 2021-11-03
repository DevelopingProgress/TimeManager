import { firebase, categoriesCollection } from "../../database/firebase";

export const listCat = async(user) => {
    try {

        const snapshot = await categoriesCollection.where('uid', '==', user.uid).get()
        snapshot.forEach(doc => {
            const data = doc.data()
            return {categories: data}
        });
    } catch (error) {
        return {error: error.message}
    }

}