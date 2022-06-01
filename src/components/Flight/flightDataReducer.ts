import {AppRootStateType, AppThunk, AppThunkDispatch} from "../../app/store";
import {flightsAPI} from "../../api/api";
import {DataPromise} from "../../utils/getArrayFlights";
import {FlightState, setFlight, SetIdFlight} from "./flightReducer";
import {FilterOptions, FilterOptionsType, setAirlines} from "../Filtration/FilterOption/filterOptionReducer";
import {calculationSelectedSettings} from "../../utils/calculationSelectedSettings";
import {getAirlines} from "../../utils/getAirlines";
import {airlinesID} from "../Filtration/filtrationReducer";


const initState = {}


export const flightDataReducer = (state: FlightDataInitState = initState, action: FlightDataAction): FlightDataInitState => {
    switch (action.type) {
        case "flight/SET-FLIGHT": {
            const copyState = {...state}
            action.payload.forEach(e => {
                copyState[e.id] = []
            })
            return copyState
        }
        case 'flightData/SET-FLIGHTS': {
            const arrayIdFlights = action.payload.map(f => f.id)
            let copyState: FlightDataInitState = {}
            arrayIdFlights.forEach((id: string, i: number) => {
                copyState[id] = [action.payload[i]]
            })
            return copyState
        }
        default:
            return state
    }
}

//AC
const setFlightsData = (payload: DataPromise[]) => {
    return {
        type: 'flightData/SET-FLIGHTS',
        payload
    } as const
}


export const getFlights = (count: number): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    try {
        const filtersID: string[] = getState().filtration.map(f => f.id)
        let listAirlines: Array<string> = []
        if (getState().filterOptions[airlinesID].length === 0) {
            listAirlines = getAirlines()
            dispatch(setAirlines(listAirlines))
        }
        const filtersOptions: FilterOptionsType = getState().filterOptions
        const setting = calculationSelectedSettings(filtersID, filtersOptions)
        debugger
        const res = await flightsAPI.getFlights(count, setting)
        const flights: FlightState[] = res.map(f => ({id: f.id}))
        dispatch(setFlight(flights))
        dispatch(setFlightsData(res))
    } catch (e) {
        console.error('ERROR')
    }
}

//types
type FlightDataInitState = { [key: string]: Array<DataPromise> }
export type FlightDataAction = ReturnType<typeof setFlightsData> | SetIdFlight