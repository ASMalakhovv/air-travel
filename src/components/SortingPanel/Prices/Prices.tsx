import React from 'react';

export const Prices = React.memo(() => {
    return (
        <div>
            <h4>Цены</h4>
            <div>
                <span>От</span>
                <input type='number'/>
            </div>
            <div>
                <span>До</span>
                <input type='number'/>
            </div>
        </div>
    )
});

