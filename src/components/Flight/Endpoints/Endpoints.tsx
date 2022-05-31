import React from 'react';
import s from './Endpoints.module.scss'
import arrow from '../../../assets/image/arrow.svg'


type PropsType = {
    departureAirport: string | undefined
    departureCity: string | undefined
    departureUid: string
    arrivalAirport: string | undefined
    arrivalCity: string | undefined
    arrivalUid: string
}

export const Endpoints = React.memo((
    {
        departureAirport,
        departureCity,
        departureUid,
        arrivalAirport,
        arrivalCity,
        arrivalUid,
        ...props
    }: PropsType) => {


    return (
        <div className={s.endpointsContainer}>
            <div className={s.pointDeparture}>
                <div>{departureCity},</div>
                <div>{departureAirport?.toUpperCase()}</div>
                <div>({departureUid})</div>
            </div>
            <div className={s.arrow}>
                <img src={arrow} height={30} width={50}/>
            </div>
            <div className={s.arrivalPoint}>
                <div>{arrivalCity},</div>
                <div>{arrivalAirport?.toUpperCase()}</div>
                <div>({arrivalUid})</div>
            </div>
        </div>
    );
});