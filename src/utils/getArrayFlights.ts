import flights from '../state/flights.json'
import {AirTravel, Flight, FlightOption, Segments} from "../entities/entities";
import {v1} from 'uuid';
import {FilterOptionsType} from "../components/Filtration/FilterOption/filterOptionReducer";
import {airlinesID, filtrationID, priceID, sortingID} from "../components/Filtration/filtrationReducer";


const airTravel: AirTravel = flights
const flightArray = airTravel.result.flights

export type DataPromise = {
    id: string
    thereBack: {
        age: string
        caption: string
        currencyCode: string
        duration: number
        flightDuration: string
        passengerCountThereBack: number
        totalPrice: string
    }
    departureThere: {
        departureCityThere: string | undefined
        departureAirportThere: string
        departureUidThere: string
        departureTimeThere: string
        duration: string
        timeData: {
            time: string
            data: string
        }
        transfer:boolean
    }
    arrivalThere: {
        arrivalCityThere: string | undefined
        arrivalAirportThere: string
        arrivalUidThere: string
        arrivalTimeThere: string
        timeData: {
            time: string
            data: string
        }
    }
    departureBack: {
        departureCityBack: string | undefined
        departureAirportBack: string
        departureUidBack: string
        departureTimeBack: string
        duration: string
        timeData: {
            time: string
            data: string
        }
        transfer:boolean
    }
    arrivalBack: {
        arrivalCityBack: string | undefined
        arrivalAirportBack: string
        arrivalUidBack: string
        arrivalTimeBack: string
        timeData: {
            time: string
            data: string
        }
    }
}

export const getArrayFlights = async (count: number, setting: FilterOptionsType): Promise<DataPromise[]> => {
    const portionFlights: Array<Flight> = []
    let arrayFlightsSort = [...flightArray]

    //сортировка
    if (setting[sortingID].length > 0) {
        const id = setting[sortingID][0].id
        if (id === 1) {
            arrayFlightsSort.sort((a, b) => {
                return Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)
            })
        }
        if (id === 2) {
            arrayFlightsSort.sort((a, b) => {
                return Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount)
            })
        }
        if (id === 3) {
            arrayFlightsSort.sort((a, b) => {
                return (a.flight.legs[0].duration + a.flight.legs[1].duration) - Number(b.flight.legs[0].duration + b.flight.legs[1].duration)
            })
        }
    }
    if (setting[filtrationID].length > 0) {
        const id = setting[filtrationID][0].id
        if (id === 1) {
            arrayFlightsSort = arrayFlightsSort.filter(f => f.flight.legs[0].segments.length > 1)
        }
        if (id === 2) {
            arrayFlightsSort = arrayFlightsSort.filter(f => f.flight.legs[0].segments.length < 2)
        }
    }
    if (setting[priceID].length > 0) {
        const [from, upTo] = setting[priceID]
        const priceFrom = from.status as number
        const priceUpTo = upTo.status as number
        if (priceUpTo !== 0) {
            arrayFlightsSort = arrayFlightsSort.filter(f => {
                return Number(f.flight.price.total.amount) > priceFrom && Number(f.flight.price.total.amount) < priceUpTo
            })
        }
    }
    if (setting[airlinesID].length > 0) {
        let selectedAirlines: FlightOption[] = []
        setting[airlinesID].forEach(a => {
            selectedAirlines = [...selectedAirlines, ...arrayFlightsSort.filter(f => {
                return f.flight.carrier.caption === a.title
            })]
        })
        arrayFlightsSort = [...selectedAirlines]
    }

    for (let i = count - 2; i < count; i++) {  //здесь как вариант можно делать сортировку и наполнять его
        portionFlights.push(arrayFlightsSort[i].flight)
    }


    let twoFlightData = []


    for (let i = 0; i < portionFlights.length; i++) {// здесь как вариант можно брать по одному элементу и создавать объект на выход
        let singleFlightData = {};
        const firstSegment = portionFlights[i].legs[0].segments //данные полета туда
        const secondSegment = portionFlights[i].legs[1].segments //данные полета обратно
        singleFlightData = {                                     //заполняем общими данными туда-обратно
            id: v1(),
            thereBack: {
                caption: portionFlights[i].carrier.caption,
                totalPrice: portionFlights[i].price.total.amount,
                currencyCode: portionFlights[i].price.total.currencyCode,
                age: portionFlights[i].price.passengerPrices[0].passengerType.caption,
                passengerCountThereBack: portionFlights[i].price.passengerPrices[0].passengerCount,
                duration: portionFlights[i].legs[0].duration,
            }
        }
        if (firstSegment.length > 1) {
            singleFlightData = {
                ...singleFlightData,
                //туда отправление
                departureThere: {
                    departureCityThere: firstSegment[0].departureCity?.caption,
                    departureAirportThere: firstSegment[0].departureAirport.caption,
                    departureUidThere: firstSegment[0].departureAirport.uid,
                    departureTimeThere: firstSegment[0].departureDate,
                    duration: String(portionFlights[i].legs[0].duration),
                    transfer:true
                },
                //туда прибытие
                arrivalThere: {
                    arrivalCityThere: firstSegment[1].arrivalCity?.caption,
                    arrivalAirportThere: firstSegment[1].arrivalAirport.caption,
                    arrivalUidThere: firstSegment[1].arrivalAirport.uid,
                    arrivalTimeThere: firstSegment[1].arrivalDate,
                }
            }
        }
        if (firstSegment.length < 2) {
            singleFlightData = {
                ...singleFlightData,
                //туда отправление
                departureThere: {
                    departureCityThere: firstSegment[0].departureCity?.caption,
                    departureAirportThere: firstSegment[0].departureAirport.caption,
                    departureUidThere: firstSegment[0].departureAirport.uid,
                    departureTimeThere: firstSegment[0].departureDate,
                    duration: String(portionFlights[i].legs[0].duration),
                    transfer:false
                },
                //туда прибытие
                arrivalThere: {
                    arrivalCityThere: firstSegment[0].arrivalCity?.caption,
                    arrivalAirportThere: firstSegment[0].arrivalAirport.caption,
                    arrivalUidThere: firstSegment[0].arrivalAirport.uid,
                    arrivalTimeThere: firstSegment[0].arrivalDate,
                },
            }
        }
        if (secondSegment.length > 1) {
            singleFlightData = {
                ...singleFlightData,
                //обратно отправление
                departureBack: {
                    departureCityBack: secondSegment[0].departureCity?.caption,
                    departureAirportBack: secondSegment[0].departureAirport.caption,
                    departureUidBack: secondSegment[0].departureAirport.uid,
                    departureTimeBack: secondSegment[0].departureDate,
                    duration: String(portionFlights[i].legs[1].duration),
                    transfer:true
                },
                //обратно прибытие
                arrivalBack: {
                    arrivalCityBack: secondSegment[1].arrivalCity?.caption,
                    arrivalAirportBack: secondSegment[1].arrivalAirport.caption,
                    arrivalUidBack: secondSegment[1].arrivalAirport.uid,
                    arrivalTimeBack: secondSegment[1].arrivalDate,
                },
            }
        }
        if (secondSegment.length < 2) {
            singleFlightData = {
                ...singleFlightData,
                //обратно отправление
                departureBack: {
                    departureCityBack: secondSegment[0].departureCity?.caption,
                    departureAirportBack: secondSegment[0].departureAirport.caption,
                    departureUidBack: secondSegment[0].departureAirport.uid,
                    departureTimeBack: secondSegment[0].departureDate,
                    duration: String(portionFlights[i].legs[1].duration),
                    transfer:false
                },
                //обратно прибытие
                arrivalBack: {
                    arrivalCityBack: secondSegment[0].arrivalCity?.caption,
                    arrivalAirportBack: secondSegment[0].arrivalAirport.caption,
                    arrivalUidBack: secondSegment[0].arrivalAirport.uid,
                    arrivalTimeBack: secondSegment[0].arrivalDate,
                },
            }
        }
        // запушили в массив объект для полета
        twoFlightData.push(singleFlightData)
        //достали этот объект
        const {departureThere, arrivalThere, departureBack, arrivalBack} = twoFlightData[i] as DataPromise
        //достаем из этого объекта время и дату для каждой точки (отправка/прилет)
        const {departureTimeThere} = departureThere
        const {arrivalTimeThere} = arrivalThere
        const {departureTimeBack} = departureBack
        const {arrivalTimeBack} = arrivalBack

        //преобразуем время в вид отображения
        const arrayTimesDates = [departureTimeThere, arrivalTimeThere, departureTimeBack, arrivalTimeBack]
        const arrayTimesDatesDisplay: { time: string, data: string }[] = []
        arrayTimesDates.forEach(e => {
            const timeData = formatTimeDisplay(e)
            arrayTimesDatesDisplay.push(timeData)
        })
        const [departureTimeDataThere, arrivalTimeDataThere, departureTimeDataBack, arrivalTimeDataBack] = arrayTimesDatesDisplay
        departureThere.timeData = {...departureTimeDataThere}
        arrivalThere.timeData = {...arrivalTimeDataThere}
        departureBack.timeData = {...departureTimeDataBack}
        arrivalBack.timeData = {...arrivalTimeDataBack}
        //преобразуем общее время полета туда-обратно в вид отображения
        let arrayForDuration = [departureThere, departureBack]
        arrayForDuration.forEach(d => {
            const duration = Number(d.duration)
            const flightHours = Math.trunc(duration / 60)
            const flightMinutes = duration - (flightHours * 60)
            const flightDuration = `${flightHours} ч ${flightMinutes} мин`
            d.duration = flightDuration
        })

    }

    return twoFlightData as DataPromise[]
}

const formatTimeDisplay = (timeData: string): { time: string, data: string } => {

    //преобразуем дату пришедшею в виде строки в вид для отображения
    const arrDataAndTime = timeData.split('T')
    let data: number[] = [];
    let time: string[] = []

    arrDataAndTime.forEach((e: string, i: number) => {
        if (i === 0) {
            data = e.split('-').map(e => Number(e)) //получаем массив из года, месяца, числа
        } else if (i === 1) {
            time = e.split(':').slice(0, -1) // получаем массив из часов и минут
        }
    })
    //вычисляем день недели
    const [year, month, day] = data
    const dateObject = new Date(year, month, day)
    const dayString = getWeekDay(dateObject)
    //вычисляем название месяца
    const monthName = getMonthName(month)
    //преобразуем время для отображения
    const departureTimeThereDisplay = `${time[0]}:${time[1]}`
    const departureDataThereDisplay = `${day} ${monthName} ${dayString}`
    return {
        time: departureTimeThereDisplay,
        data: departureDataThereDisplay,
    }
}

const getWeekDay = (date: Date) => {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}

const getMonthName = (month: number) => {
    let months = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.',
        'авг.', 'сен.', 'окт.', 'ноя.', 'дек.']
    return months[month]
}