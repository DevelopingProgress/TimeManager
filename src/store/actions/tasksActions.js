import { addCat, addProj, addTsk, listCat, listProj, listTsk } from "../api/apiTasks";
import { ADD_CATEGORY, ADD_PROJECT, ADD_TASK, CLEAR_CATEGORIES, CLEAR_PROJECTS, CLEAR_TASKS, LIST_CATEGORIES, LIST_PROJECTS, LIST_TASKS } from "../types";

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

export const listTasks = (projects) => ({
    type: LIST_TASKS,
    payload: listTsk(projects)
})

export const clearTasks = () => ({
    type: CLEAR_TASKS,
})

export const addCategory = (name, icon, user) => ({
    type: ADD_CATEGORY,
    payload: addCat(name, icon, user)
})

export const addProject = (name, category) => ({
    type: ADD_PROJECT,
    payload: addProj(name, category)
})

export const addTask = (name, project) => ({
    type: ADD_TASK,
    payload: addTsk(name, project)
})