import React from 'react';
import s from './Footer.module.scss'

type PropsType = {
    carrier: string
}

export const Footer = React.memo(({carrier, ...props}: PropsType) => {


    return (
        <div className={s.footer}>
            Рейс выполняет: {carrier}
        </div>
    );
});