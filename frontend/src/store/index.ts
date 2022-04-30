import { createStore, applyMiddleware, Dispatch } from "redux";
import { RootReducer } from "../reducers"
import thunk from "redux-thunk";

const initialState = {}

export const store =  createStore(RootReducer,initialState ,applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch;