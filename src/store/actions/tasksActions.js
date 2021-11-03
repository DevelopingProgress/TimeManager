import { listCat } from "../api/apiTasks";
import { LIST_CATEGORIES } from "../types";

export const listCategories = (user) => ({
    type: LIST_CATEGORIES,
    payload: listCat(user)
})