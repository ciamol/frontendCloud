import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    dateNow: new Date().toISOString().split('T')[0],
    city:'0',
    journalist:'0'
}
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        filter:(state,action)=>{
            const {dateNow,city,journalist} = action.payload;
            state.dateNow = dateNow;
            state.city = city,
            state.journalist = journalist
        },
    }
})
export const {filter} = filterSlice.actions;
export default  filterSlice.reducer;
