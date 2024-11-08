import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  obj: {ip: {isChecked: false, name: "ip"}}
};


export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {

    setparams: (state, action) => {
      state.obj[action.payload.name] = action.payload
    },

  },

});

// Action creators are generated for each case reducer function
export const {actions: fieldsActions} = fieldsSlice;
export const {reducer: fieldsReducer} = fieldsSlice;


export const getObj = (state) => state.fields.obj