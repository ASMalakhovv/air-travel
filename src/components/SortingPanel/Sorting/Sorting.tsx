import React from 'react';

export const Sorting = React.memo(() => {
    const sortOptions: string[] = ['по возрастанию цены', 'по убыванию цене', 'по времени в пути']
    const sorting = sortOptions.map((o: string, i: number) => {
        return <label key={i}>
            <input type='radio' onChange={() => {
            }}/>
            <span>- {o}</span>
        </label>
    })
    return (
        <div>
            <h4>Сортировать</h4>
            {sorting}
        </div>
    );
});