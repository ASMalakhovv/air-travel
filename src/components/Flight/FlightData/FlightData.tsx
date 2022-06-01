import React from 'react';
import {Endpoints} from "../Endpoints/Endpoints";
import {FlightDuration} from "../FlightDuration/FlightDuration";
import {Transfer} from "../Transfer/Transfer";
import {Footer} from "../Footer/Footer";
import s from './FlightData.module.scss'

type PropsType = {
    departureAirport: string | undefined
    departureCity: string | undefined
    departureUid: string
    arrivalAirport: string | undefined
    arrivalCity: string | undefined
    arrivalUid: string
    carrier: string
    flightTime: string
    departureTime: string
    departureData: string
    arrivalTime: string
    arrivalData: string
    transfer:boolean

}

export const FlightData = React.memo((
    {
        departureAirport,
        departureCity,
        departureUid,
        arrivalAirport,
        arrivalCity,
        arrivalUid,
        carrier,
        flightTime,
        departureTime,
        departureData,
        arrivalTime,
        arrivalData,
        transfer,
        ...props
    }: PropsType) => {

    return (
        <div className={s.flightDataContainer}>
            <Endpoints
                arrivalAirport={arrivalAirport}
                arrivalCity={arrivalCity}
                arrivalUid={arrivalUid}
                departureAirport={departureAirport}
                departureCity={departureCity}
                departureUid={departureUid}
            />
            <FlightDuration
            arrivalData={arrivalData}
            arrivalTime={arrivalTime}
            departureData={departureData}
            flightTime={flightTime}
            departureTime={departureTime}
            />
            {transfer && <Transfer/>}
            <Footer carrier={carrier}/>
        </div>
    );
});

