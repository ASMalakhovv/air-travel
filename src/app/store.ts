import {combineReducers, createStore,applyMiddleware} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch } from 'redux-thunk'
import {FiltrationAction, filtrationReducer} from "../components/Filtration/filtrationReducer";
import {filterOptionReducer} from "../components/Filtration/FilterOption/filterOptionReducer";

const rootReducer = combineReducers({
    filtration:filtrationReducer,
    filterOptions:filterOptionReducer
})






export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>;
export type ActionType=FiltrationAction
export type AppThunk<ReturnType> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionType>