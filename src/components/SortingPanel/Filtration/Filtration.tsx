import React from 'react';

export const Filtration = React.memo(() => {

    const filteringOptions: string[] = ['1 пересадка', 'без пересадок']
    const filtration = filteringOptions.map((o: string, i: number) => {
        return <label key={i}>
            <input type='checkbox' onChange={() => {
            }}/>
            <span>- {o}</span>
        </label>
    })

    return (
        <div>
            <h4>Фильтровать</h4>
            {filtration}
        </div>
    );
});