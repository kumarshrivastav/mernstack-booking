import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore} from "redux-persist"
import searchSlice from "./searchSlice"
const rootReducer=combineReducers({user:userSlice,search:searchSlice})
const persistedReducer=persistReducer({key:'root',storage,version:1},rootReducer)
export const store=configureStore({
    reducer:persistedReducer
})

export const persistor=persistStore(store)