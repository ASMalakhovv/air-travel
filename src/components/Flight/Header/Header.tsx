import React from 'react';
import s from './Header.module.scss'


type PropsType = {
    amount: string
    currencyCode: string
    age: string
    passengerCountThereBack: number
    carrier: string
}

export const Header = React.memo((
    {
        amount,
        currencyCode,
        age,
        passengerCountThereBack,
        carrier,
    ...props
    }:PropsType) => {

    return (
        <div className={s.headerContainer}>
            <div className={s.carrier}>
                {carrier?.toUpperCase()}
            </div>
            <div className={s.price}>
                <h3>{amount} {currencyCode}</h3>
                <p>Стоимость для {passengerCountThereBack} {age?.toLowerCase()} пассажира</p>
            </div>
        </div>
    );
});