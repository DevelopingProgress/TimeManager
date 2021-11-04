import { firebase, categoriesCollection } from "../../database/firebase";

export const listCat = async (user) => {
    try {
        const categoriesList = await categoriesCollection.where('uid', '==', user.uid).get()
        const snapshot = categoriesList.docs[0];
        const data = snapshot.data();
        console.log(data)
        return {categories: data}
    } catch (error) {
        return {error: error.message}
    }
}