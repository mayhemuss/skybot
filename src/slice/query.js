import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BACK_URL} from "../urls";

export const queryThunk = createAsyncThunk(
  'api/monterList',
  async (body, thunkAPI) => {
    try {

      const responce = await axios.post(`${BACK_URL}/type`, body, {headers: {'Access-Control-Allow-Origin': '*'}})

      if (!responce.data) throw new Error()

      thunkAPI.dispatch(queryActions.setInAppimageUrl(responce.data.inAppimageUrl))
      thunkAPI.dispatch(queryActions.setFields(responce.data.fields))
      thunkAPI.dispatch(queryActions.setRegText(responce.data.regText))
      if (responce.data.commandName) {
        thunkAPI.dispatch(queryActions.setCommandName(responce.data.commandName))
      }


    } catch (e) {
      return thunkAPI.rejectWithValue('error')
    }
  }
)


const initialState = {
  callData: "",
  ref: "",
  isLoading: false,
  fields: [],
  inAppimageUrl: "https://sun9-36.userapi.com/impg/5wsa0laxsuOBStXoQTHxvyy1WXL1x9XWQgguhg/fpeANuWJtRc.jpg?size=1920x1080&quality=95&sign=484509bab898750662d9f9e780afc5b5&type=album",
  commandName: "",
  regText: "Зарегистрироваться"
};


export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {

    setInAppimageUrl: (state, action) => {
      state.inAppimageUrl = action.payload
    },

    setFields: (state, action) => {
      state.fields = action.payload
    },
    setRegText: (state, action) => {
      state.regText = action.payload
    },
    setCommandName: (state, action) => {
      state.commandName = action.payload
    },
    setCallData: (state, action) => {
      state.callData = action.payload
    },
    setRef: (state, action) => {
      state.ref = action.payload
    },



  },
  extraReducers: (builder) => {
    builder
      .addCase(queryThunk.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(queryThunk.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(queryThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: queryActions} = querySlice;
export const {reducer: queryReducer} = querySlice;


export const getFields = (state) => state.query.fields
export const getIsLoading = (state) => state.query.isLoading
export const getInAppimageUrl = (state) => state.query.inAppimageUrl
export const getRegText = (state) => state.query.regText
export const getCommandName = (state) => state.query.commandName
export const getCallData = (state) => state.query.callData
export const getRef = (state) => state.query.ref
