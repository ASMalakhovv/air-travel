import {AirTravel} from '../entities/entities';
import flights from '../state/flights.json';

const airTravel: AirTravel = flights
const flightArray = airTravel.result.flights

export const getAirlines = (): Array<string> => {
    const arrAirlines = flightArray.map(f => f.flight.carrier.caption)
    const listAirlines = new Set(arrAirlines)
    const arrayListAirlines: string[] = []
    listAirlines.forEach((a) => {
        arrayListAirlines.push(a)
    })
    return arrayListAirlines
}