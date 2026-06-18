import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from '../feature/Todo/TodoSlice';

export const store=configureStore({
    reducer:{
        todo:TodoReducer
    }
})

export default store;