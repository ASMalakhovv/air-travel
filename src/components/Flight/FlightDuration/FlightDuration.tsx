import React from 'react';
import s from './FlightDuration.module.scss'

type PropsType = {
    flightTime: string
    departureTime: string
    departureData: string
    arrivalTime: string
    arrivalData: string
}

export const FlightDuration = React.memo((
    {
        flightTime,
        departureTime,
        departureData,
        arrivalTime,
        arrivalData,
        ...props
    }: PropsType) => {

    return (
        <div className={s.flightDurationContainer}>
            <div className={s.departureTime}>
                <p>{departureTime}</p>
                <p>{departureData}</p>
            </div>
            <div className={s.flightTime}>
                <p>{flightTime}</p>
            </div>
            <div className={s.arrivalTime}>
                <p>{arrivalData}</p>
                <p>{arrivalTime}</p>
            </div>
        </div>
    );
});