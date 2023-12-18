import {legacy_createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import { reducer as userreducer } from "./UserAuth/reducer"
const rootreducer= combineReducers({userreducer})
export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))