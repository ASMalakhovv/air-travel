import React from 'react';
import {Header} from "./Header/Header";
import {Endpoints} from "./Endpoints/Endpoints";
import {FlightDuration} from "./FlightDuration/FlightDuration";
import {Footer} from "./Footer/Footer";
import {Transfer} from "./Transfer/Transfer";

export const Flight = React.memo(() => {
    const peresadka = true

    return (
        <div>
            <Header/>
            <Endpoints/>
            <FlightDuration/>
            {peresadka && <Transfer/>}
            <Footer/>
            <button>Выбрать</button>
        </div>
    );
})
