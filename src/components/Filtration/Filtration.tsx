import React, {HTMLInputTypeAttribute} from 'react';
import {FilterOption} from './FilterOption/FilterOption';
import s from './Filtration.module.scss'
import {useAppSelector} from "../../hooks/useReactRedux";
import {FilterOptions} from "./FilterOption/filterOptionReducer";

type PropsType = {
    filterID: string
    title: string
    type: HTMLInputTypeAttribute | undefined
}

export const Filtration = React.memo(({filterID, title, type, ...props}: PropsType) => {
    //react-redux
    const arrayFilterOption: FilterOptions[] = useAppSelector(state => state.filterOptions[filterID])
    //здесь когда вмонтируется запросить авиакомпании

    //action
    const filterOption = arrayFilterOption.map(o => {
        return <FilterOption key={o.id}
                             type={type}
                             option={o.title}
                             status={o.status}
        />
    })
    return (
        <div className={s.filtrationContainer}>
            <h4>{title}</h4>
            {filterOption}
        </div>
    );
});