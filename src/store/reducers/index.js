import {combineReducers} from "redux";
import authReducer from "./authReducer";
import tasksReducer from "./tasksReducer"


const rootReducer = combineReducers({
    auth: authReducer,
    app: tasksReducer,
})

export default rootReducer;
