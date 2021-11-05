import { categoriesCollection, projectsCollection, usersCollection, firebase, } from "../../database/firebase";

export const listCat = async(user) => {
    const userProfile = await usersCollection.doc(user.uid).get();
    const data = userProfile.data();
    let categoriesList = []
    for (var i = 0; i < data.categories.length; i++) {
        if(data.categories) {
            let userCategory = await data.categories[i].get()
            categoriesList.push(userCategory.data())
        }
    }
    return {categories: categoriesList}
}

export const listProj = async(user) => {

    let projectsList = []
    const projects = await projectsCollection.where('uid', '==', user.uid).get()

    projects.forEach(doc => {
        projectsList.push(doc.data())
    })
    return {projects: projectsList}
}

export const addCat = async(name, icon, user) => {

    const category = {
        name: name,
        icon: icon
    }
    const newCategory = await categoriesCollection.add(category)
    const uid = user.uid
    if(newCategory) {
        const ref = categoriesCollection.doc(newCategory.id)
        await usersCollection.doc(uid).update({
            categories: firebase.firestore.FieldValue.arrayUnion(ref)
        })
    }
    
    
}