import React from 'react';
import s from './FlightDuration.module.scss'

export const FlightDuration = React.memo(() => {
    return (
        <div className={s.flightDurationContainer}>
            <div className={s.departureTime}>
                <p>20:00</p>
                <p>18 авг</p>
            </div>
            <div className={s.flightTime}>
                <p>3 часа</p>
            </div>
            <div className={s.arrivalTime}>
                <p>18 авг</p>
                <p>23:00</p>
            </div>
        </div>
    );
});