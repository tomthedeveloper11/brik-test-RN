import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import itemReducer from "./reducers/item_reducers"
import indexReducer from "./reducers/index_reducer"

const rootReducer = combineReducers({ itemReducer, indexReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk))
