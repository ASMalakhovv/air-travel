import {DataPromise, getArrayFlights} from "../utils/getArrayFlights";


export const flightsAPI = {
    getFlights(): Promise<DataPromise[]> {
        return getArrayFlights()
            .then(res => res)
    }
}