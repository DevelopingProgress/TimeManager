import {
    addCat,
    addProj,
    addTsk,
    delCat,
    delProj,
    delTsk,
    endNoDateTsk,
    endTsk,
    listProj,
    listTsk,
    listCat,
    updateCat,
    updateProj,
    updateTsk
} from "../api/apiTasks";
import {
    ADD_CATEGORY,
    ADD_PROJECT,
    ADD_TASK,
    CLEAR_CATEGORIES,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    CLEAR_PROJECTS,
    CLEAR_STATUS,
    CLEAR_TASKS,
    DELETE_CATEGORY,
    DELETE_PROJECT,
    DELETE_TASK,
    END_TASK,
    LIST_CATEGORIES,
    LIST_PROJECTS,
    LIST_TASKS,
    LOADING,
    UPDATE_CATEGORY,
    UPDATE_PROJECT,
    UPDATE_TASK
} from "../types";

//LIST
export const listCategories = (user) => ({
    type: LIST_CATEGORIES,
    payload: listCat(user)
})
export const listProjects = (user) => ({
    type: LIST_PROJECTS,
    payload: listProj(user)
})
export const listTasks = (user) => ({
    type: LIST_TASKS,
    payload: listTsk(user)
})

//ADD
export const addCategory = (name, user) => ({
    type: ADD_CATEGORY,
    payload: addCat(name,  user)
})
export const addProject = (user, name, category) => ({
    type: ADD_PROJECT,
    payload: addProj(user, name, category)
})
export const addTask = (user, name, category, project, dueDate, timer, description) => ({
        type: ADD_TASK,
        payload: addTsk(user, name, category, project, dueDate, timer, description)
    })

//DELETE
export const deleteCategory = (user, category) => ({
    type: DELETE_CATEGORY,
    payload: delCat(user, category)
})
export const deleteProject = (user, category, project) => ({
    type: DELETE_PROJECT,
    payload: delProj(user, category, project)
})
export const deleteTask = (user, category, project, task) => ({
    type: DELETE_TASK,
    payload: delTsk(user, category, project, task)
})

//UPDATE
export const updateCategory = (name, user, category) => ({
    type: UPDATE_CATEGORY,
    payload: updateCat(name, user, category)
})
export const updateProject = (user, name, category, project) => ({
    type: UPDATE_PROJECT,
    payload: updateProj(user, name, category, project)
})
export const updateTask = (user, name, category, project, task, dueDate, timer, taskTimer,  description) => ({
    type: UPDATE_TASK,
    payload: updateTsk(user, name, category, project, task, dueDate, timer, taskTimer, description)
})

//END TASK
export const endTask = (user, category, project, task, endDate) => ({
    type: END_TASK,
    payload: endTsk(user, category, project, task, endDate)
})
export const endNoDateTask = (user, category, project, task, endDate, timeSpent) => ({
    type: END_TASK,
    payload: endNoDateTsk(user, category, project, task, endDate, timeSpent)
})

//CLEAR
export const clearCategories = () => ({
    type: CLEAR_CATEGORIES,
})
export const clearProjects = () => ({
    type: CLEAR_PROJECTS,
})
export const clearTasks = () => ({
    type: CLEAR_TASKS,
})
export const clearStatus = () => ({
    type: CLEAR_STATUS
})
export const clearError = () => ({
    type: CLEAR_ERROR,
})
export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
})

//LOADING
export const setLoading = () => ({
    type: LOADING
})
