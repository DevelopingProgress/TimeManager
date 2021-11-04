import { listCat } from "../api/apiTasks";
import { CLEAR_CATEGORIES, LIST_CATEGORIES } from "../types";

export const listCategories = (user) => ({
    type: LIST_CATEGORIES,
    payload: listCat(user)
})

export const clearCategories = () => ({
    type: CLEAR_CATEGORIES,
})
