import React from 'react';
import s from './Footer.module.scss'

export const Footer = React.memo(() => {
    return (
        <div className={s.footer}>
            Рейс выполняет Аэрофлот
        </div>
    );
});