import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {FiltrationAction, filtrationReducer} from "../components/Filtration/filtrationReducer";
import {FilterOptionAction, filterOptionReducer} from "../components/Filtration/FilterOption/filterOptionReducer";
import {FlightDataAction, flightDataReducer} from "../components/Flight/flightDataReducer";
import {FlightAction, flightReducer} from "../components/Flight/flightReducer";

const rootReducer = combineReducers({
    filtration: filtrationReducer,
    filterOptions: filterOptionReducer,
    flightData: flightDataReducer,
    flight:flightReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>;
export type ActionType = FiltrationAction | FlightDataAction | FlightAction | FilterOptionAction
export type AppThunk<ReturnType> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionType>

// @ts-ignore
window.store = store // for dev