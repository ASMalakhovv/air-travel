import React from 'react';
import {Endpoints} from "../Endpoints/Endpoints";
import {FlightDuration} from "../FlightDuration/FlightDuration";
import {Transfer} from "../Transfer/Transfer";
import {Footer} from "../Footer/Footer";

type PropsType = {
    departureAirport: string | undefined
    departureCity: string | undefined
    departureUid: string
    arrivalAirport: string | undefined
    arrivalCity: string | undefined
    arrivalUid: string
    carrier: string

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
        ...props
    }: PropsType) => {
    const peresadka = true
    return (
        <div>
            <Endpoints
                arrivalAirport={arrivalAirport}
                arrivalCity={arrivalCity}
                arrivalUid={arrivalUid}
                departureAirport={departureAirport}
                departureCity={departureCity}
                departureUid={departureUid}
            />
            <FlightDuration/>
            {peresadka && <Transfer/>}
            <Footer carrier={carrier}/>
        </div>
    );
});

