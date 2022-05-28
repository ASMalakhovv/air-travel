import React from 'react';
import {Header} from "./Header/Header";
import {Endpoints} from "./Endpoints/Endpoints";
import {FlightDuration} from "./FlightDuration/FlightDuration";
import {Footer} from "./Footer/Footer";

export const Flight = React.memo(() => {
    return (
        <div>
            <Header/>
            <Endpoints/>
            <FlightDuration/>
            <Footer/>
        </div>
    );
})
