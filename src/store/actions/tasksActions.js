import { addCat, addProj, listCat, listProj } from "../api/apiTasks";
import { ADD_CATEGORY, ADD_PROJECT, CLEAR_CATEGORIES, CLEAR_PROJECTS, LIST_CATEGORIES, LIST_PROJECTS } from "../types";

export const listCategories = (user) => ({
    type: LIST_CATEGORIES,
    payload: listCat(user)
})

export const clearCategories = () => ({
    type: CLEAR_CATEGORIES,
})

export const listProjects = (categories) => ({
    type: LIST_PROJECTS,
    payload: listProj(categories)
})

export const clearProjects = () => ({
    type: CLEAR_PROJECTS,
})

export const addCategory = (name, icon, user) => ({
    type: ADD_CATEGORY,
    payload: addCat(name, icon, user)
})

export const addProject = (name, category, user) => ({
    type: ADD_PROJECT,
    payload: addProj(name, category, user)
})