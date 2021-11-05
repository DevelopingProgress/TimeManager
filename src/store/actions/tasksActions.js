import { addCat, listCat, listProj } from "../api/apiTasks";
import { ADD_CATEGORY, CLEAR_CATEGORIES, CLEAR_PROJECTS, LIST_CATEGORIES, LIST_PROJECTS } from "../types";

export const listCategories = (user) => ({
    type: LIST_CATEGORIES,
    payload: listCat(user)
})

export const clearCategories = () => ({
    type: CLEAR_CATEGORIES,
})

export const listProjects = (user) => ({
    type: LIST_PROJECTS,
    payload: listProj(user)
})

export const clearProjects = () => ({
    type: CLEAR_PROJECTS,
})

export const addCategory = (name, icon, user) => ({
    type: ADD_CATEGORY,
    payload: addCat(name, icon, user)
})