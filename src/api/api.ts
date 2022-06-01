import {DataPromise, getArrayFlights} from '../utils/getArrayFlights';
import {FilterOptionsType} from '../components/Filtration/FilterOption/filterOptionReducer';

export const flightsAPI = {
    getFlights(count: number, setting: FilterOptionsType): Promise<DataPromise[]> {
        return getArrayFlights(count, setting)
            .then(res => res)
    }
}