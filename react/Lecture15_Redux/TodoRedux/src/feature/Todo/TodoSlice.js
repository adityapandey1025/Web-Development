import {createSlice,nanoid} from '@reduxjs/toolkit'

export const TodoSlice=createSlice({
    name:'todos',
    initialState:JSON.parse(localStorage.getItem("todos")) || [],
    reducers:{
        addTodo:(state,action)=>{
            state.push({
                id:nanoid(),
                text:action.payload,
                completed:false
            });
        },
        removeTodo:(state,action)=>{
            return state.filter((todo)=>todo.id!==action.payload)
        },
        toggleTodo:(state,action)=>{
            const todo=state.find((todo)=>todo.id===action.payload);

            if(todo){
                todo.completed=!todo.completed;
            }
        },
        saveTodo:(state,action)=>{
            const todo=state.find((todo)=>todo.id===action.payload.id);
            if(todo) todo.text=action.payload.text;
        }
    }
})

export const {addTodo,removeTodo,toggleTodo,saveTodo}=TodoSlice.actions;
export default TodoSlice.reducer;
