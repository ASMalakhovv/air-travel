import React from 'react';
import s from './Header.module.scss'

export const Header = React.memo(() => {
    return (
        <div className={s.headerContainer}>
            <div className={s.image}>
                <img/>
            </div>
            <div className={s.price}>
                <p>22000</p>
                <p>Стоимость для одного взрослого</p>
            </div>
        </div>
);
});