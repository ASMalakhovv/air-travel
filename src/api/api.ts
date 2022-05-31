import {DataPromise, getArrayFlights} from "../utils/getArrayFlights";


export const flightsAPI = {
    getFlights(count:number): Promise<DataPromise[]> {
        return getArrayFlights(count)
            .then(res => res)
    }
}