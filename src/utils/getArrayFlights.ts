import flights from '../state/flights.json'
import {AirTravel, Flight, Segments} from "../entities/entities";
import { v1 } from 'uuid';


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
        timeData: {
            time: string
            data: string
        }
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
        timeData: {
            time: string
            data: string
        }
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

export const getArrayFlights = async (): Promise<DataPromise[]> => {
    const portionFlights: Array<Flight> = []
    for (let i = 0; i < 2; i++) {  //здесь как вариант можно делать сортировку и наполнять его
        portionFlights.push(flightArray[i].flight)
    }


    let twoFlightData = []

    for (let i = 0; i < portionFlights.length; i++) {// здесь как вариант можно брать по одному элементу и создавать объект на выход
        let singleFlightData = {};
        const firstSegment = portionFlights[i].legs[0].segments //данные полета туда
        const secondSegment = portionFlights[i].legs[1].segments //данные полета обратно
        singleFlightData = {                                     //заполняем общими данными туда-обратно
            id:v1(),
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
        const {departureThere, arrivalThere, departureBack, arrivalBack, thereBack} = twoFlightData[i] as DataPromise
        //достаем из этого объекта время и дату для каждой точки (отправка/прилет)
        const {departureTimeThere} = departureThere
        const {arrivalTimeThere} = arrivalThere
        const {departureTimeBack} = departureBack
        const {arrivalTimeBack} = arrivalBack
        const {duration} = thereBack
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
        const flightHours = Math.trunc(duration / 60)
        const flightMinutes = duration - (flightHours * 60)
        const flightDuration = `${flightHours} ч ${flightMinutes} мин`
        thereBack.flightDuration = flightDuration
    }
    const [there,back] = twoFlightData as DataPromise[]

    //время вылета и прилета в обе стороны


    //общее время полета


    //общее для туда-обратно
    // const {amount: amountThereBack, currencyCode: currencyCodeThereBack} = portionFlights[0].price.total
    // const {caption: adultThereBack} = portionFlights[0].price.passengerPrices[0].passengerType
    // const passengerCountThereBack = portionFlights[0].price.passengerPrices[0].passengerCount
    // const duration = portionFlights[0].legs[0].duration
    // const carrier = portionFlights[0].carrier.caption


    /* //туда отправление
     const pointDepartureThere: Segments = portionFlights[0].legs[0].segments[0]
     const departureCityThere = pointDepartureThere.departureCity?.caption
     const departureAirportThere = pointDepartureThere.departureAirport.caption
     const departureUidThere = pointDepartureThere.departureAirport.uid
     const departureTimeThere = pointDepartureThere.departureDate //время отправления
     //туда прибытие
     const arrivalPointThere: Segments = portionFlights[0].legs[0].segments[1]
     const arrivalCityThere = arrivalPointThere.arrivalCity?.caption
     const arrivalAirportThere = arrivalPointThere.arrivalAirport.caption
     const arrivalUidThere = pointDepartureThere.arrivalAirport.uid
     const arrivalTimeThere = pointDepartureThere.arrivalDate // время прибытия после пересадки
     //обратно отправление
     const pointDepartureBack: Segments = portionFlights[0].legs[1].segments[0]
     const departureCityBack = pointDepartureBack.departureCity?.caption
     const departureAirportBack = pointDepartureBack.departureAirport.caption
     const departureUidBack = pointDepartureBack.departureAirport.uid
     const departureTimeBack = pointDepartureBack.departureDate
     //обратно прибытие
     const arrivalPointBack: Segments = portionFlights[0].legs[1].segments[1]
     const arrivalCityBack = arrivalPointBack.arrivalCity?.caption
     const arrivalAirportBack = arrivalPointBack.arrivalAirport.caption
     const arrivalUidBack = arrivalPointBack.arrivalAirport.uid
     const arrivalTimeBack = arrivalPointBack.arrivalDate*/

    /*for (let i = 0; i < twoFlightData.length; i++) {
        const dataInOneDirection = twoFlightData[i] as Omit<DataPromise, 'time'>
        if (i === 0) {
            formatTimeDisplay(dataInOneDirection.thereBack.)
        }

     }*/
    //const time = formatTimeDisplay(duration, departureTime, arrivalTime)

    /*const data: DataPromise = {
        time,
        thereBack: {
            amountThereBack,
            currencyCodeThereBack,
            adultThereBack,
            passengerCountThereBack,
            carrier
        },
        departureThere: {
            departureCityThere,
            departureAirportThere,
            departureUidThere,
        },
        arrivalThere: {
            arrivalCityThere,
            arrivalAirportThere,
            arrivalUidThere,
        },
        departureBack: {
            departureCityBack,
            departureAirportBack,
            departureUidBack,
        },
        arrivalBack: {
            arrivalCityBack,
            arrivalAirportBack,
            arrivalUidBack
        }
    }*/


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