import React from 'react';
import s from './Transfer.module.scss'

export const Transfer = React.memo(() => {
    return (
        <div className={s.transferContainer}>
            <div className={s.line}></div>
            <div className={s.transfer}>1 пересадка</div>
            <div className={s.line}></div>
        </div>
    );
});

