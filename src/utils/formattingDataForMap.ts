import {DataPromise} from "./getArrayFlights";

export type DataForMap = {
    thereBack:ThereBack
    thereBackFlightData: ThereBackData[]
}
type ThereBack = {
    age: string
    caption: string
    currencyCode: string
    duration: number
    flightDuration: string
    passengerCountThereBack: number
    totalPrice: string
}
type ThereBackData = {
    departureCity: string | undefined
    departureAirport: string
    departureUid: string
    departureTime: string
    departureTimeData: { time: string, data: string }
    arrivalCity: string | undefined
    arrivalAirport: string
    arrivalUid: string
    arrivalTime: string
    arrivalTimeData: { time: string, data: string }
    flightDuration:string
}

export const formattingDataForMap = (data: DataPromise[]):DataForMap => {
    const [flightData] = data
    const {thereBack, departureThere, arrivalThere, departureBack, arrivalBack} = flightData

    const obj1 = {
        departureCity: departureThere.departureCityThere,
        departureAirport: departureThere.departureAirportThere,
        departureUid: departureThere.departureUidThere,
        departureTime: departureThere.departureTimeThere,
        departureTimeData: departureThere.timeData,
        arrivalCity: arrivalThere.arrivalCityThere,
        arrivalAirport: arrivalThere.arrivalAirportThere,
        arrivalUid: arrivalThere.arrivalUidThere,
        arrivalTime: arrivalThere.arrivalTimeThere,
        arrivalTimeData: arrivalThere.timeData,
        flightDuration:departureThere.duration
    }
    const obj2 = {
        departureCity: departureBack.departureCityBack,
        departureAirport: departureBack.departureAirportBack,
        departureUid: departureBack.departureUidBack,
        departureTime: departureBack.departureTimeBack,
        departureTimeData: departureBack.timeData,
        arrivalCity: arrivalBack.arrivalCityBack,
        arrivalAirport: arrivalBack.arrivalAirportBack,
        arrivalUid: arrivalBack.arrivalUidBack,
        arrivalTime: arrivalBack.arrivalTimeBack,
        arrivalTimeData: arrivalBack.timeData,
        flightDuration:departureBack.duration
    }
    return {thereBack,thereBackFlightData:[obj1,obj2]}
}
