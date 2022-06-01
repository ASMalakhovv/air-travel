import React, {HTMLInputTypeAttribute, useState} from 'react';
import {FilterOption} from './FilterOption/FilterOption';
import s from './Filtration.module.scss'
import {useAppSelector} from '../../hooks/useReactRedux';
import {FilterOptions} from './FilterOption/filterOptionReducer';

type PropsType = {
    filterID: string
    title: string
    type: HTMLInputTypeAttribute | undefined
    count: number
}

export const Filtration = React.memo(({filterID, title, type, count, ...props}: PropsType) => {
    //hooks
    const [timeoutID, setTimeoutID] = useState<number | null>(null)
    //react-redux
    const arrayFilterOption: FilterOptions[] = useAppSelector(state => state.filterOptions[filterID])
    //action
    const filterOption = arrayFilterOption.map(o => {
        return <FilterOption key={o.id}
                             type={type}
                             option={o.title}
                             status={o.status}
                             setTimeoutID={setTimeoutID}
                             timeoutID={timeoutID}
                             filterID={filterID}
                             filterOptionID={o.id}
                             count={count}
        />
    })
    return (
        <div className={s.filtrationContainer}>
            <h4>{title}</h4>
            {filterOption}
        </div>
    );
});
