import React from 'react';

export const Airlines = React.memo(() => {
    const airlineOptions = ['Аэрофлот', 'Уральские авиалинии']
    const airlines = airlineOptions.map((o: string, i: number) => {
        return <label key={i}>
            <input type='checkbox' onChange={() => {
            }}/>
            <span>- {o}</span>
        </label>
    })

    return (
        <div>
            <h4>Авиакомпании</h4>
            {airlines}
        </div>
    );
});