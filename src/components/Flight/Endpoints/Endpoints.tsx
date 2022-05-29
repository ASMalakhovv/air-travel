import React from 'react';
import s from './Endpoints.module.scss'

export const Endpoints = React.memo(() => {
    return (
        <div className={s.endpointsContainer}>
            <div className={s.pointDeparture}>
                Москва
            </div>
            <div>
                стрелка
            </div>
            <div className={s.arrivalPoint}>
                Омск
            </div>
        </div>
    );
});