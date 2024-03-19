import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    id:'',
    name:'',
    rol:''
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const {id,name,rol} = action.payload;
            state.id = id;
            state.name = name;
            state.rol = rol;
        },
    }
})
export const {addUser} = userSlice.actions;
export default  userSlice.reducer;