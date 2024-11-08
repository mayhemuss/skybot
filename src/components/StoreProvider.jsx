import {Provider} from "react-redux";
import {queryReducer} from "../slice/query";
import {configureStore} from "@reduxjs/toolkit";
import {fieldsReducer} from "../slice/fields";

export function createReduxStore(initialState) {
  const rootReducers = {
    query: queryReducer,
    fields: fieldsReducer,
  };

  return configureStore({
    reducer: rootReducers,

    preloadedState: initialState,
  });
}


export const StoreProvider = (props) => {
  const {
    children,

  } = props;

  const store = createReduxStore();

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};