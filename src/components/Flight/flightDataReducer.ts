import {AppRootStateType, AppThunk, AppThunkDispatch} from "../../app/store";
import {flightsAPI} from "../../api/api";
import {DataPromise} from "../../utils/getArrayFlights";
import {FlightState, setFlight, SetIdFlight} from "./flightReducer";
import {FilterOptions, FilterOptionsType} from "../Filtration/FilterOption/filterOptionReducer";
import {calculationSelectedSettings} from "../../utils/calculationSelectedSettings";


const initState = {}
/*thereBack: {
    amount: null as null | string,
    currency:null as null | string,
    currencyCode: null as null | string,
    age: null as null | string,
    passengerCountThereBack: null as null | number,
    duration: null as null | number,
    carrier:null as null | string,
    flightDuration:null as null | string,
},
departureThere: {
    departureCityThere: undefined as undefined | string,
    departureAirportThere: null as null | string,
    departureUidThere: null as null | string,
    departureTimeThere:null as null | string,
    timeData: {
        time: null as null | string,
        data: null as null | string,
    }
},
arrivalThere: {
    arrivalCityThere: undefined as undefined | string,
    arrivalAirportThere: null as null | string,
    arrivalUidThere: null as null | string,
    arrivalTimeThere:null as null | string,
    timeData: {
        time: null as null | string,
        data: null as null | string,
    }
},
departureBack: {
    departureCityBack: undefined as undefined | string,
    departureAirportBack: null as null | string,
    departureUidBack: null as null | string,
    departureTimeBack: null as null | string,
    timeData: {
        time: null as null | string,
        data: null as null | string,
    }
},
arrivalBack: {
    arrivalCityBack: undefined as undefined | string,
    arrivalAirportBack: null as null | string,
    arrivalUidBack: null as null | string,
    arrivalTimeBack: null as null | string,
    timeData: {
        time: null as null | string,
        data: null as null | string,
    }
}*/

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
            let copyState:FlightDataInitState = {}
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


export const getFlights = (count:number): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    const filtersID:string[] = getState().filtration.map(f => f.id)
    const filtersOptions:FilterOptionsType = getState().filterOptions
    const setting = calculationSelectedSettings(filtersID,filtersOptions)
    const res = await flightsAPI.getFlights(count)
    const flights: FlightState[] = res.map(f => ({id: f.id}))
    dispatch(setFlight(flights))
    dispatch(setFlightsData(res))
}

//types
type FlightDataInitState = { [key: string]: Array<DataPromise> }
export type FlightDataAction = ReturnType<typeof setFlightsData> | SetIdFlight