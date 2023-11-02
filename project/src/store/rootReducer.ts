import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./filter-reducer";

const rootReducer = combineReducers({
    filter: filterReducer,
})

export default rootReducer;
